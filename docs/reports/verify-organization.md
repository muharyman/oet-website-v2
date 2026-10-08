# Report: verify-organization

Visual verification of `/` and the ten organization routes against their Figma frames at 1440 and 412, 2026-10-08.

Final state: `pnpm check` 0 errors, 0 warnings, 0 hints (146 files). Prettier run on every file I changed. All 22 final screenshots: `scrollWidth` equals the viewport, no console errors. `pnpm build` not run.

## Method

- Figma: every frame rendered whole at 1x with `get_screenshot` (`maxDimension` above the frame height returns the native size), saved to `web/.screenshots/vo/figma/`.
- Build: `web/.screenshots/vo/shoot.mjs` (reduced motion, animations off, waits for images and decodes them, prints `scrollWidth`, page height and section offsets). Final shots in `web/.screenshots/vo/r2/`.
- `web/.screenshots/vo/cmp.mjs` cuts the same vertical strip from both and writes them side by side (`web/.screenshots/vo/cmp/`); these were viewed with the Read tool. `probe.mjs` runs a measuring script in the page; `shift.mjs` finds the pixel offset between two crops.
- Exact values from `get_design_context` / `get_metadata` and, while it was available, a read-only `use_figma` script. `use_figma` stopped working part-way through ("needs a Full seat"), so later values come from `get_metadata` and `get_design_context` only.

Caveat on the record below: my first round of strips (department details, theory of change, team) was viewed before the fixes and those images are no longer available to me. For those pages the "compared" column refers to the final-state strips I viewed again at the end, which are named in each table. Where I only viewed a section before the fixes and not after, it says so.

## Page heights after the pass

| Route | Figma 1440 | Built | Figma 412 | Built | Was (412) |
| --- | --- | --- | --- | --- | --- |
| `/` | 6154 (+1200 pin distance, stacked mode differs) | 7127 | 9930 | 9934 | 9935 |
| about | 4876 | 4875 | 9390 | 9390 | 9390 |
| departments | 3582 | 3583 | 6076 | 6079 | 6079 |
| energy-system-modeling | 2906 | 2907 | 3881 | 3883 | 3842 |
| modeling-tools-and-data | 2878 | 2878 | 3881 | 3876 | 3837 |
| software-engineering | 2759 | 2760 | 3651 | 3652 | 3630 |
| research-and-market-development | 2256 | 2257 | 3184 | 3185 | 3185 |
| partners | 2400 | 2400 | 3628 | 3627 | 3627 |
| career | 3647 | 3648 | 6111 | 6107 | 6113 |
| team | 4651 | 4650 | 7437 | 7437 | 7434 |
| theory-of-change (stacked, +1800 as designed by the bespoke agent) | 5273 | 7075 | 6927 | 8740 | 8744 |

## Fixes made

### Department detail pages (`pages/organization/departments/[slug].astro`, `data/departments.ts`, `blocks/WorkTopicGrid.astro`)

- **Project cards on mobile are now 406.67 px wide**, as Figma draws them (`648:19709`, `648:20130`, `648:20368`), in the existing scroll row. The row starts at the viewport edge below `lg` (`-ml-[21px]`), cards snap to the centre, first and last card carry a 2.67 px margin, so a snapped card sits at x = 2.67…409.33 exactly as the single card in `648:20131`. Width is `w-[406.67px] max-w-[calc(100vw-5.33px)]` so narrower phones keep the same 2.67 px inset. No horizontal page overflow (`scrollWidth` 412 on all four pages).
- **Text column width per page.** Figma's mobile text column is 326 px on Energy System Modeling (`648:19677` is 366 wide) and 332 px on the other three (372 wide). The build used 332 everywhere, which changed the wrapping on Energy System Modeling. New layout field `mobileColumn: 326 | 332` on `DepartmentDetail`; the page maps it to the right padding.
- **`WorkTopicGrid` descriptions are medium weight** (`648:20120`: Body-M-S Medium, was regular). This also restores Figma's wrapping in the two Modeling Tools & Data cells.
- Heights: see table. Energy System Modeling went from −39 to +2, Modeling Tools & Data from −44 to −5, Software Engineering from −21 to +1.

### Theory of change (`pages/organization/theory-of-change.astro`, `data/theory-of-change.ts`)

- **1 px overflow at 412: found and fixed.** Cause: the placeholder word "PLACEHOLDER" (22 px bold, `text-heading-4`) in the right-hand column of `ApproachSteps` is 144 px wide; the slot was 142 px (206 px cell − 2 border − 32 padding − 20 number − 10 gap), so the ink of the right column reached x = 413. Confirmed by measurement: with 16 px cell padding and no wrapping rule `scrollWidth` is 413; with either remedy it is 412. Two remedies are now in place: I pass `class="break-words"` to `ApproachSteps` from the page, and another agent changed the cell padding in `ApproachSteps` to 15 px during my run (which gives Figma's 144 px slot). Either alone is enough.
- Step 03 title breaks after "Reliable" as in Figma (`657:16088`, `657:16184`: "Provide Reliable \nSupport"): `\n` added in the data (the component already renders `pre-line`; the words are unchanged).
- Left rule on desktop now runs 118 px into the globe section (Figma `656:13760`), instead of stopping at the globe: the rule's pseudo-element extends below its wrapper and the wrapper is stacked above the globe.

### Team (`pages/organization/team.astro`, `blocks/ContinentStats.astro`, `cards/TeamCard.astro`, `interactive/TeamGlobe.astro`)

- Mobile pagination spacing follows the instances: top one `pt-5 pb-10` (`654:3158`, padding 20/40), bottom one `pt-10 pb-5` (`653:3126`, 40/20). Was 30/30 on both, which put the cards 10 px too high.
- `ContinentStats` line heights rounded as in Figma (22 px for 18 px text, 17 px for 14 px text): mobile block is 332 px (Figma 212 + 120), was 329.6. Page height now equals Figma (7437).
- `TeamCard` tag line: right padding removed so the line is clipped at the card edge as drawn (`653:2901` clips, text 267 wide) before the ellipsis starts.
- `TeamGlobe` pins: padding 0.7856em and `min-h-[2.929em]` (Figma `651:32429`: 6.797 px padding at 7.93 px text, pin 36.3 × 23.2); the pins were slightly too tall.
- `TeamGlobe` fade on mobile: Figma's fade rectangle (`651:32448`) is not scaled with the globe on mobile (1057 × 537 at x = −196.7, y = 1232 in a stage scaled 0.763). The team variant now positions it with those absolute values below `lg`; desktop and the decorative variant are unchanged. Markup and styles only; the script is untouched.

### Home (`blocks/ServiceAccordion.astro`, `blocks/LogoRow.astro`, `blocks/LogoGrid.astro`, `data/home.ts`)

- **Accordion text offset.** The item column had a border on every side plus a border on every item, which pushed text 2 px right and down and doubled the rules. Now one rule between items and one between image and list (desktop). Body text uses Figma's rounded 17 px line and paragraph gap. Measured on mobile after the border change: closed items 56 and 80 px as in Figma, the last one 79 plus the outer border; number at x = 32, title at x = 54 (Figma 32 / 54). The open item was 340.2 px before the line-height change (Figma 342) and was not re-measured afterwards; the home mobile page is 9934 against 9930.
- **Logo size on mobile.** The mobile partner grid drew the desktop sizes scaled down by the cell. The sizes are now the ones in the mobile frames (`196:3653`…`196:4402`), set as layout fields on the mobile list in `data/home.ts`: BMBF 69×36, Verfassungsschutz 69×36, EDF 76×25, CCG 55×55, Agora 69×30, ICCT 67×40, Sequoia 69×22, Quadrature 69×21, Climact 54×41, Breakthrough 70×22. `LogoGrid` cell padding is 4 px below `lg` so the 81 px TransnetBW logo (the "69 instead of 81" in the home report) and the 76 px logos fit their 93 px cells.
- `LogoGrid` label: 18 px on both widths and `neutral-900` (`196:3655`, `643:4621`; was 16 px on mobile and `neutral-800`).
- `LogoRow` (tools) on mobile: outer cell borders removed at the left and right edge and the doubled rule between the two rows replaced by a single one, as in `196:2487` / `196:2693`.

### Career (`blocks/NumberedStepList.astro`)

- Step text uses the rounded 19 px line below `lg` (`650:28151`: rows 89 / 70 / 127); the list is 890 px (was 895.6).

## Changes needed in shared components (not mine to edit)

1. **`blocks/HomeHero.astro`, mobile image crop.** Measured with `shift.mjs` on the turbine at the right edge (x 365–398, y 100–480): the build's photo sits **7 px to the right and 1 px lower** than Figma `196:2328`. It is a horizontal offset, not the "about 15 px low" in the home report. Change the mobile crop position by −7 px in x (object-position or the crop of the mobile asset).
2. **`blocks/HomeHero.astro`, mobile text block.** Title starts 2–3 px higher than Figma and the text boxes start 3 px higher (strip `home-412-0`); the boxes are 372 px wide (Figma 373, the frame is 413).
3. **`cards/CardBody.astro`, first home project card.** Figma `196:4507` (mobile) and the desktop card show the title on three lines with a one-line excerpt; the component clamps the title to two lines (`line-clamp-2 min-h-[2lh]`) and the excerpt to three. Needed: a prop such as `titleLines: 2 | 3` where 3 gives `line-clamp-3` on the title and `line-clamp-1` on the excerpt, used by the first home card only (the other cards and all listings have two-line titles). `ProjectCard` has to pass it through.
4. **`blocks/CardCarousel.astro`, home desktop.** With three cards the row does not overflow, so "next" is disabled; Figma draws it active (red). Unchanged from the home report.
5. **`blocks/PageHero.astro`, glow under the red band.** Every hero frame has a second red rectangle with a 40 px layer blur behind the band (`656:13817`, `657:14533`, `648:19306`, `650:21858`), which shows as a soft red glow 20–30 px below the band on the page background. Home reproduces it; `PageHero` ends with a hard edge on all ten organization pages, both widths.
6. **`blocks/PageHero.astro`, left layouts on mobile, title position.** Still as recorded in the reconcile report: department index title 58 px lower than Figma, career 15 px, partners 18 px (Figma wraps the title or lead onto one more line). Not a spacing error.
7. **`ui/SectionHeading.astro`, `columnStyle="body-lg"`.** Lines are 21.6 px; Figma rounds to 22 (`650:27958`: paragraphs 88 / 110 / 66). The career heading block is 677.6 px, Figma 682; this is the −4 on the career mobile page.
8. **`blocks/StatStrip.astro`** is in my list but I left it: the "Partners" icon in the build (`handshake.svg`) is a different glyph from the one in Figma `163:10332` (Figma shows a heart-shaped handshake). The icon file belongs to the home agent's set; replace `src/icons/handshake.svg` with the Figma asset.
9. **`blocks/ApproachSteps.astro`.** After the other agent's padding change the theory page is 7075 / 8740 (Figma + 1800: 7073 / 8727). The remaining +13 on mobile is in the step rows; not investigated further.
10. Light text on dark heroes looks heavier in the build than in the Figma render on every page (hero leads, stat labels, header). The Figma nodes are Regular / Medium as coded (`648:20263` Regular 16), so I believe this is rasteriser difference between Figma and Chromium on Windows, not a weight error. Not verified on another platform.

## Per-section record

"Compared" means a side-by-side strip of the final build against Figma was viewed. Strip names are files in `web/.screenshots/vo/cmp/`.

### `/` (`162:686`, `196:1458`)

| Section | 1440 | 412 | Difference | Status |
| --- | --- | --- | --- | --- |
| Hero | compared | compared | image 7 px right on mobile; text 2–3 px high; Figma shows the open mega menu on desktop | shared, items 1–2 |
| Intro + image | compared | compared | none seen | — |
| Stat strip | compared (zoomed) | absent as designed | Partners icon glyph | shared, item 8 |
| Services heading + accordion | compared | compared | text offset, doubled rules, line height | fixed |
| Tools heading + logo row | compared | compared | mobile row borders | fixed |
| Vertical carousel | not compared (pinned; stacked render differs from the frame) | compared | mobile images slightly different crops, 8 px taller in total (as in the home report) | not fixed |
| Partner logo grid | compared | compared | mobile logo sizes, label size and colour | fixed |
| Projects | compared | compared | first card title clamp; "next" disabled on desktop | shared, items 3–4 |

Accordion open states 2–6 were not compared.

### `/organization/about` (`648:15307`, `648:16936`)

| Section | 1440 | 412 | Difference | Status |
| --- | --- | --- | --- | --- |
| Hero | compared | compared | glow under band | shared, item 5 |
| Vision + image-info cards | compared | compared | none seen | — |
| Departments heading + four cards | compared | compared | summary ellipsis one word earlier or later on some cards; cards sit 3–5 px lower on mobile from the middle of the section on | not fixed (cause not found) |
| Values | compared | compared | none seen | — |

### `/organization/departments` (`648:16265`, `648:18733`)

| Section | 1440 | 412 | Difference | Status |
| --- | --- | --- | --- | --- |
| Hero | compared | compared | mobile title 58 px lower; glow | shared, items 5–6 |
| Heading | compared | compared | none seen | — |
| Seven cards | compared | compared | ellipsis position on some summaries; +3 px over the page on mobile | not fixed |

### Department details (`648:15690` / `648:19300`, `648:15897` / `648:19806`, `648:16025` / `648:20154`, `648:16167` / `648:20417`)

| Page / section | 1440 | 412 | Difference | Status |
| --- | --- | --- | --- | --- |
| Software Engineering: hero, about, works, projects | viewed before the fixes only | compared, whole page (`se-412-0`, `se-412-1200`) | text wraps line for line; cards 406 wide; Figma draws the row scrolled between two cards, the build shows the first card snapped | fixed |
| Modeling Tools & Data: about, works, topic grid, outro | viewed before the fixes only | compared (`mtd-412-700`) | wraps line for line incl. both topic cells; page −5 px | fixed; −5 not traced |
| Modeling Tools & Data: hero, project card | viewed before the fixes only | viewed before the last fix only | card position follows the same code as the other pages | fixed, not re-viewed |
| Energy System Modeling: project row | viewed before the fixes only | compared (`esm-412-1900`) | cards 406 wide; Figma scrolled to the second card | fixed |
| Energy System Modeling: hero, about, works, topic grid | viewed before the fixes only | not re-viewed after the column-width fix | height now +2 (was −39), which is consistent with matching wraps | fixed, not re-viewed |
| Research and Market Development | viewed before the fixes only | not re-viewed (no code path changed for it except the unchanged 332 column) | page +1 | — |

Desktop department pages were not changed by this pass except the medium weight of topic descriptions (Modeling Tools & Data only has descriptions); desktop heights are unchanged.

### `/organization/partners` (`650:26653`, `650:26878`)

| Section | 1440 | 412 | Difference | Status |
| --- | --- | --- | --- | --- |
| Hero | compared | compared | mobile title 18 px lower; glow | shared, items 5–6 |
| Intro, tabs, logo grid | compared | compared | none seen (viewed before the `LogoGrid` padding change; heights unchanged afterwards, mobile uses the two-column grid with larger cells) | — |

### `/organization/career` (`650:27431`, `650:21852`)

| Section | 1440 | 412 | Difference | Status |
| --- | --- | --- | --- | --- |
| Hero | not compared | compared | mobile title 15 px lower; glow | shared, items 5–6 |
| Open roles heading | not compared | compared | 4 px shorter (line height) | shared, item 7 |
| Job cards | not compared | compared (first three) | none seen | — |
| Hiring process | not compared | measured, not viewed | list 895.6 px, Figma 890 | fixed (page 6 px shorter after the change; list not re-measured) |

The career desktop strip failed to generate and I did not retry; desktop height is 3648 against 3647.

### `/organization/team` (`650:24621`, `651:28624`)

| Section | 1440 | 412 | Difference | Status |
| --- | --- | --- | --- | --- |
| Hero | viewed before the fixes only | viewed before the fixes only | — | — |
| Heading + buttons | viewed before the fixes only | viewed before the fixes only | — | — |
| Globe default view (`650:24685`, `651:31640`) | compared (`team-1440-940`) | compared (`team-412-1140`) | desktop: Hawaii is red in the build, not in Figma; rim pins within a few px. Mobile: pins, highlight and fade match | pin size and mobile fade fixed; Hawaii not fixed (script) |
| Continent stats | compared | compared | line heights; "Antarctic / a" breaks one letter later than Figma's "Antarct / ica" | heights fixed; break not fixed |
| Meet The Team header, tabs, sort | compared | compared | was 2–3 px high on mobile because of the stats block above; aligned within about 1 px after that fix | fixed |
| Cards, pagination | compared (rows 1–4) | compared (8 cards) | pagination spacing; tag-line clipping. Desktop pagination is not in Figma | fixed |

### `/organization/theory-of-change` (`656:12898`, `657:14499`)

| Section | 1440 | 412 | Difference | Status |
| --- | --- | --- | --- | --- |
| Hero | compared (`toc-1440-0`) | compared (`toc-412-0`) | title, lead, columns and button positions match within 1–2 px; glow under band missing; text looks heavier (item 10) | shared, item 5 |
| Scroll scene | viewed before the fixes only (stacked panels) | viewed before the fixes only | three stacked panels where Figma has one | by design of the bespoke agent |
| Approach heading + steps | compared (heading, before the last fix) | viewed before the fixes only | step 03 title break; mobile rows +13 px | title fixed; rows item 9 |
| Output and Outcomes + matrix | viewed before the fixes only | viewed before the fixes only | — | — |
| Impact + decorative globe | compared (`toc-1440-3500`) | viewed before the fixes only | left rule now enters the globe section as drawn; pins match | fixed |
| Horizontal overflow at 412 | — | measured | 413 → 412 | fixed |

## Not done

- Hawaii highlight on the team globe (needs the globe geometry or script).
- The 3–5 px drift in the About and department-index card lists on mobile, and the −5 px on Modeling Tools & Data mobile.
- Career desktop, accordion states 2–6, the pinned (motion) modes of the home carousel and the theory scene, widths between 412 and 1440, other browsers.
- One mistake during the run: an edit script wrote a literal line break into `data/theory-of-change.ts`, which made `/organization/theory-of-change` return 500 on the shared dev server for about two minutes until I corrected it.

## Files changed

- `web/src/pages/organization/departments/[slug].astro`, `web/src/pages/organization/team.astro`, `web/src/pages/organization/theory-of-change.astro`
- `web/src/components/blocks/{WorkTopicGrid,ServiceAccordion,LogoRow,LogoGrid,ContinentStats,NumberedStepList}.astro`, `web/src/components/cards/TeamCard.astro`, `web/src/components/interactive/TeamGlobe.astro`
- `web/src/data/departments.ts` (`mobileColumn`), `web/src/data/home.ts` (mobile logo sizes), `web/src/data/theory-of-change.ts` (line break in one step title)
- Tooling, outside `src`: `web/.screenshots/vo/{shoot,cmp,probe,shift}.mjs` and one-off edit and probe scripts in the same folder
