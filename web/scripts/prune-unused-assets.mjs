import { readFileSync, readdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const textFiles = /\.(html|css|js|xml|json|svg)$/

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? walk(path) : [path]
  })

export const pruneUnusedAssets = () => ({
  name: 'prune-unused-assets',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const root = fileURLToPath(dir)
      const assets = join(root, '_astro')
      const text = walk(root)
        .filter((path) => textFiles.test(path))
        .map((path) => readFileSync(path, 'utf8'))
        .join('\n')
      const unused = readdirSync(assets).filter((name) => !text.includes(name))
      const bytes = unused.reduce((sum, name) => sum + statSync(join(assets, name)).size, 0)
      for (const name of unused) rmSync(join(assets, name))
      logger.info(`removed ${unused.length} unreferenced files (${(bytes / 1e6).toFixed(1)} MB)`)
    },
  },
})
