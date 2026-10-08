# Report: reconcile

Reconciliation pass after wave B, 2026-10-08. Workarounds that page agents built from outside shared components were moved into the components as typed props, and the workarounds deleted.

Final state: `pnpm exec prettier --write .` run; `pnpm check` 0 errors, 0 warnings, 0 hints (138 files); `pnpm build` passes (56 pages, no `/dev/*`); `node scripts/sweep.mjs`: 56 routes, no broken internal links, no console errors, one 1 px horizontal overflow (see "Not reconciled").

No `[&…]` child-selector override and no `!` override is left in `web/src/pages` or `web/src/components` (the only remaining `[&…]` are `MobileMenu`'s `::-webkit-details-marker` and `SectionHeading`'s own link style).

## Safety net

- `web/scripts/snapshot-all.mjs <folder> [route prefix…]`: full-page screenshots of every route in `dist` plus `/dev/shared` and `/dev/shell`, at 1440 and 412, against the dev server. Reduced motion, animations and transitions disabled, HMR socket muted, page scrolled through once so lazy images load. In Git Bash prefix with `MSYS_NO_PATHCONV=1` when passing route filters.
- `web/scripts/compare-snapshots.mjs <before> <after> [name part…]`: pixel comparison on a canvas in headless Chromium (tolerance 2 levels per channel), writes `compare.json` and a side-by-side crop per differing file into `<after>/diff/`.
- `web/scripts/check-header-theme.mjs <folder> [route prefix…]`: scrolls every route in 300 px steps, hides the header, measures the mean colour behind the bar, and flags positions where the current theme's text colour has a contrast below 2.5 and the other theme would be better. Saves bar screenshots over the hero, a light section and the footer per route.
- Baseline: `web/.screenshots/baseline/` (106 shots, before any change). Final: `web/.screenshots/rc1/` (116 shots). Two baseline runs were compared first: 104 of 106 identical; the two that differed showed a 25 px high text-rendering difference on a `Tag` (noise that recurs on `services/*-412` and `departments-412`).

## 1. Cards

| Component | Before | After |
| --- | --- | --- |
| `CardShell` | `media: 'framed' \| 'bleed' \| null`, `frame: 'brand' \| 'bright'`, `badge: boolean`, `footer: boolean` | `media: { kind: 'framed'; tone: FrameTone; mobile: 'scaled' \| 'fixed'; badge: boolean } \| { kind: 'bleed' } \| null`, `footer: 'content' \| 'empty' \| 'none'`, `height: 'natural' \| 'fixed'` |
| `ProjectCard` | `frame: 'brand' \| 'bright'`, `partner: { name; logo; linkLabel; href } \| null` | `frame: FrameTone` (nine tones), `mobileFrame`, `height`, `partnerTag: { name; logo } \| null`, `partnerLink: { label; href } \| null`, `footer: 'when-partner' \| 'always'` |
| `PublicationCard` | own copy of the body markup; `media.frame` applied through `cardFrames.ts` | uses `CardBody`; `media: { image; alt; sizes; frame; mobileFrame } \| null`, `height` |
| `CardBody` (new) | — | `title`, `excerpt`, `meta`, `href`, `linkLabel`: the title link, excerpt and date/link row shared by `ProjectCard` and `PublicationCard` |

- `FrameTone` = `bright` (`#ee2042`), `brand-500…900`, `neutral-800/900/950`; types live in `cards/types.ts`.
- `mobile: 'fixed'` is the listing frame (20 px padding, 332/238 image below `lg`); `height: 'fixed'` is the 475 px minimum of the listings.
- Footer rule in `ProjectCard`: a link renders when `partnerLink` is set; an empty 41 px footer is reserved when only a tag is set (as the listing and service frames draw it) or when `footer="always"` (department rows); otherwise no footer.
- Deleted: `cards/cardFrames.ts` (`frameTones`, `partnerDisplays`, `listingCard`), the `[&>div:nth-child(2)]:bg-brand-800` overrides in department and service pages, `[&>div:last-child]:invisible` and `pb-[41px]` in the department page.
- Data: `projects.ts`, `home.ts`, `services.ts`, `departments.ts` now carry `partnerTag` / `partnerLink` instead of one `partner` with a `display` flag. The data that existed only for the hidden half was removed (ICCT logo `assets/outputs/partner-icct.png`, link labels for Eskom and Stanford).
- Closer to Figma: service detail related cards no longer show the invented partner-name footer link; the footer is empty as drawn.
- `TeamCard` stays independent of `CardShell`. `CardShell` is body-then-media with a tab and footer; `TeamCard` is a photo area with absolutely placed portrait cut-outs and glow first, then two bordered sections, and has no tab, frame or footer. Expressing it would need a second media position and a free-form media region used by nothing else.

## 2. CardCarousel

Before: `label`, `controls`, `previousLabel`, `nextLabel`, always a side header column. After: `label`, `header: 'side' | 'above' | 'none'`, `controls: 'arrows' | 'none'`, `gap: 4 | 20`, `bleed: 'gutter' | 'viewport'`, `locale`. Slot `header` (side column, or rendered above the track).

- Deleted `blocks/CardScroller.astro`; project and publication detail use `header="above"`, `bleed="viewport"`.
- Service detail's hand-written scroll-snap `ul` replaced by `header="above"`, `bleed="gutter"`.
- Department row: `header="none"`; the `[&_oet-card-carousel>div:first-child]:hidden` wrapper and the `mr-4` items are gone.
- The arrow step uses the `gap` value instead of a hard-coded 4.

## 3. IntroStatement

Before: `layout: 'split' | 'full'` plus five DOM-order-dependent override strings in `services/[slug].astro`. After: `variant: 'home' | 'service'` (photo ratio and order, mobile spacing, stacked 16 px paragraphs, `pre-line`). The unused, unverified `full` layout was removed.

## 4. CtaBanner

- `tone: 'red' | 'light'` → `tone: 'brand-600' | 'brand-700' | 'brand-800' | 'brand-900' | 'light'`. The wrapper `[&>section>div]:bg-…` in service details is gone.
- Halves: they were 673.5 / 593.5 px at 1440 (`w-0 flex-1` with padding on one side). Figma `657:26494` and `662:46376` both have 634 | 12 | 634. Now a two-column grid: 633.5 / 633.5. The collage is therefore 7 % larger and reaches the top edge as in Figma; this also removes the "thermal power collage 15 px too low" difference from the services report. Compared visually with the Figma render of `657:26494`.
- The panel now sets `data-header-theme` (`light` on red tones, `dark` on the light tone).

## 5. DetailHeader

The `light` tone draws its own 822 px `brand-50` band with the gradient and red glow (desktop). Removed from `news-and-events/[slug].astro`: the page-level band, `main.relative.isolate` and the `[&>header]:bg-transparent` wrapper. The content grid after the header is `relative` so it paints above the band, the same pattern `DetailHeroImage` uses for the red tones.

## 6. FilterTabs

- `equal`: hugging, wrapping tabs below `lg`, equal columns from `lg` (the three-column mobile grid was not what the tools frame shows). Wrapper removed from `ToolsAndDataPage`.
- `wrap` (team, nine options): carries the 8 px mobile overhang that lets the rows break as drawn. The page wrapper is gone; the 700 px desktop width moved to `ListingHeader`.

## 7. LogoGrid

New props `mobileColumns: 2 | 4` and `inset: 'page' | 'none'`. Removed `max-w-none! px-0! [&>ul]:grid-cols-2` from the partners page.

## 8. PageHero

Props are now `Common & Placement`: bottom layouts take `chipsBottomMobile: 30 | 42 | 62`, left layouts take `textLeft: 80 | 96`. Values read from the Figma frames with a read-only script:

| Page | Value |
| --- | --- |
| News, tools | chips 30 px from the bottom on mobile |
| Services | 42 |
| Success stories, publications | 62 |
| Team, career | text at x = 96 on desktop |
| Partners, departments, service details | 80 |

- Left layouts on mobile are a fixed 573 px (676 with a person badge), content bottom-aligned 30 px from the edge, as in every Figma mobile frame; the panel no longer grows. Effect at 412: Research and Market Development −64 px (matches Figma 676), foundations −54, think tanks −35, technology −19, team −1.
- The 15–58 px "title sits lower" differences on the department index and career heroes are not an alignment issue: the block is bottom-aligned at 543 in Figma and here; Figma wraps "The Departments" and the career lead onto one more line than the browser does.
- Not changed: centred heroes are 800 px on mobile (Figma 799; the About page total already matches). The tools hero shows its eyebrow on mobile; the Figma mobile frame has no eyebrow text node.

## 9. RichText, SectionHeading, ListingHeader

- `RichText`: `size: 'md' | 'lg' | 'lg-md'` (`lg-md` = 18 px below `lg`, 16 px from `lg`; event pages) and `leading: 'ratio' | 'rounded'` (`rounded` = 19 px lines for `md`; department pages). Replaces `leading-[19px]!` and `max-lg:!text-[1.125rem]`.
- `SectionHeading`: new `titleTone: 'neutral-900' | 'neutral-800'`, `linkTone: 'brand' | 'text'`, `align: 'center' | 'title'` (split layout: columns aligned with the title, 38 px offset). The 20 px mobile gap above the action row is now part of the component (team was the only user). Replaces `[&_h2]:text-neutral-800`, `[&_p_a]:text-neutral-800!`, `lg:!items-start lg:[&>div:last-child]:pt-[38px]`, `max-lg:[&>div:last-child]:mt-3`.
- `ListingHeader`: new `tabsWidth: 'column' | 'wide'`; `descriptionStyle` gains `body-md-medium-mobile` (description shown below `lg` only); `topSpace={120}` is 180 on mobile. Replaces the team page's `max-lg:[&>div>div]:pt-[180px]` wrapper and the paragraph inside the tabs slot.
- `ValueCard`: new `titleLines: 'auto' | 'three'`; body is `pre-line`. Replaces `[&_h3]:lg:min-h-[3lh]` and `[&_p]:whitespace-pre-line`.

## 10. Header theme

- `BaseLayout` takes `headerTheme` (theme of the page body, `dark` on every real page) and `initialHeaderTheme` (what is under the bar at the top; decides the server-rendered theme and which logo loads eagerly). Home and both services pages previously passed `light` as the default and kept white text over cream sections.
- `data-header-theme` added to `CtaBanner` panels, the red band of `OfferingList`, and in `ServiceCtaBand` moved from the whole section to the coloured background, with a mobile-only `dark` region around the white card.
- `IntersectionObserver` error: reproduced on 92 of 106 baseline shots. A resize to a viewport shorter than the bar (Chromium does this for full-page screenshots) made the bottom margin negative and the string `--51px`. Both margins are now clamped at 0; 0 occurrences in 116 final shots.
- Verification: all 56 routes × 2 widths, 300 px steps. The footer is `on-red` on every route. Remaining flagged positions are all one of: card media, posters or job thumbnails passing under the transparent bar; the About hero, whose single `dark` theme sits over dark parts of the photo lower down; light photos inside `light` heroes. None is a section with a wrong theme. Whether the bar needs a backdrop over arbitrary card media is a designer question.

## 11. Routes

- `/outputs/blogs`, `/outputs/policy-briefs`, `/outputs/reports` and `/outputs/publications` render `components/pages/PublicationsPage.astro` (`type: PublicationTypeId | null`). Publications have a `type`; tabs link to the routes. Added to `routes.ts` with `legal`, `privacyStatement`, `disclaimer`.
- No publication has the type policy brief, so that page shows the empty message "No publications of this type yet." (my wording, `publications.empty`). The "Outputs" block is omitted when the type has no items in it. The "Academic Publication" tab still links to the full listing: there is no route for it.
- **Undesigned:** `/legal`, `/privacy-statement`, `/disclaimer` use `components/pages/LegalPage.astro` (dark header, `SectionHeading` as `h1`, `RichText`) with body text from `data/legal.ts`, every paragraph marked `[Placeholder]`.

## 12. UI strings

`i18n/ui.ts` grew from 7 to 104 keys; `i18n/groups.ts` holds `sortOptions`, `eventLabels`, `sidebarLabels`, `detailLabels`. `Pagination`, `ShareBar`, `JobCard`, `CardCarousel`, `TestimonialSlider`, `FilterBar`, `TeamCard` and `SiteFooter` take `locale` instead of label props. Removed from data modules: pagination, filter, sort, tab group names, "Show All", card link labels, testimonial, sidebar, share, meta and detail labels, tool and event labels, department headings, job facts, globe label/hint/unit, matrix label, nav and footer landmark names, hero region label, social link names.

Left in data on purpose: the "1 / 3" slide position (no words), cookie-settings labels and copyright (differ per placement as drawn), "Read Profile" / "Read" on team cards (placeholder inconsistency reproduced per card), tab labels that are content (event states and types, project status values, team groups).

## 13. Icons

Compared all path data normalised by view box. Two glyphs existed twice: `chevron-right-large` = `angle-right` (identical) and `angle-small-down` = `chevron-down` (same glyph, 0.875 scale). Removed `chevron-right-large.svg` and `angle-small-down.svg`. `book-open-reader.svg` is used by two pages, both size it by class. Every icon is referenced.

## 14. Dead code

- `/dev/*` is one route, `pages/dev/[demo].astro`, whose `getStaticPaths` returns `shared` and `shell` only when `import.meta.env.DEV`; the demos moved to `components/dev/`. Production build and sitemap contain no dev page. `scripts/shoot-shell.mjs` still passes all 25 checks.
- Removed: `/dev/outputs`, `CardScroller.astro`, `cardFrames.ts`, unused exports `departmentDetails` and `LinkAction`, `partner-icct.png`, empty folders `assets/tools` and `lib`.

## Snapshot comparison, baseline → final

Identical at both widths: `/`, about, departments index (412 differs only by the known `Tag` noise), partners, theory of change, all eleven success-story details, all seven publication details. Identical at one width where the other is listed below.

| Route | 1440 | 412 |
| --- | --- | --- |
| Tools and data (6 routes) | CTA collage (item 4) | hero chips 12 px lower (item 8) |
| News and events | CTA collage | hero chips 12 px lower |
| Event details (5) | CTA collage | identical |
| Services index | CTA collage | identical |
| Service details (6) | CTA collage; related cards without the invented footer link | footer link removed; hero fixed at 573 on foundations, think tanks, technology |
| Success stories, publications | 120 px: the dropdown chevrons after the icon merge | hero chips 20 px higher; same chevrons |
| Team | hero text at x = 96 | hero 1 px shorter |
| Career | hero text at x = 96 | identical |
| Research and Market Development | identical | hero 64 px shorter |
| Energy System Modeling, Software Engineering | footer text shifted by a sub-pixel | same |
| Modeling Tools & Data | page 1 px shorter (2878 = Figma) | 1 px shorter |
| `/dev/shared` | demo of the changed components | same |
| `/dev/outputs` | removed | removed |
| Blogs, policy briefs, reports, legal, privacy statement, disclaimer | new | new |

The department differences come from the reserved footer being 40.8 px (as the visible footer) where the page workaround padded 41 px.

One flake seen: `tools-and-data/data` at 412 once rendered without the CTA collage (lazy image); a second shot was correct.

## Not reconciled

- `/organization/theory-of-change` at 412 has 1 px horizontal overflow. It is in the baseline (413 px wide screenshot); no element ends between 412 and 414 px, so the cause is still open.
- `data/navigation.ts`, `data/footer.ts` and `data/home.ts` still hard-code 72 paths instead of using `routes.ts`.
- Mobile department project cards stay 372 px wide (Figma overflows the frame with 406 px cards).
- Header legibility over card media (item 10).
- Hero chips on the publications page still point to `#publications`, not to the new type routes.
- Not checked: Firefox, Safari, keyboard-only, widths between 412 and 1440, Lighthouse.
