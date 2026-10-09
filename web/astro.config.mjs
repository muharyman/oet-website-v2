// @ts-check
import { defineConfig } from 'astro/config'
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
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
