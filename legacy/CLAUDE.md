# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Open Energy Transition (OET) website: Payload CMS 3 and a Next.js 15 App Router frontend in a single app, forked from Payload's `with-vercel-website` template. Deployed on Vercel with Neon Postgres and Vercel Blob. Much of `README.md` is still the upstream template text; the code is the source of truth.

## Status

This folder is the previous Next.js + Payload app, kept read-only as the reference and migration source for the rebuild in `../web` and `../cms`. Do not develop here. See `../AGENTS.md`.

## Code rules

- Do not write comments in code. This includes explanatory comments, JSDoc, and commented-out code.
- Do not write fallbacks. No default values, `|| ''` / `?? x` substitutes, silent `catch` blocks, or alternate code paths that paper over missing or invalid data — let it fail visibly.

## Commands

Use **pnpm** (`packageManager` is pinned; the `package-lock.json` and `yarn.lock` in the repo are stale).

```bash
pnpm dev                    # Next dev server + Payload admin at http://localhost:3000 (/admin)
pnpm build                  # next build, then next-sitemap via postbuild
pnpm lint                   # next lint (lint:fix to autofix)
pnpm exec tsc --noEmit      # typecheck (no script for it)

pnpm generate:types         # regenerate src/payload-types.ts after any collection/global/block schema change
pnpm generate:importmap     # regenerate src/app/(payload)/admin/importMap.js after adding/moving admin components

pnpm migrate:create         # create a migration from the current schema diff
pnpm payload migrate        # apply pending migrations
pnpm ci                     # what Vercel runs: payload migrate && pnpm build
```

Tests:

```bash
pnpm test:int                                   # Vitest (jsdom), tests/int/**/*.int.spec.ts
pnpm exec vitest run tests/int/gtm.int.spec.ts  # single file
pnpm exec vitest run -t "injects GTM script"    # single test by name
pnpm test:e2e                                   # Playwright (chromium), tests/e2e; starts/reuses pnpm dev on :3000
pnpm exec playwright test -g "homepage"         # single e2e test
```

`tests/int/api.int.spec.ts` boots Payload against the real `POSTGRES_URL`, so it needs a reachable database.

Local env: copy `.env.example` to `.env`. `docker-compose up` provides a local Postgres (see README for the `POSTGRES_URL` to use with it). `BLOB_READ_WRITE_TOKEN` is needed for media uploads.

## Architecture

### Layout

- `src/payload.config.ts` — registers all collections, globals (`Header`, `Footer`, `EventCta`), plugins, and custom admin components.
- `src/app/(payload)/` — Payload admin + REST/GraphQL routes (generated; rarely edited).
- `src/app/(frontend)/` — the public site. Server components query Payload directly through the Local API (`getPayload({ config: configPromise })`), not over HTTP.
- `src/app/api/` — custom routes: `scan-links` (cron) and `proxy/*` (Greenhouse jobs, staff categories) for client-side fetches.
- `src/collections/`, `src/blocks/`, `src/heros/`, `src/fields/` — CMS schema and its matching React renderers.
- `src/Header`, `src/Footer`, `src/EventCta` — globals, each with `config.ts`, a revalidate hook, and (for header/footer) the component.

Path aliases: `@/*` → `src/*`, `@payload-config` → `src/payload.config.ts`.

### Blocks (the layout builder)

Pages are composed from blocks. Each block lives in `src/blocks/<Name>/` with `config.ts` (Payload schema) and `Component.tsx` (renderer). Blocks that need interactivity split into an async server `Component.tsx` that fetches data and a `ClientComponent.tsx` / `Component.client.tsx` that receives it as props.

Adding a block touches several places — missing one fails silently (the block just doesn't render or isn't selectable):

1. `src/blocks/<Name>/config.ts` and `Component.tsx`
2. the `layout` blocks array in `src/collections/Pages/index.ts` (and `TabsBlock` config if it should be nestable in tabs)
3. the `blockComponents` map in `src/blocks/RenderBlocks.tsx`, keyed by the block's `slug`. `RenderBlocks` also decides per-block wrapper padding (`py-16` by default; some blocks opt out in the `switch`).
4. if it should be insertable inside rich text: `BlocksFeature` in `src/utilities/getLexicalFeatures.ts` **and** the `blocks` converter map in `src/components/RichText/index.tsx`
5. `pnpm generate:types`, then `pnpm migrate:create`

`src/app/(frontend)/[slug]/page.tsx` post-processes the layout (`injectTeamMembers`) to attach `team-members` / `jobs` docs to those blocks when nested in a `tabs` block, and uses `revalidate = 60` so those lists refresh without republishing the page.

### Collections and routes

Content collections with detail pages (`pages`, `posts`, `projects`, `events`) follow the same shape: drafts/versions enabled, `authenticatedOrPublished` read access, `slugField()`, an `afterChange`/`afterDelete` revalidate hook in `hooks/`, and a `(frontend)/<collection>/[slug]/page.tsx` that uses `generateStaticParams` plus a `cache()`-wrapped query honoring `draftMode()`.

When adding a collection with a public route, also add it to `collectionPrefixMap` in `src/utilities/generatePreviewPath.ts` (draft/live preview) and consider `PUBLIC_COLLECTIONS` in `src/utilities/linkScanner.ts`.

Slug gotcha: the `StaffCategories` collection's slug is `staff`, not `staff-categories`.

Jobs listings come from the Greenhouse board API through `/api/proxy/greenhouse-jobs` (never cached), alongside the `jobs` collection.

### Caching and revalidation

The frontend is statically generated. Freshness depends on hooks calling `revalidatePath` / `revalidateTag` — a new collection or global that affects rendered pages needs its own hook. Globals are read through `getCachedGlobal` (`src/utilities/getGlobals.ts`), tagged `global_<slug>`. Hooks skip revalidation when `req.context.disableRevalidate` is set (used by seeding).

### Events

Whether an event is "upcoming" or a "highlight" is derived from `startDate` vs. now, not stored; highlights additionally require `featuredAsHighlight`. This drives both the admin field conditions (`isUpcoming` in `src/collections/Events/index.ts`) and the queries in `EventTabsBlock`. Detail pages format dates in the event's own timezone, resolved from the free-text `timezoneLabel` (`ZONE_BY_LABEL` in `events/[slug]/EventDetail.tsx`, defaulting to `Europe/Berlin`) — don't format event dates with the server/browser locale.

### Database and migrations

Postgres via `@payloadcms/db-vercel-postgres`. In dev the adapter pushes schema changes automatically; production only gets them through migrations, since the Vercel build runs `payload migrate`. Any schema change (including block fields) therefore needs a committed migration in `src/migrations/` (the `.ts`, the `.json` snapshot, and the `index.ts` entry — all generated by `pnpm migrate:create`). Don't point a local dev server at the production database: push mode will alter it and desync migrations.

### Cron

`vercel.json` schedules `/api/scan-links` (weekly; checks external links across public collections and records to `link-scan-runs`) and `/api/payload-jobs/run` (daily; scheduled publish). Both authenticate with `Authorization: Bearer $CRON_SECRET`.

### Consent and analytics

Klaro (npm package, no CDN) is initialised by `src/components/KlaroInit.tsx` only when `NEXT_PUBLIC_GOOGLE_TAG_ID` is set. GTM must only be injected after consent — `src/lib/gtm.ts` does this and is covered by `tests/int/gtm.int.spec.ts`. Set `NEXT_PUBLIC_KLARO_DEBUG=true` for lifecycle logs.

### Styling

Tailwind 3 with shadcn/ui primitives in `src/components/ui`. Dark mode is selector-based (`[data-theme="dark"]`), with extra overrides in `src/app/(frontend)/dark-mode.css`. Column/grid classes built dynamically from CMS values must be in the `safelist` in `tailwind.config.mjs`. Prettier: no semicolons, single quotes, 100-column width.

### Generated files (don't hand-edit)

`src/payload-types.ts`, `src/app/(payload)/admin/importMap.js`, `src/migrations/*.json`.
