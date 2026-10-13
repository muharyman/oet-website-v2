import path from 'path'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import * as catalog from './areas/catalog'
import * as events from './areas/events'
import * as organization from './areas/organization'
import * as outputs from './areas/outputs'
import * as site from './areas/site'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { env } from './env'
import { rebuildOnPublish } from './plugins/rebuildOnPublish'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const areas = [site, outputs, catalog, events, organization]

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' - OET CMS' },
    importMap: { baseDir: dirname },
  },
  collections: [...areas.flatMap((area) => area.collections), Media, Users],
  globals: areas.flatMap((area) => area.globals),
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: env('DATABASE_URL') },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  localization: {
    locales: [{ code: 'en', label: 'English' }],
    defaultLocale: 'en',
    fallback: true,
  },
  secret: env('PAYLOAD_SECRET'),
  serverURL: env('PAYLOAD_PUBLIC_URL'),
  cors: [env('WEB_URL')],
  plugins: [rebuildOnPublish(process.env.WEB_DEPLOY_HOOK_URL)],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
    declare: false,
  },
})
