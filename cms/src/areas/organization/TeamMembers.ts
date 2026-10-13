import type { CollectionConfig, GroupField } from 'payload'

import { publicRead } from '../../access'
import { href, image, link, plainText, text } from '../../fields'
import { checkbox, choice, number, tab } from './fields'

export const socialKinds = [
  { label: 'Email', value: 'email' },
  { label: 'GitHub', value: 'github' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Message', value: 'message' },
] as const

export const glows = [
  { label: 'Centre', value: 'center' },
  { label: 'Right', value: 'right' },
] as const

const box = (name: string, label: string, description: string): GroupField => ({
  name,
  type: 'group',
  label,
  admin: { description },
  fields: [
    {
      type: 'row',
      fields: [
        number('x', { required: true, label: 'Left (px)' }),
        number('y', { required: true, label: 'Top (px)' }),
        number('width', { required: true, label: 'Width (px)' }),
        number('height', { required: true, label: 'Height (px)' }),
      ],
    },
  ],
})

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  access: publicRead,
  admin: {
    group: 'Organization',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'seniorLeadership', 'departments', 'order'],
  },
  defaultSort: 'order',
  fields: [
    {
      type: 'tabs',
      tabs: [
        tab('Person', [
          plainText('name', {
            required: true,
            description: 'Full name with title, as shown on cards and person rows.',
          }),
          text('role', {
            required: true,
            description: 'Job title under the name on the team card, department card and hero.',
          }),
          image('photo', {
            required: false,
            label: 'Head photo',
            description:
              'Square photo for small avatars: department cards, the department page hero and person rows. Required for department heads.',
          }),
          {
            name: 'departments',
            type: 'relationship',
            relationTo: 'departments',
            hasMany: true,
            admin: {
              description:
                'Departments this person belongs to. Each one adds a tag to the team card and puts the person under that tab of the team filter.',
            },
          },
          {
            name: 'country',
            type: 'relationship',
            relationTo: 'countries',
            admin: { description: 'Country the person works from.' },
          },
        ]),
        tab('Links', [
          {
            name: 'socialLinks',
            type: 'array',
            label: 'Social links',
            admin: { description: 'Icon buttons on the team card, in this order.' },
            fields: [
              {
                type: 'row',
                fields: [
                  choice('kind', socialKinds, { required: true, label: 'Icon' }),
                  href('href', { required: true, label: 'Target' }),
                ],
              },
            ],
          },
          link('profile', {
            required: true,
            label: 'Profile link',
            description:
              'Text link at the bottom of the team card. The design shortens the label to "Read" on some cards.',
          }),
        ]),
        tab('Team card portrait', [
          image('portrait', {
            required: true,
            label: 'Cut-out portrait',
            description: 'Portrait with a transparent background, shown on the team page card.',
          }),
          {
            type: 'collapsible',
            label: 'Portrait placement',
            admin: {
              description:
                'Position and size of the portrait inside the card frame, set by hand per person. The frame is 280 px wide on desktop and 332 px on mobile.',
            },
            fields: [
              box('portraitDesktop', 'Desktop box', 'Offset and size inside the 280 px frame.'),
              box('portraitMobile', 'Mobile box', 'Offset and size inside the 332 px frame.'),
              {
                type: 'row',
                fields: [
                  number('portraitRotation', {
                    required: true,
                    label: 'Rotation (degrees)',
                    description: 'Clockwise. 0 for an upright portrait.',
                  }),
                  choice('glow', glows, {
                    required: true,
                    label: 'Glow position',
                    description: 'Where the red glow sits behind the portrait.',
                  }),
                ],
              },
            ],
          },
        ]),
      ],
    },
    checkbox('seniorLeadership', {
      label: 'Senior leadership',
      description: 'Adds the senior leadership tag and lists the person under that filter tab.',
      sidebar: true,
    }),
    number('order', {
      required: true,
      label: 'Order',
      description: 'Position in the team list before the visitor sorts it. Lower comes first.',
      sidebar: true,
    }),
  ],
}
