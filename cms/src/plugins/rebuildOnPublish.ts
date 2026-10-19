import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
  GlobalAfterChangeHook,
  GlobalConfig,
  PayloadRequest,
  Plugin,
} from 'payload'
import { waitUntil } from '@vercel/functions'

const ignored = new Set(['users', 'form-submissions'])

const trigger = async (url: string, req: PayloadRequest) => {
  const response = await fetch(url, { method: 'POST' })
  if (!response.ok) throw new Error(`Deploy hook answered ${response.status}`)
  req.payload.logger.info('Requested a rebuild of the website')
}

const schedule = (url: string, req: PayloadRequest) => {
  if (req.context.rebuildRequested) return
  req.context.rebuildRequested = true
  waitUntil(trigger(url, req).catch((error: unknown) => req.payload.logger.error(error)))
}

const hasDrafts = (collection: CollectionConfig) =>
  typeof collection.versions === 'object' && Boolean(collection.versions.drafts)

const withCollectionHooks = (url: string, collection: CollectionConfig): CollectionConfig => {
  const drafts = hasDrafts(collection)
  const afterChange: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
    const published = doc._status === 'published' || previousDoc?._status === 'published'
    if (!drafts || published) schedule(url, req)
    return doc
  }
  const afterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
    schedule(url, req)
    return doc
  }
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      afterChange: [...(collection.hooks?.afterChange ?? []), afterChange],
      afterDelete: [...(collection.hooks?.afterDelete ?? []), afterDelete],
    },
  }
}

const withGlobalHooks = (url: string, global: GlobalConfig): GlobalConfig => {
  const afterChange: GlobalAfterChangeHook = ({ doc, req }) => {
    schedule(url, req)
    return doc
  }
  return {
    ...global,
    hooks: {
      ...global.hooks,
      afterChange: [...(global.hooks?.afterChange ?? []), afterChange],
    },
  }
}

export const rebuildOnPublish =
  (url: string | undefined): Plugin =>
  (config) => {
    if (!url) return config
    return {
      ...config,
      collections: config.collections?.map((collection) =>
        ignored.has(collection.slug) ? collection : withCollectionHooks(url, collection),
      ),
      globals: config.globals?.map((global) => withGlobalHooks(url, global)),
    }
  }
