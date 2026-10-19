import type { GlobalConfig } from 'payload'

import { globalRead } from '../../access'
import { href, image, plainText, select, seo } from '../../fields'

export const socialKinds = ['linkedin', 'github', 'x', 'youtube', 'bluesky', 'mastodon'] as const

const tagManagerPattern = /^GTM-[A-Z0-9]+$/

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: globalRead,
  admin: {
    group: 'Site',
    description: 'Values shared by every page: name, default search texts, contact and tracking.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            plainText('siteName', {
              required: true,
              label: 'Site name',
              description:
                'Name of the organisation as it is added to browser titles and shared links.',
            }),
            {
              name: 'contactEmail',
              type: 'email',
              required: true,
              label: 'Contact email',
              admin: {
                description:
                  'General contact address. Shown as the email link in the footer call to action.',
              },
            },
          ],
        },
        {
          label: 'Search and sharing',
          description: 'Used by a page that has no title or description of its own.',
          fields: [
            seo(),
            image('shareImage', {
              required: true,
              label: 'Share image',
              description:
                'Picture shown when a page without its own picture is shared on social media or in chat apps. It is cropped to 1200 × 630.',
            }),
          ],
        },
        {
          label: 'Social profiles',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social profiles',
              minRows: 0,
              admin: {
                description:
                  'Profiles of the organisation. The current design does not show them; they are available for structured data and later use.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    select('kind', socialKinds, { required: true, label: 'Network' }),
                    href('url', {
                      required: true,
                      label: 'Profile URL',
                      description: 'Full URL of the profile (https://…).',
                    }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Tracking',
          fields: [
            {
              name: 'googleTagManagerId',
              type: 'text',
              label: 'Google Tag Manager id',
              admin: {
                description:
                  'Container id, for example GTM-ABC1234. Leave empty to load no tag manager.',
              },
              validate: (value: unknown) => {
                if (value === null || value === undefined || value === '') return true
                return typeof value === 'string' && tagManagerPattern.test(value)
                  ? true
                  : 'Use the form GTM-XXXXXXX'
              },
            },
          ],
        },
      ],
    },
  ],
}
