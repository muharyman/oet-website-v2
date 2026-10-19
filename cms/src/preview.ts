import type { CollectionAdminOptions } from 'payload'

import { env } from './env'

type PreviewDoc = Record<string, unknown>

export const preview =
  (
    path: (slug: string) => string,
    hasPage: (doc: PreviewDoc) => boolean,
  ): NonNullable<CollectionAdminOptions['preview']> =>
  (doc) => {
    const { slug } = doc
    if (typeof slug !== 'string' || slug === '' || !hasPage(doc)) return null
    const url = new URL(`/preview${path(slug)}`, env('WEB_URL'))
    url.searchParams.set('secret', env('PREVIEW_SECRET'))
    return url.href
  }

export const always = () => true
