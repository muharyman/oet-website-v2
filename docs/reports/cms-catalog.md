# CMS report — catalog area

Area `catalog`: collections `services`, `tools`, `tool-categories`, `cta-banners`; globals `services-page`, `tools-page`. Files in `cms/src/areas/catalog/`. Nothing in `web/` was touched.

Notation: **L** = localised, **R** = required. "paragraphs" is the shared helper: a localised array of rows `{ text }`; read it with `texts()`.

## Verification that was run

| Check | Result |
| --- | --- |
| `pnpm generate:types` | succeeds |
| `pnpm check` | 0 errors on the last run (an earlier run showed three errors, all in `areas/organization`, while that agent was mid-change) |
| `SEED_AREAS=core,catalog pnpm seed` against `oet_cms_catalog`, three runs | no errors; counts identical after each run |
| Read back at depth 2: both globals and every document of the four collections | every seeded field present; the only empty values are the intended ones (list under "Seeded values that are empty") |
| Conditional validation of `services.approach` | an update with `show: true` and no tag / title is rejected with "Required while the section is shown" |
| Anonymous read of `services` (`overrideAccess: false`) | returns the 6 published documents |
| `pnpm exec prettier --write src/areas/catalog` | run |

Not run: the admin panel (`next dev` is forbidden by the brief), so tab layout, field conditions and descriptions were not looked at in the browser. The REST API was not called over HTTP; reads went through the local API.

This area has **no rich text field**, so there are no `…Html` twins to check. All long texts here are plain paragraphs without formatting or inline links.

## Seeded document counts

| Collection | Documents |
| --- | --- |
| `services` | 6 (all `_status: published`) |
| `tools` | 19 |
| `tool-categories` | 5 |
| `cta-banners` | 4 (`support`, `discuss`, `updates`, `discuss-tools`) |
| `media` (uploaded by this area) | 102 |
| globals | `services-page`, `tools-page` |

## Collections

### `tool-categories` (`publicRead`, default sort `order`)

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `label` | text | yes | yes | Tag on every tool card of the category |
| `tabLabel` | text | yes | yes | Filter tab on `/tools-and-data`; browser title of the filtered page (`<tabLabel> \| <meta.title>`) |
| `tone` | select `brand`, `brand-700`, `neutral-900`, `neutral-700`, `brand-900` | no | yes | Tag colour (`ToolCard` `category.tone`) |
| `slug` | text, unique | no | yes | URL segment `/tools-and-data/<slug>` |
| `order` | number | no | yes | Order of tabs and of card groups |

### `tools` (`publicRead`, default sort `order`)

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `name` | text, upsert key | no | yes | Card title |
| `categories` | relationship → `tool-categories`, many, min 1 | no | yes | The card is rendered once in each category group, with that group's tag |
| `role` | select `maintainer`, `co-maintainer`, `maintainers` | no | no | Prefix of the first description line (see below) |
| `description` | paragraphs, min 1 | yes | yes | Card text, without the role prefix |
| `sourceHref`, `websiteHref`, `githubHref` | href | no | yes | "Source Code" link, globe icon, GitHub icon |
| `order` | number | no | yes | Order inside a category group |

**Recomposing the role line.** The source text `"Maintainer | Explore and compare…"` is stored as `role: 'maintainer'` and `description[0].text: 'Explore and compare…'`. The page builds the card's `description` like this:

- `role` is `null` (3 tools: Detect-Infra, HiGHS-campaign, PyPSA meets Earth): pass the paragraphs unchanged.
- otherwise: first paragraph = `` `${roleLabel} | ${description[0].text}` ``, the rest unchanged, where `roleLabel` is `maintainer` → `Maintainer`, `co-maintainer` → `Co-maintainer`, `maintainers` → `Maintainers`.

The three role labels are interface strings and are **not** in `web/src/i18n/ui.ts` yet (see "For the coordinator").

### `cta-banners` (`publicRead`)

| Field | Type | L | R | `CtaBanner` prop |
| --- | --- | --- | --- | --- |
| `key` | text, unique, lowercase with hyphens | no | yes | lookup key, not rendered |
| `heading` | textarea (line breaks kept) | yes | yes | `heading` |
| `lead` | textarea | yes | no | `lead` (`null` = banner without a lead) |
| `text` | textarea | yes | yes | `text` |
| `actions[]` | array, 1–2 rows: `label` (L, R), `href` (R), `emphasis` select `primary` / `secondary` (R), `newTab` checkbox (R) | — | yes | `actions` |
| `tone` | select `brand-600`, `brand-700`, `brand-800`, `brand-900`, `light` | no | yes | `tone` |
| `collage` | select `wind`, `thermalpower`, `biz` | no | yes | `collage` |
| `breakout` | checkbox | no | yes | `breakout` |

Seeded banners:

| Key | Source | Heading | Tone / collage / breakout |
| --- | --- | --- | --- |
| `support` | `events.json` `eventsPage.cta.support` | Book OET for Support Sessions | `brand-600` / `wind` / true |
| `discuss` | `events.json` `eventsPage.cta.discuss` | Discuss a Technology Modelling Need | `brand-600` / `wind` / true |
| `updates` | `events.json` `eventsPage.cta.updates` | Monthly Updates Open Call | `light` / `thermalpower` / false |
| `discuss-tools` | `tools.json` `toolsPage.cta` | Discuss a Technology Modelling Need | `brand-600` / `thermalpower` / true |

`discuss` and `discuss-tools` have the same heading, text and buttons and differ only in the collage, so they are two documents. The events page finds its banners with `where[key][equals]=support` (and `discuss`, `updates`); the tools page gets its banner through the `tools-page.cta` relation.

### `services` (`publishedRead`, drafts, default sort `order`)

Top level: `name` (text, L, R — full name in running text), `slug` (unique, R), `order` (number, R — order in every list of services).

Tabs are named for where the content appears. Each named tab is a group of the same name in the API.

| Tab → group | Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- | --- |
| Page: hero → `hero` | `title` | textarea | yes | yes | `PageHero` title on `/services/<slug>` |
| | `titleMobile` | textarea | yes | no | Set only when the mobile line breaks differ |
| | `lead` | textarea | yes | yes | `PageHero` `lead` |
| | `image`, `imageMobile` | upload | — | yes | `PageHero` `image.desktop` / `image.mobile` |
| | `background` | select `brand-600…900` | no | yes | `PageHero` `background` |
| Page: intro → `intro` | `tag`, `title` | text, textarea | yes | yes | `IntroStatement` |
| | `paragraphs` | paragraphs, min 1 | yes | yes | `IntroStatement` |
| | `image` | upload | — | yes | Photo; alternative text is on the media document |
| Page: offerings → `offerings` | `tag`, `title` | text, textarea | yes | yes | `OfferingList` |
| | `items[]` | array, min 1 | no | yes | `OfferingList` `items` |
| | `items[].title` | text | yes | yes | |
| | `items[].icon` | `icon()` select (file name in `web/src/icons`) | no | yes | resolve with `icon()` from `lib/media.ts` |
| | `items[].accent` | select `brand-500…900` | no | yes | |
| | `items[].text` | blocks, min 1: `paragraph { text }` (L, R) or `list { items: paragraphs }` | inside | yes | `Item.text`: paragraph block → string, list block → `{ list }` |
| | `items[].link` | group `label` (L) + `href` | — | no | "More About …" link; both parts `null` = no link |
| | `items[].deliverables` | paragraphs, min 0 | yes | no | Deliverables list; comes back `null` when there are none |
| Page: why OET → `values` | `tag`, `title` | text, textarea | yes | yes | `SectionHeading` |
| | `columns` | select `'5'`, `'6'` | no | yes | Desktop grid columns |
| | `items[]` | array, 1–6: `label` (L, R), `title` (textarea, L, R), `body` (textarea, L, R), `thumbnail` (upload, R), `thumbnailMobile` (upload, R) | no | yes | `ValueCard` |
| Page: how we work → `approach` | `show` | checkbox | no | yes | Whether the section exists on this page |
| | `tag`, `title` | text, textarea | yes | when `show` | `SectionHeading`; validated as required while `show` is checked |
| | `paragraphs` | paragraphs, 0–2 | yes | no | `SectionHeading` `columns` |
| Page: closing banner → `cta` | `heading`, `text` | textarea | yes | yes | `CtaBanner` |
| | `background`, `collage` | selects | no | yes | `CtaBanner` `tone`, `collage` |
| Services index card → `card` | `title` | textarea | yes | yes | `ServiceCard` on `/services` |
| | `paragraphs` | paragraphs, min 1 | yes | yes | |
| | `linkLabel` | text | yes | yes | Link label; target derived |
| | `image`, `imageMobile` | upload | — | yes | `ServiceCard` `image.desktop` / `.mobile` |
| Project and publication pages → `ctaCard` | `title` | textarea | yes | yes | `ServiceCtaCard` |
| | `paragraphs` | paragraphs, min 1 | yes | yes | |
| | `linkLabel` | text | yes | yes | Link label; target derived |
| | `icon` | `icon()` select | no | yes | |
| | `iconTone` | select `brand-500…800` | no | yes | |
| | `frame` | select `brand-500`, `brand-600` | no | yes | |
| | `image` | upload | — | yes | |
| | `imageMobile` | upload | — | no | `null` = same illustration at every width |
| Home accordion → `home` | `title` | text | yes | yes | `ServiceAccordion` item |
| | `paragraphs` | paragraphs, min 1 | yes | yes | |
| | `image` | upload | — | yes | Photo; alternative text on the media document |
| Navigation and footer → `navigation` | `label` | text | yes | yes | Mega-menu label **and** footer link label |
| | `description` | textarea | yes | yes | Mega-menu description |
| | `icon` | select `pylon`, `government`, `engineer`, `column`, `research`, `monitor` | no | yes | `NavServiceItem` icon key |
| Search and sharing → `meta` | `title`, `description` | `seo()` | yes | yes | `<title>`, meta description |

Derived in code, not stored:

- Every link to the service's own page (`card.link.href`, `ctaCard.link.href`, home accordion `href`, menu and footer `href`): `routes.service(slug)`. The seed throws if a source `href` is anything else.
- Offering number ("01", "02", …): position in `offerings.items`, as `OfferingList` already does.
- Hero title variant: `titleMobile === null` → pass `hero.title` as a string; otherwise pass `{ desktop: hero.title, mobile: hero.titleMobile }`.

**Related project cards are not a field here.** `services.json` carries the same two placeholder cards under `related` for all six services. The `projects` collection (outputs area) gets a `services` relationship (many → `services`) and the service page queries `projects` where `services` contains the service id. Nothing was seeded for it.

## Globals

### `tools-page` (`globalRead`)

| Group | Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- | --- |
| `hero` | `eyebrow` | text | yes | yes | `PageHero` `eyebrow.label` |
| | `title` | textarea | yes | yes | `PageHero` `title` |
| | `linkLabel` | text | yes | yes | Label of the hero chip |
| | `image`, `imageMobile` | upload | — | yes | `PageHero` image |
| `intro` | `title` | textarea (line breaks kept) | yes | yes | Heading above the tabs |
| | `paragraphs` | paragraphs, 1–2 | yes | yes | Two text columns |
| (top level) | `cta` | relationship → `cta-banners` | no | yes | Banner under the list; needs depth ≥ 1 |
| `meta` | `title`, `description` | `seo()` | yes | yes | |

### `services-page` (`globalRead`)

| Group | Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- | --- |
| `hero` | `title` | textarea | yes | yes | `/services` hero |
| | `linkLabel` | text | yes | yes | Label of the hero chip |
| | `image`, `imageMobile` | upload | — | yes | |
| `intro` | `tag`, `title` | text, textarea | yes | yes | Heading above the service cards |
| | `columns` | paragraphs, 1–2 | yes | yes | Text columns |
| `approach` | `tag`, `title` | text, textarea | yes | yes | "How We Work" heading on `/services` |
| | `steps[]` | array, 1–5: `title` (L, R), `text` (textarea, L, R), `image` (upload, optional) | no | yes | `ApproachSteps` on `/services` **and** on service pages with `approach.show` |
| | `illustration` | upload | — | yes | `ApproachSteps` `illustration`, both places |
| `values` | `tag`, `title` | text, textarea | yes | yes | "Why OET" heading on `/services` |
| | `items[]` | same shape as `services.values.items`, 1–5 | no | yes | `ValueCard` row |
| `cta` | `heading`, `text` | textarea | yes | yes | Closing banner on `/services` |
| (top level) | `detailEyebrow` | text | yes | yes | Eyebrow of every service page hero |
| | `ctaActions[]` | array, 1–2: `label` (L, R), `href` (R), `emphasis` (R), `newTab` (R) | — | yes | Buttons of the closing banner on `/services` and on every service page |
| `meta` | `title`, `description` | `seo()` | yes | yes | |

## Coverage

### `tools.json`

| Key | Went to |
| --- | --- |
| `toolCategories[].id` | Stays in code / dropped: it only joined tools to categories in the static module; the relation does that now. The static route files pass these ids (`model`, `solvers`); after wiring, identify a category by `slug` |
| `toolCategories[].slug`, `.label`, `.tabLabel`, `.tone` | `tool-categories.slug`, `.label`, `.tabLabel`, `.tone` |
| position in `toolCategories` | `tool-categories.order` |
| `tools[].name` | `tools.name` |
| `tools[].description` | `tools.role` + `tools.description` (prefix split off, see above) |
| `tools[].categories` | `tools.categories` (relation) |
| `tools[].sourceHref`, `.websiteHref`, `.githubHref` | same-named fields |
| position in `tools` | `tools.order` |
| `toolsPage.meta` | `tools-page.meta` |
| `toolsPage.hero.eyebrow.label` | `tools-page.hero.eyebrow` |
| `toolsPage.hero.eyebrow.mobile` | Stays in code: layout flag |
| `toolsPage.hero.title` | `tools-page.hero.title` |
| `toolsPage.hero.link.label` | `tools-page.hero.linkLabel` |
| `toolsPage.hero.link.href` | Stays in code: anchor to the intro section id |
| `toolsPage.hero.image.desktop` / `.mobile` | `tools-page.hero.image` / `.imageMobile` |
| `toolsPage.intro.id` | Stays in code: element id |
| `toolsPage.intro.title`, `.paragraphs` | `tools-page.intro.title`, `.paragraphs` |
| `toolsPage.mobilePagination` | Stays in code: pagination state |
| `toolsPage.cta` | `cta-banners` document `discuss-tools`, referenced by `tools-page.cta` |

### `services.json`

| Key | Went to |
| --- | --- |
| `approach.illustration` | `services-page.approach.illustration` |
| `approach.placeholder` | Stays in code: the "IMG-PLACEHOLDER" box is a design placeholder shown for a step without a picture, not editorial text |
| `approach.steps[].title`, `.text`, `.image` | `services-page.approach.steps[]` (`image` is `null` for all four) |
| `approach.steps[].number` | Derived: position in the list, two digits. The seed throws if a source number disagrees |
| `approachSteps` | Same array as `approach.steps`; seeded once |
| `ctaActions` | `services-page.ctaActions` |
| `relatedProjects`, `services[].related` | Not stored: relation on `projects` (outputs area), see above |
| `serviceDetail.eyebrow.label` | `services-page.detailEyebrow` |
| `serviceDetail.eyebrow.mobile` | Stays in code: layout flag |
| `services[].slug`, `.name`, `.meta` | `services.slug`, `.name`, `.meta` |
| position in `services` | `services.order` |
| `services[].hero.title` | `hero.title` (+ `hero.titleMobile` when the source is `{ desktop, mobile }`; one service) |
| `services[].hero.lead`, `.background` | `hero.lead`, `hero.background` |
| `services[].hero.image.desktop` / `.mobile` | `hero.image` / `hero.imageMobile` |
| `services[].card.title`, `.paragraphs` | `card.title`, `card.paragraphs` |
| `services[].card.link.label` | `card.linkLabel` |
| `services[].card.link.href` | Derived from the slug |
| `services[].card.image.desktop` / `.mobile` | `card.image` / `card.imageMobile` |
| `services[].intro.tag`, `.title`, `.paragraphs`, `.image` | `intro.*` |
| `services[].intro.alt` | `alt` of the media document (empty for all six) |
| `services[].offerings.tag`, `.title` | `offerings.tag`, `.title` |
| `services[].offerings.items[].accent`, `.icon`, `.title`, `.link`, `.deliverables` | `offerings.items[].*` |
| `services[].offerings.items[].text` | `offerings.items[].text` blocks (`paragraph` / `list`) |
| `services[].values.tag`, `.title`, `.columns`, `.items[]` | `values.*` (`columns` as `'5'` / `'6'`) |
| `services[].approach` | `approach.show` + `approach.tag`, `.title`, `.paragraphs` (`null` → `show: false`) |
| `services[].cta.heading`, `.text`, `.background`, `.collage` | `cta.*` |
| `servicesPage.meta` | `services-page.meta` |
| `servicesPage.hero.title` | `services-page.hero.title` |
| `servicesPage.hero.links[0].label` | `services-page.hero.linkLabel` (the seed throws unless there is exactly one chip) |
| `servicesPage.hero.links[0].href` | Stays in code: anchor to the intro section id |
| `servicesPage.hero.image` | `services-page.hero.image` / `.imageMobile` |
| `servicesPage.intro.id` | Stays in code: element id |
| `servicesPage.intro.tag`, `.title`, `.columns` | `services-page.intro.*` |
| `servicesPage.approach.tag`, `.title` | `services-page.approach.tag`, `.title` |
| `servicesPage.values.*` | `services-page.values.*` |
| `servicesPage.cta.heading`, `.text` | `services-page.cta.*` |

### Other files

| Key | Went to |
| --- | --- |
| `outputs.json` `serviceCtas[slug].icon`, `.iconTone`, `.frame`, `.title`, `.paragraphs`, `.image`, `.imageMobile` | `services.ctaCard.*` |
| `serviceCtas[slug].link.label` | `services.ctaCard.linkLabel` |
| `serviceCtas[slug].link.href` | Derived from the slug |
| `home.json` `services.items[].title`, `.paragraphs`, `.image` | `services.home.*` (matched to the service by `href`) |
| `home.json` `services.items[].alt` | `alt` of the media document |
| `home.json` `services.items[].href` | Derived from the slug |
| `home.json` `services.tag`, `.title` | Not this area: `home-page` (site) |
| `navigation.json` mega-menu `links[].label`, `.description`, `.icon` | `services.navigation.*` |
| mega-menu `links[].href` | Derived from the slug |
| mega-menu `more`, menu `label` | Not this area: `site-header` (site) |
| `footer.json` service link labels | `services.navigation.label` (identical to the menu label for all six; the seed throws if they ever differ) |
| `events.json` `eventsPage.cta.support` / `.discuss` / `.updates` | `cta-banners` documents with those keys |

## Seeded values that are empty

All intended; the page has to branch on them explicitly.

- `cta-banners.lead`: `null` for `discuss` and `discuss-tools`.
- `services.hero.titleMobile`: `null` for five services (set for regulators).
- `services.approach`: `show: false`, other fields `null` for system operators.
- `services.offerings.items[].link`: `{ label: null, href: null }` for 19 of the 32 offerings.
- `services.offerings.items[].deliverables`: `null` for four offerings (the last one of system operators, regulators, consultancies, technology).
- `services.ctaCard.imageMobile`: `null` for five services (set for consultancies).
- `services-page.approach.steps[].image`: `null` for all four.
- Media `alt`: empty for every image except `home-service-1.jpg` ("Line workers servicing equipment on a transmission tower"), because the source has no other alternative text. I did not write any.

## Decisions

- **Listing card vs CTA card.** `card` and `ctaCard` hold the same paragraphs for all six services and nearly the same title and link label (the technology card title has a line break; two link labels differ). They are separate groups as the task asked, so each place can be edited on its own, but they could be merged into one text set with only the pictures and colours separate.
- **`values.columns`** equals the number of value cards in all six services (5 or 6). It is stored because the task listed it and because the thumbnails are exported per column count (248 px vs 207 px), but it could be derived from `items.length`.
- **Offering text is a blocks field** with two block types, not rich text: only one of 32 offerings has a bullet list, there is no inline formatting, and `OfferingList` already takes `string | { list }`.
- **Offering and CTA-card icons use the shared `icon()` select** (all 93 site icons), because their keys are file names in `web/src/icons`. The navigation icon is a six-value select because `NavServiceItem` maps its own keys to `service-*.svg`.
- **`services-page.cta` has no colour or collage field.** The index page fixes `brand-600` / `wind` in the template; only the per-service banner has them as fields.
- **Service page hero icon.** `[slug].astro` shows `user-headset` in the hero of all six services. It is not a field. If it should follow the service, `ctaCard.icon` holds a per-service icon (it is `user-headset` for system operators).
- **Order of services.** `order` follows `services.json` (also the home accordion and mobile menu order). The desktop mega-menu and the footer list the same six as positions 1, 3, 5, 2, 4, 6, which is this order read across a three-column, two-row grid filled by column. I treated that as layout; the site area can store its own order if that reading is wrong.
- **Titles with line breaks** (`hero.title`, `card.title`, `cta.heading`, value titles, banner headings, tools intro title) are `textarea` so the break can be edited; the page keeps `whitespace-pre-line`.
- **`cta-banners` buttons are capped at two rows**, the most the design shows.
- Copy inconsistencies in the Figma content were seeded as they are and not corrected: the foundations card link reads "Explore services for system operators and utilities"; several offering link labels name a different offering ("Train and support" → "More About Build and integrate"); the fourth approach step repeats the text of the third; the home accordion has "complexdemanding"; one offering paragraph starts with a line break.
- Placeholder targets seeded as they are: all three links of every tool, every offering link and every banner button point to `mailto:info@openenergytransition.org`.

## For the coordinator

- **`web/src/i18n/ui.ts`**: add the three tool role labels (`Maintainer`, `Co-maintainer`, `Maintainers`) for the recomposed description line.
- **Outputs area**: `projects` needs a `services` relationship (many → `services`) for the related cards on service pages. The service shown in a `ServiceCtaCard` on a project or publication page is also a relation from that document to `services`.
- **Events area**: reference the banners by key `support`, `discuss`, `updates`.
- **Site area**: `home-page` should not copy service text; the accordion reads `services.home`, the menu and footer read `services.navigation`, sorted by `order`.
- No shared helper was missing. Area-local helpers are in `cms/src/areas/catalog/fields.ts`: `checkbox`, `order`, `actions` (links with emphasis and new-tab flag), `valueItems`, `closingCta`, and the tone / collage / accent value lists. `checkbox` and `order` would be useful in `cms/src/fields` if other areas need the same.
- The seed files import one type from `cms/src/payload-types.ts` (`Service`), so `pnpm generate:types` must have run before `pnpm check`.
- Database `oet_cms_catalog` and folder `cms/media-catalog` are left in place.

## Where the brief was not followed literally

- Checkboxes have `defaultValue: false`. A required checkbox without it cannot be saved from the admin form until it is toggled; this is a field default in the schema, not a substitute for missing data in code.
- The seed casts the CTA-card icon name from the JSON (`string`) to the icon union type; Payload validates the value on write.
