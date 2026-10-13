import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

import { publicRead } from '../access'
import { env } from '../env'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  access: publicRead,
  admin: {
    group: 'Library',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'width', 'height', 'updatedAt'],
  },
  upload: {
    staticDir: path.resolve(dirname, '../..', env('MEDIA_DIR')),
    mimeTypes: ['image/*', 'application/pdf', 'video/mp4'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Text alternative read by screen readers. Leave empty only for decorative images.',
      },
    },
  ],
}
