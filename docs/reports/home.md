# Report: home

Route `/`, Figma desktop `162:686`, mobile `196:1458`. Built 2026-10-08.

## Result

| | Figma (without footer) | Built | Difference |
| --- | --- | --- | --- |
| 1440 | 5307.3 | 6514 | +6.7 once the 1200 px pin distance of `VerticalCarousel` is subtracted (see "Decisions needed") |
| 412 | 8636.3 | 8651 | +14.7 |

Home scripts (hero, accordion, vertical carousel, card carousel): **2181 bytes minified, 876 bytes gzip** (esbuild minify of the four `<script>` blocks; `pnpm build` was not run, per the brief).

`pnpm check` cannot run: `astro check` rejects TypeScript 7 ("does not currently support TypeScript 7.0"). `pnpm exec tsc --noEmit` passes; Prettier passes; the dev server reports no console errors at either width.

## Files

- `web/src/pages/index.astro`, `web/src/data/home.ts`
- `web/src/components/blocks/`: `HomeHero`, `IntroStatement`, `StatStrip`, `ServiceAccordion`, `LogoRow`, `VerticalCarousel`, `LogoGrid`, `CardCarousel`
- `web/src/components/cards/`: `CardShell`, `ProjectCard`
- `web/src/components/ui/BrandImage.astro`
- `web/src/icons/`: `blueprint`, `handshake`, `employees`, `world`, `folder-edit`, `license` (Figma path data, `currentColor`)
- `web/src/assets/home/**`: 3 hero images + 3 mobile crops + 3 thumbnails, intro, 6 service images, 3 step images, 3 project thumbnails, partner tag logo, 25 logos

## Components

### `cards/CardShell.astro` (base for every card)

`<article>` with `@container`, 1 px `neutral-100` border, column layout. Regions top to bottom: tab, body, media, footer.

| Prop | Type | Meaning |
| --- | --- | --- |
| `tab` | `{ label: string; tone: 'brand' } \| null` | Coloured tab label at the top left (tool category, event status). `brand` = `bg-brand-500`, text `neutral-50`, 14/1.2 medium, padding 12/16 (41 px tall). Other tones (the five tool category colours) are added to `tabTones` |
| `body` | `'fixed' \| 'auto' \| 'compact'` | `fixed`: 176 px tall, padding 20, gap 8 (project, publication). `auto`: padding 20, gap 8, natural height (event). `compact`: padding 16, gap 16, fills the card (tool) |
| `media` | `'framed' \| 'bleed' \| null` | `framed`: coloured frame with the image inset (project, publication image). `bleed`: 400 px tall full-width box on `neutral-800` (event poster). `null`: no media (tool, text-only publication) |
| `frame` | `'brand' \| 'bright'` | Frame colour for `framed`: `brand-500` (home) or `#ee2042` (listing cards `645:1417`) |
| `badge` | `boolean` | Renders the black partner tag over the frame (slot `badge`) |
| `footer` | `boolean` | Renders the footer row (slot `footer`): padding 12/20, 14/1.2, `neutral-600` |
| `class` | `string` (optional) | Width / placement from the parent |

Slots: default (body content), `media` (an image, positioned by the caller with `absolute inset-0 size-full object-cover`), `badge`, `footer`. `badge` and `footer` are booleans rather than `Astro.slots.has()` because a conditional slot still counts as present.

The frame scales with the card: padding is `4.918cqw` (20 px at 406.67, 15 px at 305), media aspect `366.67/238`, tag `27.664cqw` wide with aspect `112.5/40`. Measured on both the 305 px home card and the 406.67 px listing card.

How the other cards map: publication image = `body="fixed" media="framed" footer` (type label in the footer); publication text-only = `media={null} footer`; tool = `tab body="compact" media={null}` with the link row inside the body; event = `tab body="auto" media="bleed"`.

### `cards/ProjectCard.astro`

`title`, `excerpt`, `period`, `href`, `linkLabel`, `image`, `alt`, `sizes`, `frame`, `partner: { name, logo, linkLabel, href } | null`, `class?`. The title link is stretched over the card; the footer link sits above it. Title clamps to two lines, excerpt to three.

### `blocks/CardCarousel.astro`

`label` (accessible name of the scroller), `controls: 'arrows' | 'none'`, `previousLabel`, `nextLabel`. Slots: `header` (tag + heading) and default (`<li class="shrink-0 snap-start">` items). Native horizontal scroll with `scroll-snap`; arrows scroll by one item and disable at the ends. The scroller bleeds to the right page gutter.

### `blocks/HomeHero.astro`

`label`, `slideLabel(position, total)`, `nextLabel`, `slides[]` (`label`, `title`, `paragraphs[2]`, `image`, `imageMobile`, `thumbnail`, `alt`), `secondaryAction`, `primaryAction`. Slide 1 is server-rendered and visible without JavaScript; its title is the page `h1`, its image is eager with `fetchpriority="high"`. Timing follows the Figma prototype: image 0.5 s, text in after 0.8 s over 0.5 s, progress 5 s, 0.8 s hold. Auto-advance is driven by the progress bar's `animationend`, so pausing on hover/focus is pure CSS. Reduced motion: no auto-advance, no transitions, the Next button still works.

### `blocks/IntroStatement.astro`

`layout: 'split' | 'full'`, `tag`, `title`, `paragraphs[]`, `actions[]` (`label`, `href`, `variant`, `arrow`), slot `media`. "With photo" = `split` + `media` slot; "with buttons" = non-empty `actions`; "text only" = `full` with `actions={[]}`. Only `split` with buttons and photo is drawn on the home page; `full` is not verified against a Figma frame.

### `ui/BrandImage.astro`

`image`, `alt`, `widths`, `sizes`, `loading`, `blocks: 'none' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'`, `class?` (the caller sets size or aspect). Renders the photo with `object-cover` and the three-block overlay in percentages of the frame. **It does not apply colour grading** — see "Decisions needed".

### Others

- `StatStrip`: `stats[]` (`value`, `label`, `icon`). Hidden below `lg`.
- `ServiceAccordion`: `id`, `items[]` (`title`, `paragraphs[]`, `href`, `image`, `alt`), `linkLabel`. One item open, first open in the HTML, `grid-template-rows` transition, image cross-fades. Without JavaScript all panels are open.
- `LogoRow`: `logos[]` (`name`, `image`, `width`, `height`); logos render at half size below `lg`, as in Figma.
- `LogoGrid`: `columns: 4 | 6`, `groups[]` (`label: string | null`, `logos[]`), `class?`. Four columns below `lg`; the label cell spans two columns.
- `VerticalCarousel`: `tag`, `title`, `steps[]` (`title`, `paragraphs[]`, `note`, `image`, `alt`). Stacked cards by default; at `lg` with motion allowed the script pins the panel and steps through on scroll.

## Decisions needed

1. **Pinned carousel adds scroll length.** A sticky, scroll-driven carousel needs distance to scroll through: the track is 800 + 2 x 600 px, so the desktop page is 1200 px taller than the Figma frame. With reduced motion or no JavaScript the three steps are stacked instead (page 6288 / 6762 px). The 600 px per step is my choice; Figma gives no value.
2. **Image treatment is baked into the assets.** Figma grades photos with a `LINEAR_BURN` gradient at 70 %, a `HUE` layer, blurred `SCREEN` glows and a `COLOR_DODGE` grain tile. CSS has no linear-burn, so every home photo is a flattened Figma export (the pixel blocks are in the export too). `BrandImage` therefore expects an already graded photo and only draws the blocks. For CMS photos someone has to decide: upload pre-graded, or grade at build time with sharp.
3. **Partner logos differ between frames.** Desktop draws two groups of 10; mobile draws one label and 18 logos with six that are not on desktop. Following the brief, both are reproduced: `partnerGroups` (shown from `lg`) and `partnerGroupsMobile` (below `lg`), i.e. two `LogoGrid` instances. Using the desktop data on mobile would make the mobile page 120 px taller than Figma. Delete one line in `index.astro` once the designer confirms a single list.
4. **Home project cards are scaled.** Figma's home cards are the 305 px card scaled to 291.7 px (fonts 21.04 / 13.39 px). `index.astro` passes `class="w-[305px] [zoom:0.9564]"`; at natural size the section would be 18 px taller.
5. **Red band around the hero.** Rectangles `163:9460` / `163:9461` render as a `brand-500` band behind the hero down to y = 822 with a 20 px blurred lower edge. It is reproduced; it may be a leftover of the preloader.

## For the coordinator (shared files)

- `ui/Tag.astro` is 27.9 px tall, Figma 26 (line-height 1.24 + padding + border; Figma strokes are inside). This adds about 2 px per section heading.
- `ui/Button.astro`: `md` renders 41.9 px (Figma 40), `sm` 34.8 px (Figma 32 / 33). Worked around with `class="h-10"`, `h-8`, `h-[33px]`. "See All Tools" is semibold in Figma, `sm` is medium (`font-semibold` passed).
- i18n keys wanted: hero region label (now `hero.label` in data), slide position label (now a `"1 / 3"` function in `index.astro`), projects scroller label.
- Off-palette colours used as drawn: `#ee2042` (card CTA text, `bright` frame), `#bdb2ad` (hero progress fill), `rgba(236,236,236,0.32)` (hero box borders). Service block `#ff3138` and border `#e31933` exist only inside the exported images.
- `SectionHeading` can replace the tag + heading markup in `index.astro` for Services, Tools Support and Projects (the `header` slot), and inside `VerticalCarousel`.
- `VerticalCarousel` uses one passive `window` scroll listener (rAF-throttled); there is no other way to drive it by scroll in all browsers.
- Links point to assumed routes: `/about`, `/tools-and-data`, `/theory-of-change`, `/services/<slug>`, `/success-stories/<slug>`.
- `HomeHero` builds its `<picture>` with `getImage` rather than `<Picture>`, because the mobile source is a different crop (`max-width: 480px`).

## Placeholder content reproduced

- Hero slide 3 title "UVP Marketing Statement for Government Here"; slides 2 and 3 share the same two paragraphs.
- Project dates "MM/YYYY - MM/YYYY"; lower-case excerpt on the first project; footer link "Google.com".
- Service 01 text "complexdemanding"; service 06 title "Technology Developers & investors".
- Repeated logos (Environmental Defense Fund twice on mobile; EDF, CCG and Verfassungsschutz in both desktop groups).
- Image alt texts are mine; service images 2–6 and project thumbnails have empty alts.

## Verification

Compared by viewing the Figma render and the page screenshot side by side, section by section.

| Section | 1440 | 412 | Remaining differences |
| --- | --- | --- | --- |
| Hero | compared | compared | Figma's frame has the header and open mega menu on top (not mine). Buttons are semibold (Figma desktop medium). Mobile image crop sits about 15 px lower than Figma. Boxes are 372 px wide on mobile (Figma 373, frame is 413 wide) |
| Intro + image | compared | compared | none seen; heights 839.9 / 1049 vs 839 / 1048.2 |
| Stat strip | compared | absent, as in Figma | none seen |
| Services heading + accordion | compared | compared | block is 2.5 px taller (Tag). Text sits about 2 px right/down of Figma because nested borders take space. Open states 2–6 checked for behaviour (item 3 viewed), not compared pixel by pixel against `173:12611`…`173:12932` |
| Tools + logo row | compared | compared | 2.4 px taller on desktop (Tag) |
| Vertical carousel | compared (Build); Deploy and Scale viewed after scrolling | compared | step change is a slide of the content plus a background colour change, not the whole card moving. Mobile is 8.5 px taller: the three images use one aspect ratio (Figma 275 / 272 / 272 px) and are centre-cropped desktop exports |
| Logo grid | compared | compared | none seen. TransnetBW is 69 px wide on mobile (Figma 81) |
| Projects | compared | compared | first card title clamps to two lines with a three-line excerpt (Figma: three-line title, one-line excerpt). With three cards the desktop row does not overflow, so "next" is disabled (Figma draws it red). Second thumbnail lacks the textured strip that overflows its frame in Figma |

Behaviour checked in Chromium: hero auto-advance, Next button, pause on hover; accordion single-open and `aria-expanded`; carousel steps at 600 / 1200 px with colours `brand-700` / `brand-900`; card carousel arrows and disabled states at 412; reduced-motion and no-JavaScript renders. Not checked: Firefox, Safari, keyboard-only walkthrough, widths between 412 and 1440, Lighthouse.
