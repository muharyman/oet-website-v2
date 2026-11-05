import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'

import config from '../payload.config'
import { ensureRegions, loadTeam } from './context'
import { migratePartners } from './partners'
import { linkRelatedProjects, migrateProjects } from './projects'
import { linkRelatedPublications, migratePublications } from './publications'
import { writeReport } from './report'
import { migrateSite } from './site'
import {
  fetchAll,
  fetchFooter,
  type LegacyPartner,
  type LegacyPost,
  type LegacyProject,
} from './source'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const reportFile = path.resolve(dirname, '../../../docs/reports/old-site-import.md')

const [partners, projects, posts, footer] = await Promise.all([
  fetchAll<LegacyPartner>('partners'),
  fetchAll<LegacyProject>('projects'),
  fetchAll<LegacyPost>('posts'),
  fetchFooter(),
])

const payload = await getPayload({ config })

payload.logger.info(
  `Old site: ${partners.length} partners, ${projects.length} projects, ${posts.length} posts`,
)

const region = await ensureRegions(payload)
const team = await loadTeam(payload)

payload.logger.info('Migrating partners and funders')
const partnerIds = await migratePartners(payload, partners)

payload.logger.info('Migrating projects')
const projectIds = await migrateProjects(payload, projects, partnerIds, team, region)
await linkRelatedProjects(payload, projects, projectIds)

payload.logger.info('Migrating publications')
const publicationIds = await migratePublications(payload, posts, team, region)
await linkRelatedPublications(payload, posts, publicationIds)

payload.logger.info('Updating site settings, navigation and redirects')
await migrateSite(payload, footer)

await writeReport(reportFile)
payload.logger.info(`Old site import finished; report in ${reportFile}`)
process.exit(0)
