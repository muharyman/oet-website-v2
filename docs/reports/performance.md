# Report: performance

Performance pass on the static Astro build, 2026-10-08. `pnpm check`: 0 errors. `pnpm build` passes (56 pages).

## Result

Home page, mobile: **performance 89 → 97, LCP 3.75 → 2.56 s, CLS 0 → 0, TBT 17 → 0 ms, Speed Index 1.60 → 1.56 s, 771 → 573 KiB.** Desktop: 100 → 100, LCP 0.79 → 0.55 s. With 40 ms server latency the same build measures mobile 100, LCP 1.68 s (`v4-latency40`); the baseline 99 and 2.13 s (`before-latency40`).

"Before" is the build as I found it, measured on a quiet machine (`before-quiet`); "after" is the final build (`v4`). The coordinator's single run (81, LCP 4.7 s) and my first loaded-machine series (`before`: 78, LCP 3.87 s, TBT 418 ms) are the same build under load.

### Mobile (median of three, before → after)

| Page | Performance | LCP s | CLS | TBT ms | Speed Index s | Transferred KiB | Accessibility |
| --- | --- | --- | --- | --- | --- | --- | --- |
| home | 89 → 97 | 3.75 → 2.56 | 0 → 0 | 17 → 0 | 1.60 → 1.56 | 771 → 573 | 89 → 89 |
| success-stories | 100 → 100 | 1.66 → 1.44 | 0 → 0 | 0 → 0 | 1.35 → 1.30 | 271 → 254 | 89 → 89 |
| project-detail | 100 → 100 | 1.58 → 1.67 | 0 → 0 | 0 → 0 | 1.41 → 1.38 | 116 → 115 | 89 → 89 |
| publication-detail | 100 → 100 | 1.58 → 1.58 | 0 → 0 | 0 → 0 | 1.41 → 1.47 | 107 → 108 | 89 → 89 |
| tools-and-data | 98 → 99 | 2.41 → 1.88 | 0 → 0 | 0 → 3 | 1.33 → 1.41 | 256 → 154 | 92 → 92 |
| services | 100 → 100 | 1.73 → 1.81 | 0 → 0 | 46 → 0 | 1.40 → 1.46 | 272 → 247 | 92 → 92 |
| service-detail | 97 → 100 | 2.19 → 1.81 | 0 → 0 | 128 → 0 | 1.53 → 1.42 | 232 → 167 | 89 → 89 |
| about | 97 → 99 | 2.63 → 2.26 | 0.016 → 0.016 | 0 → 0 | 1.29 → 1.35 | 354 → 249 | 92 → 92 |
| team | 97 → 100 | 2.56 → 1.51 | 0.018 → 0.018 | 0 → 0 | 1.51 → 1.35 | 325 → 265 | 96 → 96 |
| theory-of-change | 99 → 99 | 2.03 → 1.89 | 0.038 → 0.038 | 0 → 0 | 1.67 → 1.65 | 174 → 154 | 92 → 92 |
| news-and-events | 98 → 100 | 2.34 → 1.73 | 0.026 → 0.026 | 0 → 0 | 1.39 → 1.33 | 290 → 220 | 92 → 92 |
| event-detail | 100 → 99 | 1.88 → 1.89 | 0.006 → 0.006 | 0 → 0 | 1.32 → 1.35 | 280 → 280 | 92 → 92 |

### Desktop (median of three, before → after)

| Page | Performance | LCP s | CLS | TBT ms | Speed Index s | Transferred KiB | Accessibility |
| --- | --- | --- | --- | --- | --- | --- | --- |
| home | 100 → 100 | 0.79 → 0.55 | 0 → 0 | 0 → 0 | 0.59 → 0.61 | 737 → 570 | 89 → 89 |
| success-stories | 100 → 100 | 0.43 → 0.45 | 0 → 0 | 0 → 0 | 0.56 → 0.54 | 230 → 230 | 89 → 89 |
| project-detail | 100 → 100 | 0.49 → 0.51 | 0.003 → 0.003 | 0 → 0 | 0.52 → 0.51 | 209 → 210 | 89 → 89 |
| publication-detail | 100 → 100 | 0.43 → 0.45 | 0 → 0 | 0 → 0 | 0.53 → 0.56 | 208 → 209 | 89 → 89 |
| tools-and-data | 100 → 100 | 0.43 → 0.43 | 0 → 0 | 0 → 0 | 0.52 → 0.51 | 133 → 134 | 92 → 92 |
| services | 100 → 100 | 0.44 → 0.42 | 0 → 0 | 0 → 0 | 0.54 → 0.56 | 241 → 242 | 92 → 92 |
| service-detail | 100 → 100 | 0.40 → 0.43 | 0.003 → 0.003 | 0 → 0 | 0.54 → 0.56 | 129 → 129 | 89 → 89 |
| about | 100 → 100 | 0.51 → 0.51 | 0.002 → 0.002 | 0 → 0 | 0.50 → 0.51 | 228 → 228 | 92 → 92 |
| team | 100 → 100 | 0.56 → 0.44 | 0 → 0 | 0 → 0 | 0.72 → 0.61 | 357 → 302 | 96 → 96 |
| theory-of-change | 100 → 100 | 0.47 → 0.44 | 0.005 → 0.005 | 0 → 0 | 0.60 → 0.60 | 152 → 140 | 92 → 92 |
| news-and-events | 100 → 100 | 0.47 → 0.45 | 0 → 0 | 0 → 0 | 0.49 → 0.53 | 256 → 256 | 92 → 92 |
| event-detail | 100 → 100 | 0.43 → 0.45 | 0 → 0 | 0 → 0 | 0.51 → 0.53 | 226 → 226 | 92 → 92 |

Targets: performance ≥ 95, LCP < 2.0 s, CLS < 0.05, TBT < 100 ms.

- Met on every measured page: performance, CLS, TBT (mobile and desktop).
- LCP is above 2.0 s on mobile on the home page (2.56 s) and About (2.26 s); all other pages are between 1.44 and 1.89 s. The causes are in "Below target".
- Accessibility is unchanged (89–96). Every failing audit except the footer link size is in a file I do not own; see "Accessibility".

## Measurement setup

- Server: `web/scripts/serve-dist.mjs <folder> <port> <latency ms>` (Node `http`, `zlib`, `fs` only). Brotli (quality 9) or gzip for text, `cache-control: public, max-age=31536000, immutable` for `/_astro/*`, `max-age=0, must-revalidate` for everything else. Latency 0 for all tables; one extra series with 40 ms per response to imitate a CDN round trip.
- Each build was copied to a scratch folder and served from there, so later builds did not change a run in progress.
- Lighthouse 13.5.0 through `web/scripts/lighthouse.mjs <origin> <label> <runs> [page…]`: `npx --yes lighthouse <url> --only-categories=performance,accessibility,best-practices,seo --output=json --chrome-flags="--headless=new"`, mobile (default) and `--preset=desktop`, three runs each, median per metric. JSON in `web/.screenshots/lighthouse/<label>/`.
- Labels: `before` (first baseline, taken while other agents were loading the machine, benchmark index 560–850), `before-quiet` + `before-quiet2` (same baseline build, re-measured on a quiet machine, benchmark index about 2000; this is the "before" column), `v4` (final build; the "after" column), `v4-latency40`, `before-latency40`. Intermediate series: `r1`, `after`, `after-variants`, `final`, `final-home`, `final-latency40`, `final-rerun`, `v3`, `v3-latency40`, `v3-bisect`, `stall`, `stall2`, `trace`.
- Pages: `/`, `/outputs/success-stories`, `/outputs/success-stories/e-fuels-in-australia`, `/outputs/publications/the-state-of-solvers-for-energy-planning`, `/tools-and-data`, `/services`, `/services/system-operators-and-utilities`, `/organization/about`, `/organization/team`, `/organization/theory-of-change`, `/organization/news-and-events`, `/organization/news-and-events/free-monthly-pypsa-support-for-european-transmission-system-operators`.
- Other tools added: `scripts/lighthouse-causes.mjs <json>` (LCP element, request list, render-blocking, image delivery, CLS culprits, failing audits), `scripts/page-cost.mjs <url> <width>` (layout and style time, LCP entries, requests), `scripts/trace-cost.mjs <url> <width> <runs>` (main-thread time per trace event, long tasks).

### Two things about the numbers

1. **Machine load decides TBT.** In the first baseline every mobile page had TBT 230–880 ms and performance 78–94 with almost no JavaScript. The cause is the first layout: 60–270 ms unthrottled while three other agents ran browsers, about 10 ms for a warm relayout of the same page. Lighthouse multiplies it by four. On the quiet machine the same build has TBT 0–130 ms. Compare only quiet runs.
2. **Lighthouse's simulated LCP counts lazy images on a zero-latency server.** Lantern averages an optimistic estimate (render-blocking and high-priority requests) and a pessimistic one (every request that finished before the observed LCP paint). On localhost a `loading="lazy"` image within Chrome's lazy-load distance is requested during the first layout and is complete 10–20 ms later, before the first frame is presented. It therefore lands in the pessimistic estimate although it never competes with the hero image on a real connection. Evidence: home, same build, with the five hidden accordion images removed by one CSS rule: LCP 2.64 s → 2.33 s (`after-variants`, `home-acc`).

## Causes and fixes

### 1. Home hero (LCP element)

Evidence (`before/home-mobile-1.txt`): LCP element is the first slide image, 803 px WebP, 158 kB; slides 2 and 3 (156 kB and 70 kB) were requested at page load because `loading="lazy"` does not hold back an image that is inside the viewport; 771 KiB transferred.

- `blocks/HomeHero.astro` takes its sources from `layout/heroSources.ts`: AVIF then WebP, mobile crop for `max-width: 480px` in 412 / 618 / 722 / 803 px (`sizes="100vw"`), desktop image in 1400 / 2100 / 2800 px (`sizes="1400px"`). The LCP file on the Lighthouse phone (412 px, DPR 1.75) is now the 722 px AVIF, **73.7 kB instead of 158 kB**; on desktop the 1400 px AVIF, 69.6 kB instead of 163.5 kB.
- `sizes` corrected: the old desktop value `calc(100vw - 40px)` was wrong between 1024 and 1439 px (the image is height-fitted and always 1400 px wide there).
- Slides 2 and 3 and the two hidden thumbnails are `display: none` until the element has `data-ready`. The script sets it 2 s after the first slide image has loaded and the window `load` event has fired, or at once when "Next" is pressed. The first automatic change is at 7.9 s. Checked on the build at 1440 and 412: not requested at load, requested at about 2.2 s, slide 2 shown complete at the first change.
- `<link rel="preload" as="image" imagesrcset imagesizes media type="image/avif" fetchpriority="high">` for the first slide. Mechanism: `BaseLayout` has a named slot `head`; a page renders `<ImagePreload slot="head" sources={…} />` (`layout/ImagePreload.astro`) with the same source list the hero uses (`homeHeroSources` / `pageHeroSources`), so the URLs cannot drift. Used on the home page (`pages/index.astro`, three lines). **Measured effect in Lighthouse: none** (the image is already in the initial HTML; Lantern does not model discovery time). It saves the time the browser needs to reach the `<img>` in the HTML, roughly 100 ms on a slow connection. Not added to the `PageHero` pages: no measured gain and those files were being edited by other agents. To add it to one: `<ImagePreload slot="head" sources={await pageHeroSources(hero.image)} />`.

### 2. PageHero (LCP element on every listing, service, team, about page)

Evidence: mobile `sizes="250vw"`; at 412 px and DPR 1.75 the browser fetched the 2048 px file although 60 % of it is cropped away (the mobile artwork is a 1024 px window, the phone shows the middle 412 px). About 198.7 kB, tools 187.7 kB, news 133.6 kB, system operators 125.0 kB.

- New source for `max-width: 480px`: the centre 480 px window of the mobile artwork, cropped by the image service (`fit: 'cover'`), 480 / 720 / 960 px, `sizes="480px"`. Same pixels on screen, because `object-fit: cover` centres the same window.
- 481–1023 px: full mobile artwork in 1024 / 1536 / 2048 px, `sizes="1024px"` (the exact displayed width; 250vw over-requested).
- Desktop: 1400 / 2100 / 2800 px, `sizes="1400px"`.
- LCP image on the Lighthouse phone: about 198.7 → 90.7 kB, tools 187.7 → 83.6 kB, news 133.6 → 60.9 kB, system operators 125.0 → 58.5 kB, team 86.4 → 37.6 kB, success stories 41.4 → 23.8 kB, services 43.1 → 16.8 kB.

### 3. Fonts

Evidence: one font request per page (latin, normal, 27.6 kB). Italic and the other subsets are in the CSS but are not downloaded (`unicode-range`, and no italic text above the fold). `font-display: swap` comes from Fontsource. The swap moves hero text: CLS 0.016 (about), 0.018 (team), 0.038 (theory of change), 0.026 (news), all under the 0.05 target.

Tried and **removed again**:

- `<link rel="preload" as="font">` for the latin file. It gave CLS 0 on every page and one layout instead of two. But with it, the first frame was presented 1–2 s after the load event in part of the mobile Lighthouse runs: 14 of 82 mobile runs at zero latency and 24 of 32 with 40 ms latency, against 0 of 49 and 2 of 9 for the baseline, and 1 of 46 and 3 of 15 for the same build without the preload (`final`, `v3`, `final-latency40`, `v3-latency40`, `v3-bisect`, `stall`, `stall2`, `v4`, `v4-latency40`; a stalled run is one whose first contentful paint is more than 500 ms after the load event). Desktop runs never stalled. The trace (`trace/about-*.trace.json`) shows layout finished at about 230 ms and no main-thread frame until about 1200 ms (`pagereveal` dispatched there, frame duration 991 ms). It did not reproduce in Playwright with the same Chrome (0 of 24). I could not find the mechanism; it may be specific to Lighthouse's mobile emulation. A possible 1 s delay of first paint is worse than a 0.02–0.04 shift, so the preload is not shipped. Worth one test on the real host.
- Metric-adjusted fallback faces (`size-adjust` 106 % on `local('Arial')` for weights up to 500, 100 % on Arial Bold from 600; ascent 103.8 %, descent 22.2 % of the Plus Jakarta Sans em). Measured in Chromium against the page text. Removed together with the preload while bisecting the stall; they were not its cause (the stall stayed without them). They cover Windows, macOS and iOS only (Android has no Arial). `global.css` is unchanged from before the pass.

Characters outside the latin subset: only `₂` on the eleven project detail pages (falls back to a system font; `data/projects.ts`).

### 4. Preloader

Measured on the home page with and without it (`after-variants`, `home-nopre`): mobile Speed Index 1.46 s with, 1.30 s without; desktop 0.53 s and 0.41 s; LCP and performance unchanged (97 and 96 mobile, 100 desktop). It does not hide the LCP element from paint timing. **Not changed.**

### 5. Team globe

- HTML: path data is written with relative line commands and without zero-length segments (`interactive/globe.ts`). Same coordinates, 93.0 → 54.7 kB of path data. Team document 357 → 320 kB raw, 55.4 → 42.3 kB transferred; theory of change 214 → 178 kB raw, 52.8 → 39.5 kB transferred. The remaining weight of the team page is 150 kB of inline icons in the cards (see "Fixes in files I do not own").
- JavaScript: the geometry is its own chunk (`world.*.js`, 134 kB raw, hashed, immutable) imported by `teamGlobe.client.ts`, which is now 6.4 kB (was 139.7 kB with the geometry inside). No `modulepreload` anywhere in the build.
- Loading: the loader in `TeamGlobe.astro` (not my file) still imports the 6.4 kB client within 300 px of the viewport, which is at page load on a 900 px desktop viewport. The client now waits for the window `load` event and for the globe to intersect the viewport before it fetches the geometry. Checked at 1440 and 412: geometry not requested before scrolling, requested and mounted after.

### 6. Build output

- `dist` was 59 MB with 1286 files in `_astro`. 226 of them (17.8 MB) are referenced by no HTML, CSS or JS file: the untouched source images Astro copies next to the optimised ones. `scripts/prune-unused-assets.mjs` is an integration (`astro:build:done`, registered in `astro.config.mjs` before the adapter copies to `.vercel/output`) that deletes them. `dist` is now 51 MB with 1139 files, including the AVIF and crop variants added in this pass. Checked: 4754 `/_astro/` references in the output, none missing.
- The rest is responsive variants (about 900 WebP and 250 AVIF). Nothing a visitor downloads depends on that number.
- CSS: one stylesheet, 82 kB raw, 17.8 kB Brotli, render-blocking (180 ms in Lighthouse's estimate). Lighthouse reports no unused-CSS saving. The dev demo components in `components/dev` are scanned by Tailwind and add utilities to it; not quantified.
- JavaScript on the home page: inline module scripts only, no request.
- HTML: home 152 kB raw, 23.5 kB transferred (59 kB class attributes, 36 kB inline SVG, 25 kB `img` tags). A sprite would save little after compression; not done.

### 7. Caching

`@astrojs/vercel` already writes `cache-control: public, max-age=31536000, immutable` for `/_astro/*` into `.vercel/output/config.json`. No `vercel.json` is needed.

## Below target

| Page | Value | Why | What closes it |
| --- | --- | --- | --- |
| Home, mobile LCP | 2.56 s (1.68 s with 40 ms latency) | The hero image itself is 73.7 kB. The rest is Lantern's pessimistic estimate: 325 kB of lazy images (intro 17 kB, six accordion images 308 kB) finish before the first paint on a zero-latency server | `ServiceAccordion`: do not load the five hidden images (measured: −0.30 s), AVIF for the visible one. Not my file |
| About, mobile LCP | 2.26 s (1.76 s with 40 ms latency) | Hero photo 90.7 kB at 960 px (grain keeps it large), plus 24 kB of logo (both red logo variants, see table below), a 30 kB and a 42 kB lazy image just below the hero counted the same way | A 840 px width for DPR 1.75 would save about 15 kB; a single logo request 12 kB. Neither reaches 2.0 s alone on a zero-latency server |
| Accessibility | 89–96 | See "Accessibility" | Fixes in card, carousel and filter components; a design decision for the footer links |
| CLS | 0.016–0.038 on About, Team, Theory of change, News | Font swap in hero text; under the 0.05 target | Font preload (removed, see "Fonts") or fallback metrics |

## Accessibility

Scores did not change. Failing audits (mobile, all pages unless noted):

| Audit | Element | File | Note |
| --- | --- | --- | --- |
| `target-size` | 17 footer links, 10 px text, rows 17–23 px apart | `layout/SiteFooter.astro` (mine) | The Figma footer draws them that way; 24 px targets need more row spacing. Designer decision, not changed |
| `color-contrast` | card link text `#ee2042` on `#fffefb`, 14 px: 4.23 (needs 4.5) | `cards/CardBody.astro`, `CardShell.astro`, `DepartmentCard.astro`, `EventCard.astro`, `JobCard.astro`, `TeamCard.astro` | `brand-500` `#e31937` gives 4.6 |
| `color-contrast` | `div.flex > div.flex > div.flex > a.inline-flex` on tools, services and service pages; `article.relative > div.flex > div.flex > a.text-body-md` on About (4 elements) | not traced to a file | selectors as Lighthouse reports them, in `web/.screenshots/lighthouse/v4/*-mobile-1.json` |
| `listitem` | `<ul role="region">` with `<li>` children | `blocks/CardCarousel.astro` line 74, `blocks/TestimonialSlider.astro` line 93 | put `role="region"` and the label on a wrapper, keep the `ul` a list |
| `label-content-name-mismatch` | filter buttons `#projects-filter-*-button` (success stories) | `ui/SortControl.astro` / `FilterBar.astro` | the accessible name must contain the visible text |

## Fixes in files I do not own

| File | Element | Change | Effect |
| --- | --- | --- | --- |
| `blocks/ServiceAccordion.astro` | the six stacked `Image`s (`accordion-image`) | Do not load the five hidden ones before they are opened: `oet-accordion .accordion-image:not([data-open]) { display: none }` keeps `loading="lazy"` from fetching them (the cross-fade then needs the image decoded first), or set `src`/`srcset` when the item opens | 221 kB less on the home page at load; simulated mobile LCP 2.64 → 2.33 s (measured) |
| `blocks/ServiceAccordion.astro` | same `Image` | `format="avif"`; `widths={[372, 651, 744, 1280]}` | the visible one is 87 kB WebP at 744 px for a 370 px box |
| `interactive/TeamGlobe.astro` | loader script | `rootMargin: '300px 0px'` → `'0px'`, or drop the loader's own observer: the client now waits for `load` and visibility itself | 6.4 kB less at page load |
| `cards/TeamCard.astro` and team page | inline icons | the team document has 128 inline `<svg>`; without the globe they are about 150 kB of its 320 kB. One sprite with `<use>` | up to about 150 kB raw HTML |
| `blocks/DetailHeroImage.astro` | `Image` | already eager with `fetchpriority="high"`; add `format="avif"` | LCP image 31 kB WebP on project detail |
| project detail data | the character `₂` | outside the latin subset of the font | one fallback glyph per project page |
| `layout/SiteHeader.astro` (mine, not changed) | logos | on mobile the desktop logo (6.4 kB light, 12 kB dark) is downloaded although hidden; both are `eager`. Making them lazy would delay the visible logo, one `<picture>` would need new crops | 6–12 kB, low priority |

## Hosting-dependent

- Brotli, HTTP/2 or 3 and edge caching come from Vercel; the local server imitates compression and cache headers only. HTML is served with `max-age=0, must-revalidate`; the real value depends on the invalidation strategy chosen with Directus.
- Simulated LCP on a real host should be lower than here on the pages with lazy images just below the fold, because those images will no longer finish before the first paint (see "Two things about the numbers"). Series `v4-latency40` is the closest local imitation.
- The first-frame stall described under "Fonts" must be re-checked on the real host before a font preload is considered again.
- TTFB, real-device CPU and field data (CrUX) cannot be measured locally.

## Visual check

`snapshot-all.mjs` before the first change (`web/.screenshots/perf-before`, 25 routes × 2 widths) and after the hero, globe and layout changes (`perf-after`), compared with `compare-snapshots.mjs`. Other agents changed pages in between (page heights differ on services, tools, news, detail pages), so only my regions were judged:

- Identical whole pages (15 of 50), among them About, Tools and data, project detail and publication detail at 1440: no text reflow from the layout changes.
- Hero bands (home 1440 and 412, About 412, Team 412, Services 412) differ only by re-encoding: mean difference 0.7–3.3 levels per channel, viewed side by side (`web/.screenshots/perf-crops/`), no visible change. About hero at 1440: 0 differing pixels.
- Team globe at 1440: 2730 pixels differ (anti-aliasing on coastlines), viewed, no visible change.
- Header, footer and preloader were not edited.
- Not re-shot after the last two edits (slide delay in the hero script, removal of the font preload); neither changes rendering.

## Files

Changed: `src/layouts/BaseLayout.astro` (slot `head`), `src/components/blocks/HomeHero.astro`, `src/components/blocks/PageHero.astro`, `src/components/interactive/globe.ts`, `src/components/interactive/teamGlobe.client.ts`, `astro.config.mjs`, `src/pages/index.astro` (preload, three lines).

New: `src/components/layout/heroSources.ts`, `src/components/layout/ImagePreload.astro`, `scripts/serve-dist.mjs`, `scripts/lighthouse.mjs`, `scripts/lighthouse-causes.mjs`, `scripts/page-cost.mjs`, `scripts/trace-cost.mjs`, `scripts/prune-unused-assets.mjs`.

Not changed: `global.css`, `Preloader.astro`, `SiteHeader.astro`, `SiteFooter.astro`, `BrandImage.astro`, `build-globe-data.mjs`, image sources. No `vercel.json`.
