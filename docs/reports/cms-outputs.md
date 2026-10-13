# CMS report — outputs area

Area `outputs`: collections `projects`, `publications`, `testimonials`, `regions`, `tags`, `publication-categories`; globals `success-stories-page`, `publications-page`. Files in `cms/src/areas/outputs/`. Nothing in `web/` was changed.

Notation: **L** = localised, **R** = required. "paragraphs" is the shared helper: a localised array of rows `{ text }`; read it with `texts()`.

## What was run

| Check | Result |
| --- | --- |
| `pnpm generate:types` | succeeds |
| `pnpm check` (`tsc --noEmit`, whole `cms`) | 0 errors |
| `SEED_AREAS=core,organization,catalog,outputs pnpm seed` against `oet_cms_outputs`, three runs in a row | no errors; counts identical after every run |
| Read-back at depth 2, without authentication (`overrideAccess: false`): both globals, two projects, one publication, one document of each other collection, plus a summary line for all 11 projects and 7 publications | every seeded field present, including `bodyHtml` (projects) and `contentHtml` (rich text blocks of publications); the 11 projects and 7 publications are readable as published |
| Validation (throwaway script, deleted) | rejected: contact as team member without a member; outside contact without photo; partner link with only a label or only a target; home carousel without position and title lines; a project or publication related to itself; a partner tag without tag logo; a partner logo without logo; five highlights; an outside author without name; an author as team member without a member. Accepted: an outside author with a name only |
| `pnpm exec prettier --write src/areas/outputs` | applied |

Not run: the admin panel (`next dev` is forbidden by the brief), so tabs, field conditions and descriptions were not looked at in a browser. The REST API was not called over HTTP; reads went through the local API.

## Seeded documents

| Collection | Documents |
| --- | --- |
| `projects` | 11 (all published) |
| `publications` | 7 (all published; 3 academic, 3 blogs, 1 report, 0 policy briefs) |
| `testimonials` | 1 |
| `regions` | 5 |
| `tags` | 2 |
| `publication-categories` | 5 |
| `media` (uploaded by this area) | 37 |

Globals seeded: `success-stories-page`, `publications-page`.

## Collections

### `projects` (`publishedRead`, drafts, title `title`, default sort `-startDate`)

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `title` | text | yes | yes | Card title, page title, `<title>` |
| `slug` | text, unique | no | yes | `/outputs/success-stories/<slug>` |
| `projectStatus` | select `completed` / `in-progress` | no | yes | Status tab of the listing; status next to the dates in the page header. The label comes from `success-stories-page.listing.tabs` |
| `excerpt` | textarea | yes | yes | Card text; meta description |
| `startDate`, `endDate` | date (day) | no | yes | Card period ("MM/YYYY - MM/YYYY") and the full dates in the page header, both formatted in code |
| `highlights` | paragraphs, 1–4 | yes | yes | Bullet list in the page header |
| `thumbnail` | upload | – | yes | Picture of every card of the project |
| `frame` | select, the nine `FrameTone` values | no | yes | Frame colour of the card |
| `partnerTag` | relationship → `partners` (only those with `tagLogo`) | – | no | Tag on the thumbnail: `tagLogo`, `tagSize`, `name` |
| `partnerLink.label`, `partnerLink.href` | group | label yes | both or neither | Link in the card footer |
| `region` | relationship → `regions` | – | yes | Page header; region filter |
| `tags` | relationship → `tags`, many, ordered | – | no | Page header (with `#` added in code); tag filter |
| `tools` | relationship → `tools`, many, ordered | – | no | "Tools" list in the page header; products filter |
| `services` | relationship → `services`, many | – | no | "Service" list in the page header; service filter; related cards on the service pages |
| `departments` | relationship → `departments`, many | – | no | "Department Projects" carousel of each department |
| `hero` | upload | – | yes | Picture under the page header |
| `body` + `bodyHtml` | rich text | yes | yes | Article |
| `linkGroups[]` | array, see "Link groups" | – | no | Link lists under the article |
| `testimonial` | relationship → `testimonials` | – | no | Compact slider under the links; `null` = no slider |
| `related` | relationship → `projects`, many, ordered, not itself | – | no | "Related Projects" carousel |
| `contact.role` | text | yes | no | Small line above the name ("Project Lead") |
| `contact.kind` … | see "People" (complete row required) | | yes | "Contact" box in the sidebar |
| `partners` | relationship → `partners`, many, ordered (only those with `logo`) | – | no | "Partners" box in the sidebar: `logo`, `name` |
| `cta.heading`, `cta.primary`, `cta.secondary` | textarea | yes | yes | `ServiceCtaBand` |
| `cta.actions[]` | 1–2 rows: `label` (L, R), `href` (R), `emphasis` `primary` / `secondary` (R) | – | yes | Buttons of the band |
| `ctaService` | relationship → `services` | – | yes | `ServiceCtaCard` in the band: read `services.ctaCard` |
| `home.showOnHome` | checkbox | no | yes | Whether the card is in the home page carousel |
| `home.order` | number | no | R if `showOnHome` | Position in the home carousel |
| `home.titleLines` | select `'2'` / `'3'` (strings) | no | R if `showOnHome` | `titleLines` of the home card |

Derived in code, not stored: the card period and the written dates (from the two dates), the range word "to", the page URL, SEO (title and excerpt).

### `publications` (`publishedRead`, drafts, title `title`, default sort `-date`)

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `title` | text | yes | yes | Card title, page title, `<title>` |
| `slug` | text, unique | no | yes | `/outputs/publications/<slug>` |
| `type` | select `academic` / `blogs` / `policy-briefs` / `reports` | no | yes | Which listing shows it; type tab |
| `excerpt` | textarea | yes | yes | Card text; meta description |
| `category` | relationship → `publication-categories` | – | yes | Category label on the card |
| `date` | date (day) | no | yes | Card date and date in the page header; sort |
| `preprint` | checkbox | no | yes | The card shows "Preprint" in place of the date |
| `highlight` | textarea | yes | yes | Highlight paragraph in the page header |
| `thumbnail`, `frame` | upload, select (nine tones) | – / no | yes | Card picture and frame |
| `showInOutputs` | checkbox | no | yes | Listed in the "Outputs" section under the listing |
| `region` | relationship → `regions` | – | yes | Page header; region filter |
| `tags` | relationship → `tags`, many, ordered | – | no | Page header; tag filter |
| `authors[]` | array, min 1, see "People" (photo and position optional) | | yes | Names under "Authors" in the page header; sidebar rows |
| `hero` | upload | – | yes | Picture under the page header |
| `body` | blocks, min 1 | | yes | Article |
| ↳ block `richText` | `content` (rich text, L, R) + `contentHtml` | | | `RichText`; its h2 / h3 feed the table of contents |
| ↳ block `stats` | `title` (text, L, R), `items[]` min 1: `value` (plain text, R), `icon` (`icon()`, R), `label` (textarea, L, R) | | | `StatGrid` |
| ↳ block `image` | `image` (upload, R) | | | Picture in the article column; alt is on the media document |
| `linkGroups[]` | array, see "Link groups" | – | no | Link lists under the article |
| `citation` | textarea | yes | yes | Text the "Cite" button copies |
| `related` | relationship → `publications`, many, ordered, not itself | – | no | "Related Publications" carousel |
| `cta.*`, `ctaService` | as on `projects` | | yes | Band at the end of the page |

### People (`contact` of a project, `authors[]` of a publication)

| Field | Type | L | Required | Notes |
| --- | --- | --- | --- | --- |
| `kind` | select `team-member` / `external` | no | yes | Decides which fields below are read |
| `member` | relationship → `team-members` | – | when `kind` is `team-member` | Row = member `name`, `role` (as the position), `photo` (head photo), links from `profile.href` and `socialLinks` of kind `github` / `linkedin` |
| `name` | plain text | no | when `external` | |
| `title` | text | yes | project contact: when `external`; author: no | Position line under the name |
| `photo` | upload | – | project contact: when `external`; author: no | 44 px head photo |
| `profileHref`, `githubHref`, `linkedinHref` | href | no | no | An icon is shown for each one that is set |

The fields of the other variant are hidden in the admin panel and not validated; a stale value can remain in them, so read by `kind`. The link labels of `PersonRow` ("Profile of …", "GitHub of …") are not stored: they are interface text built from the name.

Authors: the page header lists every author's name. An outside author without `photo` has no sidebar row (the design shows names without rows: two names in the header). `PersonRow` has no variant without a photo, so the page filters on it; a team member whose `photo` is empty must be handled the same way.

### Link groups (`linkGroups[]` on both collections)

| Field | Type | L | R |
| --- | --- | --- | --- |
| `title` | text | yes | yes |
| `links[]` | array, min 1 | – | yes |
| `links[].parts[]` | array, min 1: `text` (text, L, R), `underline` (checkbox, R) | – | yes |
| `links[].href` | href | no | yes |
| `links[].truncate`, `.newTab`, `.disabled` | checkbox | no | yes |

`parts` is the `LinkLabelPart[]` of `LinkListGroup`: "DOI: " without underline followed by the address with underline is two rows.

### `testimonials` (`publicRead`, title `name`)

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `quote` | textarea | yes | yes | Pull quote, stored with its quotation marks |
| `paragraphs` | paragraphs, min 1 | yes | yes | Full statement |
| `name` | plain text | no | yes | Person quoted |
| `role` | text | yes | yes | Line under the name |
| `portrait` | upload | – | yes | Portrait |
| `company` | plain text | no | yes | Alt text of the logo |
| `logo` | upload | – | yes | Logo tile |

### `regions`, `tags`, `publication-categories` (`publicRead`, title `name`, default sort `name`)

`name` (text, L, R) and `slug` (unique, R). A tag name is stored without `#`.

## Globals

Both use `globalRead` and end with `meta.title` / `meta.description` (`seo()`).

### `success-stories-page`

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `hero.title` | textarea | yes | yes | `PageHero` title |
| `hero.linkLabel` | text | yes | yes | Label of the hero chip; its target is the listing anchor |
| `hero.image`, `hero.imageMobile` | upload | – | yes | `PageHero` image |
| `listing.title` | text | yes | yes | `ListingHeader` title |
| `listing.description` | textarea (line break kept) | yes | yes | `ListingHeader` description |
| `listing.tabs.completed`, `.inProgress` | text | yes | yes | Status tabs; also the status text in the header of a project page |
| `testimonials.heading` | text | yes | yes | Slider heading on the listing and above the testimonial on a project page |
| `testimonials.subline` | textarea | yes | yes | Slider subline, listing only |
| `testimonials.items` | relationship → `testimonials`, many, ordered, min 1 | – | yes | Slides of the listing slider |

### `publications-page`

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `hero.title` | textarea | yes | yes | `PageHero` title |
| `hero.chips.academic`, `.blogs`, `.policyBriefs`, `.reports` | text | yes | yes | The four hero chips; all jump to the listing anchor |
| `hero.image`, `hero.imageMobile` | upload | – | yes | `PageHero` image |
| `listing.title` | text | yes | yes | `ListingHeader` title |
| `listing.tabs.academic`, `.blogs`, `.policyBriefs`, `.reports` | text | yes | yes | Type tabs; first part of `<title>` on a listing per type |
| `outputs.title` | text | yes | yes | Heading of the "Outputs" section |
| `outputs.description` | textarea (line break kept) | yes | yes | Text under it |

## Notes for wiring

- `bodyHtml` and `contentHtml` are wrapped by Payload: `<div class="payload-richtext">…</div>`. Lists come out as `<ul class="list-bullet">`.
- The source heading `…model <br class="max-lg:hidden">for Australia` is stored as a plain line break (`model<br />for Australia`): the class is lost, so the break now also applies below `lg`, and the space before it is gone.
- Dates are stored at 12:00 UTC of the day (`2026-05-01T12:00:00.000Z`). Format them in UTC.
- All projects have the same dates, so the default sort gives no stable order. `createdAt` ascending is the order of the Figma listing for both collections (the seed creates the documents in that order).
- `partnerLink` without a link is `{ label: null, href: null }`; `home` of a project outside the carousel is `{ showOnHome: false, order: null, titleLines: null }`.
- Home carousel: `projects` where `home.showOnHome` is true, sorted by `home.order`.
- Department carousel: `where[departments][contains]=<department id>`. Service page cards: `where[services][contains]=<service id>`.
- Listing filters: options are the documents of `regions`, `services`, `tools` and `tags` (value = slug or id); "All …" labels stay in `ui.ts`.
- Publication card date: `preprint` true → the interface string "Preprint", otherwise the formatted `date`.
- "Outputs" section: `publications` where `showInOutputs` is true, filtered by the type of the listing like the main list.
- Media alt: person photos carry the person's name, the testimonial logo "Eskom"; every other image of this area has no alt (the source has `alt: ''` everywhere).

## Coverage

### `projects.json`

| Key | Goes to |
| --- | --- |
| `projects[].slug`, `.title`, `.excerpt`, `.frame` | same-named fields |
| `projects[].period` | derived from `startDate` / `endDate` |
| `projects[].thumbnail`, `.hero` | `thumbnail`, `hero` |
| `projects[].alt` | `alt` of both media documents (empty for all) |
| `projects[].partnerTag.name` | `partnerTag` → `partners` by name ("Stanford" is the document "Stanford University") |
| `projects[].partnerTag.logo/width/height` | not stored here: `partners.tagLogo`, `partners.tagSize` |
| `projects[].partnerLink` | `partnerLink.label`, `.href` |
| `detail.highlights` | `highlights` |
| `detail.tools` | `tools` → `tools` by name (all three exist) |
| `detail.services` | not seeded, see "Decisions" |
| `detail.start`, `detail.end` | `startDate`, `endDate` (parsed from "May 1, 2026") |
| `detail.rangeWord` | stays in code: interface string |
| `detail.status` | `projectStatus`, matched against the tab labels |
| `detail.region` | `region` |
| `detail.tags` | `tags` (without `#`) |
| `detail.body` | `body` |
| `detail.linkGroups` | `linkGroups` |
| `detail.contact.name/title/photo/role` | `contact.*`, variant `external` |
| `detail.contact.links[].href` | `contact.profileHref`, `.githubHref`, `.linkedinHref` |
| `detail.contact.links[].label` | derived: interface text with the name |
| `detail.partners` | not seeded: placeholder ("Climact" × 6), see "Decisions" |
| `detail.testimonial` | `testimonial` → `testimonials` by name |
| `detail.related` | `related`, each project once and without the project itself |
| `detail.cta` | `cta` |
| `detail.service` | `ctaService` → `services` by slug |
| `successStories.meta` | `success-stories-page.meta` |
| `successStories.hero.title` | `success-stories-page.hero.title` |
| `successStories.hero.links[0].label` | `success-stories-page.hero.linkLabel` (the seed throws unless there is exactly one chip) |
| `successStories.hero.links[0].href` | stays in code: anchor |
| `successStories.listing.title`, `.description` | `success-stories-page.listing.*` |
| `successStories.listing.tabs[].label` | `success-stories-page.listing.tabs.completed` / `.inProgress` |
| `successStories.listing.tabs[].href/active` | stays in code |
| `successStories.listing.id`, `.mobilePageSize` | stays in code |
| `successStories.listing.items` | derived: query of published projects |

### `publications.json`

| Key | Goes to |
| --- | --- |
| `publications[].slug`, `.title`, `.excerpt`, `.type`, `.frame` | same-named fields |
| `publications[].date` | `date`; the value "Preprint" sets `preprint` and takes the day from `detail.date` |
| `publications[].category` | `category` → `publication-categories` |
| `publications[].thumbnail`, `.alt` | `thumbnail` and its media `alt` |
| `detail.highlight` | `highlight` |
| `detail.authorNames` | `authors[]`, see "Decisions" |
| `detail.authors` | not seeded: three identical placeholder rows |
| `detail.date` | used only for the two preprints; otherwise the card date wins, see "Decisions" |
| `detail.region`, `detail.tags` | `region`, `tags` |
| `detail.hero`, `detail.heroAlt` | `hero` and its media `alt` |
| `detail.body[]` `richText` / `stats` / `image` | `body` blocks of the same names (`html` → `content`, `stats` → `items`, `alt` → media `alt`) |
| `detail.linkGroups`, `detail.citation`, `detail.cta` | same-named fields |
| `detail.related` | `related`, without the publication itself |
| `detail.service` | `ctaService` |
| `publicationsPage.meta` | `publications-page.meta` |
| `publicationsPage.hero.title` | `publications-page.hero.title` |
| `publicationsPage.hero.links[].label` | `publications-page.hero.chips.*`, by position |
| `publicationsPage.hero.links[].href` | stays in code: anchor |
| `publicationsPage.listing.title` | `publications-page.listing.title` |
| `publicationsPage.listing.typeTabs[].label` | `publications-page.listing.tabs.*`, by `type` |
| `publicationsPage.listing.typeTabs[].type/href` | stays in code: the types are the select values, the targets are routes |
| `publicationsPage.listing.id`, `.mobilePageSize`, `outputs.mobilePageSize` | stays in code |
| `publicationsPage.listing.items` | derived: query of published publications (the eighth entry repeats the second) |
| `publicationsPage.outputs.title`, `.description` | `publications-page.outputs.*` |
| `publicationsPage.outputs.items` | `publications.showInOutputs` on the three publications listed (the list repeats them three times) |

### `outputs.json`

| Key | Goes to |
| --- | --- |
| `authors` | not seeded: placeholder rows, same as `detail.authors` |
| `contact` | same object as `detail.contact` of every project |
| `cta` | same object as `detail.cta` of every project and publication |
| `pagination` | stays in code |
| `partnerLogos` | not seeded: placeholder |
| `serviceCtas` | catalog area: `services.ctaCard` |
| `testimonials.heading`, `.subline` | `success-stories-page.testimonials.*` |
| `testimonials.items` | `testimonials` collection (one document; the three entries are identical) and `success-stories-page.testimonials.items` |
| `testimonials.single` | derived: `projects.testimonial` |

### Project cards in other exports

| Key | Goes to |
| --- | --- |
| `home.json` `projects.items[]` | `projects.home.showOnHome`, `.order` (position), `.titleLines`; matched by `href` |
| `home.json` `projects.tag`, `.title`, `.label` | not this area: `home-page` (site) |
| `home.json` `projects.items[].image` | not stored, see "Card pictures" |
| `departments.json` `detail.projects[]` | `projects.departments`; matched by `href` |
| `services.json` `services[].related[]`, `relatedProjects` | `projects.services`; matched by `href` |
| card `title`, `excerpt`, `period`, `frame`, `partnerTag`, `partnerLink` in all three | the project document |

## Card pictures in other contexts

Compared by eye and by pixel difference at the same size:

| Context | File | Result |
| --- | --- | --- |
| Department pages | `organization/projects/e-fuels.jpg`, `openmod.jpg`, `geothermal.jpg` | same picture as the project thumbnail (JPEG copies) |
| Service pages | `services/projects/e-fuels-in-australia.webp`, `openmod-meets-usa-2023.webp` | same picture as the thumbnail |
| Home | `home/project-2.jpg` (Project Tauritron) | same picture as the thumbnail |
| Home | `home/project-1.jpg` (Sustainable Hydrogen) | **different**: a dam, where the thumbnail is the composed cooling-tower picture |
| Home | `home/project-3.jpg` (Google study) | **different**: wind turbines at dusk, where the thumbnail is an aerial wind farm |

`thumbnail` serves every card. The two differing home pictures are plain photos without the composed rectangles, not a different crop or format, so nothing in the home design depends on a second image and no field was added. After wiring, the home carousel shows the thumbnails for those two cards; the home page also fixes the frame to `brand-500` for all three cards in the template, while the projects' own frames are `brand-600`, `brand-900` and `brand-500`.

## Decisions

- **`projectStatus`, not `status`.** A select named `status` on a collection with drafts collides with Payload's own `_status` enum in Postgres (`enum_projects_status`); the first seed failed on it.
- **Services of a project.** The example detail names "SoftwareDevelopment", "Open-source migration" and "Train and support". None is a `services` document (those are the six audiences), so they were not mapped. `projects.services` was seeded from the related cards of the service pages instead: E-fuels in Australia and Openmod meets USA 2023 belong to all six services, the other nine projects to none. The "Service" list in the page header therefore shows six audience names on two projects and is empty on nine; the page needs to handle the empty list.
- **Tools.** PyPSA, Openmod-tracker and Detect-Infra all exist in the catalog and are related on all eleven projects.
- **Partner logos.** "Climact" is a placeholder and not a `partners` document, and it was not created. `projects.partners` is filled only where the content itself names a partner that has a grid logo: Stanford University on Openmod meets USA 2023. The other ten projects have no partner logos, so the "Partners" box is empty there. Eskom and Google are tagged on their cards but have no grid logo.
- **Contact.** Dr. Markus Groissbock is not in `team-members`, so the contact is the `external` variant on all eleven projects, with the photo and the three placeholder links from the content.
- **Authors.** Seeded from the two names in the page header. Dr. Martha Maria Frysztacki is a team member with a head photo, so she is the `team-member` variant (the placeholder author photo is the same picture as her head photo, with a red background). Charlotte Heikendorf is `external` with a name only: the content has no position or photo for her and none was invented. The sidebar therefore shows one author row where Figma shows three identical placeholder rows, and the row title is her team role instead of the placeholder line.
- **Publication date.** One date per publication. The card dates differ per publication (20 February, 27 April, 14 July 2026) while the shared example detail says 1 May 2026; the card date was seeded, so the page header will show the card date. The two preprints have no card date and got 1 May 2026.
- **Both project dates are required.** The design always shows a start and an end; a project in progress stores its planned end.
- **`citation` and `region` are required on publications**, as the design shows them on every page. Blogs may want them optional later.
- **"Outputs" section.** The content gives no rule for which publications it lists (the same three academic ones, repeated). It became a checkbox on the publication, set for those three.
- **Listing slider.** `success-stories-page.testimonials.items` is a hand-picked, ordered relation. Only one real testimonial exists, so the slider has one slide where Figma repeats it three times. No further testimonials were invented.
- **Related.** A document cannot be related to itself. Projects: the three distinct related projects minus the project itself (two or three cards). Publications: "Ukraine Against Darkness" on six of them, none on that publication itself.
- **Taxonomies.** Regions: the five options of the region filter. They exist only in `web/src/data/outputs.ts`, not in the JSON exports, so they are a constant in `seedTaxonomies.ts`. Tags: "SoftwareDevelopment" and "Tags". Categories: the five labels on the cards, including the placeholder "Blog | Category List Here".
- **Hero pictures of the two listings** are fields. The files are imported by the pages and not part of the JSON exports, so the seed names them as assets (`heroes/success-stories-*.webp`, `heroes/publications-*.webp`).
- **`home.titleLines`** is a field because the home card reserves three lines for one long title and two for the others, set by hand in the content.
- **Hero chips and type tabs** have separate labels because the design spells them differently ("Academic Publications" on the chip, "Academic Publication" on the tab).
- Content that looks like filler and was seeded as it is: the shared example detail on every document (highlights, body, link groups, CTA text with "* adjust secondary CTA here."), region "Australia/Oceania" and the two tags on everything, the dates 1 May 2026, the tag "Tags", every `mailto:info@…` link target, "lorem ipsum" in the Outputs description, the Eskom testimonial on all eleven projects, the hero of the geothermal project (the e-fuels hero).

## Where the brief was not followed literally

- The region names and the four hero asset paths are constants in the seed, because no JSON export contains them.
- Checkboxes are required with `defaultValue: false`, as in the catalog area: a required checkbox without it cannot be saved from the admin form until it is toggled.
- `detail.services` of the example project and the placeholder partner logos and author rows were left out instead of seeded (listed above).

## For the coordinator

- **`web/src/i18n/ui.ts`** needs: the range word "to" between the two project dates, "Preprint" for the publication card, and the person link labels ("Profile of {name}", "GitHub of {name}", "LinkedIn of {name}").
- **Home (site area)**: the carousel reads `projects` with `home.showOnHome`, sorted by `home.order`; `home-page` keeps only the section tag, title and label.
- **Organization**: Eskom and Google have no grid `logo`, so they cannot be chosen as partner logos of a project until one is uploaded. "Dr. Markus Groissbock" would become a relation if he were added to `team-members` with a head photo.
- Area-local helpers in `cms/src/areas/outputs/fields.ts`: `choice`, `checkbox`, `day`, `relation`, `relations`, `tab`, `cardAppearance`, `personFields`, `linkGroups`, `serviceCta`, `typeLabels`, `heroImages`. `personFields` and `linkGroups` would suit `cms/src/fields` if the events area shows people or link lists the same way.
- No shared file was edited. `cms/src/payload-types.ts` and `web/src/lib/payload-types.ts` were regenerated by `pnpm generate:types`.
- The database `oet_cms_outputs` and the folder `cms/media-outputs` are still there.
