# Report — shared-parts

Demo: `http://localhost:4321/dev/shared` (`web/src/pages/dev/shared.astro`, data in `web/src/data/dev-shared.ts`). Every component below is rendered there with Figma content; each block has a `data-demo` attribute.

## Files

- `web/src/components/blocks/`: `PageHero.astro`, `HeroStatBar.astro`, `CtaBanner.astro`, `ListingHeader.astro`, `LinkListGroup.astro`
- `web/src/components/ui/`: `PersonBadge.astro`, `SectionHeading.astro`, `FilterTabs.astro`, `FilterBar.astro`, `SortControl.astro`, `Pagination.astro`, `RichText.astro`, `StatItem.astro`, `PersonRow.astro`; changed `Button.astro`, `Tag.astro`
- `web/src/icons/`: `angle-small-down`, `sort`, `angle-double-small-up`, `angle-left`, `angle-right`, `arrow-down`, `circle-user`, `github`, `linkedin`, `employees`, `digital-id`, `people-group`, `solar-system`, `globe-alt`, `model-cube-space`, `handshake` (all `currentColor`, Figma path data)
- `web/src/assets/heroes/<key>-desktop.webp` and `<key>-mobile.webp` for 21 pages (keys below)
- `web/src/assets/shared/`: `collage-wind.webp`, `collage-thermalpower.webp`, `collage-biz.webp`, `person-placeholder.png`
- `web/src/data/dev-shared.ts`, `web/src/pages/dev/shared.astro`

## Button and Tag (changed — other agents use these)

Figma draws strokes inside or centred on the box; paddings were reduced by the 1px border so the rendered box equals the Figma frame. Measured in the browser:

| | Rendered | Figma |
| --- | --- | --- |
| `Tag` | 25.9px high | 26 (`163:10305`, 92x26; rendered 91.2 wide) |
| `Button size="md"` | 40.0 | 40 (`163:10312`) |
| `Button size="sm"` | 32.8 | 33 (CTA buttons; Figma text 16.8 + 16) |
| `Button size="sm-tall"` | 40.0 | 40 (tabs, team heading buttons) |
| `Button size="xs"` | 32.0 | 32 (`196:1354` "See All Tools") |
| `Button size="lg"` | 41.2 | 41 (home hero buttons) |

`Button` props are unchanged (`href`, `label`, `variant`, `size`, `arrow`, `newTab`, `class?`). Font weight is now part of the size, as in Figma:

- `xs` — 14px SemiBold 112%, fixed 32px high (home "See All Tools")
- `sm` — 14px Medium 120%, hugging, 32.8px (the `.primary-base` / `.secondary-base` instances)
- `sm-tall` — same type, fixed 40px
- `md` — 16px SemiBold 112%, 40px (home vision section)
- `lg` — 16px Medium 120%, 41.2px (home hero)

New variants: `secondary` (1px `brand-600` border and text — the Figma "Secondary" instance; the existing `outline` stays `brand-500` as on home), `tint` (`brand-50` fill, `brand-500` text — primary on red panels), `outline-tint` (`brand-50` border and text — secondary on red panels). In `sm`/`sm-tall` the arrow is 16px wide (Figma 16x16 icon box); other sizes keep 18px. The nav "Contact Us" (38px) and hero stat-bar button (41px) are `size="sm"` plus a height class. The home page's `h-10`, `h-8`, `h-[33px]` overrides still work and can be removed.

## Components and props

All props are required unless marked `?`. "Slot" means an Astro named slot.

### `blocks/PageHero.astro`

Renders the red frame (20px inset on desktop, full-bleed on mobile, red strip under it), the rounded panel, artwork, ornaments and content. Sets `data-header-theme` on the panel. Contains the page `h1`.

| Prop | Type |
| --- | --- |
| `layout` | `'photo-centered' \| 'centered-dark' \| 'map-bottom-left' \| 'listing' \| 'photo-left' \| 'map-left' \| 'illustration-left'` |
| `title` | `string` (`\n` is honoured) |
| `titleSize` | `'display-2' \| 'display-3'` (56 / 48 on desktop) |
| `titleSizeMobile` | `'display-3' \| 'display-5'` (48 / 36 on mobile) |
| `eyebrow` | `string \| null` (22px line above the title; listing and left layouts) |
| `lead` | `string[]` (centred-dark: two columns; left layouts: paragraphs; `[]` for none) |
| `links` | `{ label, href }[]` (glass chips; centred and bottom layouts; `[]` for none) |
| `stats` | props of `HeroStatBar` or `null` (left layouts) |
| `person` | props of `PersonBadge` or `null` (left layouts) |
| `image` | `{ desktop: ImageMetadata; mobile: ImageMetadata }` |
| `background` | `'brand-600' \| 'brand-700' \| 'brand-800' \| 'brand-900' \| 'neutral-900'` (panel fill behind the artwork) |
| `ornament` | `'none' \| 'left-upper' \| 'left-middle' \| 'right-upper' \| 'right-lower' \| 'right-bottom' \| 'photo-both-sides' \| 'photo-right' \| 'department-index' \| 'department' \| 'department-inverse'` |
| `headerTheme` | `'light' \| 'dark'` |

Heights: centred and bottom layouts 780 desktop / 800 mobile; left layouts 553 desktop, min 573 mobile (min 676 when `person` is set).

Per page (artwork key = file prefix in `assets/heroes/`):

| Page | layout | artwork key | background | ornament | titleSize / mobile | headerTheme |
| --- | --- | --- | --- | --- | --- | --- |
| About | photo-centered | `about` | brand-700 | none | display-2 / display-5 | dark |
| Theory of change | centered-dark | `theory-of-change` | neutral-900 | none | display-2 / display-5 | light |
| Services | map-bottom-left | `services` | brand-700 | left-middle | display-2 / display-3 | light |
| Success stories | listing | `success-stories` | brand-700 | left-upper | display-2 / display-5 | light |
| Publications | listing | `publications` | brand-900 | right-upper | display-2 / display-5 | light |
| Tools and data | listing (eyebrow) | `tools-and-data` | brand-700 | right-lower | display-2 / display-5 | light |
| News and events | listing | `news-and-events` | brand-900 | right-bottom | display-2 / display-3 | light |
| Team | photo-left | `team` | brand-600 | photo-both-sides | display-2 / display-5 | light |
| Partners | photo-left | `partners` | brand-600 | none (baked, it sits behind the hand cut-out) | display-3 / display-5 | light |
| Career | photo-left | `career` | brand-600 | photo-right | display-2 / display-3 | light |
| Department index | map-left | `dept-index` | brand-700 | department-index | display-2 / display-3 | light |
| Energy System Modeling | map-left | `dept-energy-system-modeling` | brand-600 | department | display-2 / display-3 | light |
| Modeling Tools & Data | map-left | `dept-modeling-tools-data` | brand-900 | department-inverse | same | light |
| Software Engineering | map-left | `dept-software-engineering` | neutral-900 | department | same | light |
| Research and Market Development | map-left | `dept-research-market-development` | brand-600 | department | same | light |
| Service details (6) | illustration-left (eyebrow "Services") | `service-system-operators`, `service-regulators`, `service-foundations`, `service-consultancies`, `service-think-tanks`, `service-technology` | brand-700, brand-800, brand-900, brand-600, brand-700, brand-800 | none (faint blocks are baked) | display-3 / display-3 | light |

```astro
<PageHero
  layout="listing"
  title="Driving The Energy Transition With Open-Source & Open Data"
  titleSize="display-2"
  titleSizeMobile="display-5"
  eyebrow={null}
  lead={[]}
  links={[{ label: 'Success Stories', href: '#success-stories' }]}
  stats={null}
  person={null}
  image={{ desktop: successDesktop, mobile: successMobile }}
  background="brand-700"
  ornament="left-upper"
  headerTheme="light"
/>
```

### `blocks/HeroStatBar.astro`

| Prop | Type |
| --- | --- |
| `groups` | `Cell[][]` — each inner array stays on one line. `Cell` = `{ kind: 'icon'; icon: SvgComponent; tone: 'brand' \| 'light' }` or `{ kind: 'count'; value: string; label: string; tone: 'outline' \| 'glass' }` |
| `action` | `{ href; label; icon: 'arrow-right' \| 'arrow-down' } \| null` |

With three or more groups the first group takes its own row on mobile (team, partners). Team: three groups of `[icon, count outline]`. Department: one group `[icon brand, icon light, count glass]` plus `action`. Service detail: `[[icon brand]]`, `action: null`.

```astro
<HeroStatBar
  groups={[[{ kind: 'icon', icon: DigitalId, tone: 'light' }, { kind: 'count', value: '3', label: 'Open Roles', tone: 'outline' }]]}
  action={{ href: '#open-roles', label: 'Explore Opportunities', icon: 'arrow-down' }}
/>
```

### `ui/PersonBadge.astro`

`name: string`, `role: string`, `photo: ImageMetadata`. 427x96 on desktop, full width on mobile.

### `blocks/CtaBanner.astro`

| Prop | Type |
| --- | --- |
| `tone` | `'red' \| 'light'` |
| `heading` | `string` (`\n` honoured; rendered as `h2`) |
| `lead` | `string \| null` (20px SemiBold line) |
| `text` | `string` |
| `actions` | `{ label; href; emphasis: 'primary' \| 'secondary'; newTab: boolean }[]` (stacked; primary gets the arrow) |
| `collage` | `'wind' \| 'thermalpower' \| 'biz'` |
| `breakout` | `boolean` — `true` lets the collage rise above the panel (wind 136px, thermal power 47px at 1440); `false` clips it (the light-grey banner) |

Includes its own page gutters (1280 panel at 1440, full-bleed on mobile). The page must leave room above for the breakout (the demo uses `lg:pt-[136px]`).

```astro
<CtaBanner
  tone="red"
  heading={'Book OET\nfor Support Sessions'}
  lead="Connect directly with the OET team for practical guidance, technical support, and expert insight."
  text="Whether you’re exploring our tools…"
  actions={[
    { label: 'Sign Up for a Call', href: '/contact', emphasis: 'primary', newTab: false },
    { label: 'Request a Demo', href: '/demo', emphasis: 'secondary', newTab: false },
  ]}
  collage="wind"
  breakout
/>
```

### `ui/SectionHeading.astro`

Content stack only; outer padding, borders and gutters belong to the page (`class`).

| Prop | Type |
| --- | --- |
| `layout` | `'stack' \| 'split'` (split: tag + title left, columns right, from `lg`) |
| `tag` | `string \| null` |
| `title` | `string` (`\n` honoured) |
| `level` | `'h1' \| 'h2' \| 'h3'` |
| `gap` | `8 \| 10 \| 12` (tag-to-title gap: team/career 8, home 10, services 12) |
| `width` | `'narrow' \| 'medium' \| 'full'` (title max width 451 / 610 / none) |
| `subline` | `string \| null` (18px Regular) |
| `columns` | `string[]` — HTML strings; stack: equal columns under the title (career: 3); split: right-hand columns (`[]` for none) |
| `columnStyle` | `'body-lg' \| 'body-md' \| 'body-md-medium'` (18 Regular / 16 Regular / 16 Medium 132%) |
| `actions` | `{ label; href; variant: 'primary' \| 'secondary'; size: 'xs' \| 'sm-tall'; arrow: boolean }[]` — stack: joined row under the text; split: under the last column |
| `class?` | `string` |

```astro
<SectionHeading
  layout="stack" tag="Team" title="A Fully remote team of 50+ people across 21 countries" level="h2"
  gap={8} width="narrow" subline="Our team includes award-winning researchers…"
  columns={[]} columnStyle="body-lg"
  actions={[
    { label: 'Work With Us', href: '/organization/career', variant: 'primary', size: 'sm-tall', arrow: true },
    { label: 'Explore Departments', href: '/organization/departments', variant: 'secondary', size: 'sm-tall', arrow: false },
  ]}
/>
```

### `blocks/ListingHeader.astro`

Bordered listing intro (left rule, 20px indent, 40px bottom padding) with its own page gutters.

| Prop | Type |
| --- | --- |
| `layout` | `'stacked'` (text, then a row with `tabs` left and `controls` right) or `'split'` (text + `tabs` in a 625px left column, `controls` bottom right) |
| `title` | `string` (`h2`) |
| `description` | `string \| null` (`\n` honoured from `lg` in `body-md-medium`) |
| `descriptionStyle` | `'body-md-medium' \| 'body-lg'` |
| `topSpace` | `120 \| 180` |
| `id` | `string` (anchor target for the hero chips) |

Slots: `tabs`, `controls`, default (below everything, e.g. the mobile `Pagination`).

```astro
<ListingHeader layout="stacked" title="Success Stories" description={…} descriptionStyle="body-md-medium" topSpace={180} id="success-stories">
  <FilterTabs slot="tabs" label="Project status" layout="compact" options={statusTabs} />
  <FilterBar slot="controls" label="Filters" filters={filters} sort={sort} />
  <Pagination class="pt-5 lg:hidden" current={1} total={10} hrefFor={hrefFor} labels={labels} />
</ListingHeader>
```

News: `layout="split"`, `descriptionStyle="body-lg"`, state tabs in `tabs`, type tabs and a `SortControl` with `class="lg:-ml-px"` in `controls`. Team: `layout="split"`, `topSpace={120}`, `description={null}`, tabs wrapped in `<div slot="tabs" class="pt-[7px] lg:w-[700px]">` (the Figma second row is 683px wide and overflows the 625px column).

### `ui/FilterTabs.astro`

`label: string` (aria-label of the `nav`), `layout: 'compact' | 'wrap' | 'equal'`, `options: { label; href; active: boolean }[]`. Links, joined with 1px overlap, 40px high; the active one is filled and has `aria-current="true"`. `equal` = equal columns in one row from `lg`, three columns on mobile (tools: 6 x 214px at 1440).

### `ui/SortControl.astro`

Listbox button; also the dropdown used by `FilterBar`.

| Prop | Type |
| --- | --- |
| `id` | `string` (unique per page; button is `${id}-button`, list `${id}-list`) |
| `label` | `string` (accessible name) |
| `prefix` | `string \| null` ("Sort By" → "Sort By: A to Z") |
| `icon` | `'sort' \| 'chevron'` |
| `options` | `{ value; label }[]` |
| `selected` | `string` (must be one of the option values; throws otherwise) |
| `align` | `'left' \| 'right'` (popover edge) |
| `class?` | `string` |

Custom element `<oet-select>`: `data-value` holds the current value; it dispatches a bubbling `oet-select:change` event with `detail.value`. Keyboard: Enter/Space/click toggles, ArrowUp/Down opens and moves, Home/End, Enter/Space selects, Escape closes and returns focus, Tab closes. It does not filter anything in this phase.

### `ui/FilterBar.astro`

`label: string` (group name), `filters: { id; label; options: { value; label }[]; selected }[]` (the first option is the "All …" entry shown when closed), `sort: { id; label; prefix; options; selected } | null`. Renders joined dropdowns followed by the sort control.

### `ui/Pagination.astro`

`current: number`, `total: number`, `hrefFor: (page: number) => string`, `labels: { nav; first; previous; next; last; page }`, `class?`. Items are spread across the container width (Figma: 372px); shows first, last, current ± 1 and ellipses. First/previous are inert on page 1, next/last on the last page.

### `ui/RichText.astro`

`html: string`, `size: 'md' | 'lg'` (16px Medium in publications, 18px Medium in projects), `class?`. Styles `h2` 32, `h3` 28, `h4` 24 (all Medium 112%), paragraphs, links, `ul`/`ol`, `strong`, `img`/`figure`/`figcaption`, `blockquote`. 16px after a heading, 60px before one, one line between paragraphs. No horizontal padding (Figma: 20px, set by the page).

### `ui/StatItem.astro`

`variant: 'strip' | 'grid'`, `value`, `label` (`\n` honoured in `grid`), `icon: SvgComponent`, `class?`. Border is an inset outline; give siblings `-mt-px -ml-px` to share lines.

### `ui/PersonRow.astro`

`name`, `title`, `photo: ImageMetadata`, `role: string | null` (10px label above the name, e.g. "Project Lead"), `links: { kind: 'profile' | 'github' | 'linkedin'; href; label }[]` (`[]` for plain rows; `label` is the accessible name).

### `blocks/LinkListGroup.astro`

`groups: { title; links: { label; href; disabled: boolean; newTab: boolean }[] }[]`, `class?` (padding; project `px-5 py-[60px]`, publication `px-5 pt-5 pb-[60px]`). Three columns from `lg`, stacked on mobile. Disabled rows are grey, have no arrow and are not links.

## Needed from the coordinator

- UI strings (currently passed as props): `pagination.first`, `pagination.previous`, `pagination.next`, `pagination.last`, `pagination.page`; `filter.group` ("Filters"); labels for filter dropdowns ("Region", "Services", "Products", "Tags").
- `pnpm check` cannot run: `astro check does not currently support TypeScript 7.0`. Nothing in my files was type-checked by it. Both demo viewports load with no console errors.
- `SiteHeader` must accept `data-header-theme="dark"` from the About hero (it already reads the attribute).

## My design, to be confirmed by the designer

- Open state of the filter dropdowns and sort control (Figma has closed states only): popover under the button, 1px `brand-600` border, `neutral-50` fill, soft shadow, 14px Medium options, grey highlight for the active option, `brand-600` text for the selected one; the button fills `brand-600` while open. I could not match it to the header dropdowns, which another agent built.
- Sort options other than "A to Z" in the demo are invented.
- Hover and focus states everywhere (none in Figma).
- `blockquote`, `ol`, `figcaption` styles in `RichText` (not in the Figma frames).
- Pagination on desktop: same component, width decided by the page.

## Hero artwork

Figma builds each hero from photos or map images with blend modes, colour grading, blurs and a grain tile. I rebuilt those layer stacks from the Figma layer data in a headless-Chromium canvas compositor and saved one flat WebP per hero and breakpoint (desktop 2800px wide, mobile 2048px wide covering a 1024px window centred on the 412 frame). Text, chips and opaque pixel blocks are not in the images; opaque blocks are the `ornament` presets, with colours sampled after grading. Translucent blocks (services, service details) and the partners block are baked in.

Checked against Figma exports: region colour statistics for 15 desktop heroes are within about 5 levels per channel; side-by-side views of 13 desktop and 4 mobile heroes look the same. Known approximations:

- Figma image filters (exposure, contrast, saturation, highlights) have no published formula; I fitted CSS filter values per image (about, team, partners, career, department index, theory, publications). Department index and publications are the least exact (up to about 6 levels).
- Background-blur layers (about, team, career) are approximated.
- Five service illustrations come from Figma's SVG export with the hero frame clip removed, so they are complete. Technology uses the PNG export, which Figma clips to the desktop hero (the right 9% of the drawing is missing).
- The news photo is a 1429px placeholder in Figma (designer note: needs an HD photo), so it is soft at 2x.

## Placeholder content reproduced (demo only)

"9 Country / 99 Partners / 999 Funders", "12 People", "3 Open Roles", author rows "Dr. Martha Maria Frysztacki Name Here 2 Line Max" / "Title in OET/Company Here 1 Line Maximum Lorem ipsum dolor", "Dataset A/B". One portrait is reused for every person. The stat icons in the demo are stand-ins from my icon set, not the Figma ones (`blueprint`, `fi-rs-world` and so on belong to the pages).

## Verification

| Section | 1440 | 412 | Remaining differences |
| --- | --- | --- | --- |
| PageHero, 13 demo variants | compared with Figma renders; heights 822 (tall) and 593 (short) match | theory, news, team, service detail compared with Figma; others viewed, not compared side by side | see below |
| HeroStatBar, PersonBadge | compared inside the heroes; 41px cells, 427x96 badge | viewed | — |
| CtaBanner (wind, thermal red, thermal light) | compared; panel 1280x462 | viewed against the Figma mobile render; 754 vs 755 | `biz` collage has no handoff usage, viewed only |
| ListingHeader + FilterTabs + FilterBar + SortControl | viewed against dumped Figma geometry; success 360.5 vs 360, news 389 vs 390, team 294 vs 294 | viewed; wrap order matches success stories | not overlaid on a Figma image |
| FilterTabs equal | 6 x 214px, 40 high | 3 columns | — |
| Pagination | 24px cells, spread | viewed | — |
| SectionHeading (5 variants) | viewed against dumped geometry | viewed | not overlaid |
| RichText, LinkListGroup, StatItem, PersonRow | viewed; row 40px, stat cells 344x101 / 344x82, strip 72 high | viewed | not overlaid |
| Dropdown behaviour | click, arrow keys, Enter, End, Escape tested by script | not tested | — |

Remaining differences against Figma:

- Team and career hero text starts at x=96 in Figma, 80 on the other short heroes; I use 80 everywhere.
- Mobile chip bottom offset varies in Figma (30 news/tools, 42 services, 62 success/publications/about); I use 42 for bottom layouts and 61 for centred ones.
- Mobile tall hero is 800px; About and Theory are 799 in Figma.
- Department index hero lead wraps one word differently from Figma.
- Team filter tabs on mobile: Figma lets the third row overflow the frame by 7px; mine wraps naturally into five rows.
- `SectionHeading` split: home uses 302px columns with a 10px gap, services 295px with 20px; I use a 20px gap for both. The career "Open Roles" tag in Figma has square corners; `Tag` is always a pill.
- `LinkListGroup`: long labels wrap; the project frame truncates one label on desktop while the publication frame wraps.
- `PersonBadge` and author photos have a partial red stroke in Figma that I did not reproduce.
- Off-palette values used as drawn: chip and badge border `#ececec` (32% on chips), ornament colours listed in `PageHero`.
- Between about 680 and 1023px wide, the technology illustration ends before the right edge of the mobile hero (see hero artwork).
