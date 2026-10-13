# CMS report — site area

Area `site`: globals `home-page`, `site-header`, `site-footer`, `site-settings`; no collections. Files in `cms/src/areas/site/`. Nothing in `web/` was touched.

Notation: **L** = localised, **R** = required. "paragraphs" is the shared helper: a localised array of rows `{ text }`; read it with `texts()`.

## Verification that was run

| Check | Result |
| --- | --- |
| `pnpm generate:types` | succeeds |
| `pnpm check` (`tsc --noEmit`, whole `cms`, with the events and outputs files as they were at that moment) | 0 errors |
| `SEED_AREAS=core,organization,catalog,site pnpm seed` against `oet_cms_site`, four runs (two before and two after a validation fix) | no errors |
| Read back of the four globals at depth 2, anonymous (`overrideAccess: false`), walking every value | every seeded field present; the only empty values are the intended ones (list under "Seeded values that are empty") |
| Validation (throwaway script, deleted) | rejected: a second services menu, a link group shown as a single mobile link without a target, a tag manager id `UA-1`, a footer with three columns |
| `pnpm exec prettier --write src/areas/site` | run |

Not run: the admin panel (`next dev` is forbidden by the brief), so tabs, the `mobileHref` condition and the descriptions were not looked at in a browser. The REST API was not called over HTTP; reads went through the local API.

This area has no rich text field, so there are no `…Html` twins.

## Seeded documents

| What | Count |
| --- | --- |
| Globals | 4 (`home-page`, `site-header`, `site-footer`, `site-settings`) |
| `media` uploaded by this area | 24 (12 hero files, 1 intro photo, 8 platform logos, 3 step photos); 210 in the database together with organization and catalog |
| `home-page` | 3 hero slides, 2 intro buttons, 6 figures, 8 platform logos, 3 steps |
| `site-header.menu` | 5 entries (4 link groups, 1 services menu) |
| `site-footer.columns` | 4 (3 link columns, 1 services column), 3 legal links |

## Globals

All use `globalRead` and `admin.group: 'Site'`.

### `home-page`

Tabs; a named tab is a group of that name in the API.

| Group | Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- | --- |
| `hero` | `primaryAction.label` / `.href` | link | label | yes | Filled button of the hero (`HomeHero` `primaryAction`) |
| | `secondaryAction.label` / `.href` | link | label | yes | Outlined button (`secondaryAction`) |
| | `slides[]` | array, min 1 | no | yes | `HomeHero` `slides` |
| | `slides[].label` | text | yes | yes | Name on the "next" control |
| | `slides[].title` | textarea | yes | yes | Slide title, line breaks kept |
| | `slides[].statement` | textarea | yes | yes | First text box = `paragraphs[0]` |
| | `slides[].description` | textarea | yes | yes | Second text box = `paragraphs[1]` |
| | `slides[].image`, `.imageMobile`, `.thumbnail` | upload | — | yes | Desktop photo, mobile photo, thumbnail. The slide's `alt` is the `alt` of `image` |
| | `slides[].pattern.image` | upload | — | yes | Rectangle cut-out |
| | `slides[].pattern.left`, `.top` | number | no | yes | Position in the 1400 x 780 frame |
| `intro` | `tag`, `title` | text, textarea | yes | yes | `IntroStatement` |
| | `paragraphs` | paragraphs, min 1 | yes | yes | |
| | `actions[]` | array, 0–2: `label` (L, R), `href` (R), `variant` select `primary` / `outline` (R), `arrow` checkbox (R) | — | no | Buttons |
| | `image` | upload | — | yes | `BrandImage`; alternative text on the media document |
| (top level) | `stats[]` | array, 1–6: `value` (text, not localised, R), `label` (L, R), `icon` select `blueprint` / `handshake` / `employees` / `world` / `folder-edit` / `license` (R) | — | yes | `StatStrip` |
| `services` | `tag`, `title` | text, textarea | yes | yes | Heading above `ServiceAccordion` |
| `tools` | `tag`, `title` | text, textarea | yes | yes | Heading of the tools section |
| | `paragraphs` | paragraphs, exactly 2 | yes | yes | The page reads `[0]` and `[1]` |
| | `action.label` / `.href` | link | label | yes | "See All Tools" button |
| | `logos[]` | array, min 1: `name` (text, not localised, R), `logo` (upload, R), `width`, `height` (number, R) | — | yes | `LogoRow` |
| `steps` | `tag`, `title` | text, textarea | yes | yes | `VerticalCarousel` |
| | `items[]` | array, min 1: `title` (L, R), `paragraphs` (min 1), `note` (textarea, L, R), `image` (upload, R) | — | yes | `VerticalCarousel` `steps`; `alt` on the media document |
| `partners` | `trustedPartnersLabel` | text | yes | yes | Label of the `trusted-partner` group; on mobile the label of the single grid |
| | `networksLabel` | text | yes | yes | Label of the `network-affiliation` group (desktop) |
| `projects` | `tag` | text | yes | yes | Tag above the carousel title |
| | `title` | textarea | yes | yes | Carousel title |
| | `carouselLabel` | text | yes | yes | `CardCarousel` `label` |
| `meta` | `title`, `description` | `seo()` | yes | yes | `<title>`, meta description |

Not stored here, to be queried by the page:

- Accordion items: `services`, `home` group (`title`, `paragraphs`, `image`), sorted by `order`; `href` from the slug.
- Partner logos: `partners` where `showOnHome`, sorted by `homeOrder`. Desktop: two groups by `group`, sizes from `logoDesktop`. Mobile: one grid of all of them under `trustedPartnersLabel`, sizes from `logoMobile`.
- Project cards: `projects` with the home-carousel flag of the outputs area.

### `site-header`

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `menu` | blocks, min 1, at most one `servicesGroup` | — | yes | Desktop bar and mobile menu, in this order |
| block `linkGroup`: `label` | text | yes | yes | Entry label in both menus |
| `links[]` (`label` L, `href`) | array, min 1 | — | yes (type is optional, `minRows` enforces it) | Dropdown links |
| `desktop` | select `menu` / `hidden` | no | yes | Whether the desktop bar has the entry |
| `mobile` | select `menu` / `link` / `hidden` | no | yes | Expandable group, single link, or absent in the mobile menu |
| `mobileHref` | text (href rule) | no | only while `mobile` is `link` | Target of the single mobile link |
| block `servicesGroup`: `label` | text | yes | yes | Label of the services entry |
| `more.label`, `more.description` | text, textarea | yes | yes | Card at the end of the services panel |
| `more.href` | href | no | yes | |
| `contact.label` / `.href` | link | label | yes | Contact button of the bar |

### `site-footer`

| Group | Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- | --- |
| `cta` | `headline` | paragraphs, min 1 | yes | yes | `FooterCta` headline, one row per line |
| | `action.label` / `.href` | link | label | yes | `FooterCta` button |
| (top level) | `blurb` | textarea | yes | yes | Text in the first footer box |
| | `columns` | blocks, exactly 4, at most one `servicesColumn` | — | yes | The four link columns |
| | block `linkColumn`: `title` (L, R), `links[]` (`label` L, `href`; min 1) | | | | Column with stored links |
| | block `servicesColumn`: `title` (L, R) | | | | Column that lists the services |
| | `copyright` | text | yes | yes | Footer **and** mobile menu |
| | `legal[]` (`label` L, `href`) | array, min 1 | — | yes | Footer **and** mobile menu |
| | `consentLabel` | text | yes | yes | Cookie settings button, desktop footer |
| | `consentLabelCompact` | text | yes | yes | Same button in the mobile footer **and** the mobile menu |

### `site-settings`

| Field | Type | L | R | Where it appears |
| --- | --- | --- | --- | --- |
| `siteName` | text | no | yes | Not used by a page yet (title suffix, structured data) |
| `contactEmail` | email | no | yes | Email link of the footer call to action: label = the address, target = `mailto:` + the address |
| `meta.title`, `meta.description` | `seo()` | yes | yes | Default for a page without its own |
| `socialLinks[]` | array: `kind` select `linkedin` / `github` / `x` / `youtube` / `bluesky` / `mastodon` (R), `url` href (R) | no | no | Not in the design yet |
| `googleTagManagerId` | text, `GTM-…` pattern | no | no | Empty = no tag manager |

## Header: one menu for desktop and mobile

The two menus in `navigation.json` differ in three ways. Each is handled without a second list:

1. **"Tools & Data" is a dropdown on desktop and a direct link on mobile.** One `linkGroup` with `desktop: menu`, `mobile: link`, `mobileHref: /tools-and-data`. Its five links are entered once.
2. **"Solutions" exists only on mobile.** One `linkGroup` with `desktop: hidden`, `mobile: menu`, placed second. Because it is hidden on desktop, one order serves both menus: mobile reads all five entries, desktop the four that are not hidden.
3. **The services are ordered differently.** Mobile lists them 1–6 (`services.order`); desktop lists them 1, 3, 5, 2, 4, 6. That is the same order placed in the three-column, two-row panel column by column (columns hold 1/2, 3/4, 5/6), so it is a layout rule, not content. Nothing is stored. Wiring: mobile menu and home accordion use `order`; the desktop panel reorders with rows = 2 (`[0, 2, 4, 1, 3, 5]` for six).

"Outputs" and "Organization" are identical in both menus and are single entries. The seed builds the menu from both lists and throws if a label, a link list or the relative order of the shared entries ever differs.

Mechanics that stay in code: the group ids (`tools-and-data`, `services`, …) used for `aria-controls`; the wiring can use the block row `id` or derive one from the position. `kind` maps as `linkGroup` → `list` (or `link` on mobile when `mobile` is `link`), `servicesGroup` → `mega`.

## Values stored once

| Value | Owner | Also read by |
| --- | --- | --- |
| Copyright line | `site-footer.copyright` | mobile menu |
| Legal links | `site-footer.legal` | mobile menu |
| Cookie settings label, short form | `site-footer.consentLabelCompact` | mobile menu (`navigation.consentLabel` is the same text) |
| Contact address | `site-settings.contactEmail` | footer call to action (email link) |
| Service labels, descriptions, icons | `services.navigation` | services menu, footer services column |

## Coverage

### `home.json`

| Key | Went to |
| --- | --- |
| `hero.actions.primary` / `.secondary` | `home-page.hero.primaryAction` / `.secondaryAction` |
| `hero.slides[].label`, `.title` | `hero.slides[].label`, `.title` |
| `hero.slides[].paragraphs[0]` / `[1]` | `hero.slides[].statement` / `.description` |
| `hero.slides[].image`, `.imageMobile`, `.thumbnail` | same-named uploads |
| `hero.slides[].pattern.image/left/top` | `hero.slides[].pattern.*` |
| `hero.slides[].alt` | `alt` of the media documents of `image` and `imageMobile` |
| `intro.tag/title/paragraphs/actions/image` | `home-page.intro.*` |
| `intro.alt` | `alt` of the media document |
| `meta` | `home-page.meta`; also seeds `site-settings.meta` and `site-settings.siteName` (see decisions) |
| `partnerGroups[0].label`, `[1].label` | `home-page.partners.trustedPartnersLabel`, `.networksLabel` |
| `partnerGroups[].logos`, `partnerGroupsMobile[].logos` | not this area: `partners` (organization) |
| `partnerGroupsMobile[0].label` | derived: same as `trustedPartnersLabel` (the seed throws if it differs) |
| `projects.tag`, `.title`, `.label` | `home-page.projects.tag`, `.title`, `.carouselLabel` |
| `projects.items` | not stored: `projects` collection (outputs) |
| `services.tag`, `.title` | `home-page.services.*` |
| `services.items` | not this area: `services.home` (catalog) |
| `stats[].value/label/icon` | `home-page.stats[]` |
| `steps.tag/title` | `home-page.steps.*` |
| `steps.items[].title/paragraphs/note/image` | `home-page.steps.items[]` |
| `steps.items[].alt` | `alt` of the media document |
| `tools.tag/title/paragraphs/action` | `home-page.tools.*` |
| `tools.logos[].name/width/height` | `home-page.tools.logos[].name/width/height` |
| `tools.logos[].image` | `home-page.tools.logos[].logo`; its media `alt` is the name |

### `navigation.json`

| Key | Went to |
| --- | --- |
| `desktop[]` / `mobile[]` list groups: `label`, `links` | `site-header.menu[]` `linkGroup.label`, `.links` (once per group) |
| which list a group is in, `mobile[].kind: link` | `linkGroup.desktop`, `.mobile` |
| `mobile[]` direct link `href` | `linkGroup.mobileHref` |
| `kind` | derived from the block type and `mobile` |
| `id` | stays in code: `aria` wiring |
| mega `label` | `servicesGroup.label` |
| mega `more.label/description/href` | `servicesGroup.more.*` |
| mega `links[].label/description/icon` | not this area: `services.navigation` (catalog). The seed checks that every linked service exists |
| mega `links[].href` | derived from the service slug |
| order of mega `links` (desktop vs mobile) | derived: `services.order`, laid out by column on desktop |
| `contact` | `site-header.contact` |
| `legal` | `site-footer.legal` (same three links; see decisions for the order) |
| `consentLabel` | `site-footer.consentLabelCompact` |
| `copyright` | `site-footer.copyright` |

### `footer.json`

| Key | Went to |
| --- | --- |
| `cta.headline` | `site-footer.cta.headline` |
| `cta.email.label` | `site-settings.contactEmail` |
| `cta.email.href` | derived: `mailto:` + `contactEmail` (the seed throws if the source differs) |
| `cta.action` | `site-footer.cta.action` |
| `blurb`, `copyright`, `legal` | `site-footer.blurb`, `.copyright`, `.legal` |
| `consentLabel`, `consentLabelCompact` | same-named fields |
| `columns[].title` | `columns[].title` (both block types) |
| `columns[].links` of Tools & Data, Outputs, Organization | `linkColumn.links` |
| `columns[1].links` (Services) | not stored: `servicesColumn` lists `services` with `navigation.label`; target from the slug. Order: same column-wise rule as the desktop menu (see below) |

## Seeded values that are empty

- `site-settings.socialLinks`: no rows. The content has no profile URLs and I did not look any up.
- `site-settings.googleTagManagerId`: empty. No id is in the content.
- `site-header.menu[].mobileHref`: `null` for the three groups that are not a single mobile link.
- Media `alt`: empty for the three hero thumbnails and the three pattern images (decorative, the components render them with `alt=""`).

## Decisions

- **Footer email link is not a footer field.** The task listed it under the footer and also asked for a contact email in settings. The link is the address itself with a `mailto:` target, so it is stored once as `site-settings.contactEmail`. If the footer should be able to show a different address, add a `link` to `site-footer.cta`.
- **Legal link order.** The mobile menu has Legal, Privacy Statement, Disclaimer; the footer has Legal, Disclaimer, Privacy Statement. One list is stored, in the footer order, so the mobile menu will show the footer order after wiring. This will appear as a text-order difference in `compare-content`.
- **Footer services order.** The static footer lists the services 1, 3, 5, 2, 4, 6, which is the DOM order of the desktop menu. To match it, the wiring applies the same reorder as for the desktop panel; listing them 1–6 would be the plain reading of `order`. One for the designer.
- **Footer has exactly four columns** (`minRows` = `maxRows` = 4) because `SiteFooter` lays them out as two pairs.
- **Footer and header link lists are separate.** "Tools & Data" has the same five links in both, "Organization" the same seven in a different order, "Outputs" differs. They are stored per global; only the desktop/mobile duplication inside the header was removed.
- **Blocks instead of a `kind` select** for menu entries and footer columns: the generated type is a discriminated union, and a services entry has no link list an editor could fill by mistake.
- **Hero paragraphs are two named fields** (`statement`, `description`), not an array: the design has exactly two boxes with different roles.
- **`site-settings` has no JSON source.** `siteName` and the default `meta` are seeded from `home.json` `meta` (title "Open Energy Transition"), `contactEmail` from the footer. Nothing was typed in.
- **Social kinds** are my choice (`linkedin`, `github`, `x`, `youtube`, `bluesky`, `mastodon`); no component maps them yet and only `linkedin` and `github` have an icon in `web/src/icons`.
- **Stat icon and tone**: only the key is stored; `StatStrip` fixes the colour per key.
- **Tools section takes exactly two paragraphs** because the page places the button under the second one.
- Copy seeded as it is: hero slide 3 title "UVP Marketing Statement for Government Here", "We Develop, co-maintain", the mobile-only "Solutions" group whose two links both lead to `/outputs/success-stories`, every `mailto:info@…` placeholder target.

## For the coordinator and the wiring agent

- Read `site-header` and `site-footer` at depth 0 (no relations), `home-page` at depth 1 (uploads), `site-settings` at depth 0.
- `linkGroup.links` and `linkColumn.links` are typed optional (the shared `links` helper sets `minRows` but not `required`); read them with `required()`.
- Checkboxes (`intro.actions[].arrow`) are required with `defaultValue: false`, as in the catalog area.
- Area-local helpers in `cms/src/areas/site/fields.ts`: `number`, `checkbox`, `heading` (tag + title), `singleServicesBlock` (blocks validator that keeps the built-in row checks), `linkColumnBlock`, `servicesColumnBlock`. `number` and `checkbox` now exist in three areas and could move to `cms/src/fields`.
- No shared file was edited. `cms/src/payload-types.ts` and `web/src/lib/payload-types.ts` were regenerated by `pnpm generate:types`.
- The database `oet_cms_site` and the folder `cms/media-site` are left in place.

## Where the brief was not followed literally

- The footer email link is derived from `site-settings.contactEmail` instead of being a footer field (see decisions).
- `mobileHref` and `googleTagManagerId` are plain `text` fields with their own validation instead of the `href` / `plainText` helpers, because they need a conditional requirement and a pattern.
- Required checkboxes carry `defaultValue: false`, and the two display selects default to `menu`, so a new row can be saved from the admin form. These are schema defaults, not substitutes in code.
