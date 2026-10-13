# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Open Energy Transition (OET) website, being rebuilt from Figma. Read `AGENTS.md` first: it holds the current state, decisions, progress table and environment notes, and must be updated before ending a session.

| Folder | What |
| --- | --- |
| `web/` | Public site: Astro 7 (static output, Vercel adapter), Tailwind 4, TypeScript strict. No client framework |
| `cms/` | Payload 3.90 on Next 16 + Postgres 16 in Docker. Admin panel and REST API only; data model, seed and migrations |
| `legacy/` | The previous Next.js + Payload app. Read-only reference and migration source; has its own `CLAUDE.md` |
| `docs/` | `redesign-plan.md`, `design-inventory.md`, `design-catalog/`, `component-library.md`, `payload-data-model.md`, `cms-brief.md` |

## Code rules

- Do not write comments in code. This includes explanatory comments, JSDoc, and commented-out code.
- Do not write fallbacks. No default values, `|| ''` / `?? x` substitutes, silent `catch` blocks, or alternate code paths that paper over missing or invalid data — let it fail visibly.
- No `any`, no `@ts-ignore`.
- Plan before large work and get approval; audit the Figma nodes (`get_design_context`) for a component before building it.

## Commands

```bash
# cms/ — pnpm 11; admin at http://localhost:3000/admin (credentials in cms/.env)
docker compose up -d              # Postgres on port 5433
pnpm dev                          # Payload admin and REST API; pushes schema changes to the dev database
pnpm seed                         # idempotent seed of the Figma content; SEED_AREAS=core,site limits it
pnpm generate:types               # rewrite src/payload-types.ts and copy it to web/src/lib/payload-types.ts
pnpm migrate:create <name>        # migration from the schema diff; production runs `pnpm migrate`
pnpm check                        # tsc

# web/ — pnpm 11; needs the CMS running (PAYLOAD_URL in web/.env)
pnpm install
pnpm astro dev --background     # dev server at http://localhost:4321; `astro dev stop|status|logs`
pnpm build                      # static build into dist/ and .vercel/output
pnpm check                      # astro check (types); does not need the CMS
pnpm format                     # prettier with astro + tailwind plugins
```

pnpm 11 rejects packages published in the last 24 hours (`minimumReleaseAge`). Pin to the previous version instead of bypassing the policy. Build scripts are allowed per package in each `pnpm-workspace.yaml`.

## Architecture

- **Content flow:** Payload (REST) → `web/src/lib/cms.ts` typed client → loaders in `web/src/data/*.ts` that map documents to view models → pages and block components. Components receive resolved data as props and never fetch.
- **Media:** the `cms-media` integration (`web/scripts/cms-media.mjs`) downloads the CMS media into `web/src/assets/cms` before dev and build; `web/src/lib/media.ts` turns a media document into `ImageMetadata`, so images go through `astro:assets` like local files.
- **CMS model:** `cms/src/areas/<area>/` (site, outputs, catalog, events, organization) each export `collections`, `globals` and a `seed`. Field helpers in `cms/src/fields`, access rules in `cms/src/access`. Fixed-layout pages are globals; routed content uses drafts. See `docs/payload-data-model.md`; rules for changing it are in `docs/cms-brief.md`.
- **Design tokens:** `web/src/styles/global.css` `@theme` block (colours `brand-*`, `neutral-*`; type scale `text-display-1…5`, `text-heading-1…4`, `text-body-2xl…2xs`; radii; `max-w-page`, `px-gutter`, `lg:px-gutter-lg`). Tailwind's default colour, text and radius scales are reset, so only design tokens exist.
- **Components:** `web/src/components/{ui,layout,blocks,cards,interactive}` as specified in `docs/component-library.md`. Interactivity is a scoped `<script>` (custom element) per component.
- **i18n:** Astro i18n routing (`web/src/i18n/config.ts`), English default and only locale at launch; Payload field-level localisation with fallback to English.
- **Design source:** Figma file `r1JkQxEVEQ86vGHZ2X2OE7` via the Figma MCP; node ids for every page and component are in `docs/design-inventory.md`.
