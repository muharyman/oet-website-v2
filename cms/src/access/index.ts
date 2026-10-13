import type { Access, FieldAccess } from 'payload'

export const anyone: Access = () => true

export const authenticated: Access = ({ req }) => Boolean(req.user)

export const admin: Access = ({ req }) => req.user?.role === 'admin'

export const adminField: FieldAccess = ({ req }) => req.user?.role === 'admin'

export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}

export const publicRead = {
  read: anyone,
  create: authenticated,
  update: authenticated,
  delete: authenticated,
}

export const publishedRead = {
  read: publishedOrAuthenticated,
  create: authenticated,
  update: authenticated,
  delete: authenticated,
}

export const globalRead = {
  read: anyone,
  update: authenticated,
}
