# Wiring report — tools and services pages

The tools and services pages read the Payload CMS. No schema additions; `web/src/i18n/ui.ts` was not edited (the three `tool.role.*` keys were already there).

## What is connected

| File | Change |
| --- | --- |
| `web/src/data/tools.ts` | Constants removed. `loadToolCategories(locale)` (`tool-categories`, depth 0, sorted by `order`) and `loadToolsPage(locale)` (`tools-page` depth 1, `tools` depth 1 sorted by `order`, categories). The first description line is recomposed as `<t('tool.role.<role>')> \| <text>`; a tool without a role keeps its paragraphs. The banner is the `cta-banners` document behind `tools-page.cta` |
| `web/src/data/services.ts` | Constants and 90 asset imports removed. `loadServicesPage(locale)` (global + service cards), `loadServices(locale)` (full service view models with related projects), `loadServiceShared(locale)` (eyebrow, approach steps and illustration, banner buttons from `services-page`) |
| `web/src/components/pages/ToolsAndDataPage.astro` | Props are now `page: ToolsPage` and `category: string \| null` (the category slug); it no longer imports content |
| `web/src/pages/tools-and-data/index.astro` | Loads the page and passes it on |
| `web/src/pages/tools-and-data/[category].astro` | New. `getStaticPaths` comes from `tool-categories`. Replaces `tools.astro`, `models.astro`, `data.astro`, `open-source-solvers.astro` and `community.astro`, which were deleted |
| `web/src/pages/services/index.astro`, `services/[slug].astro` | Call the loaders; `getStaticPaths` comes from the `services` collection. The local icon map is gone: the data module resolves offering icons with `icon()` |

Related project cards: one query per service, `projects` where `services` contains the service id, depth 2 (needed for `partnerTag.tagLogo`), sorted by `createdAt` as the outputs report recommends. The card period is formatted from `startDate` / `endDate` in UTC; the partner tag is `partners.name`, `tagLogo`, `tagSize`.

Stays in code: the anchors `#tools` and `#services`, the eyebrow `mobile` flags, `mobilePagination`, the step placeholder text `IMG-PLACEHOLDER`, the hero icon `user-headset`, and the tone and collage of the `/services` banner.

## View model changes

- `ToolCategory`: `id` removed, `href` added. `Tool.categories` holds category slugs. `ToolCategoryId` no longer exists.
- `ServiceSlug` is still exported from `services.ts` and is now `string`. `serviceSlugs` from `routes.ts` is not used by these files any more.
- `Offering.icon` is the SVG component; `OfferingIcon` no longer exists.
- `RelatedProject.frame` is `FrameTone`, `partnerTag` may be `null`.
- New types: `ToolsPage`, `ToolsCta`, `ServicesPage`, `ServiceShared`, `ServiceCard`, `Approach`.
- No shared component was changed.

## Verification

`pnpm check`: 0 errors on the last run (earlier runs showed errors only in other areas' files, mid-change). Prettier was run on every changed file.

`compare-content.mjs` against `.screenshots/cms-before-html`, 13 routes:

| Routes | Differences |
| --- | --- |
| `/tools-and-data` and its five category routes | Only the footer "Privacy Statement" link, reported as removed and added again, so it changed position in the footer. The footer belongs to the site area |
| `/services` | Same footer line only |
| Six `/services/<slug>` routes | The footer line; the card period `MM/YYYY - MM/YYYY` is now `05/2026 - 05/2026` (derived from the seeded dates, both 1 May 2026); the tag logo alternative `Stanford` is now `Stanford University` (name of the partner document) |

Screenshots at 1440 and 412 in `web/.screenshots/wire-catalog/`, compared with `.screenshots/cms-before/`: all 26 have the same page height as the baseline. None is pixel-identical. I looked at side-by-side crops of `/tools-and-data` (1440), `/tools-and-data/data` (412), `/services` (1440 and 412), system operators (1440), regulators (412), consultancies (1440) and foundations (1440); the only visible difference is the period text. The other 18 screenshots were compared by pixel statistics only: their differing rows are the same kinds of band (hero, images, related cards).

The remaining pixel differences sit in image areas (heroes, card pictures, the approach illustration, value thumbnails), with channel deltas up to about 140 on grainy pictures. The synced files in `src/assets/cms` are byte-identical to the originals (six checked). The baseline HTML references built `/_astro/*.webp` files while the dev server serves `/_image?...`, so I attribute the differences to build versus dev encoding; I did not prove this, and it does not explain why three service heroes are pixel-identical while three are not. A comparison of two production builds would settle it.

## For the coordinator

- `web/src/data/projects.ts` (outputs) now has its own `projectPeriod` and partner tag mapping; `services.ts` has equivalent private helpers because the task asked for the mapping inside it. Same output today; they could be merged into one.
- `tools.ts` maps a `cta-banners` document to `CtaBanner` props locally; the events area needs the same mapping.
- The five deleted static category pages mean a tool category added in the CMS gets its route without code.
- Footer "Privacy Statement" position differs from the static site on every route (site area).
- Seeded copy issues from the catalog report are unchanged and visible (for example the foundations card link label).
