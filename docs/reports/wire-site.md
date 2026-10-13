# Wiring report — home page and site shell

The home page (`/`), the header, the mobile menu and the footer read the Payload CMS. No schema change was needed; nothing in `cms/` was touched.

## What is connected

| File | Loader | Reads |
| --- | --- | --- |
| `web/src/data/navigation.ts` | `loadNavigation(locale)` | `site-header` (depth 0), `site-footer` (depth 0: legal links, copyright, compact consent label), `services` (depth 0, sorted by `order`) |
| `web/src/data/navigation.ts` | `loadServiceLinks(locale)`, `serviceLinksByColumn`, `byColumn`, `links` | helpers shared with the footer |
| `web/src/data/footer.ts` | `loadFooter(locale)` | `site-footer` (depth 0), `site-settings` (depth 0: `contactEmail`), `services` |
| `web/src/data/home.ts` | `loadHomePage(locale)` | `home-page` (depth 1), `services` (depth 1, `home` group), `partners` where `showOnHome` sorted by `homeOrder` (depth 1), `projects` where `home.showOnHome` sorted by `home.order` (depth 2, the smallest depth that populates `partnerTag.tagLogo`) |
| `web/src/layouts/BaseLayout.astro` | calls `loadNavigation` and `loadFooter` once per render | |
| `web/src/pages/index.astro` | calls `loadHomePage` | |

All content constants and asset imports in the three data modules are gone. The exported view-model types are unchanged; `home.ts` gained `Link`, `IntroAction` and `HomePage`. No component was changed: every view model kept its shape.

Mapping notes:

- **Menu entries.** `linkGroup` becomes a `list` group on desktop when `desktop` is `menu`, and on mobile a `list` group (`menu`), a direct link to `mobileHref` (`link`) or nothing (`hidden`). `servicesGroup` becomes the `mega` group. One stored order serves both menus.
- **Group ids** are the Payload block row ids (`nav-<row id>`), so they stay stable when an editor reorders the menu. `scripts/shoot-shell.mjs` had the old id `#nav-tools-and-data` in one keyboard check; that selector now reads the first dropdown panel (one line changed).
- **Order of services.** Mobile menu and home accordion use `order`. The desktop panel and the footer column use `byColumn(items, 3)`: the same order placed column by column in the three-column grid (1, 3, 5, 2, 4, 6 for six). It also holds for a count that does not fill the last row.
- **Footer email link** is `site-settings.contactEmail` with a `mailto:` target.
- **Partner grids.** Desktop: two groups by `group`, boxes from `logoDesktop`; a partner without a group is left out, as the field description says. Mobile: all home partners in one grid under the trusted-partners label, boxes from `logoMobile`.
- **Project cards.** Picture is the project `thumbnail`; `home.titleLines` maps `'2'` / `'3'` to the card prop. Partner tag, partner link and period come from the pure functions `partnerTag`, `partnerLink` and `projectPeriod` exported by `web/src/data/projects.ts` (outputs area), so the home card and the listing cards cannot drift apart. `partnerTags.ts` is no longer imported by `home.ts`.

## Verification

| Check | Result |
| --- | --- |
| `pnpm check` | 0 errors, whole project, at the time of the last run |
| `prettier --write` on the changed files | run |
| `compare-content` for `/` | 32 changed lines, all explained below |
| `compare-content` for all 56 routes | every route differs by at least the four mobile-menu legal lines; the rest belongs to other areas. Full output in `web/.screenshots/wire-site/compare-all.txt` |
| Header and footer text, link targets and number of ids, extracted on their own from all 56 routes and compared with the static HTML | header: only the predicted swap of "Privacy Statement" and "Disclaimer" in the mobile menu, on all 56; footer: identical on all 56 |
| `scripts/shoot-shell.mjs` | every behaviour check true, header themes as expected, no console problems |
| Shell screenshots against the static ones (`.screenshots/shell-static`, a copy of `.screenshots/shell` taken before the run) | 22 of 28 identical pixel for pixel, among them the open desktop services menu, the three other dropdowns, the language menu, the themes and the desktop footer. The six others are listed below |
| Home at 1440 and 412, taken with `snapshot-all.mjs` (same settings as the baseline) against `.screenshots/cms-before` | same page height at both widths (7127 and 9933). At 1440 everything above the partner grid is identical; differences only in the partner grid and the project cards. At 412 the same two regions |

I looked at: the open desktop services menu, the open mobile services menu, the mobile menu legal strip (before and after), the mobile footer (before and after), the header at the top of `/dev/shell` (before and after), and the side-by-side differences of the home page at both widths.

### Shell screenshots that were not identical

- `m-menu-root`, `m-menu-group`, `m-menu-services`: only the legal strip, which now reads Legal, Disclaimer, Privacy Statement (predicted by the site report: one list, in the footer order).
- `d-light`, `m-light`: the script caught the preloader still fading. Shot again after a four-second wait, both are identical to the static ones.
- `m-footer`: the off-screen skip link falls inside the footer capture. With the skip link hidden the footer is identical to the static one.

### Remaining differences on `/`

| Difference | Reason |
| --- | --- |
| Card period "05/2026 - 05/2026" instead of "MM/YYYY - MM/YYYY" (three cards) | The placeholder is replaced by the seeded project dates |
| Pictures of the first and third project card | The home page used two photos of its own; the card now shows the project thumbnail (decision in the outputs report) |
| Desktop partner grid: the first group has 16 logos (three rows), the second only University of Canterbury | The static second group repeated nine logos of the first as filler. The six partners that existed only in the mobile grid (Stanford, TransnetBW, OTH Regensburg, Ember, European Climate Foundation, eurima) are `trusted-partner` in the seed and so appear on desktop too. The section keeps its height (four rows); the second row is half empty |
| Mobile partner grid: 17 logos in `homeOrder`, last cell empty | The static grid had 18 with Environmental Defense Fund twice and its own order |
| Alternative text "International Council on Clean Transportation" without "The" | Name of the partner document |
| Mobile menu legal order | See above |

## Not done

- **Default SEO.** `site-settings.meta` has no reader. `BaseLayout` requires `title` and `description`, and every page passes its own, so a default would be a code path nothing uses. `siteName`, `socialLinks` and `googleTagManagerId` are not read either (no design for them).
- The static shots in `.screenshots/shell` are of unknown age; they were the only static reference for the open menus. `.screenshots/cms-before/dev__shell-*.png` is a "Not found" page and could not be used.
- Not checked: a production build, and any browser other than Chromium.

## For the coordinator

- `home.ts` imports `partnerLink`, `partnerTag` and `projectPeriod` from `data/projects.ts`. If the outputs area renames them, the home page fails in `pnpm check`.
- The layout issues six CMS requests per page in development (`site-footer` and `services` twice, once per loader). During a build the client cache folds them into four for the whole site.
- For the designer: the second partner group with a single logo, and the service order 1, 3, 5, 2, 4, 6 in the footer column (a vertical list, where reading order 1 to 6 would be the plain choice).
- Left in place: `web/.screenshots/wire-site/`, `shell-static/`, `shell-recheck/`. Assets under `web/src/assets/home` are no longer imported by `home.ts`.
- No key was added to `web/src/i18n/ui.ts`.
