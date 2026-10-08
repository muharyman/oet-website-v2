# OET website redesign — plan

Status: **draft v3, decisions recorded; design audit in progress; awaiting go-ahead**. Written 2026-10-08.

Stack decided by the user on 2026-10-08: **Astro** frontend, **Tailwind 4**, **Directus** as a separate CMS app, **multi-language** content. This replaces the current Next.js + Payload app. No implementation starts until the open questions in section 10 are answered and the plan is approved.

## 1. Goals

1. Implement the new design from Figma.
2. Raise the Lighthouse performance score.
3. Clean code, pixel-accurate to Figma.
4. Multi-language site.

## 2. Design scope

Figma file `r1JkQxEVEQ86vGHZ2X2OE7` has one page, "Handoff: Home Page".

| Part | Desktop node (1440) | Mobile node (412) |
| --- | --- | --- |
| Header / top nav, dropdowns, Services mega menu, language switcher | `162:1326`, states `162:1708`, `249:30122` | `196:2374`, menu states `196:4655`, `196:6506`, `196:6578` |
| Hero carousel (3 audience slides) | `227:19985`, states `162:1395` | `196:2328` |
| "How We Help" vision + image + 6 stats | `163:10304`, `163:10319`, `163:10332` | `196:2435` |
| Services accordion (6 items, image per item) | `162:1211`, `173:13195`, states `173:12612` | `196:2466`, `196:2580` |
| Tools support + 8 logos | `162:1274`, `162:1286` | `196:2471`, `196:2487`, `196:2693` |
| "Build, Deploy, Scale" vertical carousel | `188:1240`, states `188:1235` | `196:3238` |
| Partners / networks logo grid | `162:1100`, `643:4619`–`643:4996` | `196:3353`, `196:3653`–`196:4402` |
| Projects carousel | `643:4383` | `196:4507` |
| Footer with CTA | `643:4463`, art `196:1406` | `645:3097` |

Designed: home page, header, footer. Every other page type (about and other CMS pages, projects, posts, events, departments, categories, search) has no new design yet.

## 3. Tech stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Frontend | **Astro** (latest stable, pinned at scaffold), TypeScript strict | HTML + CSS by default, no client framework |
| Styling | **Tailwind 4** via `@tailwindcss/vite`, tokens in CSS `@theme` | Figma variables become CSS custom properties |
| Interactivity | Plain TypeScript in Astro `<script>` tags | Menus, accordion, carousels; an island framework only if something genuinely needs it |
| CMS | **Directus 11** (Node app + Postgres), run from Docker | Admin app, REST/GraphQL API, roles, flows, file storage |
| Data access | `@directus/sdk` with a typed schema generated from the Directus instance | |
| i18n | Directus translations (a `languages` collection + `<collection>_translations`) and Astro i18n routing | See section 5 |
| Images | Directus asset transforms (`/assets/:id?width=&format=avif`) through a small `<CmsImage>` component that emits `srcset`/`sizes`; local decorative art through `astro:assets` | |
| Fonts | Plus Jakarta Sans 400/500/600, self-hosted, `font-display: swap`, two weights preloaded | Check glyph coverage for the chosen languages |
| Search | Pagefind (static index built at deploy, per language) | Replaces Payload's search plugin; no server needed |
| Tests | Vitest for utilities; Playwright for e2e and screenshot comparison | |
| Hosting | Astro on Vercel; Directus on a container host or Directus Cloud; Postgres; S3-compatible file storage | Directus is a long-running server and does not run on Vercel functions — see question 2 |

Licence note: Directus is under BSL 1.1 — free to self-host for organisations under USD 5M in total finances, otherwise a licence is needed. Worth confirming for OET before committing.

## 4. Architecture

### 4.1 Repository layout (recommended: one repo)

```
web/        Astro app
cms/        Directus: docker-compose.yml, schema snapshot (schema.yaml), extensions/, seed + migration scripts
legacy/     the current Next + Payload app, moved here unchanged, read-only until content is migrated, then deleted
docs/
```

The Directus data model is kept in version control as a schema snapshot (`directus schema snapshot` / `schema apply`), so model changes are reviewed in PRs and applied to production deterministically, the same role Payload migrations play today.

### 4.2 Data model in Directus

- **Pages with a block builder:** `pages` has a many-to-any `blocks` field pointing at one collection per block type (`block_hero`, `block_vision`, `block_services`, `block_tools`, `block_process`, `block_partners`, `block_projects`, …). This is Directus's standard page-builder pattern and maps one-to-one to Astro components.
- **Content collections:** `posts`, `projects`, `events`, `event_categories`, `team_members`, `staff_categories`, `departments`, `partners`, `tools` (today's `models`), `outputs`, `testimonials`, `jobs`, `categories`, `redirects`, `form_submissions`.
- **Singletons:** `header`, `footer`, `site_settings` (SEO defaults, event CTA).
- **Status and publishing:** `status` field (draft/published) with role-based read permissions for the public role; scheduled publishing through a Directus Flow; content versioning for drafts of published items.
- **Required fields** wherever the design depends on the data, so missing content fails in the admin, not on the site.

### 4.3 How the web app gets content

- `web/src/lib/cms.ts`: typed Directus client and a few query functions (`getPage(slug, locale)`, `getGlobal(name, locale)`, …). Errors throw; no silent fallbacks.
- `web/src/blocks/<Name>.astro` per block collection; `RenderBlocks.astro` switches on the block collection name. An unknown block is a build error.
- **Preview:** Directus's built-in live preview pane (and Visual Editor) points at a server-rendered `/preview` route in the web app that reads with a preview token. This restores edit-and-see preview without React.

### 4.4 Rendering and freshness (recommended: prerender + on-demand ISR)

Pages are prerendered and edge-cached on Vercel. A Directus Flow fires on create/update/delete and calls the web app's revalidation endpoint with a shared secret, so a publish is live within seconds. Alternative: fully static + deploy hook on publish (simpler; each edit waits for a full build).

### 4.5 Replacing what Payload and Next do today

| Today | Replacement |
| --- | --- |
| Lexical rich text with embedded blocks | Directus WYSIWYG (HTML) for prose; embedded blocks become page-builder blocks. Existing Lexical content is converted to HTML during migration |
| Form builder plugin | `forms` + `form_submissions` collections, public create permission, Flow for notification email; plain HTML form with a small submit script |
| Redirects plugin | `redirects` collection read by Astro middleware (cached) |
| SEO plugin | SEO field group on each routed collection (translated), `<Seo>` component |
| Search plugin | Pagefind |
| Nested categories | Self-referencing relation on `categories` |
| Drafts, versions, scheduled publish | Directus status + content versioning + Flow |
| Sitemap / robots | `@astrojs/sitemap` with per-locale alternates |
| Klaro consent + GTM | Same behaviour: GTM only after consent; Klaro deferred |
| Greenhouse jobs proxy | Astro server endpoint |
| Weekly external link scanner | Scheduled Directus Flow or a small cron script writing to a `link_scan_runs` collection |
| Nightly Postgres backup workflow | Re-pointed at the Directus database |
| Dark mode | Not in the new design — see question 7 |

## 5. Multi-language

- **Content:** every translatable collection gets a `translations` relation (`<collection>_translations` with `languages_code`); structural fields (images, relations, dates, ordering) stay on the parent. Editors translate side by side in the Directus translations interface. Slugs are translated per language.
- **UI strings** (button labels not tied to content, aria labels, "Next", form messages): a `ui_strings` collection or typed JSON dictionaries in `web/src/i18n/`.
- **Routing:** Astro i18n with the default language at the root and others prefixed (`/de/...`). `hreflang` alternates and a per-locale sitemap. The language switcher in the header links to the same page in the other language.
- **Missing translations:** decided explicitly per question 5 — either the page does not exist in that language, or it shows the default-language content with a notice. Not a silent mix.
- **Dates and numbers:** formatted with `Intl` in the page's locale; event times keep the event's own timezone.
- **Search:** one Pagefind index per language.

## 6. Content migration (Payload → Directus)

1. Build the Directus data model.
2. Script (`cms/scripts/migrate-from-payload.ts`) reads from the live Payload REST API (or a database dump) and writes through the Directus SDK: media first (Vercel Blob → Directus files, keeping an old-URL → new-id map), then collections in dependency order, then pages.
3. Lexical JSON → HTML; embedded blocks split out into page-builder blocks where they exist.
4. Old home/page blocks that have no new design are migrated as-is into matching `block_*` collections only if those pages are being ported (see question 4).
5. Existing content lands as the default language; translations are added by editors afterwards.
6. Dry run locally, diff counts and spot-check pages, then run against production in a content freeze window.
7. URL parity check: every URL in today's sitemap resolves (directly or through a redirect) on the new site.

## 7. Performance plan

Target (mobile Lighthouse, home page, production): Performance ≥ 95, LCP < 2.0 s, CLS < 0.05, TBT < 100 ms. Baseline of the current site measured in Phase 1.

| Lever | Action |
| --- | --- |
| JavaScript | None by default; first-party JS on the home page budgeted under 15 kB gzip |
| LCP | First hero slide in the HTML; image preloaded with `fetchpriority="high"` and exact `sizes`; other slides lazy |
| Fonts | One family, two preloaded weights, self-hosted |
| Images | AVIF/WebP via Directus transforms behind a CDN, real `sizes`, lazy below the fold, fixed boxes |
| CSS | One small Tailwind 4 stylesheet; decorative glows as gradients |
| Third parties | GTM behind consent; Klaro deferred |
| Caching | Edge-cached prerendered HTML with on-demand invalidation |

## 8. Quality process

- **Pixel accuracy:** Playwright full-page screenshots at 1440 and 412 against Figma exports, section by section, including menu, accordion and carousel states.
- **Seed:** a Directus seed script recreates the Figma home content locally.
- **Checks per phase:** `astro check`, ESLint, Prettier (`prettier-plugin-astro`), Vitest, production build.
- **Accessibility:** keyboard, focus, alt text, reduced motion, `lang` attributes per locale.
- **Code rules:** no comments, no fallbacks, no `any`, no `@ts-ignore`.
- **Context:** `AGENTS.md` holds tokens, decisions and progress; updated every session.

## 9. Phases

| Phase | Work | Output |
| --- | --- | --- |
| 0. Decisions | Answers to section 10; plan approved | Approved plan |
| 1. Baseline | Lighthouse of the current production home page | Numbers in `AGENTS.md` |
| 2. Restructure | Move the current app to `legacy/` unchanged; scaffold `cms/` (Directus + Postgres in Docker) and `web/` (Astro + Tailwind 4 + tokens + fonts + base layout + i18n routing) | Both apps run locally |
| 3. Data model | Directus collections, translations, roles/permissions, schema snapshot committed; typed SDK schema | Reviewed data model |
| 4. Seed | Figma home content (default language) seeded into Directus | Seeded local CMS |
| 5. Header + footer | Astro components, mega menu, mobile menu, language switcher | Match Figma at 1440/412 incl. states |
| 6. Hero + six home blocks | Top to bottom | Each matches Figma |
| 7. Site plumbing | SEO, sitemap + hreflang, redirects, preview, revalidation Flow, consent + GTM, search | Home route feature-complete |
| 8. Remaining routes | Per question 4: port the other page types | Route parity |
| 9. Content migration | Migration script, dry runs, URL parity check | Production content in Directus |
| 10. Performance pass | Lighthouse runs, budgets, fixes | Targets met or gaps explained |
| 11. Launch | Hosting for Directus, DNS cutover, content freeze + final migration, legacy app retired | Live |

## 10. Decisions (user, 2026-10-08)

| Topic | Decision |
| --- | --- |
| Languages | English is the default and the only language at launch. The multi-language structure (translations tables, locale routing, switcher) is built from the start so languages can be added without rework |
| Directus hosting | Self-hosted in Docker. Host and file storage not chosen yet; local development uses a Docker volume |
| Existing content | Migrate everything from Payload |
| Starting data | Development starts from an empty Directus. No production dump is provided |
| Migration source | The live site's public REST API is readable without credentials (checked 2026-10-08: 11 pages, 19 posts, 32 projects, 4 events, 25 partners, 52 team members, 354 media). Drafts and unpublished content are not visible there and would need an admin login or a dump |
| Licence | OET is a non-profit. Directus's free self-hosting threshold is based on total finances, not legal form; confirm OET is under it before launch |
| Repo | One repo: `web/`, `cms/`, `legacy/` |
| Freshness | Prerender + on-demand invalidation |
| Dark mode | Figma has no dark variant; the theme switcher is dropped |

## 11. Baseline (current production home page)

Lighthouse 12, single run from a developer machine on 2026-10-08 against https://www.openenergytransition.org/ — indicative, not an average.

| | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT | Page weight |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile | 31 | 93 | 100 | 75 | 22.3 s | 0.897 | 30 ms | 2.3 MB |
| Desktop | 20 | 93 | 100 | 75 | 8.3 s | 0.699 | 320 ms | 8.0 MB |

Layout shift and LCP are the dominant problems, not script execution.

## 12. Scope correction and later decisions (2026-10-08)

- **All pages are designed.** The Figma file has eight handoff pages, not one (the first page listing was incomplete): Home, Outputs (success stories, publications, detail pages), About and Department, Partners/Team/Career, Theory of Change, News and Events, Tools and Data, Services (list and six detail pages), each with desktop and mobile frames. Section 2 above lists only the home page; the full inventory is in `docs/design-inventory.md`. Every page is built new from Figma — no old styling is ported.
- **Audit before building** (user instruction): all components, tokens and page sections are catalogued across the whole file first, so the component library and the Directus data model are designed once. Phase order changes to: audit → component library and data model plan → restructure → build.
- **Missing translations:** show the English content (user decision).

## 13. Still open

1. **Directus host and file storage** for production.
2. Designer questions that come out of the audit (section 6 of `docs/design-inventory.md`).
