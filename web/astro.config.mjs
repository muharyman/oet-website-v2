// @ts-check
import { defineConfig, envField } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import vercel from '@astrojs/vercel'
import sitemap from '@astrojs/sitemap'
import { pruneUnusedAssets } from './scripts/prune-unused-assets.mjs'

export default defineConfig({
  site: 'https://www.openenergytransition.org',
  adapter: vercel(),
  integrations: [sitemap(), pruneUnusedAssets()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  env: {
    schema: {
      DIRECTUS_URL: envField.string({ context: 'server', access: 'public' }),
      DIRECTUS_TOKEN: envField.string({ context: 'server', access: 'secret' }),
    },
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
