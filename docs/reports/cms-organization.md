# CMS report — organization area

Payload data model, admin configuration and seed for the organization pages. Files: `cms/src/areas/organization/**`. Nothing in `web/` was changed.

## What was run

| Check | Result |
| --- | --- |
| `pnpm generate:types` | succeeds |
| `pnpm check` (`tsc --noEmit`, whole `cms`) | 0 errors |
| `SEED_AREAS=core,organization pnpm seed` against `oet_cms_organization`, three runs in a row | no errors; counts identical after every run |
| Read-back of all six globals and all documents of the five collections at depth 2, without authentication | every seeded field present, including the `…Html` twins; the seven departments are readable as published |
| Conditional validation (throwaway script, deleted) | a partner shown on the home page without logo is rejected; a tag-only partner is accepted; a published department with `hasDetailPage` on and no detail content is rejected; one with it off is accepted |
| `pnpm exec prettier --write src/areas/organization` | applied |

Not run: the admin panel (`next dev` is forbidden by the brief), so the tab layout and field descriptions were not looked at in a browser.

## Seeded documents

| Collection | Documents |
| --- | --- |
| `team-members` | 15 |
| `departments` | 7 (all published; 4 with a detail page) |
| `countries` | 7 |
| `partners` | 19 (17 with a grid logo, 3 with a card tag logo) |
| `jobs` | 4 |
| `media` (uploaded by this area) | 84 |

Globals seeded: `about-page`, `departments-page`, `team-page`, `partners-page`, `career-page`, `theory-of-change-page`.

## Collections

L = localised, R = required. "R if …" means required only while the named switch is on (the field is hidden and not validated otherwise, and is optional in the generated types).

### `team-members` (`publicRead`, title `name`, default sort `order`)

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `name` | text | no | yes | Team card, department card, department hero person row |
| `role` | text | yes | yes | Under the name in the same places |
| `photo` | upload | – | no | Head photo: department card and department hero. Seeded for the seven heads only |
| `departments` | relationship → `departments`, many | – | no | Card tags and the team filter tab the person is listed under |
| `country` | relationship → `countries` | – | no | Not shown yet; left empty |
| `socialLinks[]` `.kind` (`email` / `github` / `linkedin` / `message`), `.href` | array | no | row fields yes | Icon buttons on the team card |
| `profile.label`, `profile.href` | group (`link`) | label yes | yes | Text link at the bottom of the team card |
| `portrait` | upload | – | yes | Cut-out portrait on the team card |
| `portraitDesktop` / `portraitMobile` `.x .y .width .height` | group of numbers | no | yes | Box of the portrait inside the 280 px / 332 px card frame |
| `portraitRotation` | number | no | yes | Rotation in degrees |
| `glow` | select `center` / `right` | no | yes | Position of the glow behind the portrait |
| `seniorLeadership` | checkbox | no | no | Senior leadership tag and filter tab |
| `order` | number | no | yes | Order of the team list before sorting |

### `departments` (`publishedRead`, drafts, title `name`, default sort `order`)

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `name` | text | yes | yes | Card title; detail page `<title>` |
| `slug` | text, unique | no | yes | `/organization/departments/<slug>`; also the `?group=` value of the team filter |
| `hasDetailPage` | checkbox | no | no | Full card with link and photo, or compact card |
| `order` | number | no | yes | Order on the departments page |
| `lead`, `summary` | textarea | yes | yes | Department card |
| `head` | relationship → `team-members` | – | yes | Card footer and detail hero person (`name`, `role`, `photo`) |
| `icon` | icon select | no | yes | Card square, detail hero stat |
| `accent` | select `red` / `dark-red` / `charcoal` / `plum` | no | yes | Colour of the card icon square |
| `teamLabel` | text | yes | yes | Team filter tab and team card tag |
| `teamOrder` | number | no | yes | Position of the tab in the team filter |
| `detail.cardImage.desktop` / `.mobile` | upload | – | R if `hasDetailPage` | Photo of the full card |
| `detail.hero.title`, `.lead` | textarea | yes | R if `hasDetailPage` | Detail hero; `lead` is also the meta description |
| `detail.hero.image.desktop` / `.mobile` | upload | – | R if `hasDetailPage` | Detail hero illustration |
| `detail.hero.peopleCount` | text | no | R if `hasDetailPage` | Figure next to "People" |
| `detail.hero.background` (`brand-600` / `brand-900` / `neutral-900`), `detail.hero.ornament` (`department` / `department-inverse`) | select | no | R if `hasDetailPage` | Hero colour and pattern |
| `detail.about` + `detail.aboutHtml` | rich text | yes | R if `hasDetailPage` | "About Department" |
| `detail.worksIntro` + `detail.worksIntroHtml` | rich text | yes | R if `hasDetailPage` | "Works", text above the grid |
| `detail.topics[]` `.title` (textarea), `.description` (textarea, optional), `.icon` | array | text yes | no | Work topic grid; empty means no grid |
| `detail.worksOutro` + `detail.worksOutroHtml` | rich text | yes | no | Text under the grid |
| `detail.mobileColumn` | select `'326'` / `'332'` (strings) | no | R if `hasDetailPage` | Width of the mobile text column |

A department without a page still returns a `detail` object; all its values are `null` (the Html twins are `''`). Use `hasDetailPage` to decide, not the presence of `detail`.

### `countries` (`publicRead`, title `name`, default sort `code`)

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `code` | text, unique | no | yes | Key of the globe pin (`USA`) |
| `name` | text | yes | yes | Pin label and country card |
| `continent` | select `africa` / `antarctica` / `asia` / `europe` / `north-america` / `south-america` / `oceania` | no | no | Not shown yet; left empty |
| `longitude`, `latitude` | number | no | yes | Pin position |
| `teammates` | text | no | yes | Figure on the country card |
| `photo` | upload | – | yes | Photo on the country card |

### `partners` (`publicRead`, title `name`, default sort `name`)

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `name` | text, unique | no | yes | Alt text of the logo |
| `website` | href | no | no | Not shown yet; left empty |
| `group` | select `trusted-partner` / `network-affiliation` | no | no | Group on the home page logo section |
| `isFunder`, `isPartner` | checkbox | no | no | Funders / Partners tabs of the partners page; left unset |
| `showOnPartnersPage`, `showOnHome` | checkbox | no | no | Which grids list the logo |
| `order` | number | no | R if `showOnPartnersPage` | Position on the partners page |
| `homeOrder` | number | no | R if `showOnHome` | Position on the home page |
| `logo` | upload | – | R if shown in a grid | Logo in both grids |
| `logoDesktop.width` / `.height` | number | no | R if shown in a grid | Logo box on the home and partners pages from `lg`; the partners page uses it on mobile too |
| `logoMobile.width` / `.height` | number | no | R if shown in a grid | Logo box on the home page below `lg` |
| `tagLogo` | upload | – | no | Partner tag on project and publication cards |
| `tagSize.width` / `.height` | number | no | R if `tagLogo` | Box of the tag logo |

### `jobs` (`publicRead`, title `title`, default sort `title`)

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `title`, `location`, `languages`, `workMode`, `employmentType` | text | yes | yes | Job card |
| `href` | href | no | yes | Card link |
| `newTab` | checkbox | no | no | Link target |
| `theme` | select, the eight `JobCard` themes | no | yes | Selects the card thumbnail (thumbnails stay in `JobCard`) |

## Globals

All use `globalRead` and end with `meta.title` / `meta.description` (`seo()`).

| Global | Fields |
| --- | --- |
| `about-page` | `hero.title` (textarea L R), `hero.links[]` (label L, href), `hero.image.desktop/.mobile` (R); `intro.statement` (textarea L R), `intro.paragraphs[]` (L), `intro.actions[]` (label L, href, `variant` `primary`/`secondary`, `arrow`); `infoCards[]` (`image` R, `title` L R, `paragraphs[]` L, `action.label/.href` optional); `departments.tag` / `.title` (L R); `featuredDepartments` (relationship → `departments`, many, ordered, R); `values.tag`, `.title`, `.subline` (L R), `values.items[]` (`thumbnail`, `thumbnailMobile`, `label`, `title`, `body`, all R) |
| `departments-page` | `hero.title`, `hero.lead` (textarea L R), `hero.image.desktop/.mobile`, `hero.count.value` (text) / `.label` (L), `hero.icon`; `listing.tag` / `.title` (L R) |
| `team-page` | `hero.title`, `hero.lead[]` (L), `hero.stats[]` (`value` text, `label` L, `icon`, `tone` `brand`/`light`), `hero.image`; `intro.tag`, `.title`, `.subline`, `.actions[]`; `globe.view.longitude/.latitude`, `globe.selectedCountry` (relationship → `countries`, R); `continents.label` (L), `continents.items[]` (`value` text, `label` L); `listing.title`, `listing.mobileDescription`, `listing.seniorLeadershipLabel` (L R) |
| `partners-page` | `hero.title`, `hero.stats[]` (as above), `hero.image`; `intro.statement`, `intro.paragraphs[]`; `filter.fundersLabel`, `filter.partnersLabel` (L R) |
| `career-page` | `hero.title`, `hero.lead[]`, `hero.image`, `hero.icon`, `hero.count.value/.label`, `hero.action.label/.href`; `roles.tag`, `roles.title`, `roles.columns[]` (`text` rich text L R + `textHtml`); `hiring.title`, `hiring.paragraphs[]`, `hiring.steps[]` (`text` textarea L R, `icon` R) |
| `theory-of-change-page` | `hero.title`, `hero.lead[]`, `hero.links[]`, `hero.image`; `scene.challenge` and `scene.goal` (`label`, `statement`, `emphasis` optional, `details[]` exactly 2), `scene.values[]` (exactly 4); `approach.mobileTag`, `.title`, `.subline`, `approach.steps[]` (`title`, `text`, `image` optional); `outcomes.title`, `outcomes.columns[]` (`output`, `description`, `outcome`, `icon` one of the four matrix icons, `tone` `brand-400/500/800/900`); `impact.title`, `impact.text`; `globe.view`, `globe.pins[]` (`icon` one of the six globe icons, `longitude`, `latitude`, `scale`) |

Notes for wiring:

- The `…Html` twins are wrapped by Payload: `<div class="payload-richtext"><p>…</p></div>`. `roles.columns[].textHtml` therefore holds a block with a paragraph where the page passed an inline string to `SectionHeading`.
- Titles with line breaks are textareas and keep `\n`.
- `paragraphs` rows are `{ text }`; use `texts()` from `web/src/lib/cms.ts`.
- An info card without a button has `action.label` and `action.href` both `null`.
- Alternative text is on the media documents: person photos and portraits carry the person's name, logos the organisation name, everything else is empty (decorative).

## Coverage

### `about.json`

| Key | Goes to |
| --- | --- |
| `featuredDepartments` | `about-page.featuredDepartments` (relations, looked up by slug) |
| `hero.title`, `hero.links`, `hero.image` | `about-page.hero.*` |
| `infoCards[].image/title/paragraphs/action` | `about-page.infoCards[]` |
| `infoCards[].alt` | `alt` of the media document |
| `intro.statement/paragraphs/actions` | `about-page.intro.*` |
| `intro.id` | stays in code: anchor |
| `meta` | `about-page.meta` |
| `values.tag/title/subline/items[]` | `about-page.values.*` |

### `departments.json`

| Key | Goes to |
| --- | --- |
| `departments[].name/lead/summary/accent/icon` | `departments` fields of the same name |
| `departments[].head` | `departments.head` → `team-members` (matched by name); `head.photo` → `team-members.photo`; `head.name/role` are the member's own fields |
| `departments[].detail` (null or object) | `departments.hasDetailPage` |
| `detail.slug` | `departments.slug`. Departments without a page get the slug derived from the name (`finance`, `people-and-culture`, `grid-data`) |
| `detail.cardImage`, `detail.hero.*`, `detail.about`, `detail.mobileColumn` | `departments.detail.*` (`mobileColumn` as string) |
| `detail.works.intro/topics/outro` | `departments.detail.worksIntro`, `.topics[]`, `.worksOutro` |
| `detail.projects[]` | not a field. The page queries `projects` by a `departments` relation (see "For the coordinator") |
| `departmentsHeading` | `departments-page.listing` and `about-page.departments` (the same heading is on both pages; each page has its own copy) |
| `departmentsIndex.meta/hero` | `departments-page.meta`, `departments-page.hero.*` |
| array order | `departments.order` (1–7) |

### `team.json`

| Key | Goes to |
| --- | --- |
| `continents.label/items` | `team-page.continents.*` (figures are text) |
| `countries[].code/name/lon/lat/count` | `countries.code/name/longitude/latitude/teammates` |
| `filterGroups[]` labels | "Show All": stays in code (`tabs.showAll`). "Senior Leadership": `team-page.listing.seniorLeadershipLabel`. The seven others: `departments.teamLabel`, their order `departments.teamOrder` |
| `filterGroups[].href/active` | stays in code: built from the department slug / `senior-leadership` and the current filter |
| `globe.view`, `globe.selected` | `team-page.globe.view`, `team-page.globe.selectedCountry` |
| `globe.photo`, `globe.photoAlt` | `countries.photo` (the same image on all seven) and its media `alt` |
| `members[].name/role/links/profile/glow` | `team-members.name/role/socialLinks/profile/glow` |
| `members[].portrait.image/desktop/mobile/rotate` | `team-members.portrait/portraitDesktop/portraitMobile/portraitRotation` |
| `members[].tags` | derived: `seniorLeadership` first, then `departments[].teamLabel` |
| array order of `members` | `team-members.order` |
| `mobilePageSize` | stays in code |
| `teamPage.meta/hero/intro` | `team-page.meta/hero/intro` |
| `teamPage.intro.actions[].size` | stays in code: every button there is `sm-tall` |
| `teamPage.listing.title/mobileDescription` | `team-page.listing.*` |
| `teamPage.listing.id/sort/pagination` | stays in code: anchor, sort options, pagination state |

### `partners.json`

| Key | Goes to |
| --- | --- |
| `filter.options[].label` | `partners-page.filter.fundersLabel` / `.partnersLabel` |
| `filter.options[].href/active` | stays in code |
| `hero.title/image/stats[]` | `partners-page.hero.*` |
| `intro` | `partners-page.intro` |
| `logos[]` | `partners` with `showOnPartnersPage`, `order`, `logo`, `logoDesktop`. Eight distinct organisations; the two repeats of the list are filler |
| `logosMobile[]` | derived: the same eight logos with the same sizes, reordered for the two-column grid |
| `meta` | `partners-page.meta` |

### `partnerTags.json`

| Key | Goes to |
| --- | --- |
| `partnerTags.*.name` | `partners.name` ("Stanford" is the document "Stanford University") |
| `partnerTags.*.logo/width/height` | `partners.tagLogo`, `partners.tagSize` |
| the keys `eskom` / `stanford` / `google` | stays in code; cards refer to the partner document |

### `career.json`

| Key | Goes to |
| --- | --- |
| `hero.*` | `career-page.hero.*` |
| `hiring.title/paragraphs` | `career-page.hiring.*` |
| `hiring.steps[].text/icon` | `career-page.hiring.steps[]` |
| `hiring.steps[].number` | derived: position, two digits (the seed fails if the JSON disagrees) |
| `meta` | `career-page.meta` |
| `roles.tag/title/columns` | `career-page.roles.*` (columns as rich text) |
| `roles.id` | stays in code: anchor |
| `roles.jobs[]` | `jobs` collection, all eight keys under the same names |

### `theory-of-change.json`

| Key | Goes to |
| --- | --- |
| `theoryPage.meta/hero` | `theory-of-change-page.meta/hero` |
| `scene.challenge/goal/values` | `theory-of-change-page.scene.*` |
| `scene.id` | stays in code: anchor |
| `approach.mobileTag/title/subline` | `theory-of-change-page.approach.*` |
| `approach.steps[].title/text/image` | `theory-of-change-page.approach.steps[]` (`image` empty: the design has none) |
| `approach.steps[].number` | derived: position, two digits |
| `approach.placeholder` | stays in code: the "IMG-PLACEHOLDER" box shown for a step without illustration |
| `outcomes`, `impact` | `theory-of-change-page.outcomes`, `.impact` |
| `globe.view/pins` | `theory-of-change-page.globe.*` |

### `home.json` and `outputs.json` (partner parts)

| Key | Goes to |
| --- | --- |
| `home.partnerGroups[].logos[]` | `partners` with `showOnHome`, `homeOrder`, `group` (first group `trusted-partner`, second `network-affiliation`), `logoDesktop`. Repeats in the second group are filler; only University of Canterbury is new there |
| `home.partnerGroupsMobile[].logos[]` | `partners.logoMobile`; six organisations appear only here |
| `home.partnerGroups[].label` | not mine: belongs to `home-page` (site area) |
| `outputs.partnerLogos` | not seeded: placeholder ("Climact" ×6 with a placeholder image) |
| `outputs.contact`, `outputs.authors` | not seeded: read only to see how people are shown |

## Decisions

- **One Siddharth Krishna.** The two entries differ only in `glow` (`right` and `center`); the first one (`right`) was kept.
- **Team card tags come from the department.** In the JSON the filter tabs and the card tags spell three departments differently ("People & Culture" / "People And Culture", "Modelling Tools & Data" / "Modeling Tools & Data", and the department names use "and"). There is one `teamLabel` per department, seeded with the filter tab spelling, so those card tags now read like the tabs. The seed matches the spellings by a key that lowercases, reads `&` as `and` and `modelling` as `modeling`.
- **All seven departments were already in `departments.json`**; none had to be added for the team filter.
- **Portrait is required, head photo is optional.** Every team member is listed on the team page, so a person cannot be saved without a cut-out portrait. If the outputs area wants OET staff as project contacts (for example Dr. Markus Groissbock in `outputs.json`), those people need a portrait too, or the contact stays free text.
- **Team hero stat icons.** `team.json` has only value and label; the icons and tones were in `team.astro`. They are fields now (same shape as the partners hero) and the seed sets `globe-alt` / `employees` / `model-cube-space` from a constant.
- **Logo sizes.** Where an organisation is on both pages its desktop box is identical, and the partners page uses the same box on mobile, so there is one desktop size and one mobile size per logo rather than a size per page. European Climate Foundation and eurima exist only in the mobile home list; their desktop size was seeded with the mobile values and needs a designer value.
- **Partners page shows the eight organisations the design shows.** The other nine with a logo are on the home page only; an editor switches them on with the checkbox.
- **Order fields.** `team-members.order`, `departments.order`, `departments.teamOrder`, `partners.order` and `partners.homeOrder` reproduce the order of the design. Jobs sort by title, countries by code.
- **Merged organisations.** "The International Council on Clean Transportation" is saved as "International Council on Clean Transportation". "Stanford" (card tag) and "Stanford University" (logo grids) are one document; this was not in the task, say so if they should be separate.
- **Department SEO is derived**, as the page does today: title from `name`, description from `detail.hero.lead`. There is no `meta` group on departments.
- **Jobs are managed in the CMS for now.** On the live site they come from Greenhouse; whether to keep the collection or replace it with a Greenhouse import is open. The hero figure says "3" while four roles are listed; it is editable text.

## Left empty on purpose

- `partners.isFunder`, `partners.isPartner`: we do not know who funds what. Until they are set, the Funders and Partners tabs match nothing.
- `partners.website` for all 19; `partners.group` for Eskom and Google (card tags only).
- `team-members.country` for all 15; `countries.continent` for all 7 (not in the content; Türkiye is not obvious).
- `theory-of-change-page.approach.steps[].image`.

Content that looks like filler and was seeded as it is: the partner name "Verfassungsschutz Baden-Württemberg", "Snoopy F", every social and profile link (`mailto:info@…`), `99` / `999` figures, `peopleCount` "12" on every department, `teammates` "12" on every country.

## For the coordinator

- **`projects` (outputs area) needs a `departments` relationship** (many, to `departments`). The "Department Projects" carousel on a department page is the projects whose relation contains that department; it is not a field here. The seed data has E-fuels and Openmod under Energy System Modeling, Geothermal under Energy System Modeling, Modeling Tools & Data and Software Engineering, E-fuels under Software Engineering, none under Research and Market Development.
- Partner tags and partner logos on cards in other areas should be relationships to `partners` (`tagLogo`, `tagSize`); the home page partner section reads `partners` with `showOnHome`, sorted by `homeOrder`, grouped by `group`, with the group labels in `home-page`.
- Helpers written inside the area because the shared ones do not cover them (`cms/src/areas/organization/fields.ts`): `number`, `checkbox`, `choice` (select with separate labels), `responsiveImage` (desktop + mobile upload), `coordinates`, `size`, `heading` (tag + title), `count` (value + label), `stats`, `actions` (links with variant and arrow), `tab`. Other areas have the same needs; they could move to `cms/src/fields`.
- No shared file was edited. `cms/src/payload-types.ts` and `web/src/lib/payload-types.ts` were regenerated by `pnpm generate:types`.
- The database `oet_cms_organization` and the folder `cms/media-organization` are still there.
