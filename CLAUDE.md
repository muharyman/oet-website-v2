# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The Open Energy Transition (OET) website, being rebuilt from Figma. Read `AGENTS.md` first: it holds the current state, decisions, progress table and environment notes, and must be updated before ending a session.

| Folder | What |
| --- | --- |
| `web/` | Public site: Astro 7 (static output, Vercel adapter), Tailwind 4, TypeScript strict. No client framework |
| `cms/` | Directus 11.17.4 + Postgres in Docker (version provisional, see AGENTS.md licensing note). Data model, seed and migration scripts |
| `legacy/` | The previous Next.js + Payload app. Read-only reference and migration source; has its own `CLAUDE.md` |
| `docs/` | `redesign-plan.md`, `design-inventory.md`, `design-catalog/`, `component-library.md`, `directus-data-model.md` |

## Code rules

- Do not write comments in code. This includes explanatory comments, JSDoc, and commented-out code.
- Do not write fallbacks. No default values, `|| ''` / `?? x` substitutes, silent `catch` blocks, or alternate code paths that paper over missing or invalid data — let it fail visibly.
- No `any`, no `@ts-ignore`.
- Plan before large work and get approval; audit the Figma nodes (`get_design_context`) for a component before building it.

## Commands

```bash
# cms/ — Directus at http://localhost:8055 (admin credentials in cms/.env)
docker compose up -d
docker compose down
node scripts/apply-model.mjs      # create missing collections/fields from scripts/model.mjs, rewrite schema.yaml
node scripts/smoke.mjs            # write/read check of translations and relations

# web/ — pnpm 11
pnpm install
pnpm astro dev --background     # dev server at http://localhost:4321; `astro dev stop|status|logs`
pnpm build                      # static build into dist/ and .vercel/output
pnpm check                      # astro check (types)
pnpm format                     # prettier with astro + tailwind plugins
```

pnpm 11 rejects packages published in the last 24 hours (`minimumReleaseAge`). Pin to the previous version instead of bypassing the policy. Build scripts are allowed per package in `web/pnpm-workspace.yaml`.

## Architecture

- **Content flow:** Directus (REST) → `web/src/lib/cms.ts` typed client → pages and block components. Components receive resolved data as props and never fetch.
- **Design tokens:** `web/src/styles/global.css` `@theme` block (colours `brand-*`, `neutral-*`; type scale `text-display-1…5`, `text-heading-1…4`, `text-body-2xl…2xs`; radii; `max-w-page`, `px-gutter`, `lg:px-gutter-lg`). Tailwind's default colour, text and radius scales are reset, so only design tokens exist.
- **Components:** `web/src/components/{ui,layout,blocks,cards,interactive}` as specified in `docs/component-library.md`. Interactivity is a scoped `<script>` (custom element) per component.
- **i18n:** Astro i18n routing (`web/src/i18n/config.ts`), English default and only locale at launch; Directus translations tables per collection. Missing translations show English.
- **Design source:** Figma file `r1JkQxEVEQ86vGHZ2X2OE7` via the Figma MCP; node ids for every page and component are in `docs/design-inventory.md`.
