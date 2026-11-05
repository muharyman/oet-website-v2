import type { Payload } from 'payload'

import { ensureRegions, loadTeam } from './context'
import { migratePartners } from './partners'
import { linkRelatedProjects, migrateProjects } from './projects'
import { linkRelatedPublications, migratePublications } from './publications'
import { renderReport, resetReport } from './report'
import { migrateSite } from './site'
import {
  fetchAll,
  fetchFooter,
  type LegacyPartner,
  type LegacyPost,
  type LegacyProject,
} from './source'

export const runOldSiteImport = async (payload: Payload) => {
  resetReport()
  const [partners, projects, posts, footer] = await Promise.all([
    fetchAll<LegacyPartner>('partners'),
    fetchAll<LegacyProject>('projects'),
    fetchAll<LegacyPost>('posts'),
    fetchFooter(),
  ])

  payload.logger.info(
    `Old site: ${partners.length} partners, ${projects.length} projects, ${posts.length} posts`,
  )

  const region = await ensureRegions(payload)
  const team = await loadTeam(payload)

  payload.logger.info('Importing partners and funders')
  const partnerIds = await migratePartners(payload, partners)

  payload.logger.info('Importing projects')
  const projectIds = await migrateProjects(payload, projects, partnerIds, team, region)
  await linkRelatedProjects(payload, projects, projectIds)

  payload.logger.info('Importing publications')
  const publicationIds = await migratePublications(payload, posts, team, region)
  await linkRelatedPublications(payload, posts, publicationIds)

  payload.logger.info('Updating site settings, navigation and redirects')
  await migrateSite(payload, footer)

  return renderReport()
}
