# CMS report — events area

Area `events`: collections `events`, `event-types`, `pages`, `redirects`, `form-submissions`; global `news-events-page`. Files in `cms/src/areas/events/`. Nothing in `web/` or in shared CMS files was touched.

Notation: **L** = localised, **R** = required.

## Verification that was run

| Check | Result |
| --- | --- |
| `pnpm generate:types` | succeeds |
| `pnpm check` | 0 errors on the last run (earlier runs showed one error in `areas/site/SiteSettings.ts` while that agent was mid-change; none in this area at any point) |
| `SEED_AREAS=core,organization,catalog,events pnpm seed` against `oet_cms_events`, four runs | no errors; document counts identical after every run (table below) |
| Read back at depth 2: the global, all five events, the four types, the three pages | every seeded field present, `descriptionHtml` and `bodyHtml` included |
| Anonymous access (local API, `overrideAccess: false`) | `events`: 5 published documents readable. `form-submissions`: create works; `find`, `findByID` and `update` answer `Forbidden` |
| Signed-in user on `form-submissions` | read works; update answers `Forbidden` |
| Validation | each rule below was triggered once and rejected the write: end before start, unknown time zone, half-filled video, external contributor without photo, team member without head photo, redirect `from` without leading slash, submission with unknown locale, submission whose payload is not an object |
| Contributor as team member | written and read back at depth 2: name, role and head photo of the member are populated |
| `pnpm exec prettier --write src/areas/events` | run |

Not run: the admin panel (`next dev` is forbidden by the brief), so tabs, rows and descriptions were not looked at in the browser. The REST API was not called over HTTP; all reads and the access checks went through the local API. The throwaway script `cms/scripts/_events-check.ts` is deleted.

## Seeded document counts

| Collection | Documents |
| --- | --- |
| `events` | 5 (all `_status: published`) |
| `event-types` | 4 |
| `pages` | 3 (all `_status: published`) |
| `redirects` | 0 |
| `form-submissions` | 0 |
| `media` uploaded by this area | 7: `shared-person-placeholder.png`, `events-poster-pypsa-support.webp`, `events-poster-pypsa-support-tall.webp`, `events-highlight-session.webp`, `events-documentation-substation.webp`, `heroes-news-and-events-desktop.webp`, `heroes-news-and-events-mobile.webp` (193 media documents in total after `core,organization,catalog,events`) |
| global | `news-events-page` |

Every seed run adds one version per event and page to the versions tables (Payload keeps up to 100 per document); the document counts do not change.

## Collections

### `event-types` (`publicRead`, default sort `order`)

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `label` | text | yes | yes | Tab of the type filter on `/organization/news-and-events` |
| `slug` | text, unique | no | yes | The `id` of the JSON: `?type=<slug>` and `data-type` on the cards |
| `order` | number | no | yes | Order of the tabs |

### `events` (`publishedRead`, drafts, default sort `-start`)

| Tab | Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- | --- |
| (top) | `title` | text | yes | yes | `EventCard`, `DetailHeader`, `EventDetailsCard`, browser title |
| (sidebar) | `slug` | text, unique | no | yes | `/organization/news-and-events/<slug>` |
| (sidebar) | `type` | relationship → `event-types` | no | yes | `data-type` of the card; needs depth ≥ 1 to read the slug |
| Text | `excerpt` | textarea | yes | yes | Card text; meta description of the event page |
| | `brief` | textarea | yes | yes | Summary in `DetailHeader` |
| | `description` / `descriptionHtml` | rich text + HTML twin | yes | yes | "About" section (`RichText`) |
| Date and time | `start`, `end` | date with time | no | yes | Card date, details card date / times / duration; `end` decides "upcoming" |
| | `timeZone` | text, validated as IANA zone | no | yes | Time zone passed to every `formatEvent…` function |
| | `publishedAt` | date with time | no | yes | "Published …" line in `DetailHeader` |
| | `registrationClosesAt` | date with time | no | no | "Registration closes …" on the card; `null` = no line |
| | `featuredAsHighlight` | checkbox | no | yes | Input of `eventStatus` |
| Location and links | `locationRegion` | text | yes | yes | Location in `DetailHeader` |
| | `locationAddress` | textarea | yes | yes | Location on the details card |
| | `mapHref`, `calendarHref`, `joinHref` | href | no | yes | "Open Map", "Mark Calendar", "Join Event" |
| Contributors | `contributors` | blocks `member` \| `external` | — | no | `PersonRow` list on the details card |
| Media | `poster` | upload | no | yes | Card, `EventPoster`, footer of the details card after the event; alt on the media document |
| | `posterFit` | select `cover`, `contain` | no | yes | `EventCard` `posterFit` |
| | `highlight.image` | upload | no | no | `VideoPoster` image; `null` = the event has no highlight media (`highlight: null` in the view model) |
| | `highlight.video.embedUrl`, `.watchUrl` | text, `https://` only | no | all or none | `VideoPoster` `video` |
| | `highlight.video.title` | text | yes | all or none | `VideoPoster` `video.title` |
| | `gallery[]` → `image` | array of uploads | no | no | `MediaGallery`; alt on the media document |

Contributor blocks:

| Block | Fields | View model |
| --- | --- | --- |
| `member` | `member`: relationship → `team-members` (R). Rejected when the member has no head photo | `name` = `member.name`, `title` = `member.role`, `photo` = `member.photo`; needs depth ≥ 2 for the photo |
| `external` | `name` (text, not L, R), `title` (text, L, R), `photo` (upload, R) | as stored |

Rules enforced on publish:

- `end` must be after `start`.
- `timeZone` must be a zone `Intl.DateTimeFormat` accepts.
- Video: `embedUrl`, `watchUrl` and `title` are filled together or all empty; a video requires `highlight.image`.

Reading notes for the wiring agent:

- Dates come back as UTC ISO strings (`2026-12-03T09:00:00.000Z` for the source `2026-12-03T10:00:00+01:00`). They are the same instants; the format functions already take `timeZone`, so the output is unchanged. `data-start` and `dateTime` attributes will carry the UTC form.
- `highlight` is always an object. Map `highlight.image === null` to `highlight: null`, and `highlight.video.embedUrl === null` to `video: null`.
- `descriptionHtml` and `bodyHtml` are wrapped in `<div class="payload-richtext">…</div>` by the Lexical converter.
- Status (`upcoming` / `highlighted` / `archived`) is not stored; keep `eventStatus(event, now)`.

### `pages` (`publishedRead`, drafts)

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `title` | text | yes | yes | Heading of `LegalPage` |
| `slug` | text, unique | no | yes | `legal`, `privacy-statement`, `disclaimer` → `/legal`, `/privacy-statement`, `/disclaimer` |
| `tag` | text | yes | yes | Tag above the heading |
| `body` / `bodyHtml` | rich text + HTML twin | yes | yes | `RichText` body |
| `meta.title`, `meta.description` | `seo()` | yes | yes | Browser title and description |

### `redirects` (`publicRead`)

| Field | Type | L | R | Notes |
| --- | --- | --- | --- | --- |
| `from` | text, unique, must start with `/` | no | yes | Old path |
| `to` | href | no | yes | Site path or full URL |
| `statusCode` | select `'301'`, `'302'` (strings) | no | yes | Convert with `Number()` when writing the redirect config |

### `form-submissions`

Access: create anyone; read and delete signed-in users; update nobody.

| Field | Type | L | R | Notes |
| --- | --- | --- | --- | --- |
| `form` | text, lowercase-hyphen pattern, indexed | no | yes | Name of the form, for example `contact` |
| `locale` | text, must be a locale code of the CMS (`en`) | no | yes | Language of the page the form was sent from |
| `payload` | json, must be an object | no | yes | Form fields as sent |
| `createdAt` | timestamp (Payload) | — | — | Created date; default sort is newest first |

A site form posts `{ form, locale, payload }` to `POST /api/form-submissions` without credentials. The response contains the created document.

## Global `news-events-page` (`globalRead`)

| Tab | Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- | --- |
| Hero → `hero` | `title` | textarea | yes | yes | `PageHero` title |
| | `linkLabel` | text | yes | yes | Label of the hero chip |
| | `image`, `imageMobile` | upload | no | yes | `PageHero` `image.desktop` / `.mobile` |
| Event list → `listing` | `title` | text | yes | yes | `ListingHeader` title |
| | `description` | textarea | yes | yes | `ListingHeader` description |
| | `stateLabels.all`, `.highlighted`, `.upcoming` | text | yes | yes | Labels of the three state tabs |
| Calls to action → `cta` | `support`, `discuss`, `updates` | relationship → `cta-banners` | no | yes | `CtaBanner` on the listing and on every event page (desktop first, mobile first, second); needs depth ≥ 1 |
| Search and sharing | `meta.title`, `meta.description` | `seo()` | yes | yes | Browser title and description of the listing |

## Coverage of `events.json`

| Key | Went to |
| --- | --- |
| `eventTypes[].id` | `event-types.slug` |
| `eventTypes[].label` | `event-types.label` |
| (position in `eventTypes`) | `event-types.order` |
| `events[].slug`, `.title`, `.excerpt`, `.brief` | `events` fields of the same name |
| `events[].descriptionHtml` | `events.description` (Lexical), read as `descriptionHtml` |
| `events[].type` | `events.type` (relation, looked up by slug) |
| `events[].timeZone`, `.start`, `.end`, `.publishedAt`, `.registrationClosesAt`, `.featuredAsHighlight` | fields of the same name |
| `events[].locationRegion`, `.locationAddress`, `.mapHref`, `.calendarHref`, `.joinHref` | fields of the same name |
| `events[].contributors[]` | `events.contributors[]` as `external` blocks (`name`, `title`, `photo`) |
| `events[].poster.image` / `.alt` | `events.poster` / `alt` of the media document |
| `events[].posterFit` | `events.posterFit` |
| `events[].highlight.image` / `.alt` | `events.highlight.image` / `alt` of the media document |
| `events[].highlight.video.*` | `events.highlight.video.*` |
| `events[].gallery[].image` / `.alt` | `events.gallery[].image` / `alt` of the media document |
| `eventsPage.meta` | `news-events-page.meta` |
| `eventsPage.hero.title` | `hero.title` |
| `eventsPage.hero.link.label` | `hero.linkLabel` |
| `eventsPage.hero.link.href` | Stays in code: it is `#` + the list anchor. The seed throws if it is anything else |
| `eventsPage.hero.image.desktop` / `.mobile` | `hero.image` / `hero.imageMobile` |
| `eventsPage.listing.id` | Stays in code (element id) |
| `eventsPage.listing.title`, `.description` | `listing.title`, `listing.description` |
| `eventsPage.stateTabs[].label` | `listing.stateLabels.all` / `.highlighted` / `.upcoming` |
| `eventsPage.stateTabs[].id` | Stays in code (the ids are the states `eventStatus` returns, plus `all`) |
| `eventsPage.sort` | Stays in code (sort options) |
| `eventsPage.mobilePagination` | Stays in code (pagination state) |
| `eventsPage.cta.support` / `.discuss` / `.updates` | Seeded by the catalog area as `cta-banners`; this area stores the relations `cta.support`, `cta.discuss`, `cta.updates` |

## Coverage of `legal.json`

| Key | Went to |
| --- | --- |
| `legalPages` keys (`legal`, `privacy-statement`, `disclaimer`) | `pages.slug` |
| `legalPages[slug].meta` | `pages.meta` |
| `legalPages[slug].tag` | `pages.tag` |
| `legalPages[slug].title` | `pages.title` |
| `legalPages[slug].body` | `pages.body` (Lexical), read as `bodyHtml` |

## Seeded values that are empty

- `events.registrationClosesAt`: `null` for the three Eurima events.
- `events.highlight` (image and video) and `events.gallery`: empty for the two PyPSA support events.
- `redirects`, `form-submissions`: no documents.

## Decisions

- **Contributors are blocks.** Two block types make the two variants explicit: an editor picks "OET team member" or "External person" and each has its own required fields. All seeded contributors are `external`, because the Figma person is a placeholder ("… Name Here 2 Line Max") and not a real team member. The rows repeat as in the design (two and three per event).
- **A team member used as contributor must have a head photo.** `team-members.photo` is optional, but `PersonRow` cannot render without one, so the relation is rejected with a message that names the person. In the organization seed 8 of 15 members have no head photo.
- **Gallery keeps five rows of the same photo.** The design repeats one image; the five rows refer to one media document. Replace with real photos.
- **Dates use one `timeZone` field per event.** The admin date pickers show the editor's own computer time zone; the tab description says so. Payload could attach a time zone to each date field (`timezone: true`), which makes the pickers work in the event's zone but adds a zone field per date. Not done because the task asked for a single zone field; worth deciding before editors enter real events.
- **`redirects.statusCode` is a select with string values**, so the admin shows a two-option list.
- **Admin group is "Events" for all six**, as the brief prescribes the area name. `pages`, `redirects` and `form-submissions` would sit better under a group such as "Site"; that is a one-line change per file.
- **`pages` has only a rich text body.** `AGENTS.md` mentions a block-builder for free-form pages; the task asked for tag, title and rich text, and `LegalPage` renders exactly that.
- **Helpers written inside the area** (`cms/src/areas/events/fields.ts`): `checkbox`, `order`, `dateTime`, `filled`. The catalog and organization areas have their own `checkbox` and `order`; a shared `checkbox`, `order` and `dateTime` in `cms/src/fields` would remove the three copies.

## For the coordinator

- Nothing has to be added to shared files. `rebuildOnPublish` already ignores `form-submissions`.
- The public REST create on `form-submissions` has no rate limit or spam protection; add one where the form handler is built.
- `redirects` are readable by anyone so the web build can turn them into its redirect configuration; nothing reads them yet.
- Placeholders that remain: every event link is `mailto:info@openenergytransition.org`, the video id is `VIDEO_ID`, event times and types are invented (see `AGENTS.md`), and the legal bodies are `[Placeholder]` text.
- The database `oet_cms_events` and the folder `cms/media-events` are left in place.
