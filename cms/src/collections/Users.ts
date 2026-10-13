import type { CollectionConfig } from 'payload'

import { admin, adminField, authenticated } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: { useAPIKey: true },
  access: {
    read: authenticated,
    create: admin,
    update: authenticated,
    delete: admin,
    admin: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Administration',
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: { create: adminField, update: adminField },
    },
  ],
}
