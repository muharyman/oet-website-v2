import type { CollectionConfig } from 'payload'

import { publishedRead } from '../../access'
import { richText, seo, slug, text } from '../../fields'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: publishedRead,
  versions: { drafts: true },
  admin: {
    group: 'Events',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description:
      'Free-form text pages. The site has a route for the slugs legal, privacy-statement and disclaimer (/legal, /privacy-statement, /disclaimer).',
  },
  fields: [
    text('title', { required: true, description: 'Heading of the page.' }),
    slug('title'),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            text('tag', { required: true, description: 'Small label above the heading.' }),
            ...richText('body', {
              required: true,
              label: 'Body',
              description: 'Text of the page under the heading.',
            }),
          ],
        },
        { label: 'Search and sharing', fields: [seo()] },
      ],
    },
  ],
}
