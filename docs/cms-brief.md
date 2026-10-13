# CMS brief — Payload data model, seed and wiring

Rules for every agent working on the Payload CMS in `cms/` or connecting pages in `web/` to it. Read `CLAUDE.md` and `AGENTS.md` first.

## What exists

- `cms/` is Payload 3.90 on Next 16 with Postgres 16 (`docker compose up -d`, port 5433). It serves the admin panel and the REST API only.
- `cms/src/payload.config.ts` registers collections and globals per area from `cms/src/areas/<area>/index.ts` (`collections`, `globals` arrays). Do not edit the config.
- `cms/src/fields/index.ts` has the field helpers. Use them instead of writing the same shape again:
  `text`, `plainText`, `textarea`, `slug`, `href`, `link`, `links`, `image`, `icon`, `select`, `paragraphs`, `richText` (returns two fields, spread it), `seo`.
- `cms/src/access/index.ts`: `publicRead` (collections anyone may read), `publishedRead` (collections with drafts), `globalRead` (globals).
- `cms/seed/content/*.json` is the seed source: every `web/src/data/*.ts` module exported as JSON. Image imports became `{ "__asset": "home/hero-1.jpg" }` (path under `web/src/assets`), icon imports became `{ "__icon": "world" }` (file name in `web/src/icons`).
- `cms/src/seed/lib.ts`: `content(name)`, `upload(payload, asset, alt)`, `upsert(payload, collection, where, data)`, `findId(payload, collection, where)`, `lexical(payload, html)`, `rows(strings)`.
- `cms/src/seed/index.ts` runs `seed(payload)` of each area in this order: core, organization, catalog, events, outputs, site. `SEED_AREAS=core,organization` limits a run.
- `web/src/lib/cms.ts` (`findAll`, `findGlobal`, `resolved`, `required`, `texts`) and `web/src/lib/media.ts` (`image`, `optionalImage`, `altOf`, `icon`) are the only way pages read the CMS.

## Slugs (fixed, use exactly these)

| Area | Collections | Globals |
| --- | --- | --- |
| organization | `team-members`, `departments`, `countries`, `partners`, `jobs` | `about-page`, `departments-page`, `team-page`, `partners-page`, `career-page`, `theory-of-change-page` |
| catalog | `tools`, `tool-categories`, `services`, `cta-banners` | `tools-page`, `services-page` |
| events | `events`, `event-types`, `pages`, `redirects`, `form-submissions` | `news-events-page` |
| outputs | `projects`, `publications`, `testimonials`, `regions`, `tags`, `publication-categories` | `success-stories-page`, `publications-page` |
| site | — | `site-settings`, `site-header`, `site-footer`, `home-page` |
| core | `media`, `users` | — |

## Hard rules

- NO comments in code of any kind. NO fallbacks (`??`, `||` defaults, optional chaining that swallows missing data, silent `catch`). No `any`, no `@ts-ignore`, no dead code.
- Stay inside your area: `cms/src/areas/<area>/**` and, for wiring, the `web` files listed in your task. Never edit `payload.config.ts`, `cms/src/fields`, `cms/src/access`, `cms/src/seed`, `cms/src/collections`, another area's files, `package.json`, `AGENTS.md` or `CLAUDE.md`. If a shared helper is missing, write it inside your area and list it in your report.
- No new dependencies. No `pnpm add` / `pnpm install`.
- No git commands that change state (no add, commit, checkout, stash, reset).
- Write files with the file tools, not shell heredocs (Git Bash halves backslashes in heredocs).
- Do not start `next dev` and do not touch the database `oet_cms`.

## Modelling rules

- One file per collection or global in your area folder; `index.ts` exports the arrays.
- The JSON in `cms/seed/content` shows what the pages need. Model the **content**, not the JSON shape:
  - An entity that exists as a collection is referenced by a relationship, never copied. A project card on a department page is a relation to `projects`; a department head is a relation to `team-members`; a partner logo is a relation to `partners`.
  - Listings are queries (all published documents, sorted), not hand-curated lists, unless the design shows a curated selection (home carousel, "related").
  - Repeated filler in the Figma content (the same card three times, logos repeated to fill a grid) is seeded once per real entity. Where a section needs several distinct documents to look right, seed distinct documents and say so in your report.
  - Values an editor would never touch stay in code: element ids and anchors, page sizes, pagination state, sort options, UI labels (those are in `web/src/i18n/ui.ts`).
  - Per-item presentation values the design sets by hand (card frame colour, accent, portrait crop box, logo display size) are fields with a clear label and description, grouped under a collapsible or tab named for what they control.
- Figures the design shows as display values ("50+", "12", "99", "€0") are editable text fields seeded with the Figma value. Do not derive them from document counts: the seeded content is too small for the counts to match the design, and several are rounded on purpose.
- Do not invent facts about real people or organisations (which country someone lives in, who funds what). Leave such fields empty in the seed and list them in your report.
- Every text an editor writes is localised: use `text` / `textarea` / `richText` / `paragraphs`. Names of people, organisations and tools, URLs, numbers, dates, flags and selects are not localised (`plainText`).
- Arrays that hold only text: localise the array (`paragraphs` does this). Arrays that mix text with images or relations: do not localise the array, localise the text fields inside.
- Long text with formatting or links is `richText` (Lexical). The page reads the generated `<name>Html` twin. Plain paragraphs are `paragraphs`.
- Images are `image(...)` (upload to `media`); the alternative text lives on the media document. Icons are `icon(...)` when the design uses a file from `web/src/icons`; when a component maps its own icon keys, use `select` with exactly those keys.
- Links are `link` / `links` / `href`: a site path, an anchor, a full URL or `mailto:`.
- Required means the page cannot render without it. Optional means the design has a variant without it, and the page handles that variant explicitly.
- Collections with their own URL (`projects`, `publications`, `events`, `services`, `departments`, `pages`) use `versions: { drafts: true }`, `access: publishedRead` and `slug('title')`. Seed them with `_status: 'published'`. Everything else uses `publicRead`. Globals use `globalRead`.
- Admin: set `admin.group` (the area name, capitalised), `admin.useAsTitle`, `admin.defaultColumns`; give every non-obvious field a `label` or `admin.description` that says where it appears on the site; split long documents into `tabs`.
- Postgres limits identifiers to 63 characters. Deeply nested arrays produce long table names; when Payload reports that, set `dbName` on the inner array.
- Relationship types in generated types are `number | Doc`; a field pointing at another area's collection uses the slug from the table above.

## Seed rules

- `cms/src/areas/<area>/seed.ts` exports `seed(payload)`. Split it into files inside your area when it grows.
- Read content only from `cms/seed/content/*.json`. Do not retype copy. Type the JSON you read with interfaces in your seed files.
- Idempotent: use `upsert` with a unique key (slug, name, key). Running the seed twice must leave the same documents.
- Upload every image through `upload(payload, asset, alt)`.
- HTML strings become Lexical through `lexical(payload, html)`.
- A relation to another area's document is looked up with `findId` by slug or name; the areas before yours in the seed order have already run.

## Working with your own database

Several agents work at the same time. Each uses its own database and media folder so runs do not collide. Replace `<area>` with your area name:

```bash
docker exec oet-cms-database-1 psql -U payload -d postgres -c "CREATE DATABASE oet_cms_<area>"
# from cms/, with DATABASE_URL taken from cms/.env and the database name replaced:
export DATABASE_URL="$(grep ^DATABASE_URL= .env | cut -d= -f2- | sed 's#/oet_cms$#/oet_cms_<area>#')"
export MEDIA_DIR=media-<area>
SEED_AREAS=core,<areas before yours>,<area> pnpm seed
pnpm generate:types
pnpm check
```

- In development Payload pushes the schema to the database when it starts. An incompatible change (renamed or removed field) makes the push ask a question and hang. When you change a field you already pushed, drop and recreate your database (`DROP DATABASE oet_cms_<area>`), delete `cms/media-<area>` and seed again.
- `pnpm generate:types` writes `cms/src/payload-types.ts` and copies it to `web/src/lib/payload-types.ts`. Other agents regenerate it too; if it fails or `pnpm check` reports errors in another area's files, wait a minute and retry, and never fix another area's file.
- To inspect what you seeded, write a throwaway script under `cms/scripts/_<area>-*.ts` and run it with `pnpm payload run scripts/_<area>-x.ts`; delete it when you are done.

## Report

Write `docs/reports/cms-<area>.md`:

- Collections and globals with their fields (name, type, localised, required) and where each appears on the site.
- A coverage table per content JSON export you own: for every key, the CMS field it went to, or "derived" with the rule, or "stays in code" with the reason.
- Seeded document counts per collection.
- Decisions you took where the content was ambiguous, and anything the coordinator must add to shared files.

Your final message is a short summary of that report.
