import { existsSync } from 'node:fs'
import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const envFile = fileURLToPath(new URL('../.env', import.meta.url))
const target = fileURLToPath(new URL('../src/assets/cms', import.meta.url))

const cmsUrl = () => {
  if (existsSync(envFile)) process.loadEnvFile(envFile)
  const url = process.env.PAYLOAD_URL
  if (!url) throw new Error('PAYLOAD_URL is not set')
  return url
}

const sizeOf = async (path) => (existsSync(path) ? (await stat(path)).size : -1)

export const syncMedia = async () => {
  const base = cmsUrl()
  const response = await fetch(new URL('/api/media?limit=0&depth=0', base))
  if (!response.ok) throw new Error(`CMS answered ${response.status} for the media list`)
  const { docs } = await response.json()
  await mkdir(target, { recursive: true })
  const wanted = new Set(docs.map((doc) => doc.filename))
  const stale = (await readdir(target)).filter((name) => !wanted.has(name))
  for (const name of stale) await rm(join(target, name))
  let downloaded = 0
  for (const doc of docs) {
    const path = join(target, doc.filename)
    if ((await sizeOf(path)) === doc.filesize) continue
    const file = await fetch(new URL(doc.url, base))
    if (!file.ok) throw new Error(`CMS answered ${file.status} for ${doc.url}`)
    await writeFile(path, Buffer.from(await file.arrayBuffer()))
    downloaded += 1
  }
  return { total: docs.length, downloaded, removed: stale.length }
}

export const cmsMedia = () => ({
  name: 'cms-media',
  hooks: {
    'astro:config:setup': async ({ command, logger }) => {
      if (command !== 'dev' && command !== 'build') return
      const result = await syncMedia()
      logger.info(
        `${result.total} media files, ${result.downloaded} downloaded, ${result.removed} removed`,
      )
    },
  },
})
