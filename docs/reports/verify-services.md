# Report: verify-services

Visual verification of `/services` and the six `/services/[slug]` pages against Figma at 1440 and 412, plus the two contract components in their other consumers. 2026-10-08.

Final state: `prettier --check` clean on the seven files below; `pnpm check` 0 errors, 0 warnings, 0 hints (146 files); `node scripts/sweep.mjs` 56 routes, no broken links; no console errors on the seven routes at either width. `pnpm build` not run (not allowed in this pass).

## Method

- Figma: every frame rendered at 1:1 with `get_screenshot` (`maxDimension` = frame height) and its node tree dumped with `get_metadata`.
- Page: `scripts/shoot.mjs` full-page shots at 1440 and 412.
- Numeric comparison: a script matched every Figma text node to the DOM element with the same text and printed the offset in x, y, width and height (about 830 matched nodes on desktop, 910 on mobile). Any change in the y offset between two consecutive nodes is a spacing difference; that is how the differences below were located to the pixel.
- Visual comparison: both renders cut into matching strips (1100 px desktop, 1400 px mobile), aligned per strip with the measured offset, viewed side by side.
- Exact values for doubtful spots from `get_design_context`: `662:46054`, `662:55647` (band), `662:46062` (offering row), `662:51482` (service card), `662:47853` (bulleted row), `662:51094`, `657:15991` (step cells), `662:46797`, `662:42564`, `662:51083`, `662:53181`.
- Working files (scripts, Figma renders, strips, measurements `e1440.txt` / `e412.txt`): `web/.screenshots/vs/`.

Limits of what was looked at:

- All seven pages were viewed in strips at 1440 before the fixes. After the fixes I re-viewed a sample (index 1440 and 412, system operators 1440 and 412, regulators 1440 and 412, consultancies 1440, foundations, think tanks and technology 1440 from the pass in between) and relied on the re-run measurements for the rest. Mobile strips of foundations, consultancies, think tanks and technology were checked by measurement only after the first viewing pass.
- Full-page screenshots miss lazy images below the fold (CTA collage, approach illustration, footer glow appear empty in some shots). I confirmed in the viewport that the regulators CTA (1440 and 412) and the approach illustration load; the other pages' CTAs were not re-checked in the viewport.
- Not checked: hover and focus states, widths between 412 and 1440, Firefox, Safari.

## Page heights (built / Figma)

| Page | 1440 | 412 |
| --- | --- | --- |
| Index | 5355 / 5353 | 9957 / 10081 |
| System operators | 6104 / 6128 | 8641 / 8675 |
| Regulators | 7214 / 7259 | 10009 / 9922 |
| Foundations | 7408 / 7364 | 10777 / 10327 |
| Consultancies | 7465 / 7486 | 10219 / 9942 |
| Think tanks | 6953 / 6968 | 9699 / 9453 |
| Technology | 6920 / 6878 | 9990 / 9621 |

The remaining desktop differences are all accounted for in "Differences left as they are". Mobile differences are dominated by the single-content-source decision (desktop how-we-work heading and paragraphs on mobile).

## Fixes made

| # | File | Difference found | Fix |
| --- | --- | --- | --- |
| 1 | `blocks/ApproachSteps.astro` | Cell borders took layout space: text 1 px too far right and down, text column 2.2 px too narrow (step 01 wrapped to 7 lines, Figma 6); lines between cells were 2 px of solid `neutral-200`. Figma cells have 16 px padding with a stroke that takes no space, and adjacent strokes read as one 1 px line | Borders are now pseudo-element lines that take no space (one line per shared edge), padding back to 16 (8 on the left of the 5-column caption). Step 01 now wraps as in Figma; 4-column block is 644 px (Figma 644), 5-column block 566 px (Figma 566) |
| 2 | `blocks/ApproachSteps.astro` | Line heights 24.64 / 16.8 / 19.2 / 14.4 where Figma lays out whole pixels (25 / 17 / 19 / 14); the 5-column caption grew past its 150 / 169 px height | Whole-pixel line heights per variant. Mobile grid row is 585 px (Figma 585) |
| 3 | `blocks/OfferingList.astro` | Header band 158.3 px, Figma 160 with content centred and a 1 px `brand-500` stroke | `min-h-40`, centred, 1 px border, 39 px vertical padding; pixel blocks offset by the border |
| 4 | `blocks/OfferingList.astro` | Band glow too wide (40 px blur) | 30 px blur; falloff sampled against the Figma render (Figma states a 20 px drop shadow, 20 px CSS blur measured too tight) |
| 5 | `blocks/OfferingList.astro` | Rows drifted about 1.5 px each (18 px text at 21.6, list at 19.2, title at 24.64) | 22 / 19 / 25 px line heights. Row positions now constant against Figma through the whole list on all six pages |
| 6 | `blocks/OfferingList.astro`, `data/services.ts` | Consultancies "Delivery partnerships": Figma draws a bulleted list (`662:47853`, 27 px indent); built page had plain lines | `text` is now `(string \| { list: string[] })[]`; the row renders a `ul`. Words unchanged. All 32 offering texts wrapped in an array |
| 7 | `blocks/OfferingList.astro`, `cards/ServiceCard.astro` | Link colour `brand-600`; Figma `#e31937` (`brand-500`). Service card link gap 12, Figma 6 | `text-brand-500`, `gap-[6px]` |
| 8 | `cards/ServiceCard.astro` | Title and text line heights (24.64 / 19.2) | 25 / 19 px, paragraph gap 19 px |
| 9 | `cards/ValueCard.astro` | Label and body line heights (19.2 / 16.8); cards up to 2.8 px short | 19 / 17 px. Body heights now equal Figma on every card that wraps the same |
| 10 | `cards/ValueCard.astro` | `titleLines="three"` reserved nothing on mobile; index mobile frame reserves four lines | `min-h-[4lh] lg:min-h-[3lh]` |
| 11 | `pages/services/index.astro`, `[slug].astro` | The left rule and the value-grid rules were real borders: all content sat 1 px right of Figma, the value grid 2 px right and 1 px low, cards 247.6 px instead of 248 | Rule drawn as a pseudo-element, grid top rule as an inset shadow. Headings, cards and rows are now at dx = 0 |
| 12 | `pages/services/index.astro`, `[slug].astro` | Mobile: 12 px between the approach heading and the steps; Figma 52 (`662:42561`: heading ends 5326, steps 5378) | `pt-[52px] lg:pt-10` |
| 13 | `pages/services/[slug].astro` | Mobile: 20 px between "Related Projects" and the cards; Figma 40 (`662:55049`: heading box ends 5991, cards 6011, plus 20 padding) | `pt-5 pb-10` on the heading below `lg` |

## Per-section record

"Compared" = viewed side by side and measured. "Measured" = numeric comparison only after the first viewing pass.

### `/services` (`662:51024` / `662:42561`)

| Section | 1440 | 412 | Difference found | State |
| --- | --- | --- | --- | --- |
| Hero | compared | compared | none | — |
| Intro heading | compared | compared | 412: title 4 px low, paragraphs 18 px low (tag gap 8 and paragraph gap 16 in Figma) | shared: `SectionHeading`, item A |
| Service cards | compared | compared | link colour and gap; line heights. Fifth card 3 px lower in Figma only. 412: Figma text boxes end in two blank lines (38 px) | fixed (7, 8); blank lines left |
| How we work | compared | compared | cell borders, wrap of step 01, 412 gap under heading | fixed (1, 2, 12) |
| Why OET | compared | compared | 1–2 px grid offset, body line height, 412 title height | fixed (9, 10, 11) |
| CTA | compared | compared | 412 text is the desktop text (decision) | — |

### Detail pages

Frames: system operators `662:45991` / `662:55049`, regulators `662:46520` / `662:57136`, foundations `662:47083` / `673:60961`, consultancies `662:47631` / `672:58997`, think tanks `662:48243` / `673:62718`, technology `662:48742` / `674:64234`.

| Section | System op. | Regulators | Foundations | Consultancies | Think tanks | Technology | Difference found | State |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hero 1440 | compared | compared | compared | compared | compared | compared | think tanks: title 24 px lower (Figma lead box has a blank fourth line) | left (copy artefact) |
| Hero 412 | compared | compared | measured | measured | measured | measured | regulators: title breaks "Regulators and / Public" where Figma breaks "Regulators / and Public" | shared: `PageHero`, item F |
| Intro 1440 | compared | compared | compared | compared | compared | compared | text columns 270 + 10 + 270; Figma 265 + 20 + 265 | shared: `IntroStatement`, item B |
| Intro 412 | compared | compared | measured | measured | measured | measured | none beyond copy | — |
| Offering band | compared | compared | compared | compared | compared | compared | height, glow, tag border | fixed (3, 4); tag border shared, item C |
| Offering rows | compared | compared | compared | compared | compared | compared | drift, link colour, bullets (consultancies) | fixed (5, 6, 7) |
| Why OET | compared | compared | compared | compared | compared | compared | offsets, line heights; regulators card 2 title wraps to 3 lines, Figma 4 | fixed (9, 11); wrap left |
| How we work heading | n/a | compared | compared | compared | compared | compared | foundations, think tanks, technology: paragraphs 8 px higher than Figma | shared: `SectionHeading`, item D |
| How we work steps | n/a | compared | compared | compared | compared | compared | as on the index | fixed (1, 2, 12) |
| Related projects | compared | compared | compared | compared | compared | compared | 412 gap under heading; Stanford logo smaller than Figma; card text 2 px narrow | fixed (13); shared, items E and G |
| CTA | compared | compared | compared | compared | compared | compared | "biz" collage rock has a blue cast (foundations, technology) | shared: item H |

412 columns for foundations, consultancies, think tanks, technology: viewed once before the fixes, then measured.

### Contract components in other consumers

| Component | Consumer | 1440 | 412 | Result |
| --- | --- | --- | --- | --- |
| `ApproachSteps columns={5}` | theory of change `657:16003` / grid in `657:14499` (`657:16103`) | compared | compared | After fixes 1 and 2: every number, title and text at dx = 0, dw = 0; block 566 px (Figma 566); mobile row 585 px (Figma 585); lines 1 px. Remaining: on mobile the placeholder word breaks "PLACEHOLD / ER" where Figma breaks "PLACEHOL / DER" (placeholder text) |
| `ValueCard` | About `648:15307` (`648:15446`) / `648:16936` | compared | compared | Desktop row matches (485 px in Figma, 483 before fix 9). Mobile: the About page passes no `thumbnailMobile`, so the 213 px artwork is centre-cropped and its 20 px side frame is lost — item I |

## Differences left as they are

- **Per-page gaps in Figma that the template normalises.** Measured from the frames:

  | Gap | System op. | Regulators | Foundations | Consultancies | Think tanks | Technology | Built |
  | --- | --- | --- | --- | --- | --- | --- | --- |
  | Offering list bottom padding | 40 | 40 | 0 | 40 | 40 | 40 | 40 |
  | Extra gap before "Why OET" | 32 | 0 | 0 | 0 | 0 | 0 | 0 |
  | Cards to CTA | 127 | 160 | 160 | 160 | 160 | 120 | 160 |

  These explain −33 (system operators), +40 (foundations) and +40 (technology) of the desktop height differences. One template with one spacing is kept; if the designer confirms a value per page it would become a layout field in `services.ts`.
- **Trailing blank lines in Figma text boxes** (removed from data by the builder, kept that way): last offering row without deliverables on system operators, regulators and consultancies (−22 px each); think tanks row 2 last list item (−19 px); mobile service cards (−38 px each); intro paragraphs (−18 px where the text column is taller than the photo).
- **Wraps that fall on the edge.** Regulators value card "Expertise across the open modelling ecosystem" fits three lines in the browser and four in Figma at the same 182.67 px width (−24 px on that row). Steps 03 and 04 wrap to five lines, Figma six, at the same 258 px. No forced breaks were added.
- **Copy errors** listed in `docs/reports/services.md`: unchanged.
- **Mobile copy**: desktop copy on both breakpoints (decision).

## Changes needed in shared components (not edited)

| # | File | Change | Evidence |
| --- | --- | --- | --- |
| A | `ui/SectionHeading.astro` | `gap` is one value for both breakpoints. Mobile frames use 8 px between tag and title where desktop uses 12 (`662:42563`: tag ends 1028, title 1036; `662:55049`: 4263 / 4271). In the split layout on mobile the columns start 16 px under the title (8 gap + 8 padding), built 28 (`gap-5` + `pt-2`). Needs a mobile gap value, and `gap-2` below `lg` for the split row | index 412: title +3.9, paragraphs +18.1 |
| B | `blocks/IntroStatement.astro`, `variant="service"` | Desktop paragraph columns: gap 20 px (two 265 px columns), built 10 px (two 270 px) | `662:46050`: columns at x = 120 and 405; second column dx = −5, dw = +5 on all six pages |
| C | `ui/Tag.astro` | `tone="light"` border is 32 % white; the offering band draws a solid white 1 px border with `rgba(0,0,0,0.02)` fill | `662:46055` |
| D | `ui/SectionHeading.astro`, `align="title"` | Column offset is 38 px. With two columns Figma has 46 (the column frame carries 8 px top padding); with one column 38 | foundations `662:47464` y = 4256, text 4264; think tanks, technology the same; regulators `662:46885`, consultancies `662:48015` at the title's y |
| E | `cards/ProjectCard.astro` | Partner logo is always 65 % of the 40 px tag (26 px). Figma: Eskom 73 × 26, Stanford 98.8 × 35 in a 112.5 × 40 tag. Needs a per-logo height (or pre-composed tag images) | `662:46353`, `662:46375` |
| F | `blocks/PageHero.astro` | Mobile title on regulators wraps one word later than Figma; think tanks desktop lead box is one line taller in Figma (blank line). Check the mobile title width against `662:57278` (372 px) | strips `regulators-412-00`, `think-1440-00` |
| G | `cards/CardShell.astro` | The 1 px card border takes layout space: card text is 1 px right and 2 px narrower than Figma (inside stroke) | related cards dx = 1, dw = −1.8 |
| H | `blocks/CtaBanner.astro` asset | "biz" collage: the rock is neutral grey in Figma, blue-tinted in the export | `662:47566`, crop `strips/z3.png` |
| I | `data` of the About page | Pass `thumbnailMobile` (186 px export of each value thumbnail) to `ValueCard`, as services does | `648:16936` values grid |
| J | `styles/global.css` (suggestion) | Figma lays out every text style on whole-pixel lines (16 → 19, 14 → 17, 18 → 22, 12 → 14, 22 → 25). The tokens use the ratios (19.2, 16.8, 21.6, 14.4, 24.64), which drifts 0.2–0.6 px per line everywhere. I set whole-pixel `leading-[…]` locally in the four service components; fixing the tokens would let those overrides go and would affect every page | text heights in all 14 frames |

## Files changed

- `web/src/pages/services/index.astro`
- `web/src/pages/services/[slug].astro`
- `web/src/components/cards/ServiceCard.astro`
- `web/src/components/cards/ValueCard.astro`
- `web/src/components/blocks/OfferingList.astro`
- `web/src/components/blocks/ApproachSteps.astro`
- `web/src/data/services.ts` (offering `text` type and array wrapping; the one bulleted row; no wording changed)

`ApproachSteps` and `ValueCard` changes also alter `/organization/theory-of-change` and `/organization/about` (owned by other agents): both were re-shot and compared as recorded above.

## Pitfalls for the next agent

- `MSYS_NO_PATHCONV=1` breaks `pnpm` in Git Bash (corepack path is rewritten). Set it per `node` command, not with `export` before a `pnpm` call.
- Full-page screenshots from `shoot.mjs` can miss lazy images below the fold; capture the element in the viewport before calling an image missing.
