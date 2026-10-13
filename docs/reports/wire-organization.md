# Wiring report — organization pages

The organization pages read the Payload CMS. Files changed: the six data modules and the seven pages listed below. No component, no shared file, no CMS file and no `ui.ts` key was changed.

## What is connected

| Data module | Loader | Reads |
| --- | --- | --- |
| `web/src/data/about.ts` | `loadAboutPage(locale)` | `about-page` (depth 1) and `loadDepartments` for the featured departments, in the order of the relation |
| `web/src/data/departments.ts` | `loadDepartments(locale)` | `departments` (depth 2, sort `order`): card, head (name, role, photo from `team-members`), detail |
| | `loadDepartmentPages(locale)` | the departments with `hasDetailPage`, each with its projects: `projects` where `departments` contains the department (depth 2, sort `createdAt`) |
| | `loadDepartmentsPage(locale)` | `departments-page` (depth 1) |
| `web/src/data/team.ts` | `loadTeamPage(locale)` | `team-page` (depth 1), `team-members` (depth 1, sort `order`), `departments` (depth 0, sort `teamOrder`), `countries` (depth 1, sort `code`) |
| `web/src/data/partners.ts` | `loadPartnersPage(locale)` | `partners-page` (depth 1), `partners` where `showOnPartnersPage` (depth 1, sort `order`) |
| `web/src/data/career.ts` | `loadCareerPage(locale)` | `career-page` (depth 1), `jobs` (depth 0, sort `title`) |
| `web/src/data/theory-of-change.ts` | `loadTheoryPage(locale)` | `theory-of-change-page` (depth 1) |

Pages: `web/src/pages/organization/about.astro`, `career.astro`, `partners.astro`, `team.astro`, `theory-of-change.astro`, `departments/index.astro`, `departments/[slug].astro`. Each awaits its loader in the frontmatter; `[slug].astro` builds its paths from `loadDepartmentPages`. `departmentSlugs` from `routes.ts` is no longer used by any organization file (it has no remaining importer in `web/src`).

Derived in the data modules:

- Team filter tabs: "Show All" (`tabs.showAll`), then `team-page.listing.seniorLeadershipLabel` (`?group=senior-leadership`), then one tab per department sorted by `teamOrder` with `teamLabel` as label and the department slug as `?group=` value.
- Team card tags: the senior leadership label when `seniorLeadership` is set, then the `teamLabel` of each department of the member.
- Team hero stat icons and tones now come from `team-page.hero.stats` (the constant in `team.astro` is gone).
- Department project card: title, excerpt, frame, thumbnail and its alt from the project; period `MM/YYYY - MM/YYYY` from `startDate` / `endDate` in UTC; link from `routes.successStory(slug)`; partner tag from `partners.tagLogo` / `tagSize` / `name`.
- Partners mobile grid: the same logos read column by column of the four-column desktop grid, which is the order the static page had.
- Step numbers (career hiring steps, theory approach steps): position, two digits.
- Career role columns: `textHtml` without the Payload wrapper and its single `<p>`, because `SectionHeading` renders each column inside its own `<p>`. A column with more than one paragraph throws.
- Figures (`peopleCount`, hero counts, `teammates`, continent figures, stats) are shown as stored.

Stays in code, as the model report says: anchors (`about`, `open-roles`, `theory`, `team`), `mobilePageSize`, the team sort options, the team pagination state (`current: 1, total: 10`), the `sm-tall` size of the team intro buttons, the `IMG-PLACEHOLDER` label of an approach step without image, the partner filter targets (`?type=funders`, `?type=partners`).

View-model changes (types in the data modules; no component prop changed):

- `Department` gained `id` and `slug`; `DepartmentDetail` lost `slug` and `projects` (projects are a separate prop of the page); `DepartmentSlug` is removed; `DepartmentProject.frame` is `FrameTone`.
- `TeamStat` is new. `partnerTags.ts` is no longer imported by the organization files.

## Verification

`pnpm check`: 0 errors, 0 warnings (whole `web`, 164 files, at the time of the last run). `prettier --check` passes for the 13 changed files.

Content: `MSYS_NO_PATHCONV=1 node scripts/compare-content.mjs .screenshots/cms-before-html http://localhost:4321 /organization` (without `MSYS_NO_PATHCONV=1` Git Bash rewrites the prefix and the script compares 0 routes).

Screenshots: taken with `scripts/snapshot-all.mjs` into `web/.screenshots/wire-org/` (same settings as the baseline, reduced motion included; `shoot.mjs` does not set reduced motion, so the theory of change page is 1240 px shorter with it and cannot be compared with the baseline), compared pixel by pixel with `scripts/compare-snapshots.mjs` against `.screenshots/cms-before/`. The side-by-side sheets of every differing shot are in `web/.screenshots/wire-org/diff/`. I looked at the sheets for energy system modeling 1440, software engineering 412, team 1440 and 412, partners 1440 and 412, and the full partners 1440 shot; for the other department sheets I relied on the reported difference bands, which sit on the same card rows.

| Route | Content differences | 1440 | 412 |
| --- | --- | --- | --- |
| `/organization/about` | footer only | identical | identical |
| `/organization/career` | footer only | identical | identical |
| `/organization/departments` | footer only | identical | identical |
| `/organization/departments/research-and-market-development` | footer only | identical | identical |
| `/organization/theory-of-change` | footer only | identical | identical |
| `/organization/departments/energy-system-modeling` | period, one card less, tag alt | same height; differs in the carousel rows only | same height; carousel rows only |
| `/organization/departments/modeling-tools-and-data` | period | same height; period line and card rows of the one card | same |
| `/organization/departments/software-engineering` | period | same height; period line and card rows | same |
| `/organization/partners` | 16 / 8 logo alts less | 2400 → 2043 px: two logo rows where there were six | 3627 → 3147 px: four rows where there were eight |
| `/organization/team` | country order, tag spellings, one member less, one tab target | same height; from the second card row on the cards shift by one place | same height; two tag lines |

"Footer only": every route reports `- Privacy Statement / + Privacy Statement` and the same for its `href`. That is the site footer (site agent), not this area; the pixel comparison showed no footer difference at the time of the snapshots. I did not investigate its cause.

## Remaining differences, all intended

- **Project period.** The static cards showed the literal placeholder `MM/YYYY - MM/YYYY`; they now show the stored dates, `05/2026 - 05/2026` on every project. The format is produced in `departments.ts`; the outputs agent formats the same field in its own module, and the two should be checked to agree.
- **Energy System Modeling carousel has three cards, not four.** The static list repeated the geothermal project; the relation returns it once.
- **Card thumbnails** are the projects' own thumbnails instead of the JPEG copies under `assets/organization/projects` (same pictures; small pixel differences in the card rows).
- **Partner tag alt** "Stanford" is now "Stanford University" (one `partners` document).
- **Partners grid shows eight logos**, once each; the static page repeated them three times on desktop and twice on mobile. The page is shorter by that amount. The Funders and Partners tabs still link to `?type=…` and filter nothing: `isFunder` / `isPartner` are empty in the CMS and the page has no filter behaviour.
- **Team list has 15 cards, not 16**: one Dr. Siddharth Krishna. The desktop grid ends with three cards in the last row.
- **Team card tags follow the tab spelling**: "People & Culture" (was "People And Culture"), "Modelling Tools & Data" (was "Modeling Tools & Data").
- **Team tab target** for that department is `?group=modeling-tools-and-data` (department slug) instead of `?group=modelling-tools-and-data`.
- **Globe pins are in the order of the country code** (CAN, JPN, KAZ, MEX, MLI, TUR, USA) in the markup; positions and the selected country are unchanged and the globe renders pixel-identical.

## Not done / limits

- **Country card photo.** `countries.photo` is per country, but `TeamGlobe` takes one photo and its client script swaps only name and figure when the visitor selects another country. The page passes the photo of `team-page.globe.selectedCountry`. All seven countries share one photo today, so nothing is visible; showing a different photo per country needs a change in `TeamGlobe.astro` and `teamGlobe.client`.
- **Team pagination** still shows the designed state (page 1 of 10) and the sort control does not sort; both were static before and are unchanged.
- Checked in Chromium at 1440 and 412 only, against the dev server; no production build was run.

## Schema additions

None.

## For the coordinator

- `web/src/data/routes.ts`: `departmentSlugs` has no importer left in the organization files and can be removed once no other area uses it.
- `web/src/data/partnerTags.ts` is no longer used by `departments.ts`; delete it when the other areas have stopped importing it.
- Asset files replaced by CMS media and no longer imported by the organization files: `assets/heroes/{about,team,partners,career,theory-of-change,dept-*}-*.webp`, `assets/organization/{about,values,departments,heads,projects}/*`, `assets/team/*.webp` (not `world.json`), and the eight partner logos under `assets/home/logos` used by the partners page (the home page may still import them). `assets/organization/jobs/*` stays: `JobCard` imports them.
- Decide whether the project period formatter should be one shared function; it now exists in `departments.ts` for the department carousel.
