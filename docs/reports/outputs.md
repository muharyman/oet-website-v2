# Report: outputs

Routes: `/outputs/success-stories`, `/outputs/success-stories/[slug]` (11 pages), `/outputs/publications`, `/outputs/publications/[slug]` (7 pages). Demo for the light header and the six service cards: `/dev/outputs`. Built 2026-10-08. `pnpm check`: 0 errors. Prettier run on every file. No console errors on any route at 1440 or 412.

## Result

| Page | Figma (with footer) | Built | Why it differs |
| --- | --- | --- | --- |
| Success stories 1440 | 4894 | 5017 | +124 desktop pagination (not in Figma, requested) |
| Success stories 412 | 7318 | 7324 | +6 |
| Publications 1440 | 4672 | 4888 | +208 two desktop paginations, +8 card borders |
| Publications 412 | 7035 | 7049 | +14 (text-only cards are 219 high, Figma 217) |
| Project detail 1440 | 5126 | 5113 | −13, line-box rounding in the body text |
| Project detail 412 | 7880 | 7755 | −161 title (own one/two-line title instead of the five-line placeholder), +36 body text wraps |
| Publication detail 1440 | 6899 | 6858 | −41, line-box rounding over a long body, table of contents has 5 entries instead of 4 |
| Publication detail 412 | 10314 | 10331 | +17 |

## Files

- Pages: `web/src/pages/outputs/success-stories/index.astro`, `[slug].astro`, `web/src/pages/outputs/publications/index.astro`, `[slug].astro`, `web/src/pages/dev/outputs.astro` (demo)
- Data: `web/src/data/projects.ts`, `web/src/data/publications.ts`, `web/src/data/outputs.ts` (not in my brief: shared content of the four pages — filters, sort, pagination labels, testimonial, contact, authors, partner logos, CTA copy, the six service CTA cards, sidebar/share/meta labels)
- Cards: `cards/PublicationCard.astro`, `cards/ServiceCtaCard.astro`, `cards/cardFrames.ts` (class workarounds for `CardShell`, see below)
- Blocks: `TestimonialSlider`, `DetailHeader`, `DetailMeta` (meta rows, used by `DetailHeader`), `DetailHeroImage`, `StatGrid`, `TableOfContents` + `tableOfContents.ts` (heading ids and TOC items from HTML), `ShareBar`, `ServiceCtaBand`, `PartnerLogoList`, `CardScroller` (not in my brief: the "Related …" heading and horizontal row used by both detail pages)
- Icons (Figma path data, `currentColor`): `ballot-check`, `box-connection`, `tasks`, `calendars`, `tags`, `attribution-pen`, `download`, `user-headset`, `family-law`, `discussion-idea`, `leadership-alt`, `woman-scientist`, `architect-plan`, `time-quarter-to`, `circle-dashed`, `angle-circle-right`
- Assets `web/src/assets/outputs/`: 11 project thumbnails and 10 project heroes (2x, WebP), 7 publication thumbnails, publication hero and body image, 6 service illustrations, testimonial portrait and logo, contact and author photos, partner logo placeholder, tag logos (Eskom, Stanford, ICCT)

## Components

| Component | Props |
| --- | --- |
| `PublicationCard` | `title`, `excerpt`, `date`, `category` (footer line), `href`, `linkLabel`, `media: { image, alt, sizes, frame: FrameTone } \| null` (`null` = text-only), `class?` |
| `ServiceCtaCard` | `icon`, `iconTone: 'brand-500' \| 'brand-600' \| 'brand-700' \| 'brand-800'`, `frame: 'brand-500' \| 'brand-600'`, `title`, `paragraphs[]`, `link: { label, href }`, `image`, `class?` |
| `ServiceCtaBand` | `tone: 'brand-600' \| 'brand-700'`, `heading`, `primary`, `secondary`, `actions: { label, href, emphasis }[]`; default slot = the card. The card overflows the band; the page adds the spacer below (140 / 119 px desktop, 240 px mobile) |
| `TestimonialSlider` | `variant: 'wide' \| 'compact'`, `heading`, `subline: string \| null`, `label` (region name), `slideLabel` (prefix of the segment buttons), `items[]` (`quote`, `name`, `role`, `portrait`, `logo`, `company`, `paragraphs[]`). One item renders no progress bar |
| `DetailHeader` | `tone: 'red' \| 'maroon'` with `title`, `highlights: { kind: 'list', label, items } \| { kind: 'text', label, text }`, `groups: { icon: 'tools' \| 'services' \| 'authors', label, items }[]`, `meta`; or `tone: 'light'` with `title`, `summary`, `meta`. `meta` = `{ icon: 'calendar' \| 'globe' \| 'tags', label, cells: { layout: 'text' \| 'tags', grow, segments: { text, emphasis }[] }[] }[]`. Contains the page `h1`, sets `data-header-theme`, and draws the 822 px band with its blurred edge on desktop |
| `DetailHeroImage` | `image`, `alt`. Eager, `fetchpriority="high"`. It is `position: relative` so it paints above the header band |
| `StatGrid` | `id`, `title`, `stats: { value, label, icon }[]`, `class?`. Column-major on desktop, stacked on mobile, as both frames show |
| `TableOfContents` | `title`, `items: { id, label }[]` (from `withHeadingIds(html)` / `headingId(title)`) |
| `ShareBar` | `title`, `citation`, `labels: { group, share, cite, pdf, linkCopied, citationCopied }` |
| `PartnerLogoList` | `title`, `logos: { name, image }[]` |
| `CardScroller` | `id`, `title`; default slot = `<li class="shrink-0 snap-start">` items |

Behaviour checked in Chromium by script: testimonial segments scroll the track and update `aria-current`; filter dropdown opens; table of contents moves to the section under the bar and the sidebar is sticky; Cite copies the citation and shows "Citation copied"; Share copies the link when `navigator.share` is missing; Save as PDF calls `window.print`; under print media the header, footer, sidebar, related row and CTA band are hidden. Not checked: `navigator.share` itself (not available in headless Chromium), Firefox, Safari, keyboard-only walkthrough, a real printed PDF.

## For the coordinator

- **`CardShell` / `ProjectCard` gaps, worked around in `cards/cardFrames.ts` with child selectors passed through `class`:**
  - Frame colours: the listings use `#ee2042`, `brand-500/600/700/800/900` and `neutral-800/900/950`; `CardShell` knows `brand` and `bright` only. A `frame` prop with these tones would remove `frameTones`.
  - Partner tag and footer link are independent in Figma (tag only: E-fuels, Openmod; link only: the two ICCT cards; both: Google). `ProjectCard` ties both to `partner`. `partnerDisplays` hides one of them; the hidden half still needs data (a logo for ICCT, a link label for Eskom and Stanford, which are mine).
  - Cards are 475 px high with or without a footer; `ProjectCard` without a partner is 436. `listingCard` adds `min-h-[475px]`.
  - On mobile the frame is a fixed 20 px with a 332 x 238 image; `CardShell` scales it. `listingCard` overrides padding and aspect below `lg`.
  - Card borders sit outside the content, so the text column is 364 px, not 367: "Exploring the Geothermal Resource Potential in the U.S." wraps one word earlier than Figma, and text-only cards are 219 px high (Figma 217).
- `PublicationCard` repeats the body markup of `ProjectCard` (title, excerpt, date row). A shared card body would remove the duplication; I could not edit `ProjectCard`.
- `CtaBanner` uses `p-10 lg:w-0 lg:flex-1` for its halves; with padding the halves are not equal (I measured 673 / 593 with the same pattern before switching `ServiceCtaBand` to a two-column grid).
- UI strings now in `data/outputs.ts`, wanted in `i18n/ui.ts`: pagination labels, `filter.group`, filter names, testimonial region and segment labels, sidebar headings, share labels, meta row labels.
- `main` on the detail pages has `overflow-x-clip` (the related row and the header glow extend past the viewport).
- Print rules live in `ShareBar.astro` as a global `@media print` block: everything outside `main` and every `[data-print='hide']` is hidden.

## Decisions to confirm

- Desktop pagination is not drawn. I render the bottom paginator on desktop (372 px wide, centred) and keep the one above the list mobile-only.
- Mobile frames show 6 / 5 / 5 cards, desktop 11 / 8 / 9. Items beyond the mobile count are hidden below `lg`.
- Sidebars are sticky on desktop (not specified).
- The table of contents lists every `h2`/`h3` of the body plus the stat grid title: five entries. Figma draws four, two of which ("A Study with Eurima…", "Resources") are not headings in the body.
- Every project uses its own title in the header; the placeholder "E-fuels in Australia Title Maximum of 3 Lines Lorem Ipsum" is not reproduced. The title block keeps the three-line height on desktop.
- The service card on the project page has a `brand-500` icon tile (`645:3889`); the same card in the component section (`645:11421`) has `brand-800`. I followed the page.
- The testimonial slider does not auto-advance.
- No hero pair exists for "Exploring the Geothermal Resource Potential in the U.S."; its detail page uses the E-fuels hero and its thumbnail comes from the listing frame.
- All publications share the Eurima hero and body.

## Placeholder content reproduced

- "MM/YYYY - MM/YYYY" on every project; "May 1, 2026 to May 1, 2026", "Australia/Oceania", "#SoftwareDevelopment #Tags" on every detail page.
- One testimonial repeated three times in the slider; one Climact logo six times under Partners; one author row three times ("Name Here 2 Line Max").
- "Outputs" intro "lorem ipsum dolor sit amet"; the three academic cards repeated three times in the text-only list; "Techno-Economic Impacts…" twice in the image list; category "Blog | Category List Here"; titles cut mid-phrase ("…or Methanol on", "…in the Power").
- CTA text "…on your right* adjust secondary CTA here."; Eskom tag on the E-fuels card; related projects list Geothermal twice and includes the current project.
- Filter options other than the "All …" entries, and sort options other than "A to Z", are invented.
- Alt texts are empty on thumbnails and heroes.
- Links with no known target point to `routes.contact`: every link-list row, the inline links in the publication body, contact profile/GitHub/LinkedIn, "Contact Us" and "Request a Demo". Tabs link to their own listing; hero chips are anchors to the list.

## Differences from Figma

- **Figma values were read with read-only Plugin API scripts (geometry, text, fills, strokes, auto-layout), not with `get_design_context`.** The brief asks for `get_design_context` on every section.
- Thumbnails come from the Thumbnail Maker Guide as instructed; the listing frame shows other artwork for Hydrogen (dam) and Google (turbines at sunset).
- Service illustrations are the inner 519 x 238 crop with the frame in CSS; the white pixel block that crosses the frame edge is cut, and the page frames show a different crop of the artwork than the component section I exported.
- Tag logos render smaller than drawn (Stanford) because `ProjectCard` sizes them at 65 % height.
- Link-list labels wrap; Figma truncates "Interact With The Model…" and the DOI on desktop (`LinkListGroup`).
- Mobile partner logos fill their 108 px cells; Figma leaves them at 88 px in the corner.
- The active progress segment has no white inner stroke (`#ffffff` at 44 %).
- Meta cells keep Figma's doubled 1 px borders between cells.
- Off-palette value used as drawn: `#ee2042` (card frame and link colour).

## Verification

Compared by viewing the Figma frame render next to the page screenshot, section by section, and by measuring boxes in the browser.

| Section | 1440 | 412 |
| --- | --- | --- |
| Success stories: header, tabs, filters | compared; 360.5 vs 360 | measured only; 589.6 vs 589 |
| Success stories: card grid | compared; cards 406.3 x 475.3, grid 2062 vs 2060 | measured only; cards 372 x 475 |
| Success stories: testimonials | compared; panels 660 x 317 / 619 x 317 | measured only; 513 / 447 vs 514 / 443 |
| Publications: header and image grid | compared | measured only; header 557.3 vs 557 |
| Publications: "Outputs" and text-only grid | measured (314.5 vs 314), not viewed side by side | measured only |
| Project detail: header, meta, hero | compared; 596 + 712 | compared; all rows match apart from the title |
| Project detail: body, links, sidebar | compared | sidebar and first body screen compared; rest measured |
| Project detail: testimonial, related, CTA band | compared; card 555 vs 554 | compared before the last card fix (link now truncates as in Figma); not viewed again |
| Publication detail: header, hero, body top, stat grid, sidebar | compared; header 534.5 vs 534 | measured only, not viewed |
| Publication detail: links, related, CTA band | compared | measured only, not viewed |
| `DetailHeader` light (event) | compared on `/dev/outputs`; 554.6 vs 554 | rendered without errors, not viewed |
| Six `ServiceCtaCard`s on `/dev/outputs` | rendered without errors, not compared with `645:4959`… individually | not viewed |
| Other project and publication slugs | three home slugs load without errors; not viewed | same |

Widths between 412 and 1440 were not checked.
