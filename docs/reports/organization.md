# Report: organization

Routes: `/organization/about`, `/organization/departments`, `/organization/departments/[slug]` (4), `/organization/partners`, `/organization/career`. Built 2026-10-08. `pnpm check`: 0 errors, 0 warnings (124 files). Prettier run on all my files. No console errors at 1440 or 412 on any route.

## Page heights (without header overlay, with footer)

| Route | Figma 1440 | Built | Figma 412 | Built |
| --- | --- | --- | --- | --- |
| about (`648:15307` / `648:16936`) | 4876 | 4875 | 9390 | 9390 |
| departments (`648:16265` / `648:18733`) | 3582 | 3583 | 6076 | 6079 |
| energy-system-modeling (`648:15690` / `648:19300`) | 2906 | 2907 | 3881 | 3842 |
| modeling-tools-and-data (`648:15897` / `648:19806`) | 2878 | 2879 | 3881 | 3838 |
| software-engineering (`648:16025` / `648:20154`) | 2759 | 2760 | 3651 | 3630 |
| research-and-market-development (`648:16167` / `648:20417`) | 2256 | 2257 | 3184 | 3249 |
| partners (`650:26653` / `650:26878`) | 2400 | 2400 | 3628 | 3627 |
| career (`650:27431` / `650:21852`) | 3647 | 3648 | 6111 | 6113 |

Mobile frame mapping (viewed, all five): `648:18733` = department index, `648:19300` = Energy System Modeling, `648:19806` = Modeling Tools & Data, `648:20154` = Software Engineering, `648:20417` = Research and Market Development.

## Files

- Pages: `web/src/pages/organization/about.astro`, `partners.astro`, `career.astro`, `departments/index.astro`, `departments/[slug].astro`
- Components: `cards/DepartmentCard.astro`, `cards/JobCard.astro`, `blocks/ImageInfoCard.astro`, `blocks/WorkTopicGrid.astro`, `blocks/NumberedStepList.astro`, and one extra, `blocks/DepartmentGrid.astro` (the two-column card list with row rules, shared by About and the index so the markup is not duplicated)
- Data: `web/src/data/departments.ts`, `about.ts`, `partners.ts`, `career.ts`
- Assets: `web/src/assets/organization/{departments,values,heads,projects,jobs,about}/`
- Icons added (Figma path data, `currentColor`): `check-circle`, `circle-bolt`, `code-merge`, `dictionary-alt`, `diploma`, `document`, `grid`, `laptop`, `magnifying-glass-eye`, `marker`, `meeting`, `online-interview`, `paper-plane`, `person-rays`, `person-through-window`, `personal-finance`, `population-globe`, `referral-alt`, `square-bolt`, `table-list`, `worldwide-network`, `yoga-ball`. `attribution-pen` and `circle-dashed` already existed and were reused. `marker` keeps Figma's two tones as `fill-opacity` on the inner dot.

## Components

| Component | Props |
| --- | --- |
| `cards/DepartmentCard` | Exactly the addendum contract: `variant: 'full' \| 'compact'`, `name`, `lead`, `summary`, `accent: 'red' \| 'dark-red' \| 'charcoal' \| 'plum'`, `icon: SvgComponent`, `head: { name; role; photo }`, `link: { label; href } \| null`, `image: { desktop; mobile } \| null`, `class?`. Accent = `brand-500` / `brand-700` / `neutral-900` / `brand-900` for the icon tile and the image frame. `full` stacks avatar, name and link on mobile and uses a 20px icon there (Figma); `compact` keeps the row and the 32px icon. The link is stretched over the card. `image` is the artwork inside the frame (580x238 / 332x238), the frame is drawn in code. |
| `cards/JobCard` | `title`, `location`, `languages`, `workMode`, `employmentType`, `href`, `newTab`, `linkLabel`, `theme` (`finance` \| `people-and-culture` \| `software-engineering` \| `research-and-market-development` \| `modeling-tools-and-data` \| `energy-system-modeling` \| `grid-data` \| `miscellaneous`), `labels` (screen-reader names of the four facts), `class?`. The thumbnail is chosen from the theme: 427x258 from `lg`, 372x258 below. |
| `blocks/ImageInfoCard` | `image`, `alt`, `title`, `paragraphs: string[]`, `action: { label; href } \| null`, `class?` (width and placement from the page) |
| `blocks/WorkTopicGrid` | `topics: { title; description: string \| null; icon }[]`, `class?`. Two columns from `lg`, one below; an odd count gets an empty bordered cell on desktop, as drawn |
| `blocks/NumberedStepList` | `steps: { number; text; icon }[]`, `class?` (`\n` in text honoured) |
| `blocks/DepartmentGrid` | `cards: DepartmentCard props[]`, `class?` |

## Contradictions and placeholders reproduced

- Department count: the index hero says "7 Department" and lists seven cards; the team hero says "8 Department". `departments.ts` holds seven (the four with detail pages plus Finance, People and Culture, Grid Data) and the index reproduces "7". Note `648:16265` contains an eighth card frame (`648:16447`, a compact copy of Research and Market Development) that is not visible in the render; it is not built.
- "12 People" on all four department heroes; "9 Country / 99 Partners / 999 Funders"; "3 Open Roles" above four job cards.
- Partner logos: the same eight repeated three times on desktop (24 cells); the mobile frame shows only two repeats (16 cells) in column-major order, so `partners.ts` exports `logos` and `logosMobile` and the page renders two `LogoGrid`s. Logos come from `assets/home/logos/`.
- Project cards: "MM/YYYY - MM/YYYY"; the geothermal project appears twice on Energy System Modeling. Project images and the Eskom / Stanford tags are Figma exports in `assets/organization/projects/`.
- About: both image-info cards use the same mountain photo; "If you are interested a collaboration"; double space in the Collaboration value body.
- Copy quirks kept: "Modelling" / "Modeling", "that help modellers and policymakers works.", trailing spaces.
- Image alts are empty (decorative placeholders).

## Assumptions and link targets

- No job board URL is visible in Figma: all four "See Job Board" links use `routes.contact` (`newTab: false`). "OET's Handbook" also uses `routes.contact`.
- Project hrefs: `routes.successStory('e-fuels-in-australia' | 'openmod-meets-usa-2023' | 'geothermal-resource-potential')`, taken from the outputs agent's asset names; confirm against their slugs.
- Partner filter tabs are links (`?type=funders|partners`) but nothing filters: Figma gives no type per logo. Needs a `type` on partners once the CMS provides it.
- Job thumbnail themes per card were read from the frame: Business Operations Manager = research-and-market-development artwork, the two finance roles = finance, Proactive Application = energy-system-modeling.
- A zero-width space after "IT/" in one job title reproduces Figma's desktop line break.
- Department pages take accent, hero background, ornament, topic grid and projects from `departments.ts`; `getStaticPaths` runs over that module.

## Needed from the coordinator / gaps in shared components

- UI strings now in data: `departmentLabels` ("View Department", "About Department", "Works", "Department Projects", "View Project", "People", "Meet The Team"), `roles.labels` (Location, Languages, Work mode, Employment type), partner filter label.
- `PageHero` (left layouts, mobile): content is bottom-aligned and the panel grows with long titles. Figma keeps the panel at 573 / 676 and starts the title at y=185 (or higher). Effect: index and career titles sit 15–58px lower than Figma; the Research and Market Development hero is 64px taller (the whole +65 on that page).
- `ProjectCard`: no way to hide the footer link or set a third frame colour. Worked around from the page with `[&>div:last-child]:invisible` (Figma leaves the 41px footer empty), `pb-[41px]` on cards without a partner, and a `brand-800` frame override for the Stanford card. The Stanford tag logo is drawn larger in Figma (99x35) than the component's 65% height.
- `CardCarousel`: the header column is hidden with a selector because the department row has no header.
- `LogoGrid`: has its own page gutters and a fixed 4-column mobile grid; overridden with `max-w-none! px-0!` and `[&>ul]:grid-cols-2`.
- `SectionHeading`: link colour is `brand-600`; career shows the email in text colour (overridden).
- `RichText`: line-height 1.2 gives 19.2px lines; Figma rounds to 19. Overridden with `leading-[19px]!` on department pages.
- Off-palette values used as drawn: `#ee2042` (link text), `#ececec` and `#d9cdcd` (image-info card borders).

## Verification

Side-by-side strips of the Figma render and the page screenshot were viewed for every row marked "compared".

| Page / section | 1440 | 412 | Remaining differences |
| --- | --- | --- | --- |
| About: hero | compared | compared | none seen |
| About: intro + image-info cards | compared | compared | none seen |
| About: departments | compared | compared | summary ellipsis falls one word earlier or later than Figma on some cards |
| About: values | compared | compared | none seen (card heights follow the tallest in a row, as in Figma) |
| Department index | compared | compared | mobile hero title 58px lower (PageHero); +3px over the page |
| Energy System Modeling | compared | compared (top two thirds) | mobile project cards: Figma draws 406px cards overflowing the 412 frame on both sides; mine are 372px wide in a scroll row, so the page is 39px shorter. Stanford tag logo smaller |
| Modeling Tools & Data | compared | compared | same card width difference on mobile (43px shorter) |
| Software Engineering | compared | viewed, not strip-compared after the last fix | mobile 21px shorter (card width) |
| Research and Market Development | compared | compared | mobile hero 64px taller (PageHero) |
| Partners | compared | compared | none seen |
| Career: hero, heading, job grid | compared | compared | mobile hero title 15px lower (PageHero); "Open Roles" tag is a pill, Figma draws the same pill here |
| Career: hiring process | compared | compared | step 07 wraps one word differently on mobile |

Not verified: widths between 412 and 1440 (only reasoned: grids switch at `lg`), keyboard walkthrough, Safari and Firefox, a production build. Hover and focus states are mine (none in Figma).
