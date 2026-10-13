# Payload data model

Status: implemented 2026-10-13 in `cms/` (Payload 3.90, Postgres 16). It replaces the Directus draft; the content analysis behind it (designer field specs, catalogue, live-site inventory) is unchanged. The field-by-field reference lives next to the code in the area reports listed below.

## Conventions

- Collections and globals are grouped per area in `cms/src/areas/<area>/`, one file each. Collection slugs are plural kebab-case; page globals end in `-page`.
- Localisation is per field (`localized: true`). English is the only locale; a missing translation falls back to English. Names of people, organisations and tools, URLs, numbers, dates, flags and selects are not localised.
- Fixed-layout pages are globals. Collections with their own URL (`projects`, `publications`, `events`, `services`, `departments`, `pages`) have drafts; the public API returns published documents only.
- An entity is referenced, never copied: project cards on service, department and home pages are queries on `projects`; department heads are `team-members`; logos are `partners`.
- Repeaters are `array` or `blocks` fields inside their document, not child collections.
- Rich text is Lexical with a generated `<name>Html` twin that the static build reads.
- Images are uploads to `media`, stored byte-identical; the alternative text is on the media document. Icons are names from `web/src/icons`.
- Display figures ("50+", "12") are editable text, not counts.
- Slugs are not localised.
- Roles: `admin` (everything, including users) and `editor` (content). Users can hold an API key.

## Areas

| Area | Collections | Globals | Reference |
| --- | --- | --- | --- |
| site | — | `site-settings`, `site-header`, `site-footer`, `home-page` | `docs/reports/cms-site.md` |
| outputs | `projects`, `publications`, `testimonials`, `regions`, `tags`, `publication-categories` | `success-stories-page`, `publications-page` | `docs/reports/cms-outputs.md` |
| catalog | `tools`, `tool-categories`, `services`, `cta-banners` | `tools-page`, `services-page` | `docs/reports/cms-catalog.md` |
| events | `events`, `event-types`, `pages`, `redirects`, `form-submissions` | `news-events-page` | `docs/reports/cms-events.md` |
| organization | `team-members`, `departments`, `countries`, `partners`, `jobs` | `about-page`, `departments-page`, `team-page`, `partners-page`, `career-page`, `theory-of-change-page` | `docs/reports/cms-organization.md` |
| core | `media`, `users` | — | `cms/src/collections` |

How each page reads the model is in `docs/reports/wire-<area>.md`.

## Relations

```
projects ─many─ tools, services, departments, partners, tags, projects (related)
projects ─one─ regions, services (CTA card), partners (card tag), testimonials
projects.contact, publications.authors, events.contributors ─ team-members or an external person
publications ─one─ publication-categories, regions, services (CTA card)   ─many─ tags, publications (related)
events ─one─ event-types          news-events-page, tools-page ─ cta-banners
departments ─one─ team-members (head)   team-members ─many─ departments   ─one─ countries
home-page reads services (accordion), partners (grids), projects (carousel)
site-header and site-footer read services (menu entries, footer column)
```

## Seed and migrations

- `pnpm seed` (from `cms/`) is idempotent and runs the areas in dependency order: core, organization, catalog, events, outputs, site. Its sources are `cms/seed/content/*.json` (the Figma content exported from the former static data modules) and `cms/seed/assets`.
- Development pushes the schema automatically. Production databases are built with `pnpm migrate`; create a migration for every schema change with `pnpm migrate:create <name>`.

## Publishing

- Saving a global, saving a published document or deleting a document calls `WEB_DEPLOY_HOOK_URL` after 30 seconds without further changes, when that variable is set.
- The site build downloads all media and reads all content from `PAYLOAD_URL`.

## Open points

- Hosting for the CMS, its database and its media storage. Until the CMS is reachable from the build, the site cannot be built on Vercel.
- Draft preview: not built. It needs an on-demand route in `web/` that reads drafts with an API key.
- Content migration from the live site (19 posts, 32 projects, 4 events, 52 team members, 354 media) has not started; the migration map of the earlier draft still applies with Payload names.
- Jobs are managed in `jobs`; importing them from Greenhouse is undecided.
- `redirects` and `form-submissions` exist but nothing reads or writes them yet. The public create on `form-submissions` has no spam protection.
- `site-settings` default SEO, social links and the Tag Manager id have no reader yet.
- Facts not in the Figma content are empty: partner funder/partner flags, partner websites, team member countries, country continents.
- Listings sort by creation date to reproduce the Figma order; real content will want date order. The "Completed / In Progress" tabs on success stories do not filter yet.
