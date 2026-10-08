# Report: services

Routes `/services` and `/services/[slug]` (six audiences). Built 2026-10-08. `pnpm check`: 0 errors, 0 warnings (120 files). Prettier run on all files below. No console errors on any of the seven routes at 1440 or 412.

## Files

- Pages: `web/src/pages/services/index.astro`, `web/src/pages/services/[slug].astro`
- Data: `web/src/data/services.ts`
- Components: `web/src/components/cards/ValueCard.astro`, `web/src/components/blocks/ApproachSteps.astro`, `web/src/components/cards/ServiceCard.astro`, `web/src/components/blocks/OfferingList.astro`
- Assets in `web/src/assets/services/`: `how-we-work.webp` (2x export of `662:51093`), `cards/<key>-desktop.webp` and `-mobile.webp` (6 + 6), `intro/<key>.webp` (6), `projects/` (2 thumbnails, 2 partner logos), `values/<icon>-248|207|186.webp` (54)
- Icons added in `web/src/icons/` (28x28, Figma path data, `currentColor`): `data-migration`, `laptop-code`, `workshop`, `book-open-reader`, `search-alt`, `compliance-document`, `plan-strategy`, `data-model`, `team`, `software-development`, `team-check`. Reused icons that other agents had already added: `ballot-check`, `leadership-alt`, `user-headset`, `handshake`, `solar-system`.

## Frame to audience mapping

| Audience (slug) | Desktop | Mobile | Hero / CTA background | CTA collage | Value cards | "How We Work" |
| --- | --- | --- | --- | --- | --- | --- |
| `system-operators-and-utilities` | `662:45991` | `662:55049` | brand-700 / brand-700 | wind | 5 | no |
| `regulators-and-public-authorities` | `662:46520` | `662:57136` | brand-800 / brand-900 | thermalpower | 6 | yes |
| `foundations-and-development-partners` | `662:47083` | `673:60961` | brand-900 / brand-600 | biz | 6 | yes |
| `consultancies-and-engineering-firms` | `662:47631` | `672:58997` | brand-600 / brand-800 | wind | 6 | yes |
| `think-tanks-ngos-and-research-organizations` | `662:48243` | `673:62718` | brand-700 / brand-700 | wind | 5 | yes |
| `technology-developers-and-investors` | `662:48742` | `674:64234` | brand-800 / brand-800 | biz | 5 | yes |

Card artwork nodes (decided by viewing each export): system operators `674:67158` / `674:65973`, consultancies `674:67159` / `674:66128`, think tanks `674:67160` / `674:66242`, regulators `674:67161` / `674:66072`, foundations `674:67162` / `674:66218`, technology `674:67163` / `674:66274`. The catalogue's mobile order was wrong for four of them.

## Components

### `cards/ValueCard.astro` (contract component)

`thumbnail: ImageMetadata`, `label`, `title` (`\n` honoured), `body`, plus two optional additions to the contract: `thumbnailMobile?: ImageMetadata` and `class?`.

- The thumbnail is the pre-composed Figma `card-top` (144 px tall), rendered `h-36 w-full object-cover`. Figma draws it in three widths with a fixed 20 px frame, so one image cannot serve every card width: pass the 248 px export for 5-card rows, the 207 px one for 6-card rows, and the 186 px one as `thumbnailMobile` (used below `lg` through a `<picture>` source). Without `thumbnailMobile` the desktop image is centre-cropped on mobile and loses its side frame.
- Border `#ececec` drawn inside the box (Figma inside stroke), 4 px `brand-500` rule, label 16 Regular, title 20 SemiBold, body 14 Regular.
- The consumer lays out the row. Services index: `grid-cols-2 lg:grid-cols-5`, cards `lg:h-[434px]`, `[&_h3]:lg:min-h-[3lh]` (Figma pads titles with empty lines to align the bodies). Detail pages: `items-start`, ragged heights as drawn. Mobile: two columns, no column gap, 20 px row gap.

### `blocks/ApproachSteps.astro` (contract component)

`columns: 4 | 5`, `steps: { number; title; text; image: ImageMetadata | null }[]`, `illustration: ImageMetadata | null`, `mobile: 'grid' | 'scroll'`, plus optional `placeholder?: string` (text shown in an image cell whose `image` is `null`, "IMG-PLACEHOLDER" in Figma) and `class?`.

- Each step is a column: image cell 416 px tall with the number top left, then the caption cell. 4 columns: caption 22 Medium title, 14 Regular text, padding 16, heights hug (ragged, as drawn). 5 columns: 16 Medium title, 12 Medium text, 12 px number, padding 16/16/16/8, min-height 150 (169 below `lg`), equal heights.
- `illustration` spans the image row (1073x409 at left 119 of 1280, `mix-blend-multiply`), behind the cell borders.
- `mobile="grid"`: 2 columns below `lg`. `mobile="scroll"`: the block keeps a 1280 px width inside a horizontally scrolling, focusable wrapper.
- Outer spacing belongs to the consumer (services uses 40 px above on desktop). Theory of change draws the block full-bleed on mobile: the consumer removes its gutters.
- Not verified against `657:16003` by me beyond the dumped geometry; the bespoke agent owns that comparison. A step `image` renders `object-cover` over the whole image cell (no Figma frame shows real per-step images).

### `cards/ServiceCard.astro`

`title` (`\n` honoured), `paragraphs: string[]`, `link: { label; href }`, `image: { desktop; mobile }`, `class?`. Horizontal from `lg` (172 px artwork, min-height 295), vertical below (372x200 artwork on top). The strip, icon and illustration are one pre-composed image per breakpoint. The link is stretched over the card and truncates with an ellipsis.

### `blocks/OfferingList.astro`

`tag`, `title`, `items: { accent: 'brand-500…900'; icon: SvgComponent; title; text (`\n` honoured); link: { label; href } | null; deliverables: string[] }[]`. Red header band (glow `0 0 40px rgb(238 32 66 / 0.6)`, three pixel blocks from `lg`), rows with a 52 px accent strip, 4 px `brand-500` bottom rule, text column 642fr and numbered list 586fr from `lg`; below `lg` the list goes under the text beside the strip. Numbers are generated from the index. A row with `deliverables: []` keeps the empty right column on desktop.

## Page notes

- `IntroStatement` (home) is wrapped, not edited: `[slug].astro` wraps it in a div with descendant overrides (`introOverrides`). Gaps that made this necessary: photo is 630x460 here (home 630/509); on mobile the photo comes after the text and is full-bleed 412x301 (home: between title and text, inset); mobile top padding 192 and gap 8 (home 160 / 16); mobile paragraphs are stacked 16 px text (home: two columns, 14 px); paragraphs contain blank lines (needs `white-space: pre-line`). The overrides depend on `IntroStatement`'s DOM order (`h2 + div` = media, next `div` = paragraphs). A `variant` prop on `IntroStatement` would replace them.
- `CtaBanner` has one red tone (`brand-600`); the detail pages use four different panel colours. Overridden from a wrapper (`[&>section>div]:bg-brand-…`). Wanted: a `background` prop.
- `ProjectCard` frames are `brand | bright`; the second related card has a `brand-800` frame, overridden through `class` (`[&>div:nth-child(2)]:bg-brand-800`). Wanted: a third frame value.
- Related projects are not in `CardCarousel`: the frames draw a heading above a plain overflowing row of 406.67 px cards (no arrows, no left header column). Implemented as a scroll-snap row that bleeds to the right gutter.
- "How We Work" on detail pages uses `SectionHeading` split with `lg:!items-start` and a 38 px top offset on the columns, because Figma aligns the paragraphs with the title, not the centre of tag + title.
- `Tag tone="light"` has a 32 % white border; the header band in Figma uses a solid white border.
- Header theme: both pages pass `headerTheme="light"`; only the hero sets `data-header-theme`. The bar therefore stays in the light (white text) theme over the cream sections below the hero. I did not find a theme for light sections used by the home page either; the coordinator should decide the default.

## Needed from the coordinator

- UI strings: none new. The scroll regions use the section title as `aria-label`; `ApproachSteps` scroll wrapper is focusable but has no accessible name (needs a `label` prop or an i18n key).
- `web/src/icons/book-open-reader.svg`: another agent created this file a few minutes before my asset export overwrote it with the 28x28 Figma export of the same glyph. Nothing else references it at the moment; check that the other agent's usage sets its size by class.
- Link targets without a designed page, all `routes.contact`: every "More About …" offering link, "Contact Us", "Request a Demo". Related project cards link to `routes.successStory('e-fuels-in-australia')` and `('openmod-meets-usa-2023')`, which may not exist in the outputs data.

## Copy errors in Figma, reproduced as drawn

- Services index CTA and System Operators CTA: heading "Discuss a Technology Modelling Need" with the technology text.
- Foundations card link label: "Explore services for system operators and utilities".
- Think tanks: card says "Research Orgs.", link "Research Organizations", detail page "Research Organisations".
- Step 04 "Engagement & Support" repeats the text of step 03.
- Header tag "How We Work" above "How We Can Help" on all six pages.
- System Operators: "Train and support" repeats the "Build and integrate" description; its link reads "More About Build and integrate"; last row link reads "More About Open-source migration support"; "Lifecycle" card repeats the "Capability" body.
- Regulators: link labels "More About Benchmark and validate" (row 2), "More About Build and integrate" (rows 3 and 4), "More About Open-source migration support" (row 5).
- Consultancies: links only on rows 3, 5, 6; row 5 "More About Build and integrate", row 6 "More About Open-source migration support".
- Foundations, think tanks, technology: no offering links at all. Foundations: "Collection and harmonisations"; "OET can lead technical demanding early work".
- Think tanks: "Sensitivity and uncertainty analysis" listed twice; how-we-work heading has no full stop.
- Technology: `leadership-alt` icon used on two rows.
- "Why OET" heading: "Why OET", "Why Work with OET", "Why work with OET".
- CTA heading capitalisation varies ("Discuss a technology modelling need").

## Placeholder content reproduced

"IMG-PLACEHOLDER" over the illustration in every approach block; project dates "MM/YYYY - MM/YYYY"; the same two related projects on all six pages.

## Assumptions and deliberate deviations

- Mobile frames carry older copy (generic how-we-work heading without paragraphs, "Why OET", a wrong deliverables list on the technology page, a different CTA text on the index, four related cards with a duplicated third project). One content source is used: the desktop copy, on both breakpoints.
- Trailing blank lines and zero-width spaces inside Figma text boxes were removed from the data. Effect: mobile service cards are up to 38 px shorter each, the last offering row about 22 px shorter.
- Project cards: Figma draws the partner logo tag and an empty footer. `ProjectCard` renders a footer link whenever a partner is set, so the footer shows the partner name ("Eskom", "Stanford") linking to the project. Not in the design.
- Gaps around the CTA are normalised to 160 px (Figma: 127 to 163 depending on the page).
- Image alts are empty (decorative treatment); intro photos would deserve real alt text once final.
- Off-palette values used as drawn: `#ececec` (value card border), `rgb(238 32 66 / 0.6)` (band glow).

## Verification

Compared by viewing Figma renders and page screenshots side by side.

| Page | 1440 height (built / Figma) | 412 height (built / Figma) |
| --- | --- | --- |
| Index | 5357 / 5353 | 9867 / 10081 |
| System Operators | 6102 / 6128 | 8604 / 8675 |
| Regulators | 7235 / 7259 | 9931 / 9922 |
| Consultancies | 7463 / 7486 | 10141 / 9942 |
| Foundations | 7412 / 7364 | 10757 / 10327 |
| Think tanks | 6957 / 6968 | 9663 / 9453 |
| Technology | 6919 / 6878 | 9952 / 9621 |

Mobile detail pages are taller mainly because the desktop how-we-work heading and paragraphs are shown where the mobile frames have the short generic heading.

| Section | 1440 | 412 | Remaining differences |
| --- | --- | --- | --- |
| Index hero | compared | compared | none seen |
| Index intro | compared | compared | none seen |
| Service cards | compared | compared | one link ("Regulators…") truncates where Figma fits it; mobile cards shorter (see above); the fifth card sits 3 px lower in Figma |
| Index how we work | compared | compared (first column and scroll) | step 01 text wraps to 7 lines (Figma 6) |
| Index why OET | compared | compared | none seen |
| Index CTA | compared | compared | mobile text is the desktop text |
| Detail hero | compared (system operators, foundations via Figma only) | compared (regulators, technology) | mobile hero about 19 px taller on technology (long lead; `PageHero`) |
| Detail intro | compared (system operators) | compared (regulators, technology) | text columns are 10 px apart as in the home component |
| Offerings | compared (system operators) | compared (regulators, technology) | tag border lighter than Figma |
| Why OET | compared (system operators) | compared (regulators, technology) | none seen |
| Detail how we work | compared (regulators) | compared (regulators, technology) | mobile copy differs by design decision above |
| Related projects | compared (system operators) | compared (regulators) | footer link text added; two cards instead of four on mobile |
| Detail CTA | compared (system operators, regulators) | compared (regulators) | thermal-power collage sits about 15 px lower than Figma on desktop (`CtaBanner`) |

Not compared visually: desktop and mobile of consultancies, foundations (desktop Figma viewed, built page not), think tanks; desktop of technology; mobile of system operators. They use the same template and were only checked for height and console errors. Not checked: widths between 412 and 1440, keyboard walkthrough, Firefox, Safari, production build.
