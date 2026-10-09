# Repository Guidelines

Shared context for every agent working in this repository. Keep it current: before ending a session, record decisions, pitfalls and progress here, and keep `CLAUDE.md` consistent.

## Project

Rebuild of the Open Energy Transition website from Figma.

- Goals (user, 2026-10-08): (1) implement the new design, (2) higher Lighthouse performance score, (3) clean code that is pixel-accurate to Figma, (4) multi-language.
- Stack (user decisions, 2026-10-08): **Astro** frontend, **Tailwind 4**, **Directus** as a separate CMS app (self-hosted in Docker), English as default and only language at launch with the multi-language structure built in.
- Working agreement: plan before large work and wait for approval; audit all components and tokens before building; no code comments; no fallbacks.

## Structure

| Folder | What |
| --- | --- |
| `web/` | Astro 7.3.6, Tailwind 4.3, `@astrojs/vercel`, `@astrojs/sitemap`, `@directus/sdk`, TypeScript 7 strict, pnpm 11 |
| `cms/` | Directus **11.17.4** (see licensing note) + PostGIS 16 via `docker-compose.yml`; `scripts/` for data model, seed, migration; `extensions/` |
| `legacy/` | Previous Next.js 15 + Payload 3 app, moved with `git mv`, read-only. Reference and migration source |
| `docs/` | Plan, design inventory, design catalogue, component library spec, Directus data model |

## Documents

| File | Content |
| --- | --- |
| `docs/redesign-plan.md` | Stack, architecture, performance targets, phases, user decisions, baseline |
| `docs/design-inventory.md` | Figma pages, frame node ids, measured tokens, unified component list, content model, designer questions |
| `docs/design-catalog/*.md` | Section-by-section catalogue of every frame |
| `docs/component-library.md` | Component names, props, variants, JS budget, build order |
| `docs/directus-data-model.md` | Collections, fields, translations, roles, migration map |

## Commands

```bash
cd cms && docker compose up -d          # Directus at http://localhost:8055; admin login in cms/.env
cd web && pnpm install
cd web && pnpm astro dev --background   # http://localhost:4321; astro dev stop|status|logs
cd web && pnpm build && pnpm check && pnpm format
```

## Figma

File key `r1JkQxEVEQ86vGHZ2X2OE7`, Figma MCP registered for this project (`https://mcp.figma.com/mcp`).

- Eight "Handoff: …" pages are the source of truth; "Iteration", "Preview" and "Archieved" pages are not.
- `get_metadata` without a node id lists only the "Cover" page. List pages with a read-only `use_figma` script (`figma.root.children`).
- The file has no variables or local styles; tokens were measured from all nodes and are in `docs/design-inventory.md` section 3.
- Before building a component, run `get_design_context` on its desktop, mobile and state nodes and match exact values.

## Design system (in `web/src/styles/global.css`)

- Font: Plus Jakarta Sans Variable (self-hosted via Fontsource), weights 400–700, italic. Tracking -1% everywhere.
- Colours: `brand-50/200/300/400/500/600/700/800/900/950` (`brand-500` = `#e31937`), `neutral-50…950` (`neutral-50` = `#fffefb` page background, `neutral-800` = `#464544` body text).
- Type: `text-display-1…5` (72/56/48/44/36), `text-heading-1…4` (32/28/24/22), `text-body-2xl…2xs` (24/20/18/16/14/12/10). Line heights are the whole-pixel values Figma lays out (81/63/54/49/40, 36/31/27/25, 29/24/22/19/17/14/12), written as ratios (`calc(22 / 18)`). Do not add `leading-[..px]` to a token class; use `1lh` for "one line" gaps.
- Radius: `rounded-xs` 1, `rounded-sm` 4, `rounded-md` 8, `rounded-lg` 12, `rounded-full`. Buttons are square.
- Layout: `max-w-page` (1440), `px-gutter` (20) / `lg:px-gutter-lg` (80), inset 20 for full-bleed cards. Desktop layout from `lg`.
- Tailwind's default colours, text sizes and radii are reset; only these tokens exist.
- No dark mode.

## Current phase: static pages (user instruction, 2026-10-08)

"Finish all pages, static first, no CMS connection yet." Content lives in `web/src/data/*.ts` and is passed to components as props; interface strings live in `web/src/i18n/ui.ts`; Directus is wired in afterwards. Rules for every implementing agent are in `docs/build-brief.md`; agents write reports to `docs/reports/`.

- Wave A (**finished 2026-10-08**, reports in `docs/reports/home.md`, `shell.md`, `shared-parts.md`): **shell** (header, mobile menu, language switcher, footer, preloader), **shared-parts** (PageHero, CtaBanner, SectionHeading, ListingHeader, FilterTabs, FilterBar, SortControl, Pagination, RichText, StatItem, PersonRow, LinkListGroup), **home** (index page and its blocks, plus CardShell, ProjectCard, CardCarousel, LogoGrid, BrandImage, IntroStatement).
- Wave B (**finished 2026-10-08**, five parallel agents, reports to `docs/reports/{outputs,tools-news,services,organization,bespoke}.md`): outputs (success stories, publications, details), tools and data + news and events, services, organization (about, departments, partners, career), bespoke (team with globe, theory of change).
- Then: coordinator wires header/footer/preloader into `BaseLayout`, whole-site screenshot comparison, Lighthouse.
- Screenshots: `MSYS_NO_PATHCONV=1 node scripts/shoot.mjs /route name 1440 412` from `web/` (Git Bash rewrites a leading slash otherwise). Output in `web/.screenshots/`.
- The Astro background dev server dies when dependencies change; restart with `pnpm astro dev --background`.

## Home hero prototype (checked 2026-10-09)

The prototype on "Handoff: Home Page" is the motion spec; read it with a read-only `use_figma` script over `node.reactions` (`get_motion_context` needs a desktop selection and does not work remotely).

- Flow: `162:1389` (preloader, 1.5 s hold, dissolve 0.6 s) → `162:1330` (hero alone) → `162:686` (home page).
- Hero component set `162:1395`, variants `1a → 1b → 1c → 2a → 2b → 2c → 1a`; every step waits 0.8 s, then smart-animates with ease-out: 0.5 s for in and out, 5 s for the progress fill. The loop has two slides; `3c` exists but is not linked.
- In (`a → b`): title moves 40 px from the left and fades in; paragraph boxes, next label and progress bar (27 of 305 px) only fade in; the three-rectangle pattern moves 40 px and fades in.
- Out (`c → a` of the next slide): photo crossfades, title moves 40 px to the right and fades, boxes and label fade, bar shrinks and fades.
- `HomeHero.astro` follows these values (uncommitted): `--hero-delay` 0.8 s on load, 2.9 s on a first visit (preloader 2.1 s + 0.8 s), 1.3 s after a change; progress bar is a track span (`.bar`, fade and shrink by transition) with a fill span (`.bar-fill`, 7.1 s keyframes). Chromium does not start a transition on a property that an animation is still filling, which is why the two are separate elements.
- Pattern: the hero photos no longer contain the three rectangles. `hero-2.jpg` is the 2x export of variant `2a` (`162:1654`, pattern at opacity 0); `hero-1.jpg` and `hero-3.jpg` are the exports of `162:1397` and `179:885` with the rectangles painted out (column interpolation plus grain, there is no Figma state without them). `hero-pattern-N.png` is the cut-out of the graded rectangles; each slide has `pattern: { image, left, top }` in `data/home.ts`, drawn in a centred 1400 x 780 frame from `lg` only (on mobile the pattern is outside the crop). Exports at 2x: `download_assets` with `defaultScale: 2` on the variant's `img-filter` node; `get_screenshot` stays at 1x.
- Paragraph boxes share one border line as in Figma (`-mt-px`, padding 11 / 12 / 11): 523 + 63 and 585 + 101 on desktop, 508 + 65 and 572 + 105 at 412.
- Preloader follows the prototype on user request (2026-10-09): 1.5 s hold, 0.6 s fade, still CSS only. Not re-measured in Lighthouse.
- Not matched: variant `1a` has a greyer grade than `1b` (colour-grading opacity 0.44 → 0.9), so in the prototype photo 1 warms up as the text enters. `1a` shares the layer stack of the slide 2 variants, so this reads as a prototype artefact; reproducing it needs a second photo for slide 1. The preloader frame also has a slightly darker gradient at the bottom; ours is plain `brand-500`.

## Reconciliation backlog

Reconciliation pass done 2026-10-08; full record in `docs/reports/reconcile.md`.

Done:

- Page-level workarounds moved into components as typed props: `CardShell` / `ProjectCard` / `PublicationCard` (nine frame tones, `partnerTag` and `partnerLink`, reserved footer, fixed height, mobile frame; shared `CardBody`; `cardFrames.ts` deleted), one `CardCarousel` (`header`, `controls`, `gap`, `bleed`; `CardScroller` deleted), `IntroStatement variant`, `CtaBanner` tones and equal halves (634 / 634 as in Figma), `DetailHeader` light band, `FilterTabs`, `LogoGrid`, `PageHero` (fixed mobile height, `chipsBottomMobile`, `textLeft`), `RichText`, `SectionHeading`, `ListingHeader`, `ValueCard`. No child-selector or `!` overrides remain in pages.
- Header theme: `BaseLayout` takes `headerTheme` (page body, `dark` on real pages) and `initialHeaderTheme` (under the bar at the top). Coloured blocks set their own `data-header-theme`. The `IntersectionObserver` rootMargin error (viewport shorter than the bar) is fixed.
- Routes added: `/outputs/blogs`, `/outputs/policy-briefs`, `/outputs/reports` (shared `PublicationsPage` with a type), `/legal`, `/privacy-statement`, `/disclaimer` (`LegalPage`, **not designed**, placeholder text in `data/legal.ts`).
- UI strings: 104 keys in `web/src/i18n/ui.ts`, grouped helpers in `i18n/groups.ts`; components that only need interface strings take `locale`.
- Icons: two duplicate glyphs removed. Dead code removed. `/dev/shared` and `/dev/shell` exist only in dev (`pages/dev/[demo].astro`).
- Tooling: `web/scripts/snapshot-all.mjs`, `compare-snapshots.mjs`, `check-header-theme.mjs`. Baseline and final screenshots in `web/.screenshots/baseline` and `rc1`.

Fix pass done 2026-10-08 (`docs/reports/fixes.md`): whole-pixel line heights in the tokens, card border without layout space, partner tag sizes (`data/partnerTags.ts`), `PageHero` glow / mobile corners / `mobileAnchor` / title and eyebrow variants, detail header gradient, link list parts, list item spacing, `SectionHeading` mobile gaps, accordion image loading, header logo requests, carousel and filter accessibility, Hawaii on the globe, all data paths from `routes.ts`.

Remaining:

- Designer questions: one consolidated list of 28 in `docs/reports/fixes.md` (card link colour `#ee2042` at 4.23:1, footer link targets, transparent header over photos, contradictory frames, per-page gaps on service pages, missing designs).
- No Figma source: mobile crops of home hero slides 2 and 3; mobile illustrations for five of the six service CTA cards (`imageMobile: null`).
- About mobile LCP 2.26 s in simulation (target 2.0); home is at 1.98 s (single run).
- Publication detail desktop ends 18 px lower than Figma (service card text box); listing grids start 1 px right on desktop (guide line is a real border in the page).
- No publication has the type policy brief (`/outputs/policy-briefs` shows the empty state); the "Academic Publication" tab has no route of its own.
- Placeholder link targets: everything without a designed page points to `routes.contact` (tool links, job board, profiles, contact, request a demo, event links). Video id is a placeholder.
- Not checked: Firefox, Safari, keyboard-only, widths between 412 and 1440, screen reader. `handshake.svg` in the partners hero and one service value card was not compared with Figma (the home stat strip uses `heart-partner-handshake.svg`).
- Performance notes from `docs/reports/performance.md` that still hold: a font preload gave CLS 0 but coincided with 1–2 s first-paint stalls in mobile Lighthouse runs and was removed (re-test on the real host); the team page carries about 150 kB of inline card icons; `dist` is about 51 MB.
- Checking positions against Figma: `node scripts/check-sections.mjs [route part | width]` from `web/` compares heading positions of 50 frame / width pairs with `scripts/figma-headings.txt` (dev server must run). The read-only `use_figma` scripts worked in the fix pass; they are the fastest way to read exact node values.
- Measuring: `node scripts/serve-dist.mjs <folder> <port> <latency ms>` and `node scripts/lighthouse.mjs <origin> <label> <runs> [page…]` from `web/`. Measure on a quiet machine: other browsers running inflate TBT from 0 to 400–900 ms. Lazy images just below the fold count into Lighthouse's simulated LCP on a zero-latency local server.
- Invented content to replace: event times/types, sort options, globe pin countries, some link labels, legal page text.

Pitfalls found during the pass:

- Git Bash heredocs in this environment halve backslashes; write scripts with a file tool instead.
- `prettier --write .` used to rewrite `pnpm-lock.yaml`; it is now in `web/.prettierignore`. If it gets reformatted again, regenerate it in a scratch copy with `pnpm install --lockfile-only --force` and compare.
- `download_assets` renders a node with whatever is behind it and clipped by its ancestors; `get_screenshot` with `contentsOnly` gives a transparent background but only at 1x.
- A fresh `pnpm build` invalidates the dev server's image cache; the first screenshots afterwards can miss lazy images. Shoot twice before trusting a difference.
- `web/.screenshots/` already contains folders from earlier agents (`c`, `shell`, …); use new folder names.

## Decisions

- Fixed-layout pages are Directus singletons; a block-builder `pages` collection covers legal and free-form pages.
- Blog posts and outputs from the old site become `publications` with a `type`.
- Jobs stay sourced from Greenhouse, with a department mapping in Directus.
- External authors and contributors are free-text fields on the join rows.
- Project thumbnails are uploaded pre-composed (Thumbnail Maker Guide); only the partner-logo tag is overlaid in code.
- The red logo panel is a real preloader (user confirmed). It must not block rendering or delay LCP: CSS-only, no JavaScript gate.
- `TeamGlobe` is built after a technical spike; first version may be simplified if the designer has no further spec.
- Missing translations show the English content.
- Listings are prerendered; tab filters are links, combined filters and sort run client-side over a small JSON index.
- Old URLs get permanent redirects to the new structure.
- Items 4–9 of the data-model questions (jobs, publications, products filter, singletons, external people, URL structure) were not answered individually; the user approved the documents as a whole on 2026-10-08, so the recommended options above stand.

## Directus licensing (open decision, found 2026-10-08)

- Directus 12 (current major, 12.5.0) runs unlicensed on a "Core" tier that caps the project at **25 collections** (verified locally: the 26th `POST /collections` returned `LIMIT_EXCEEDED`); web sources also report 3 studio seats and 5 flows. The data model needs about 99 collections (content + translations + junctions).
- Directus offers a free "Open Innovation Grant" licence for organisations under USD 5M revenue and under 50 employees (figures from secondary web sources, not verified on directus.io); it requires registration and telemetry. OET's site lists 52 team members, so eligibility is uncertain.
- Local development is pinned to **11.17.4**, the last v11 release, which has no collection cap. This is provisional: v11 will stop receiving updates. The model script works against either version.
- The user must choose: apply for the grant and move to v12, buy a licence, stay on v11, or pick another CMS.

## Environment notes and pitfalls

- pnpm 11 enforces `minimumReleaseAge`: a package published within the last 24 hours fails install. Astro is pinned to 7.3.6 for that reason (7.3.7 was one day old). Pin the previous version; do not bypass the policy.
- `astro check` does not support TypeScript 7; `web` uses TypeScript 5.9.
- `sharp` must be a dependency of `web` for `astro build` image optimisation.
- Photo grading in Figma uses blend modes CSS cannot reproduce; hero and home photos are flattened exports with grading baked in (`web/src/assets/heroes`, `web/src/assets/home`). CMS photos will need pre-graded uploads or a build-time grading step.
- pnpm 11 blocks dependency build scripts unless listed under `allowBuilds` in `web/pnpm-workspace.yaml` (esbuild, sharp).
- The Directus bootstrap rejects admin emails on `.local`; `cms/.env` uses `admin@example.com`.
- Windows: a running dev server holds directory handles. A leftover `next dev` blocked `git mv src` during the restructure; stop dev servers before moving folders.
- Windows Git Bash: backticks inside `node -e "…"` are executed by the shell. Write scripts to files instead.
- The working tree uses CRLF (`core.autocrlf=true`).
- The legacy app's public REST API on the live site is readable without credentials (published content only); it is the migration source.
- Committed and pushed on 2026-10-08 at the user's request (see "Session end state").
- The legacy Vercel deployment builds from the repository root; this branch cannot be deployed as the old app any more.

## Baseline (live production home, single Lighthouse run, 2026-10-08)

| | Performance | LCP | CLS | TBT | Weight |
| --- | --- | --- | --- | --- | --- |
| Mobile | 31 | 22.3 s | 0.897 | 30 ms | 2.3 MB |
| Desktop | 20 | 8.3 s | 0.699 | 320 ms | 8.0 MB |

Target for the new site: mobile performance ≥ 95, LCP < 2.0 s, CLS < 0.05, TBT < 100 ms.

## Progress

| Area | Status |
| --- | --- |
| Design audit, plan, component spec, data model spec | Done and approved by the user 2026-10-08 |
| Restructure: old app in `legacy/` | Done 2026-10-08 (staged, uncommitted) |
| `cms/`: Directus running locally (11.17.4, provisional), admin login verified | Done 2026-10-08 |
| `web/`: Astro + Tailwind 4 scaffold, tokens, fonts, base layout, i18n config; production build passes | Done 2026-10-08 |
| Directus data model: `cms/scripts/model.mjs` (declarative) applied by `cms/scripts/apply-model.mjs`; snapshot in `cms/schema.yaml`; `cms/scripts/smoke.mjs` passes. Covers taxonomies, partners, team, departments, tools, services, projects, publications, events, CTA banners, header, footer, settings, home page | Done 2026-10-08 |
| Data model still to add when their pages are built: other page singletons (about, team, career, partners, theory of change, listings), `pages` + blocks, roles/permissions, web build token, flows | Not started |
| Typed CMS client (`web/src/lib/cms.ts`) | Not started |
| Seed with Figma content | Not started |
| Foundation primitives: `Button`, `Tag`, icons as SVG components, `i18n/ui.ts`, Playwright screenshot script | Done 2026-10-08; check page matched Figma |
| Shell: header, mobile menu, footer, preloader; wired into `BaseLayout` (pages pass `headerTheme`) | Done 2026-10-08 |
| Shared page parts (PageHero and 13 others; Button/Tag sizes corrected to Figma) | Done 2026-10-08 |
| Home page (heights within 7px desktop / 15px mobile of Figma; 2.2 kB JS) | Done 2026-10-08; open differences listed in `docs/reports/home.md` |
| Integration after wave A: `astro check` 0 errors, production build passes, `web/src/data/routes.ts` is the single source of link targets | Done 2026-10-08 |
| Other pages: outputs, tools and data, news and events, services, organization, team (with globe), theory of change (scroll scene) | Built 2026-10-08, static. 53 routes; `astro check` 0 errors; build passes; route sweep (`web/scripts/sweep.mjs`) shows no console errors |
| First Lighthouse of the new home (local static build, single run, 2026-10-08) | Mobile: performance 81, LCP 4.7 s, CLS 0, TBT 0 ms, 964 KiB; accessibility 89; SEO 100. Desktop: performance 99, LCP 0.9 s. Mobile LCP and accessibility are below target |
| Performance pass (`docs/reports/performance.md`; local static server, median of three, 2026-10-08) | Home mobile: performance 97, LCP 2.56 s (1.68 s with 40 ms latency), CLS 0, TBT 0 ms, Speed Index 1.56 s, 573 KiB; desktop 100, LCP 0.55 s. Eleven other templates: mobile 99–100, LCP 1.44–2.26 s, CLS ≤ 0.038, TBT ≤ 3 ms; desktop 100. Accessibility 89–96 unchanged. LCP on home and About and accessibility are below target |
| Reconciliation after wave B (`docs/reports/reconcile.md`) | Done 2026-10-08. 56 production routes; `astro check` 0 errors; build passes; sweep: no broken links, no console errors; snapshot comparison against the pre-pass baseline recorded per route. Remaining items in "Reconciliation backlog" |
| Fix pass over the verification and performance findings (`docs/reports/fixes.md`) | Done 2026-10-08. `astro check` 0 errors; build passes (56 pages); sweep clean. About, department pages, partners, career, team and theory of change equal Figma in height and heading positions at both widths (±1 px; Modeling Tools mobile −5). Home mobile (single Lighthouse run): performance 99, LCP 1.98 s, 307 KiB, accessibility 93; About: 99, LCP 2.26 s, accessibility 92 |
| Screenshot tooling in `web/scripts/shoot.mjs` | Done 2026-10-08 |
| Content migration from the live site | Not started |
| Production hosting for Directus and file storage | Undecided |

## Session end state (2026-10-08)

- All static pages are built: 56 routes. Last verification: `pnpm check` 0 errors, `pnpm build` passes, `node scripts/sweep.mjs` clean.
- The cross-browser, intermediate-width and keyboard pass was started and **stopped by the user before it finished**; it left no report. It had installed nothing in `package.json`; any edits it made are in the committed tree and passed the checks above, but its intended additions (skip link, one shared focus style, `web/scripts/keyboard-check.mjs`, Firefox/WebKit comparison, no-JavaScript mobile navigation, print check) are **not done**. Everything so far is verified in Chromium at 1440 and 412 only.
- Commit preference (user): small Conventional Commits with a context body. The work was committed and pushed to `origin/oet-website-v3` on 2026-10-08; commits are split by area and are not individually buildable, because components were built in parallel.
- Next steps: redo the cross-browser/keyboard pass; hand the 28 designer questions at the end of `docs/reports/fixes.md` to the designer; decide the Directus licence; connect pages to Directus; replace placeholder links and invented content.

## Open questions for the designer

The list to hand to the designer is in `docs/reports/fixes.md` ("Open questions for the designer", 28 questions with node ids). `docs/design-inventory.md` section 6 is the earlier, shorter list.
