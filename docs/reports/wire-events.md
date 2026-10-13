# Wiring report — news and events, legal pages

The event listing, the five event pages and the three legal pages read the Payload CMS. No schema addition, no change to `web/src/i18n/ui.ts`, no change to a shared component.

## What is connected

| Route | Reads |
| --- | --- |
| `/organization/news-and-events` | `events` (depth 2, sort `-start`), `event-types` (depth 0, sort `order`), global `news-events-page` (depth 1) |
| `/organization/news-and-events/<slug>` | `events` in `getStaticPaths` (default locale), global `news-events-page` for the three banners |
| `/legal`, `/privacy-statement`, `/disclaimer` | `pages`, one document by slug (depth 0) |

### `web/src/data/events.ts`

- Loaders: `loadEvents(locale)`, `loadEventTypes(locale)`, `loadEventsPage(locale)`. The content constants and the seven asset imports are gone.
- Kept unchanged: `eventStatus`, `formatEventDay`, `formatEventWeekday`, `formatEventTimes`, `formatEventPublished`, and the view-model types `EventItem`, `EventImage`, `EventContributor`, `EventVideo`, `EventHighlight`, `PosterFit`, `EventStatus`.
- Type changes: `EventTypeId` (a union of the four seeded ids) is removed, `EventItem.type` is `string`, because types are now documents an editor can add. New exported types `EventType`, `EventStateId`, `EventBanner`, `EventsPage` describe what the loaders return.
- Contributors: an `external` block maps `name`, `title`, `photo` as stored; a `member` block maps `member.name`, `member.role`, `member.photo`. Depth 2 is requested for that photo. All seeded contributors are `external`, so the `member` branch is type-checked but was not rendered.
- `highlight.image === null` gives `highlight: null`; `highlight.video.embedUrl === null` gives `video: null`; `registrationClosesAt` and a banner `lead` pass `null` through. A field that is absent from the answer (`undefined`) throws.
- `descriptionHtml` goes through `richHtml`, which removes the `payload-richtext` wrapper.
- Stays in code: the list anchor `news-and-events` (and the hero chip target built from it), the three state ids, sort options, mobile pagination state.

### `web/src/data/legal.ts`

- `loadLegalPage(locale, slug)` queries `pages` with `where[slug][equals]` and throws unless exactly one published document comes back. `LegalPageId` and `LegalPageContent` are unchanged.

### Pages and components

- `news-and-events/index.astro`: calls the three loaders. The card order (title A to Z) now breaks ties by slug. Three seeded events share one title and two share another; without the tie-break their order followed the CMS answer and differed from the static page.
- `news-and-events/[slug].astro`: `getStaticPaths` is async and loads the events with `defaultLocale` (`Astro.currentLocale` is not available there); the banners are loaded in the frontmatter.
- `components/pages/LegalPage.astro`: prop changed from `page: LegalPageId` to `content: LegalPageContent`, so the component no longer reads data. The three route files load the document and pass it. Nothing else uses this component.
- `CtaBanner`, `PageHero`, `PersonRow`, `EventCard`, `EventDetailsCard` and the other components are untouched.

## Verification

Run on 2026-10-13 against the running servers.

### Content comparison

`node scripts/compare-content.mjs .screenshots/cms-before-html http://localhost:4321 /organization/news-and-events /legal /privacy-statement /disclaimer` (with `MSYS_NO_PATHCONV=1`; without it Git Bash rewrites the prefixes and the script compares 0 routes):

9 of 9 routes have the same content. The first run reported the listing with three card links in a different order; that was the tie order described above and is fixed.

### Screenshots

Taken with `scripts/snapshot-all.mjs` (the script that made `.screenshots/cms-before/`, so both sides use the same settings) into `.screenshots/wire-events/`, then `scripts/compare-snapshots.mjs`. 18 images, all with the same page height as before.

| Route | 1440 | 412 |
| --- | --- | --- |
| `/legal` | pixel-identical | pixel-identical |
| `/privacy-statement` | pixel-identical | pixel-identical |
| `/disclaimer` | pixel-identical | pixel-identical |
| `/organization/news-and-events` | differs only inside the hero photo and the card posters | same |
| `…/free-monthly-pypsa-support-…-operators` | differs only inside the poster | same |
| `…/free-monthly-pypsa-support-…-operators-2` | differs only inside the poster | same |
| `…/sharing-session-…-eurima` | differs only inside the highlight photo, the details-card poster and the gallery | same |
| `…/sharing-session-…-eurima-2` | as above | as above |
| `…/sharing-session-…-eurima-3` | as above | as above |

Looked at: the full listing at 1440 before and after, and the side-by-side sheets of the listing at 412, the `-2` support event at 1440 and the first Eurima event at 1440 and 412. I could not see a difference in any of them. The other sheets were not opened; the comparison reports the same bands for them (the three Eurima pages give identical numbers).

## Remaining difference

- **Image pixels.** The media files synced into `web/src/assets/cms` are not byte-identical to the originals in `web/src/assets`: same dimensions, smaller files (hero desktop 255 kB against 536 kB, square poster 50 kB against 77 kB), mean channel difference 1.2 to 2.3 of 255, largest 43. This is a second lossy encoding somewhere between the seed upload and the sync, not something the pages do. It is the whole of the screenshot difference. `shared-person-placeholder.png` is byte-identical. The coordinator may want to check whether the upload or the media collection re-encodes WebP, since every CMS image loses a little quality this way.
- **Attributes.** `data-start` on the cards and `datetime` on `<time>` now carry the UTC form (`2026-12-03T09:00:00.000Z` instead of `2026-12-03T10:00:00+01:00`). Same instants; the visible dates and times are unchanged, and the client sort by date parses both forms.

## Checks

- `pnpm check`: 57 errors, none in the files of this task. They are in `organization/*`, `outputs/*`, `PublicationsPage.astro` and `data/navigation.ts`, which other agents were changing at the time.
- `prettier --write` run on the eight changed files.
- Not run: `pnpm build`. Not tested: an event with a `member` contributor, an event type added in the CMS.

## For the coordinator

- Placeholders still come from the seed: every event and banner link is `mailto:info@openenergytransition.org`, the video id is `VIDEO_ID`, the legal bodies are `[Placeholder]` text.
- "Upcoming" and "highlighted" are decided at build time from `end`, as before; a site that is not rebuilt after an event ends keeps showing it as upcoming.
- `web/src/assets/events/*` and the two `heroes/news-and-events-*` files are no longer imported by these pages.
