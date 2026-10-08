# Report: verify-outputs-news

Visual verification pass, 2026-10-08. Every route below was shot at 412 (and 1440 for the regression check), the Figma frame was rendered at 1:1, and both were cut into matching vertical strips and viewed side by side. Sizes in doubt were checked with pixel scans of the Figma render, browser measurements, `get_metadata` and `get_design_context`.

`pnpm exec prettier --write` run on the changed files; `pnpm check`: 0 errors, 0 warnings, 0 hints (147 files). No console errors on any route shot.

Screenshots and strips: `web/.screenshots/von/` (`f/` Figma renders, `p/` side-by-side strips).

## Fixes made

| File | Change | Figma evidence |
| --- | --- | --- |
| `web/src/components/pages/ToolsAndDataPage.astro` | Bottom mobile pagination `pt-5` → `py-10`; list wrapper `pb-40` → `pb-[140px]` on mobile | `657:22947`: last card to pagination box 60 px (was 40), pagination box to CTA 180 px (was 160). Now 60 / 180 |
| `web/src/pages/organization/news-and-events/index.astro` | Mobile pagination in the header `pt-5` → `py-5` | `659:34958` is 64 px high inside a 670 px header; pagination to first card was 60 px, Figma 80 |
| `web/src/components/cards/EventCard.astro`, `web/src/data/events.ts`, news `index.astro` | New required prop `posterFit: 'cover' \| 'contain'`, fed from a new `posterFit` field on `EventItem` (`cover` for the square poster, `contain` for the tall one) | `660:39028` fills the 372 x 400 media box (crop), `660:39044` is 344 x 400 with side bars. The square poster had 14 px dark bars top and bottom on mobile and 3 px on desktop |
| `web/src/components/blocks/PartnerLogoList.astro` | Mobile logos are 88 px in the top-left of their cell (`size-[88px] lg:size-full`), `sizes` adjusted | `677:67790` … 88 x 88 in 108.33 px cells |
| `web/src/pages/outputs/success-stories/[slug].astro`, `web/src/pages/outputs/publications/[slug].astro` | Below `lg` the guide line of the body column and of the sidebar is drawn as an inset shadow instead of a border, so it takes no width. Text starts at x = 40 and is 332 px wide (was 41 / 331) | Figma text boxes are 332–333 px. Line breaks of the body paragraphs and of the bullet list now match the Figma frames; publication detail is 10312 px high (Figma 10314, was 10331) |

## Per-section record, mobile 412

"Compared" = viewed side by side with the Figma strip.

### `/outputs/success-stories` (`643:10556`), 7324 vs 7318

| Section | Compared | Difference | Fixed |
| --- | --- | --- | --- |
| Hero | yes | Figma rounds the bottom corners of the photo and has a soft red glow under the red frame; neither is rendered | no, `PageHero` (shared 1) |
| Header, tabs, filters, top pagination | yes | positions within 1 px | — |
| Card grid | yes | partner tag is 102 x 36 at x = 18 (Figma 112.5 x 40 at x = 20); Stanford and Google logos smaller than drawn; cards sit 2–3 px lower (borders outside the content) | no, `CardShell` / `ProjectCard` (shared 2, 3, 4) |
| Card artwork | yes | Hydrogen, Google and the Tauritron frame show other artwork than Figma (Thumbnail Maker Guide images, already in the outputs report) | no, content |
| Bottom pagination | yes | none | — |
| Testimonials | yes | progress bar has three equal segments; the Figma mobile frame shows a half-width filled segment and one outline (the other two segments lie outside the frame). Details panel 447 vs 443 (line-box rounding) | no, kept as the desktop logic |

### `/outputs/publications` (`645:14863`), 7049 vs 7035 (`/outputs/blogs`, `/outputs/reports` render the same component; not shot separately)

| Section | Compared | Difference | Fixed |
| --- | --- | --- | --- |
| Hero | yes | same as above | no (shared 1) |
| Header, tabs, filters | yes | type tabs wrap "Show All, Academic Publication, Blogs / Policy Briefs, Reports"; Figma groups them 2 + 3 by hand | no, `FilterTabs` (shared 9) |
| Image card grid | yes | two-line titles end with the ellipsis at a word boundary ("Emerging Software…"), Figma cuts mid-word; the Eurima excerpt takes three lines instead of two (text column 330 vs 332) | no, `CardBody` / `CardShell` (shared 2) |
| "Outputs" heading, text-only grid | yes | text-only cards 219 vs 217 each, which is the +14 px of the page | no (shared 2) |
| Paginations | yes | none | — |

### `/outputs/success-stories/e-fuels-in-australia` (`645:11996`), 7734 vs 7880

| Section | Compared | Difference | Fixed |
| --- | --- | --- | --- |
| Header: title, highlights, tools, service | yes | own title (intentional). White text looks heavier than Figma in the browser render; computed weights match `645:13429` | — |
| Meta rows | yes | none (values checked with `get_design_context`) | — |
| Hero image | yes | none | — |
| Contact, partners | yes | logos filled their cells | **fixed** (88 px) |
| Body text | yes | lines broke earlier than Figma | **fixed** (width). Remaining: Figma line boxes are 22 px for 18 px text, here 21.6 (shared 7) |
| Link groups | yes | 40 px between stacked groups, Figma 20 | no, `LinkListGroup` (shared 5) |
| Testimonial (compact) | yes | none | — |
| Related projects | yes | Figma shows the row scrolled to the third card; here it starts at the first | — |
| CTA band and service card | yes | illustration is a tighter crop than the mobile frame (`645:13705` shows the whole pylon); frame has a flat fill where Figma shows a darker top edge | no, needs a mobile export per service card (see open points) |

### `/outputs/publications/case-study-…-eurima` (`647:5794`), 10312 vs 10314

| Section | Compared | Difference | Fixed |
| --- | --- | --- | --- |
| Header, meta, hero image | yes | title 2 px higher | no, `DetailHeader` |
| Authors, table of contents, share bar | yes | five entries instead of four (documented decision); first entry wraps | no, content |
| Body top | yes | the Figma heading has a hard line break ("model / for Australia"), one line more than here | no, copy |
| Stat grid | yes | rows 100 / 81 vs 101 / 82 | — |
| Body sections | yes | text was 1 px right and 1 px narrower; first bullet wrapped differently | **fixed**. Remaining: Figma has one blank line between list items (also on desktop), here none (shared 6) |
| Body image | yes | none in size or position | — |
| Link groups | yes | 40 px between groups (Figma 20); the journal row underlines the whole label where Figma underlines only the link part; the DOI wraps to three lines where Figma truncates on one | no, `LinkListGroup` (shared 5) |
| Related publications | yes | Figma draws the 406 px card centred over the gutters; here the row starts at the guide line | — |
| CTA band | yes | the Figma mobile frame is a copy of the project page (brand-700 band, "Consultancies" card); the desktop frame has brand-600 and "System Operators", which is what is rendered at both widths | no, designer question |

### `/tools-and-data` (`657:22947`), 9055 vs 6550 (21 cards vs 11 drawn)

| Section | Compared | Difference | Fixed |
| --- | --- | --- | --- |
| Hero | yes | eyebrow "Tools & Data" is shown; the mobile frame has none. Corners and glow as above | no, `PageHero` (shared 1) |
| Intro, tabs, top pagination | yes | within 2 px | — |
| Cards | yes (first six, last one) | each card 1–2 px higher (borders); "Open Energy Benchmark" on one line (known) | no (shared 2) |
| Bottom pagination and gap to CTA | yes | 20 px too little above and below the pagination | **fixed** |
| CTA | yes | none | — |
| Category routes (`/tools`, `/models`, `/data`, `/open-source-solvers`, `/community`) | no | same component; no Figma frame for a filtered state | — |

### `/organization/news-and-events` (`659:34941`), 8014 vs 7279 (5 cards vs 4 drawn)

| Section | Compared | Difference | Fixed |
| --- | --- | --- | --- |
| Hero | yes | corners and glow | no (shared 1) |
| Header text | yes | description is 18 px regular with a 12 px gap; `659:34945` is 16 px medium, line-height 1.32, 8 px gap (five lines of 21 px). Desktop is 18 px as built | no, `ListingHeader` (shared 8) |
| State tabs | yes | wrap "All Events, Highlighted Events / Upcoming Events"; Figma "All Events / Highlighted Events, Upcoming Events" | no, `FilterTabs` (shared 9) |
| Type tabs, sort | yes | none | — |
| Top pagination | yes | 20 px missing below | **fixed** |
| Cards | yes | square poster letterboxed | **fixed** (`posterFit`) |
| Bottom pagination | yes | none (40 / 60 px as in Figma) | — |
| CTAs | yes | none | — |

### Upcoming event (`659:35192`), slug `free-monthly-pypsa-support-for-european-transmission-system-operators-2`, 5294 vs 5313

The `-2` slug carries the tall poster that both detail frames draw; the first slug has the square poster and is 67 px shorter.

| Section | Compared | Difference | Fixed |
| --- | --- | --- | --- |
| Header, summary, meta | yes | "PM GMT+1" vs "Pm CET" (known); meta block 3 px higher | no |
| Poster | yes | 479 px high in both | — |
| Event details card | yes | Figma shows field names as content and two-line button labels (66 px); real values and 49 px buttons here, as documented. Padding, gaps, sizes match `660:39727`. Contributor title is 10 px, the mobile spec says 12 px (`660:39746`) | no, `PersonRow` (shared 10) |
| About | yes | none (line boxes 22 vs 21.6) | — |
| CTAs | yes | none | — |

### Highlighted event (`660:39885`), 6369 vs 6304

| Section | Compared | Difference | Fixed |
| --- | --- | --- | --- |
| Header | yes | own four-line title (content) | — |
| Video poster | yes | 477 px in both; the mobile frame shows a slightly wider crop of the photo than the asset (cut to the desktop frame) can give | no, needs the uncropped photo |
| Event details card with poster | yes | three contributors (Figma mobile two), square poster 412 high (Figma 450) | no, content |
| About, gallery | yes | none | — |
| CTAs | yes | none | — |

## Desktop 1440 spot-check

All eight routes shot after the changes and viewed against their desktop frames at half scale. No regression: heights are unchanged from the earlier reports (5017, 4888, 5113, 6858, 5675, 4761, 4105 for the `-2` slug, 4165). The event cards now crop the square poster as the desktop frame does.

Found on desktop while checking:

- **Detail header gradient is upside down** (shared 11). Not a regression: identical in `baseline` and `rc1`.
- Hero glow missing (shared 1), list item spacing (shared 6), Stanford tag logo size (shared 4).

## Shared-component changes needed (coordinator)

1. `blocks/PageHero.astro`, bottom layouts. (a) A soft `brand-500` glow under the red frame, visible about 35 px below it at both widths (success stories `643:10585` "Rectangle 434" behind the frame; same layer on publications, tools, news). (b) Below `lg` the photo has rounded bottom corners like desktop (`lg:rounded-md` → also on mobile, bottom corners). (c) Tools hero: no eyebrow on mobile (`657:22947` has no eyebrow text node), e.g. a prop `eyebrowMobile: boolean`.
2. `cards/CardShell.astro`: the 1 px border adds to the fixed heights and takes 2 px from the text column. Figma strokes do not take space. Every card is 2 px higher than drawn (text-only publication card 219 vs 217, tool cards +2, listing pages +14) and the text column is 330 instead of 332 (364 instead of 367 on desktop), which changes line breaks. Use a stroke that takes no space (inset shadow or outline) or subtract it from the paddings.
3. `cards/CardShell.astro`, badge with `media.mobile === 'fixed'`: below `lg` the badge must be `left-5 w-[112.5px]` (40 px high) instead of `left-[4.918cqw] w-[27.664cqw]`; keep the `cqw` values from `lg`. Figma `645:2770`: x = 20, 112.5 x 40.
4. `cards/ProjectCard.astro`: tag logos are all 65 % of the tag height. Figma: Eskom 73 x 26 (`645:2771`), Stanford 98.8 x 35 (`645:2793`), Google 70 x 25 (`645:2877`). Needs a per-logo size in `partnerTag` (for example `height: 26 | 35 | 25`, scaled with the tag).
5. `blocks/LinkListGroup.astro`: (a) `gap-y-10` → `gap-y-5` (stacked groups are 20 px apart in `645:13517` and the publication frame; with three columns on desktop the row gap is not visible). (b) Labels: Figma truncates long labels on one line (DOI row) and underlines only the link part of a label ("IEEE Power and Energy Magazine, Volume: 24 Issue: 4" underlined, ", pages 100 - 115" not; "DOI: " not underlined).
6. `ui/RichText.astro`: list items are separated by one blank line in Figma at both widths (publication detail "The Study", `647:5794` and `647:2023`): `li + li { margin-top: 1lh }`.
7. `ui/RichText.astro` / tokens: Figma line boxes are whole pixels (22 px for 18 px text, 19 px for 16 px); `leading: 'ratio'` gives 21.6 and 19.2. This is the remaining −12 px on the project body and the 1–2 px drift elsewhere. `leading="rounded"` exists for `md` only.
8. `blocks/ListingHeader.astro`: news needs a description style that is `text-[1rem] leading-[1.32] font-medium` with an 8 px gap to the title below `lg`, and `body-lg` with 12 px from `lg` (`659:34945`).
9. `ui/FilterTabs.astro`: optional, the mobile frames break the tab rows by hand (publications 2 + 3 in `645:14863`; news state tabs 1 + 2 in `659:34949`). Natural wrapping gives 3 + 2 and 2 + 1. Would need a per-option `breakBeforeMobile` flag.
10. `ui/PersonRow.astro`: the mobile event details spec has the contributor title at 12 px (`660:39746`), everywhere else it is 10 px. Probably a spec-frame artefact; confirm with the designer before changing.
11. `blocks/DetailHeader.astro`, tones `red` and `maroon`: the band gradient centre is at the top, in Figma it is at the bottom. Change `at_50.9%_-1%` to `at_50.9%_101%` in both `band` strings (lines 50 and 61). Measured at x = 1420 in `645:3668`: `#9b112e` at y = 10, `#af122f` at 400, `#c11532` at 800; the page renders the exact mirror (`#c11532` at 10, `#9b112e` at 800). Same for `647:2023` (`#52091d` at the top, `#650a22` at 815).

## Open points

- Service CTA illustrations on mobile: the mobile frame draws the whole illustration at a smaller scale (`645:13705`, 332 x 238) with a darker top edge; the cards use the desktop crop. Matching it needs a second export per service card and an `imageMobile` prop on `ServiceCtaCard`. Only the "Consultancies" card has a mobile frame among my pages, so I did not start it.
- Publication detail mobile CTA (brand-700, "Consultancies") contradicts its desktop frame (brand-600, "System Operators"): designer question.
- Screenshot flake: the last lazy image of a page (CTA collage, sometimes card thumbnails and the footer glow) can be missing in a full-page shot; a second shot is correct.
- Not checked: `/outputs/blogs`, `/outputs/reports`, the five tools category routes and the other event slugs were not shot; widths between 412 and 1440; other browsers.
