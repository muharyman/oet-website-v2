# Report: fixes

Combined fix pass over the shared-component findings of `verify-outputs-news.md`, `verify-organization.md`, `verify-services.md` and `performance.md`, 2026-10-08.

Final state: `pnpm exec prettier --write .` run (`web/.prettierignore` now lists `pnpm-lock.yaml`; the lockfile is back in pnpm's own format, content verified identical); `pnpm check` 0 errors, 0 warnings, 0 hints (148 files); `pnpm build` passes (56 pages); `node scripts/sweep.mjs`: 56 routes, no broken links, no console errors, no horizontal overflow; `scripts/shoot-shell.mjs` reports no failed check.

`use_figma` worked in this session (read-only scripts), so values below come from the node data, not from renders, unless a render is named.

## Result per item

| # | Item | State | Figma → implemented |
| --- | --- | --- | --- |
| 1 | Whole-pixel line heights | done | See "Typography". 16 tokens changed, about 40 local overrides removed |
| 2 | `CardShell` border takes no space | done | Stroke `CENTER` 1 px, no layout space → border drawn by `::after`. Listing card 372 × 475 with a 332 px text column at 412 (was 330); text-only publication card and tool cards 2 px lower each; tools mobile −34 px, publications mobile 7049 → 7037 (Figma 7035) |
| 3 | Badge in the fixed mobile frame | done | `645:2770`: x = 20, 112.5 × 40 → measured 112.5 × 40 at card x + 20 below `lg`; `cqw` values from `lg` |
| 4 | Partner tag logo sizes | done | `645:2771` 73 × 26, `645:2793` 98.82 × 35, `645:2877` 70 × 25 inside 112.5 × 40 → `PartnerTag { name, logo, width, height }` in `cards/types.ts`, one definition in `data/partnerTags.ts` used by four data modules; measured 73 × 26 and 98.8 × 34.9 |
| 5 | Three-line title on the first home card | done | `643:4397` title 72 px (3 lines of the scaled card), excerpt box one line → `titleLines: 2 \| 3` on `CardBody` / `ProjectCard`; measured title 71.7 px, excerpt 16.3 px |
| 6 | Home carousel "next" | done | Reading: the track frame `643:4392` is 853.33 px wide, not clipped, and the three 291.7 px cards end 28.8 px past it; "next" (`643:4391`, `#e31937`) is active because the row is wider than its track. `CardCarousel` has `trailing: 'flush' \| 'gutter'`; with `gutter` the scroller keeps its bleed and gets end padding, so the row overflows by 30 px. Measured at 1440: "next" enabled, one press scrolls 30 px, the last card ends at x = 1360, "next" disables, "previous" enables |
| 7 | `PageHero` | done | Glow: `Rectangle 434` (`643:10585`, `656:13817`, `648:19306`, `650:21858`) is the band's own rectangle with layer blur 40 → `box-shadow: 0 0 40px brand-500` on the band (same Gaussian). Photo frame radius 8 on all corners on mobile (`645:2575`) → `rounded-md` at every width. Eyebrow: `eyebrow: { label, mobile }`, tools passes `mobile: false`. Title variants: `title: string \| { desktop, mobile }` (new `ui/ResponsiveText.astro`), regulators uses the mobile break of `662:57278`. Mobile position: new `mobileAnchor: 'bottom-30' \| 'bottom-50' \| 'top-180'` for left layouts. The earlier explanation ("Figma wraps one more line") was wrong: department index and career place the title at y = 180 with the stat bar at the bottom (`648:19207`, `650:22092`, text boxes with fixed heights), partners ends 50 px above the edge (`650:27118`). Measured h1 y: department index 180 (Figma 180, was 239), career 180 (180, was 198), partners 173 (173, was 193), regulators eyebrow / title / lead 160 / 201 / 379 (same in `662:57277…57279`). `heroSources.ts` untouched |
| 8 | `HomeHero` mobile | partly | Slide 1 mobile photo replaced by the export of `196:2329` as the frame clips it (824 × 1600); the old file was a different crop (7 px offset visible side by side). Text: the 2–3 px came from 53.76 / 19.84 px lines, now 54 / 20; title 130, boxes as `196:2370…2373`. Slides 2 and 3 have no mobile frame in Figma and keep their old crops. Loading behaviour unchanged |
| 9 | `DetailHeader` gradient | done | Render of `645:3670` and `647:2326` viewed: bright at the bottom → `at 50.9% 101%` in both tones; viewed on the project detail page |
| 10 | `LinkListGroup` | done | 20 px between groups (`645:13517`); `label` is a list of `{ text, underline }` and `truncate` is per link, as the instances are drawn (`647:2128…2137`: "IEEE…" and "Volume…" underlined, ", pages 100 - 115" and "DOI: " not; four rows truncate) |
| 10 | `RichText` | done | `647:2112` has an empty line between items → `li + li { margin-top: 1lh }`; paragraph gap is `1lh`. The `leading` prop is gone |
| 10 | `ListingHeader` | done | `659:34945` 16 px Medium, 132 % (21 px), 8 px gap → `descriptionStyle="body-md-medium-to-lg"` on news |
| 10 | `SectionHeading` | done | `662:42563` and `650:27956…27959`: tag to title 8 on mobile → `gap="8/12"` on the services pages; split row 8 px on mobile; `align="title"` offset 46 with two columns, 38 with one (`662:47464`). Services index mobile intro title now at 1036 (Figma 1036) |
| 10 | `IntroStatement variant="service"` | done | `662:46050` gap 20, columns 265 → `lg:gap-5` |
| 10 | `Tag` | done | `662:46055` solid white stroke, black 2 % fill → `tone="white"`, used by `OfferingList` |
| 10 | `ApproachSteps` mobile | done | Captions hug their content in `657:14499` (rows 585 / 580 / 599); the mobile `min-h-[169px]` forced 585 on every row. Removed. Theory page at 412 is now Figma + 1800 exactly |
| 10 | `CtaBanner` "biz" collage | done | New asset from `662:47566` (2x). The old file had a blue rock and its blocks sat 12–17 px lower than the frame. Viewed on the foundations page |
| 10 | Handshake glyph | done, differently | `163:10343` is "heart-partner-handshake". Added as `icons/heart-partner-handshake.svg` and used by `StatStrip` only; `handshake.svg` is also used by the partners hero and a service value card, which I did not check against Figma, so it stays |
| 10 | About `thumbnailMobile` | done | Six 186 × 144 exports (`648:18106` …) in `assets/organization/values/*-186.webp`; `ValueCard.thumbnailMobile` is now required |
| 10 | `ServiceCtaCard` mobile illustration | partly | `imageMobile: ImageMetadata \| null`; Consultancies uses the export of `645:13705`. The other five cards have no mobile frame in Figma (`null`, desktop crop) |
| 11 | Globe: Hawaii | done | Hawaii is its own shape (`USA-HI`) in `assets/team/world.json` and in `scripts/build-globe-data.mjs`; it is drawn as land. Viewed at 1440 |
| 12 | About / department index drift, Modeling Tools −5 | done / not a defect | About and department index now equal Figma at both widths (heading positions and totals). Modeling Tools & Data at 412: every text from the hero to the project card is at Figma's y; the 5 px lie below the card. That Figma frame is exactly as tall as Energy System Modeling's although its content is 304 px shorter, so I read it as a frame artefact |
| 13 | `ServiceAccordion` images | done | Hidden images are `display: none` until the first pointer, focus or touch on the accordion, or a click. Measured: one of six images loaded at page load. Sources are AVIF + WebP |
| 14 | About LCP | partly | Logos: one `<picture>` per theme with a desktop and a mobile source, so one logo file is requested instead of two (pixel-identical on `/dev/shell`). `ImageInfoCard` images AVIF + WebP with 458 / 534 widths. Page weight 249 → 223 KiB, LCP unchanged at 2.26 s: the two lazy images are within Chrome's lazy-load distance and still count in the simulation |
| 15 | Accessibility | partly | `role="region"` moved to a wrapper in `CardCarousel` and `TestimonialSlider` (lists stay lists); filter and sort buttons no longer carry an `aria-label`, the name is the visible text with a visually hidden prefix. `#ee2042`: not changed, see below |
| 16 | Paths from `routes.ts` | done | `navigation.ts`, `footer.ts`, `home.ts`, `dev-shared.ts`: no path literal left; `routes.toolsCategory` and `routes.successStoriesByStatus` added |
| 17 | `/outputs/policy-briefs` | no change needed | The empty state already used `publications.empty` and sits in the listing container under the header and tabs. Viewed at 1440 |

### `#ee2042` link colour (item 15)

Every card link in Figma uses `#ee2042`: "View Project" 84 nodes, "Read" 33, "Read Profile" 20, "View Department" 16, "See Job Board" 10, "Register" 4, on five handoff pages. No instance uses `brand-600` or `brand-500`, so there is no place where a token colour is clearly intended. Nothing changed; it is question 1 below.

## Typography (item 1)

Sampled with a script over all text nodes of the eight handoff pages (auto-height nodes only). Every style is laid out in whole-pixel lines, on every page it occurs:

| Style | Nodes | Pages | Line | Token |
| --- | --- | --- | --- | --- |
| 72 / 112 % | 26 | 8 | 81 | `display-1` |
| 56 / 112 % | 60 | 8 | 63 | `display-2` |
| 48 / 112 % | 98 | 8 | 54 | `display-3` |
| 44 / 112 % | 3 | 1 | 49 | `display-4` |
| 36 / 112 % | 295 | 8 | 40 | `display-5` |
| 32 / 112 % | 38 | 5 | 36 | `heading-1` |
| 28 / 112 % | 23 | 4 | 31 | `heading-2` |
| 24 / 112 % | 27 | 3 | 27 | `heading-3` |
| 22 / 112 % | 436 | 7 | 25 | `heading-4` |
| 24 / 120 % | 15 | 2 | 29 | `body-2xl` |
| 20 / 120 % | 280 | 7 | 24 | `body-xl` |
| 18 / 120 % | 156 | 8 | 22 | `body-lg` |
| 16 / 120 % | 1054 | 8 | 19 | `body-md` |
| 14 / 120 % | 1325 | 8 | 17 | `body-sm` |
| 12 / 120 % | 420 | 8 | 14 | `body-xs` |
| 10 / 120 % | 1410 | 8 | 12 | `body-2xs` |

Tokens are ratios that give these values (`calc(22 / 18)` …). Off-token styles measured the same way: 16 / 132 % → 21, 16 / 124 % → 20, 12 / 124 % → 15, 18 / 112 % → 20, 16 / 112 % → 18, 14 / 112 % → 16; the components that use them now state the pixel value. Local `leading-[..px]` overrides that only repeated the token were removed from 19 files; `gap-[1.2em]` became `1lh`. Left alone: `leading-none`, the `cqw`-sized globe pins, `max-lg:leading-none` on the home services heading.

## Page heights

Figma frame / before the pass / after. Measured on the dev server with reduced motion.

| Route | 1440 Figma | before | after | 412 Figma | before | after |
| --- | --- | --- | --- | --- | --- | --- |
| `/` (pinned carousel stacked; Figma + 1200 when pinned) | 6154 | 7127 | 7127 | 9930 | 9934 | 9933 |
| about | 4876 | 4878 | 4876 | 9390 | 9397 | 9390 |
| departments | 3582 | 3583 | 3582 | 6076 | 6079 | 6076 |
| energy-system-modeling | 2906 | 2907 | 2906 | 3881 | 3883 | 3881 |
| modeling-tools-and-data | 2878 | 2878 | 2878 | 3881 | 3876 | 3876 |
| software-engineering | 2759 | 2760 | 2759 | 3651 | 3652 | 3651 |
| research-and-market-development | 2256 | 2257 | 2256 | 3184 | 3185 | 3184 |
| partners | 2400 | 2400 | 2400 | 3628 | 3627 | 3627 |
| career | 3647 | 3648 | 3648 | 6111 | 6107 | 6111 |
| team | 4651 | 4650 | 4650 | 7437 | 7437 | 7437 |
| theory-of-change (+1800 by design) | 5273 | 7073 | 7072 | 6927 | 8734 | 8727 |
| success-stories (more cards than drawn on desktop) | 4894 | 5017 | 5015 | 7318 | 7324 | 7319 |
| publications (more cards on desktop) | 4672 | 4888 | 4881 | 7035 | 7049 | 7037 |
| project detail (own title) | 5126 | 5113 | 5127 | 7880 | 7734 | 7718 |
| publication detail | 6899 | 6858 | 6917 | 10314 | 10312 | 10316 |
| tools-and-data (21 cards, 11 drawn on mobile) | 5674 | 5675 | 5674 | 6550 | 9055 | 9021 |
| news-and-events (5 cards, 4 drawn on mobile) | 4765 | 4761 | 4760 | 7279 | 8014 | 8005 |
| upcoming event (`-2` slug) | 4103 | 4105 | 4102 | 5313 | 5294 | 5303 |
| services | 5353 | 5355 | 5354 | 10081 | 9957 | 9927 |
| system operators | 6128 | 6104 | 6104 | 8675 | 8641 | 8632 |
| regulators | 7259 | 7214 | 7213 | 9922 | 10009 | 9982 |
| foundations | 7364 | 7408 | 7404 | 10327 | 10777 | 10747 |
| consultancies | 7486 | 7465 | 7464 | 9942 | 10219 | 10191 |
| think tanks | 6968 | 6953 | 6950 | 9453 | 9699 | 9671 |
| technology | 6878 | 6920 | 6917 | 9621 | 9990 | 9960 |

### Section positions

`web/scripts/check-sections.mjs` compares the y of each large heading with its Figma text node (list in `web/scripts/figma-headings.txt`; last output in `web/.screenshots/fx/sections-final.txt`), 50 frame / width pairs.

- Every heading at Figma's y, both widths: about, department index, the four department pages (Modeling Tools mobile: footer −5 only), partners (footer −1 on mobile), career (hiring heading +1 on desktop), team, theory of change (after subtracting 1800), tools desktop, services index desktop, upcoming event desktop, home desktop up to the pinned carousel.
- Home mobile: −1 from the services heading on; footer +3 (the three carousel images, known).
- Success stories and publications mobile: +1 / +2 at the end. Desktop differs by the extra card row.
- Publication detail desktop: all body headings within 1 px, CTA at Figma's y; the page ends 18 px lower because the service card is 554 px here and 535 in `647:2178` (its text box has no trailing empty line there, the project frame `645:3880` has one). Mobile: headings −22 … −25 in the body (Figma's hard line break in one heading, five table-of-contents entries), total +2.
- Project detail: own one-line title instead of Figma's three-line placeholder; desktop body headings at Figma's y.
- News desktop −4 from the first CTA on (event cards are 679 px, Figma 680). Upcoming event mobile −7 … −10 (header 746 vs 750, details card 508 vs 511; content differences already recorded).
- Service pages: unchanged in kind from `verify-services.md` (per-page gaps, trailing blank lines, desktop copy on mobile). Hero and intro headings are at Figma's y on all six at both widths, except the think tanks desktop title (+24, blank line in Figma's lead).

## Snapshots

`fx-before` (before any change), `fx-1` (after item 1), `fx-2` (after the component changes), `fx-final` (final build state), 116 shots each, in `web/.screenshots/`.

- `fx-before` → `fx-1`: 115 of 116 differ, as expected when every line box changes. A pixel comparison cannot separate intended from unintended here, so this step was checked by page heights and then by the section positions above.
- `fx-1` → `fx-2`: 9 identical (legal pages, `/dev/shell`, theory desktop), 107 differ. I did not view all 107 diff sheets. Checked by measurement: hero text positions (5 routes), listing cards at both widths, home carousel and accordion, approach rows, Modeling Tools texts, event cards. Viewed as crops: hero glow and corners (success stories 412), detail header gradient (project detail 1440), "biz" collage (foundations 1440), globe (team 1440), policy briefs 1440.
- Not viewed against Figma after the change: `LinkListGroup` rows, the news description on mobile, `Tag tone="white"`, the About value thumbnails on mobile, the Consultancies card illustration on mobile, home hero mobile in the page. These rest on the node values and on type and build checks.

## Lighthouse

One mobile run each on the final build (`serve-dist.mjs`, zero latency, benchmark index 2270–2570), next to the performance report's medians.

| Page | Performance | LCP | CLS | TBT | Speed Index | Transferred | Accessibility |
| --- | --- | --- | --- | --- | --- | --- | --- |
| home, performance report | 97 | 2.56 s | 0 | 0 ms | 1.56 s | 573 KiB | 89 |
| home, now | 99 | 1.98 s | 0 | 0 ms | 1.55 s | 307 KiB | 93 |
| about, performance report | 99 | 2.26 s | 0.016 | 0 ms | 1.35 s | 249 KiB | 92 |
| about, now | 99 | 2.26 s | 0.016 | 0 ms | 1.27 s | 223 KiB | 92 |

Single runs, so differences of a few points or 0.1 s are within noise. Remaining failing accessibility audits on both pages: `color-contrast` (`#ee2042`) and `target-size` (footer links). `listitem` no longer fails on home. `label-content-name-mismatch` was not re-measured (it occurs on listing pages, which were not in the two runs).

## Not done or open

- Home hero mobile crops of slides 2 and 3 (no Figma source).
- Mobile illustrations for five of six service CTA cards (no Figma source).
- About mobile LCP (2.26 s, target 2.0).
- Publication detail desktop +18 px (service card text box, see above).
- `handshake.svg` in the partners hero and the service value card not checked against Figma.
- The listing grid on desktop still starts 1 px right (card x = 101, text column 366.3 instead of 367): the page's own guide line is a real border.
- Not checked: Firefox, Safari, keyboard-only, widths between 412 and 1440.

## Open questions for the designer

1. **Card link colour.** "View Project", "Read", "Read Profile", "View Department", "See Job Board" and "Register" are `#ee2042` on `#fffefb` (for example `643:4402`, `650:27983`). The contrast is 4.23:1; WCAG AA needs 4.5:1. `brand-500` `#e31937` gives 4.6:1. May the links use `brand-500`?
2. **Light buttons and tabs on red.** "Contact Us" in the CTA bands is `#e31937` on `#fcece8` and the "Upcoming" tab is `#fcece8` on `#e31937` (`659:38557`): both 4.1:1. Should these change too?
3. **Footer links.** The footer link lists are 10 px text in rows 17–23 px apart (`footer` in every frame, for example `645:3684`). Touch targets should be 24 px. May the rows be spaced further apart on mobile?
4. **Header over photos.** The bar is transparent. Over card media, posters, job thumbnails and the lower part of the About hero (`648:15307`) its text is hard to read in either theme. Should the bar get a backdrop or a solid state when it is not over a hero?
5. **Mega menu over the home hero.** `249:30122` draws a translucent glass panel under a light bar; `643:6404` draws a solid white bar. Which one applies when a menu is open?
6. **Publication detail CTA.** The mobile frame `647:5794` shows a `brand-700` band with the "Consultancies" card; the desktop frame `647:2023` shows `brand-600` with "System Operators". Which is right?
7. **Tab rows broken by hand.** On mobile the publication tabs are 2 + 3 (`645:14863`) and the news state tabs 1 + 2 (`659:34949`); natural wrapping gives 3 + 2 and 2 + 1. Are the hand breaks intended?
8. **Contributor title size.** The mobile event details card has the contributor title at 12 px (`660:39746`); everywhere else it is 10 px. Which one?
9. **Service page spacing.** The six desktop frames differ: offering list bottom padding 40 px except foundations 0 (`662:47083`); an extra 32 px before "Why OET" on system operators only (`662:45991`); cards to CTA 127 / 160 / 120 px (system operators / four pages / technology `662:48742`). One value each, or per page?
10. **"How We Work" on System Operators.** The page lacks the block the other five service pages have (`662:45991`). Intended?
11. **Mobile copy on service pages.** The mobile frames carry older copy than desktop (for example `662:42561`, `673:60961`); the site uses the desktop copy at both widths. Please confirm.
12. **Hero text placement on mobile.** Department index and career start the title at y = 180 with empty space under the lead (`648:19207`, `650:22092`); partners ends 50 px above the edge (`650:27118`); other heroes sit 30 px above the bottom edge. Reproduced per page. Should there be one rule?
13. **Home carousel.** On desktop the three project cards overflow their track by 29 px and "next" is active (`643:4392`, `643:4391`). Built as a 30 px scroll. Is that the intent, or should more cards follow?
14. **Home project cards.** They are the 305 px card scaled to 291.7 px (fonts 21.04 / 13.39 px, `643:4393`). Keep the scale or use the standard card?
15. **Home partner logos.** Desktop draws two groups of ten (`162:686`); mobile draws one label and 18 logos, six of which are not on desktop (`196:1458`). One list for both?
16. **Home on mobile.** No stats strip, and Build / Deploy / Scale are stacked instead of a carousel (`196:1458`). Intended?
17. **Pinned sections.** How far should the page scroll per step in the home carousel (`162:686`, 600 px used) and in the theory of change scene (`656:12898`, 1800 px in total used)?
18. **Testimonial progress bar on mobile.** `643:10556` shows a half-width filled segment and one outline; desktop shows three equal segments. Which on mobile?
19. **Department project cards on mobile.** The 406 px card is wider than the 372 px column and overflows the frame (`648:19709`). Built as a scroll row with centred cards. Intended?
20. **Modeling Tools & Data mobile frame.** `648:19806` is 3881 px like Energy System Modeling although its content is 304 px shorter; the build is 5 px shorter below the project card. Is there intended extra space?
21. **Counts.** "7 Department" vs "8 Department"; "9 Continents" vs seven listed; "3 Open Roles" vs four cards. Which numbers?
22. **Navigation.** The mobile menu has a "Solutions" group that desktop lacks; the footer "Outputs" column differs from the nav dropdown. Which is the reference?
23. **Outputs structure.** Are Blogs, Policy Briefs and Reports separate listings or filters of Publications? "Academic Publication" has a tab but no own page.
24. **Missing designs.** Team profile page, contact page or form, search, 404, legal pages, handbook and "More About…" targets; open states of filter and sort dropdowns; hover and focus states; empty states; desktop pagination; tablet layout; an in-progress project.
25. **Globe.** The only specification is a CodePen link (`654:3157`). Are the interaction (drag, country selection) and the pin countries as intended?
26. **Photo grading.** Figma grades photos with blend modes CSS cannot reproduce; the site uses flattened exports. For CMS photos: pre-graded uploads, or grading at build time?
27. **Placeholders to replace.** Hero slide 3 text, "MM/YYYY" dates, "IMG-PLACEHOLDER" steps, lorem in publications, repeated logos, people and posters, the news hero photo (marked as needing an HD photo), event field names in the details card (`660:39727`).
28. **Asterisk in page names.** What does `*` mean in three handoff page names?

## Files

New: `src/components/ui/ResponsiveText.astro`, `src/data/partnerTags.ts`, `src/icons/heart-partner-handshake.svg`, `src/assets/organization/values/*-186.webp` (6), `src/assets/outputs/service-consultancies-mobile.webp`, `web/.prettierignore`.

Replaced assets: `src/assets/home/hero-1-mobile.jpg`, `src/assets/shared/collage-biz.webp`, `src/assets/team/world.json`.

Removed: four duplicate partner logos in `assets/organization/projects` and `assets/services/projects`.

Changed: `styles/global.css`; `blocks/` ApproachSteps, CardCarousel, ContinentStats, DetailHeader, HomeHero, ImageInfoCard, IntroStatement, LinkListGroup, ListingHeader, NumberedStepList, OfferingList, PageHero, ServiceAccordion, StatStrip, TestimonialSlider, VerticalCarousel; `cards/` CardBody, CardShell, JobCard, ProjectCard, PublicationCard, ServiceCard, ServiceCtaCard, ValueCard, `types.ts`; `layout/` FooterCta, MobileMenu, NavServiceItem, SiteFooter, SiteHeader, `menuStyles.ts`; `ui/` Button, RichText, SectionHeading, SortControl, StatItem, Tag; `pages/` LegalPage, PublicationsPage, ToolsAndDataPage; `dev/SharedDemo.astro`; the route files that pass the changed props; `data/` about, departments, dev-shared, footer, home, navigation, outputs, projects, publications, routes, services, tools; `scripts/build-globe-data.mjs`.

Component API changes: `PageHero` (`title` union, `eyebrow` object, `mobileAnchor`), `CardBody` / `ProjectCard` (`titleLines`, `PartnerTag` with size), `CardCarousel` (`trailing`), `LinkListGroup` (label parts, `truncate`), `RichText` (no `leading`), `SectionHeading` (`gap="8/12"`), `ListingHeader` (`body-md-medium-to-lg`), `Tag` (`white`), `ServiceCtaCard` (`imageMobile`), `ValueCard` (`thumbnailMobile` required).
