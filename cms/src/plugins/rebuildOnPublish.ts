import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
  GlobalAfterChangeHook,
  GlobalConfig,
  Payload,
  Plugin,
} from 'payload'

const quietPeriod = 30_000
const ignored = new Set(['users', 'form-submissions'])

let timer: ReturnType<typeof setTimeout> | undefined

const trigger = async (url: string, payload: Payload) => {
  const response = await fetch(url, { method: 'POST' })
  if (!response.ok) throw new Error(`Deploy hook answered ${response.status}`)
  payload.logger.info('Requested a rebuild of the website')
}

const schedule = (url: string, payload: Payload) => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    trigger(url, payload).catch((error: unknown) => payload.logger.error(error))
  }, quietPeriod)
}

const hasDrafts = (collection: CollectionConfig) =>
  typeof collection.versions === 'object' && Boolean(collection.versions.drafts)

const withCollectionHooks = (url: string, collection: CollectionConfig): CollectionConfig => {
  const drafts = hasDrafts(collection)
  const afterChange: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
    const published = doc._status === 'published' || previousDoc?._status === 'published'
    if (!drafts || published) schedule(url, req.payload)
    return doc
  }
  const afterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
    schedule(url, req.payload)
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
    schedule(url, req.payload)
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
