# Report: bespoke

Routes `/organization/team` (Figma `650:24621`, mobile `651:28624`) and `/organization/theory-of-change` (`656:12898`, mobile `657:14499`). Built 2026-10-08. `pnpm check`: 0 errors. Prettier run on all owned files. No console errors at 1440 or 412 on either route.

## Result

| Page | Figma | Built | Note |
| --- | --- | --- | --- |
| Team 1440 | 4651 | 4650 | |
| Team 412 | 7437 | 7435 | |
| Theory 1440, stacked (no JS / reduced motion) | 5273 + 1800 | 7077 | +4 from `ApproachSteps` (570 vs 566) |
| Theory 412, stacked | 6927 + 1800 | 8744 | +14 from `ApproachSteps` rows, +2 heading |
| Theory 1440, pinned | 5273 + 1400 | 6677 once the matrix has expanded | |

The stacked mode shows three 900px panels where Figma has one (+1800). The pinned mode adds 1400px of scroll distance (my choice, Figma gives none).

## Files

- Pages: `web/src/pages/organization/team.astro`, `theory-of-change.astro`
- Data: `web/src/data/team.ts`, `theory-of-change.ts`
- Components: `cards/TeamCard.astro`, `cards/GlobeCountryCard.astro`, `blocks/ContinentStats.astro`, `blocks/OutcomeMatrix.astro`, `interactive/TeamGlobe.astro`, `interactive/TheoryScrollScene.astro`
- Support modules (not in the brief's list, needed by the globe): `interactive/globe.ts` (projection, clipping, pin placement, stage constants; shared by the server render and the client), `interactive/teamGlobe.client.ts` (lazy chunk)
- `web/scripts/build-globe-data.mjs` (new file; regenerates the geometry asset)
- Assets: `web/src/assets/team/world.json`, 15 portrait cut-outs, `country-card.webp`; `web/src/assets/theory/grid.svg`, `cube-lid.svg`, `cube-wall.svg`, `trail-left.svg`, `trail-right.svg`
- Icons added: `envelope`, `comment-heart`, `code-fork`, `tools`, `link-horizontal`, `medical-star`, `book-open-reader`. `code-merge` and `referral-alt` already existed when I wrote mine (another agent) and are reused, as are `box-connection`, `people-group`, `employees`, `globe-alt`.

## Components and props

- `TeamCard`: `name`, `role`, `portrait: { image; desktop: Box; mobile: Box; rotate }` (`Box` = `x, y, width, height` in px inside the 280 / 332 wide photo area, as in Figma), `glow: 'center' | 'right'`, `links: { kind: 'email' | 'github' | 'linkedin' | 'message'; label; href }[]`, `profile: { label; href }`, `tags: string[]`, `class?`. 320x411 on desktop, full width on mobile.
- `GlobeCountryCard`: `photo`, `alt`, `country`, `count`, `unit`, `class?`. 305x276.
- `ContinentStats`: `id`, `label`, `items: { value; label }[]`, `class?`. Eight cells in a row from `lg`, 4x2 below.
- `OutcomeMatrix`: `label` (region name), `columns: { output; description; outcome; icon: SvgComponent; tone: 'brand-400' | 'brand-500' | 'brand-800' | 'brand-900' }[]`, `class?`. `<oet-outcome-matrix>`.
- `TeamGlobe`: discriminated by `variant`.
  - `'team'`: `view: { lon; lat }`, `label`, `hint`, `countries: { code; name; count; lon; lat }[]` (`code` = Natural Earth `ADM0_A3`; `lon`/`lat` = pin position), `selected` (code), `unit`, `photo`, `photoAlt`, `class?`.
  - `'decorative'`: `view`, `pins: { icon: SvgComponent; lon; lat; scale }[]`, `class?`. `aria-hidden`, no script work.
- `TheoryScrollScene`: `id`, `challenge`, `goal` (`{ label; statement; emphasis: string | null; details: [string, string] }`), `values: string[]`. `<oet-theory-scene>`, sets `data-header-theme="light"`.

## TeamGlobe

- Designer specification: note `654:3157` says only "Globe Component Reference [https://codepen.io/ohheychelsea/pen/vYOeOxX]". I did not open the pen; the globe was built from the Figma frames.
- The Figma map is Natural Earth 1:50m countries in an orthographic projection centred on 91.5°W, 8°N. I fitted that against six country bounding boxes; all edges agree within 2px (most under 1px). Sphere radius 526.9 in a 1280x582 stage; mobile is the same stage at 0.763 scale, cropped; the theory page uses the stage unscaled, shifted up 10px and cropped to 520px.
- Geometry: `world.json`, 242 countries, 813 rings, 23,988 points, **133.9 kB raw, 44.0 kB gzip**. Source: Natural Earth `ne_50m_admin_0_countries` (github.com/nvkelso/natural-earth-vector, `geojson/`), **public domain**. Reduction in `scripts/build-globe-data.mjs`: outer rings only, Douglas–Peucker at 0.05°, islands under 0.02 deg² dropped (largest ring of every country kept), 1/20° grid, delta-encoded integers, polygons split at the antimeridian re-joined (Russia, Fiji), Antarctica's pole seam removed. Run: `node scripts/build-globe-data.mjs <ne geojson> src/assets/team/world.json`.
- Server render: the SVG for the default view (one path for all other land, one path per team country, rings, glow, fade) and the list of country buttons with counts are in the HTML. Buttons are `disabled` until the script mounts.
- Script: inline loader 330 B (254 B gzip). It observes the element and `import()`s the client chunk within 300px of the viewport: **5.8 kB min, 2.7 kB gzip** plus the geometry above. Measured with esbuild; `pnpm build` was not run.
- Behaviour (mine, nothing is designed): drag rotates (horizontal only on touch, vertical touch scrolls the page); arrow keys rotate by 10° when the stage has focus; clicking a pin or a team country selects it, rotates it to where the USA sits in Figma, highlights it and moves the card; clicking it again, clicking empty globe, or Escape deselects. Pins of countries behind the horizon sit on the rim and shrink (Figma draws rim pins at 0.755 and 0.636 scale). With nothing selected and motion allowed the globe turns slowly, pausing on hover and focus; under `prefers-reduced-motion` there is no auto-rotation and selection jumps without animation.
- Checked by script in Chromium at 1440 and 412 and with reduced motion: lazy load, select, card text, deselect, idle rotation on/off, drag, keys.

## TheoryScrollScene

- Notes read: `656:14404` "This Section's Animation is Scroll Triggered / Check sequence or prototype"; `656:14407` "…Screen/Mouse Enter triggered…" (matrix); `656:14445` "This Section use the same globe from Team page, with randomized iconset." The layer spec texts (`656:14355` and siblings) were taken from the catalogue's quotes, not re-read; the positions come from `get_design_context` on `654:6812`, `654:6864` and `657:15304`. The prototype was not inspected.
- Implemented: background `#191918` → `#bf1534`, lines `#5d5b59` → `#fffefb`, challenge caption slides up while the goal caption slides in (initial → trans-a); then lid lifts 147px (160 on mobile), walls move 188px apart (150 on mobile), value words fade in, trails fade in and move 20px (trans-a → end). Artwork is anchored bottom-centre and scales down when the viewport is shorter than 900px.
- `position: sticky` + passive scroll listener + `requestAnimationFrame`, attached only while the scene intersects. No CSS scroll-driven animation path. Script 1.4 kB min, 0.7 kB gzip.
- Without JavaScript or under reduced motion the three states are stacked 900px panels. All layers are vector (inline SVG from `assets/theory/`); there are no bitmap layers.
- The debug-coloured guides were not reproduced.

## For the coordinator

- UI strings carried in data for now: `pagination.first/previous/next/last/page`, globe `label`, `hint`, sort label, matrix region label, team filter `nav` label.
- `CardShell` puts media below the body; `TeamCard` has media first, so it does not use `CardShell`.
- `ListingHeader`: mobile needs `pt-[180px]` and a mobile-only description; done with `max-lg:[&>div>div]:pt-[180px]` on a wrapper and a paragraph inside the `tabs` slot. Tabs wrapper has `max-lg:-mr-2` so the third row fits as drawn (4 rows).
- `SectionHeading`: mobile gap between subline and buttons is 20, not 8; done with a `class` selector.
- `PageHero` takes one stats array; mobile Figma says "9 Country", desktop "9 Continents". Desktop text is used on both.
- `ApproachSteps` exists and is used as contracted (with its `placeholder` prop). It renders 4px taller than Figma on desktop and 14px on mobile.
- Server-rendered globe markup is about 118 kB of HTML uncompressed per page (path data). If that matters, rounding coordinates to whole pixels would roughly halve it.
- Off-palette values as drawn: `#f7c7bf` (portrait glow, Figma "brand-100", not a token), `#d9cdcd` (country card photo border), `#ee2042` ("Read Profile"), trail blocks `#393939` / `#ff3138`, scene colours above.

## Links without a designed target (all `routes.contact`)

Every "Read Profile" / "Read" link, and every social icon link on the team cards (no URLs in Figma).

## Placeholder content reproduced

- Globe: every count "12"; one conference photo for every country card; continent counts all "99"; hero "9 Continents / 50+ Experts / 8 Department".
- Team grid: Dr. Siddharth Krishna twice; "Snoopy F"; four cards labelled "Read" instead of "Read Profile"; two identical GitHub icons per card; "People And Culture" vs "People & Culture", "Modeling" vs "Modelling".
- Team mobile "Meet The Team" description copied from a projects page (mobile only, as drawn).
- Theory: "IMG-PLACEHOLDER" in all five steps; "Departments" tag above "Our Approach" on mobile only.

## Assumptions

- Only the USA is named in Figma. The other six pins are mine: Canada, Mexico, Mali, Türkiye, Kazakhstan, Japan, chosen so the default view puts pins where Figma draws them. Replace with real data.
- Hawaii is highlighted with the rest of the USA (Figma highlights the mainland and Alaska only).
- Mobile shows no country card until a pin is used (none is drawn); then it appears centred at the top of the globe.
- Sort option "Z to A" is invented; Figma shows only "A to Z". Filters and pagination are links with query strings and do nothing yet.
- Desktop pagination (not drawn) sits centred, 372px wide, in the 120px below the grid. Mobile shows the first 8 cards, desktop 16.
- Portraits are the 828px cut-out sources resized to 720px, placed with `object-fit: cover` in the per-breakpoint boxes from Figma. The colour-dodge grain layer over the photos is omitted.
- Matrix starts collapsed only when JavaScript runs and motion is allowed, and expands at 60% visibility or on pointer enter.

## Verification

| Section | 1440 | 412 | Remaining differences |
| --- | --- | --- | --- |
| Team hero | viewed against Figma | viewed against Figma | "9 Country" on mobile (above) |
| Team heading + buttons | compared | compared | none seen |
| Globe default view | compared | compared | Hawaii red; rim pins sit where geography puts them, a few px from Figma; glow strength judged by eye |
| Continent stats | compared, 120 high | compared, 212 + 120 | "Antarctic/a" breaks one letter later than Figma |
| Meet The Team header, tabs, sort | compared | compared side by side | the frame-overlap line under the title on desktop is not reproduced |
| Team cards | compared, rows 1–4 | compared side by side, 8 cards | tag line uses an ellipsis where Figma clips |
| Pagination | not in Figma | compared | — |
| Theory hero | not compared (shared `PageHero`, viewed only in the pinned shots) | not compared | — |
| Scroll scene | initial and trans-a compared with the page frame and `654:6812`; end compared side by side with `654:6864` | end compared with `657:15304`; initial viewed | intermediate motion is my interpolation |
| Approach heading + steps | viewed against Figma | compared side by side (upper part viewed only briefly) | left rule is continuous on desktop where Figma has a 40px break; step heights as noted |
| Output and Outcomes + matrix | compared, 681 high | compared side by side, 521 high | none seen |
| Impact | compared | compared side by side | left rule stops at the globe (Figma runs 118px into it) |
| Decorative globe | compared | compared side by side | as for the team globe |

Not checked: Firefox, Safari, widths between 412 and 1440 (only reasoned), screen reader output, a production build, Lighthouse.
