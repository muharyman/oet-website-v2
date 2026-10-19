import type { CollectionAdminOptions } from 'payload'

import { env } from './env'

type PreviewDoc = Record<string, unknown>

const previewUrl = (
  path: (slug: string) => string,
  hasPage: (doc: PreviewDoc) => boolean,
  doc: PreviewDoc,
) => {
  const { slug } = doc
  if (typeof slug !== 'string' || slug === '' || !hasPage(doc)) return null
  const url = new URL(`/preview${path(slug)}`, env('WEB_URL'))
  url.searchParams.set('secret', env('PREVIEW_SECRET'))
  return url.href
}

export const previewOptions = (
  path: (slug: string) => string,
  hasPage: (doc: PreviewDoc) => boolean,
): Pick<CollectionAdminOptions, 'preview' | 'livePreview'> => ({
  preview: (doc) => previewUrl(path, hasPage, doc),
  livePreview: {
    url: ({ data }) => previewUrl(path, hasPage, data),
    breakpoints: [
      { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      { name: 'mobile', label: 'Mobile', width: 412, height: 900 },
    ],
  },
})

export const always = () => true

export const draftVersions = {
  drafts: { autosave: { interval: 1000 } },
  maxPerDoc: 50,
}
