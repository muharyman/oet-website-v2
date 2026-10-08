# Report: tools-news

Tools and Data (`/tools-and-data` + category routes), News and Events listing (`/organization/news-and-events`) and event detail (`/organization/news-and-events/[slug]`). Built 2026-10-08. `pnpm check`: 0 errors, 0 warnings. Prettier run on all files below. No console errors on my routes in the final runs.

## Files

| File | What |
| --- | --- |
| `web/src/components/pages/ToolsAndDataPage.astro` | Shared page for all tools routes; prop `category: ToolCategoryId \| null` |
| `web/src/pages/tools-and-data/{index,tools,models,data,open-source-solvers,community}.astro` | Static routes, each renders the shared page with one tab active |
| `web/src/pages/organization/news-and-events/index.astro` | Listing, includes the `<oet-event-filter>` script |
| `web/src/pages/organization/news-and-events/[slug].astro` | Event detail, both states, `getStaticPaths` over `events` |
| `web/src/components/cards/ToolCard.astro`, `EventCard.astro` | On `CardShell` |
| `web/src/components/blocks/EventDetailsCard.astro`, `EventPoster.astro`, `VideoPoster.astro`, `MediaGallery.astro` | |
| `web/src/components/cards/CardShell.astro` | Extended (see below) |
| `web/src/data/tools.ts`, `web/src/data/events.ts` | Content, types, event status and date formatters |
| `web/src/assets/events/` | `poster-pypsa-support.webp` (800x800 source image), `poster-pypsa-support-tall.webp` (2x export of `660:39279`, 847x985), `highlight-session.webp` (source photo cropped to the Figma framing of `659:38169`), `documentation-substation.webp` |
| `web/src/icons/` | `globe-lines`, `calendars`, `clock-ten`, `land-location`, `map-pin`, `play-circle` (Figma path data, `currentColor`) |

`web/src/assets/tools/` is empty: the tools page has no images of its own.

## CardShell changes (additive; existing props and `ProjectCard` output unchanged)

- `tab.tone` additions: `brand-700`, `brand-900`, `neutral-700`, `neutral-900` (text `neutral-50`, tool categories) and `brand-tint` (`brand-500` fill), `brand-950-tint`, `neutral-800-tint` (text `brand-50`: event "Upcoming", "Highlighted", "Event Details").
- `body` addition: `bare` (no padding or gap; `EventDetailsCard` lays out its own sections).
- Mappings confirmed against Figma: tool = `tab` + `body="compact"` + `media={null}`; event = `tab` + `body="auto"` + `media="bleed"`.
- Home page checked after the change: the three project cards render as before (291.7 px wide, frame, partner tag, footer link viewed in a screenshot). I have no screenshot from before the change to diff against.

## Components

| Component | Props |
| --- | --- |
| `ToolCard` | `category: { label; tone: 'brand' \| 'brand-700' \| 'neutral-900' \| 'neutral-700' \| 'brand-900' }`, `name`, `description: string[]` (paragraphs, one blank line apart), `source`, `website`, `github` (each `{ label; href }`; the two icon links use `label` as accessible name), `class?` |
| `EventCard` | `status: 'upcoming' \| 'highlighted'`, `statusLabel`, `date`, `dateTime`, `title`, `excerpt` (3-line clamp, 3 lines reserved), `registration: string \| null` (line is reserved when null, as in Figma), `href`, `linkLabel`, `poster`, `posterAlt`, `sizes`, `class?`. Poster is `object-contain` in the 400 px box on `neutral-800` |
| `EventDetailsCard` | `label`, `title`, `date`, `dateTime`, `location`, `map: { label; href }`, `time`, `contributorsLabel`, `contributors: { name; title; photo }[]` (rendered with `PersonRow`), `footer: { kind: 'actions'; calendar; join } \| { kind: 'poster'; image; alt }`, `class?` |
| `EventPoster` | `image`, `alt`, `sizes`, `priority: boolean` (eager + `fetchpriority="high"`), `class?`. Full width, natural height |
| `VideoPoster` | `image`, `alt`, `sizes`, `priority`, `video: { embedUrl; watchUrl; title } \| null`, `playLabel`, `class?`. 847/477 from `lg`, 477 px high cover crop below. The play control is a link to `watchUrl`; `<oet-video-poster>` replaces the content with the iframe on click. `video: null` renders the photo only |
| `MediaGallery` | `id`, `label`, `items: { image; alt }[]`, `thumbnailLabel(position, total)`, `class?`. Tabs pattern (`<oet-media-gallery>`): click, ArrowLeft/Right (wrapping), Home, End, roving tabindex. Without JavaScript the first image and all thumbnails show |

`events.ts` also exports `eventStatus(event, now)` and `formatEventDay`, `formatEventWeekday`, `formatEventTimes`, `formatEventPublished` (all `Intl.DateTimeFormat` with the page locale and the event's `timeZone`; part order follows the design).

## Behaviour

- Tools tabs are links to static routes (with `#tools` so the list stays in view).
- Events: the two tab sets are links (`?state=…`, `?type=…`); `<oet-event-filter>` intercepts them, combines both filters, applies the sort from `SortControl` (`oet-select:change`), updates the URL with `replaceState`, and reads `state`/`type` from the URL on load. Without JavaScript all events are listed. Tested by script in Chromium: each filter, the combination, empty result, Z to A, Oldest, deep link; gallery keys; video click.
- Event state is derived at build time: `end` in the future = upcoming; past + `featuredAsHighlight` = highlighted; past without the flag = `archived`, which is left out of the listing and gets no page.

## Needed from the coordinator

- `routes.ts`: I added a sixth tools route, `/tools-and-data/tools`, because the "Tools" tab has no target among the four navigation routes. Paths are built in `ToolsAndDataPage` from `routes.toolsAndData` + the category slug in `tools.ts`; a `routes.toolsCategory(slug)` helper would be cleaner.
- `i18n/ui.ts` keys, currently in `toolsPage.labels` / `eventsPage.labels`: pagination first/previous/next/last/page, "Show All", "Source Code", "Website", "GitHub", tab group names, "Upcoming", "Highlighted", "Register", "View Event Recap", "Registration Closed at :", "No events match these filters.", "Event Details", "Contributors", "Mark Calendar", "Join Event", "Open location in maps", "Min", "Published", "Location", "About Event", "Event Documentations", "Play video", "Show image".
- `DetailHeader` light variant (outputs agent): its `<header>` has a full-width `bg-neutral-50` and no band, so the pink backdrop of the event frames cannot show. Worked around in `[slug].astro` with a wrapper `[&>header]:bg-transparent` and a page-level 822 px band (brand-50, radial gradient from `660:39228`, 20 px red glow from `660:39227`). Better home: a `light` band inside `DetailHeader`.
- `FilterTabs layout="equal"` gives three equal columns below `lg`; the tools mobile frame has hugging, wrapping tabs. Worked around with a wrapper `max-lg:[&_ul]:flex max-lg:[&_ul]:flex-wrap`.
- Dev server: Tailwind did not generate classes from newly created files until an already-known file was touched. Worth knowing for whole-site checks.
- One run reported `IntersectionObserver: rootMargin must be specified in pixels or percent` (site header script, not mine) on the upcoming event page at 1440; it did not recur in two later runs.

## Link targets set to `routes.contact` (no URL in Figma)

- Every tool's "Source Code", website and GitHub link (57 links). These need real URLs before launch.
- Event "Mark Calendar", "Join Event", map pin.
- CTA buttons: "Contact Us", "Request a Demo", "Sign Up for a Call", "New Updates Every 7th of The Month".
- Video: `embedUrl` / `watchUrl` use the literal placeholder id `VIDEO_ID`, so clicking play loads a YouTube error player. Needs a real video.
- Mobile pagination links (`?page=n`) do nothing.

## Placeholder content reproduced

- Tools: "Source Code" on community cards; "worlds-fastest", "+500k$".
- Mobile pagination "1 2 … 10" above and below both listings (all items are in fact on the page).
- Events: five cards from two contents (2 x "Free Monthly PyPSA Support…", 3 x "Sharing Session… Eurima"), slugs suffixed `-2`, `-3`; registration close date 1 October 2026 (already past); brief ending "Lorem Ipsum Dolor Sit Amet"; location "Location, Country, Address, Additional Location Detail Here No Maximum Line Lorem Ipsum Dolor Sit Amet"; contributors "Dr. Martha Maria Frysztacki Name Here 2 Line Max" / "Title in OET/Company Here 1 Line Maximum Lorem ipsum dolor" with the shared placeholder portrait; three identical "About Event" paragraphs; five identical gallery images; the same poster for every event (it says "Monday 3 AUG 2026").
- **Not reproduced:** the mobile Event Details card in Figma shows field names instead of content ("event-title lorem ipsum dolor sit amet", "event-date DAY, DD/MM/YYYY", "event-location-address event-location-google-maps-link", "event-start-time event-end-time event time-count (minutes)", "event-contributor-name-a/-b", "event-contributor-title-a/-b", buttons "Mark Calendar (link mark google calendar)" / "Join Event (registration/contact link)"). An event has one value per field, so mobile shows the same content as desktop. Likewise the desktop format strings "DAY, DD/MM/YYYY" and "HH:MM - HH:MM (MMM Min)" are rendered as real formatted values ("Thursday, 03/12/2026", "10:00 - 11:00 (60 Min)"). Say if the literal strings are wanted.

## Assumptions

- Event data not in Figma: times 10:00–11:00, zone `Europe/Berlin`, types (support sessions = Support Meetups, Eurima session = Webinars), highlighted events' date 10 August 2026, sort options other than "A to Z".
- The highlighted detail frame reuses the "Free Monthly PyPSA Support" title; my highlighted events use their own listing title (Eurima).
- Hidden layers skipped: the `opacity-0` horizontal tool cards (`657:26556` and similar) and the project card in the events grid (`659:38638`).
- Empty-result message, hover and focus states are my design.
- Desktop gap above the red CTA follows each frame: 172 px on the listing and upcoming detail, 120 px on the highlighted detail.

## Verification

| Section | 1440 | 412 | Remaining differences |
| --- | --- | --- | --- |
| Tools: page height | 5675 vs 5674 | 9015 vs 6550 (21 cards vs 11 drawn) | — |
| Tools: intro + tabs | compared side by side | compared | mobile content sits 1 px right (border outside) and about 3 px lower |
| Tools: card rows, dividers, tab colours | compared (first three rows side by side, rest viewed) | first cards compared | "Open Energy Benchmark" wraps to two lines in Figma (136 px text box), one line here; "Powerplant matching" and the solvers "Open Energy Benchmark" have no reserved second title line in Figma, here every title reserves two lines |
| Tools: CTA + spacer | viewed, positions measured | viewed | — |
| Tools: category routes | `/models` viewed; others return 200, not viewed | not viewed | no Figma frame for a filtered state |
| News: page height | 4761 vs 4765 | 7994 vs 7279 (5 cards vs 4 drawn) | cards 678.7 vs 680 (Figma rounds line boxes) |
| News: hero, header, tabs, sort | compared | compared | mobile state tabs wrap as "All, Highlighted / Upcoming"; Figma has "All / Highlighted, Upcoming". Faint brand-coloured line fragments at the list's left edge in the mobile render not reproduced |
| News: card grid | compared | compared | square poster is fitted, leaving 3 px (desktop) and 14 px (mobile) dark bars where Figma crops 6 px; the tall poster matches card `659:38573` |
| News: CTAs | compared at 1440 (support + updates) | compared (discuss + updates) | — |
| Event upcoming | compared top 2200 px side by side; 4105 vs 4103 | compared; 5294 vs 5313 | "PM GMT+1" instead of "Pm CET" (`Intl` in `en`); detail rows are Poppins in Figma, rendered in Plus Jakarta Sans with the drawn colour `#4a4c56`; mobile buttons 49 px (66 in Figma because of the two-line spec text); contributor title 10 px on mobile (Figma mobile box is 14 px high) |
| Event highlighted | compared top 2700 px; 4165 vs 4103 | compared; 6369 vs 6304 | height differences come from content: four-line title, three contributors on mobile (Figma mobile draws two), square poster in the card (427 px high vs 450 drawn) |
| Gallery, video poster | compared | compared | — |
| Home page after `CardShell` change | projects section viewed | not viewed | — |

Not checked: Firefox and Safari, widths between 412 and 1440, a production build, Lighthouse, screen reader.

Off-palette values used as drawn: `#ee2042` (event card link), `#4a4c56` (detail rows), `rgba(255,0,0,0.2)` (video poster tint), `rgba(227,25,55,0.24)` (selected thumbnail), the band gradient stops.
