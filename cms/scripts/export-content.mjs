import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const webSrc = fileURLToPath(new URL('../../web/src', import.meta.url))
const dataDir = path.join(webSrc, 'data')
const assetsDir = path.join(webSrc, 'assets')
const iconsDir = path.join(webSrc, 'icons')
const outDir = fileURLToPath(new URL('../seed/content', import.meta.url))
const tempDir = fileURLToPath(new URL('../seed/.export', import.meta.url))

const skipped = new Set(['dev-shared.ts'])

const references = {
  name: 'references',
  setup(context) {
    context.onResolve({ filter: /\.(jpe?g|png|webp|avif|gif|svg)$/ }, (args) => ({
      path: path.resolve(args.resolveDir, args.path),
      namespace: 'reference',
    }))
    context.onLoad({ filter: /.*/, namespace: 'reference' }, (args) => {
      const inIcons = !path.relative(iconsDir, args.path).startsWith('..')
      const value = inIcons
        ? { __icon: path.basename(args.path, '.svg') }
        : { __asset: path.relative(assetsDir, args.path).split(path.sep).join('/') }
      if (!inIcons && value.__asset.startsWith('..'))
        throw new Error(`Asset outside web/src/assets: ${args.path}`)
      return { contents: `export default ${JSON.stringify(value)}`, loader: 'js' }
    })
  },
}

await rm(tempDir, { recursive: true, force: true })
await mkdir(tempDir, { recursive: true })
await mkdir(outDir, { recursive: true })

const files = (await readdir(dataDir)).filter((file) => file.endsWith('.ts') && !skipped.has(file))

for (const file of files) {
  const name = file.slice(0, -'.ts'.length)
  const outfile = path.join(tempDir, `${name}.mjs`)
  await build({
    entryPoints: [path.join(dataDir, file)],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile,
    plugins: [references],
    logLevel: 'error',
  })
  const exported = await import(pathToFileURL(outfile).href)
  const data = Object.fromEntries(
    Object.entries(exported).filter(([, value]) => typeof value !== 'function'),
  )
  await writeFile(path.join(outDir, `${name}.json`), `${JSON.stringify(data, null, 2)}\n`)
}

await rm(tempDir, { recursive: true, force: true })
