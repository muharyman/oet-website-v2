# Report: shell

Site header, mobile menu, language switcher, footer and preloader. Static, driven by `web/src/data/navigation.ts` and `web/src/data/footer.ts`. Demo route: `/dev/shell`.

## Files created

| File | What |
| --- | --- |
| `web/src/components/layout/SiteHeader.astro` | Fixed bar, desktop dropdowns and mega menu, theme variables, the `<oet-header>` custom element script |
| `web/src/components/layout/MobileMenu.astro` | Full-screen red panel: root list, accordion groups, services drill-down, legal strip |
| `web/src/components/layout/LanguageSwitcher.astro` | Globe cell and dropdown, one link per locale passed in |
| `web/src/components/layout/NavServiceItem.astro` | Icon + title + description row, shared by the mega menu and the mobile drill-down |
| `web/src/components/layout/menuStyles.ts` | Class strings shared by the header parts (focus ring, bar cell, list panel, list link) |
| `web/src/components/layout/SiteFooter.astro` | `<footer>`: background art, `FooterCta`, bottom area |
| `web/src/components/layout/FooterCta.astro` | Headline, email link, inquiry button |
| `web/src/components/layout/Preloader.astro` | Red panel, inline session script, CSS animation |
| `web/src/data/navigation.ts`, `web/src/data/footer.ts` | Content and types (`HeaderTheme`, `Navigation`, `FooterContent`, …) |
| `web/src/assets/brand/*` | `oet-logo-red-n-subtitle.png` (copied from `legacy/public`, byte-identical to the Figma asset), `oet-logo-white-n-subtitle.png`, `oet-mark-white.png`, `oet-mark-white-preloader.png` (Figma), `menu-services.png` (2x export of `643:6612`) |
| `web/src/assets/footer/*` | `glare.png` (Figma source image, resized to 938 px), `pixels.svg` |
| `web/src/icons/*` | `globe`, `menu`, `close`, `close-small`, `chevron-right`, `chevron-right-large`, `service-pylon`, `service-government`, `service-engineer`, `service-column`, `service-research`, `service-monitor` (Figma path data, `currentColor`) |
| `web/src/pages/dev/shell.astro` | Demo page with one section per theme |
| `web/scripts/shoot-shell.mjs` | Screenshots of every state plus behaviour assertions, output in `.screenshots/shell/` |

## Components and props

| Component | Props |
| --- | --- |
| `SiteHeader` | `navigation: Navigation`, `theme: HeaderTheme` (`light` \| `dark` \| `solid` \| `on-red`), `locale: Locale`, `locales: readonly Locale[]` |
| `MobileMenu` | `id`, `entries: MobileNavEntry[]`, `legal: NavLink[]`, `consentLabel`, `copyright`, `navLabel`, `legalLabel` (rendered by `SiteHeader`) |
| `LanguageSwitcher` | `id`, `locales`, `current`, `label`, `class` |
| `NavServiceItem` | `link: NavServiceLink`, `tone: 'dark' \| 'light'` |
| `SiteFooter` | `content: FooterContent` (renders `FooterCta` itself, because the background art spans both) |
| `FooterCta` | `content: FooterCtaContent` |
| `Preloader` | none |

### Header theme contract (for page authors)

- A section sets `data-header-theme="light | dark | on-red | solid"` on itself. An `IntersectionObserver` with a 1 px band at the vertical centre of the bar applies the theme of the section under it; with no section under the bar the page default (`theme` prop) applies.
- `SiteFooter` sets `data-header-theme="on-red"` on itself.
- The bar is `position: fixed` at 40 px from the top on desktop (20 px on mobile) and overlays the page, as in Figma. Pages need their own top spacing.
- Opening any dropdown switches the bar to the white `solid` look; opening the mobile menu switches it to the red look with a white Contact button.

## What the coordinator must add to shared files

`web/src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css'
import Preloader from '../components/layout/Preloader.astro'
import SiteFooter from '../components/layout/SiteFooter.astro'
import SiteHeader from '../components/layout/SiteHeader.astro'
import { footer } from '../data/footer'
import { navigation } from '../data/navigation'
import type { HeaderTheme } from '../data/navigation'
import { locales } from '../i18n/config'

interface Props {
  title: string
  description: string
  headerTheme: HeaderTheme
}

const { title, description, headerTheme } = Astro.props
---

<body>
  <Preloader />
  <SiteHeader navigation={navigation} theme={headerTheme} locale={locale} locales={locales} />
  <slot />
  <SiteFooter content={footer} />
</body>
```

- `Preloader` must stay the first child of `<body>`: its inline script sets `oet-first-visit` on `<html>` before first paint.
- Every page then passes `headerTheme`. After that, remove the header, footer and preloader from `web/src/pages/dev/shell.astro` (or delete the page) so they are not rendered twice.
- `web/src/i18n/ui.ts`: keys requested, currently carried in the data modules as `navigation.labels` and `footer.labels`: `nav.home` ("Open Energy Transition"), `nav.primary` ("Main"), `nav.legal` ("Legal"), `footer.navigation` ("Footer").
- `pnpm check` cannot run: `astro check does not currently support TypeScript 7.0`. I type-checked the data modules, `menuStyles.ts` and the extracted header script with `tsc --strict` (clean). The `.astro` templates were only checked by rendering.

## JavaScript

Header and mobile menu share one script: **2,545 bytes minified** (1,169 gzip), measured with esbuild on the extracted script. Footer and language switcher have none. The preloader has a 190-byte inline script.

- Desktop: hover (mouse only) and click open; Enter/Space toggle; ArrowDown opens and focuses the first link; Escape closes and returns focus; Tab leaves and closes; outside click closes; `aria-expanded` / `aria-controls` on every trigger.
- Without JavaScript the dropdowns open on hover and focus through CSS.
- Mobile: burger toggles the panel, focus is trapped in bar + panel, Escape closes and focuses the burger, `<html>` scroll is locked. Accordion groups and the services drill-down are native `<details>` (no script); list groups are mutually exclusive through the `name` attribute.
- Without JavaScript the mobile menu cannot be opened; the footer carries all links.

## Preloader

Hidden by default. Shown only when the inline script finds no `oet-visited` key in `sessionStorage`, and only under `prefers-reduced-motion: no-preference`. Holds 0.4 s, fades 0.3 s, `pointer-events: none`, `aria-hidden`. The page renders underneath from the first frame. Lighthouse lab runs are always a first visit, so the 0.7 s overlay will show in Speed Index; shorten the two durations in `Preloader.astro` if that costs points.

## Differences between mobile and desktop content (as drawn)

- Mobile menu has five entries: "Tools & Data" as a plain link (no children), a **"Solutions"** group (Projects, Success Stories) that does not exist on desktop, Services, Outputs, Organization. Both Solutions links point to `/outputs/success-stories`.
- Mobile services drill-down order is column-major (System Operators, Regulators, Consultancies, Foundations, Think Tanks, Technology); desktop and footer are row-major. Implemented as drawn (`servicesStacked` in `navigation.ts`).
- Open states of the mobile "Outputs" and "Organization" groups are not drawn; they reuse the "Solutions" panel style with the desktop children.
- Organization order: dropdown ends "News & Events, Theory of Change"; footer ends "Theory of Change, News & Events".
- Footer Outputs column has "Completed Success Stories", "Ongoing Success Stories" and "Academic Publication", which the header does not; the header has "Publications", which the footer does not.
- Legal links: desktop footer "Legal | Disclaimer | Privacy Statement | Cookies Settings" at 10 px; mobile footer the same order with " / " and "Cookie Settings" at 12 px; mobile menu "Legal, Privacy Statement, Disclaimer, Cookie Settings". Mobile footer puts the legal row above the copyright row; desktop the reverse. All implemented as drawn.
- Mobile footer order: link columns (2 x 2), blurb, legal, copyright.

## Placeholder or suspicious content reproduced

- Three services share the description "We support model and data development, software deployment, validation, benchmarking, training, maintenance".
- "Consultancies & Engineering Firm" (singular), "Learn More About Our Service" (singular), "Department", "Partner", "© 2026".
- "Foundations &  Development Partners" has a double space in Figma; written with one.

## Assumptions

- Link targets not specified in Figma: Tools & Data children `/tools-and-data`, `/tools-and-data/models`, `/data`, `/open-source-solvers`, `/community`; Outputs `/outputs/blogs`, `/outputs/policy-briefs`, `/outputs/reports`; footer `/outputs/success-stories?status=completed|ongoing`; services `/services/<name-with-and>`; legal `/legal`, `/disclaimer`, `/privacy-statement`.
- "Contact Us" and "Send an Inquiry" are `mailto:info@openenergytransition.org`: no contact page is designed. The footer email is a `mailto` link in Figma, not an input.
- Language names come from `Intl.DisplayNames` in the current locale. Figma shows "English" and "Spanish"; only `en` is enabled, so only "English" is listed.
- The Contact and Inquiry buttons are local anchors, not `ui/Button`: the header one is themed through CSS variables and neither size (38 px, 56 px high) exists in `Button`.
- Hover colours are not designed: list links turn `brand-500`, Contact darkens to `brand-600`, the Inquiry button to `neutral-100`, footer links underline.

## Deviations from Figma

- **Mega menu over the hero** (`249:30122`): the home frame draws a translucent glass panel with white text under a light bar. Per the task, opening a menu switches to the white `solid` bar (`643:6404`); the glass variant is not built. Designer question.
- **`645:4053` over the footer**: the render shows the same `brand-500` Contact button as the light variant, which is invisible against the `brand-500` footer; there is no outline in the file. `on-red` is therefore identical to `light`.
- **Gap between label and chevron**: Figma uses 4 px on "Services" (and mobile "Solutions"), 10 px elsewhere. Normalised to 10 px (3 px shift of those labels).
- **Line heights**: Figma rounds line boxes to whole pixels (12 px text is 14 high, not 14.4). I pinned `leading-[14px]`, `leading-[19px]`, `leading-[22px]`, `leading-[12px]` on shell text where the sums decide panel and footer heights.
- **Borders**: Figma strokes sit on half pixels, so its horizontal lines render as two 50 % rows; mine are crisp 1 px lines up to half a pixel away.
- **Inquiry button font**: Inter Medium 16/24 in Figma (library default); rendered in Plus Jakarta Sans, so the desktop contact box is 455 px wide instead of 460.
- **Mobile footer contact box and headline**: Figma has them 368 and 379 px wide, off-centre by 2 and 3.5 px; mine are centred at 372.
- **Backdrop blur** on the footer bottom area, the dropdown panels and the mobile legal strip is omitted (no visible effect on opaque or already blurred backgrounds); the bar keeps its 6 px blur.
- **Preloader**: solid `brand-500`; the Figma frame has a faint warmer gradient along the bottom edge.
- **Off-palette values kept as drawn**: `rgba(236,236,236,0.44)` and `0.32` footer lines, `#7a7a7a` burger icon in the dark theme, `rgb(0 0 0 / 0.01)` bar tint, `black/12` open accordion.
- **Mobile dark bar logo**: no red mark-only asset in the frames I had; it is the red logo PNG cropped to the mark, sized by eye against the event-detail mobile render (within about 1 px).
- **Text weight**: white text looks heavier than in the Figma renders. Computed weight is 500 and widths match (80.5 vs 81 px); it is Chromium's rasterisation on Windows.

## Verification

`node scripts/shoot-shell.mjs` from `web/`: no console errors, all 25 behaviour checks true. The script mutes the dev server's HMR socket, because edits by other agents reloaded the page mid-run. Footer height 847 at 1440 (Figma 847) and 1294 at 412 (Figma 1294).

| State | Figma node | Compared | Result |
| --- | --- | --- | --- |
| Bar, light over photo, 1440 | `162:1738`, `162:1326` | overlay diff | match apart from text rasterisation and the Services gap |
| Bar, dark, 1440 | `162:1709`, `660:39373` | overlay diff | match |
| Bar on red section, 1440 | `173:13264` | overlay diff | match |
| Bar over footer, 1440 | `645:4053` | viewed, theme asserted `on-red` | same look as the Figma render (see deviation on "outline"); on the demo page the footer cannot scroll fully under the bar, so the shot shows the bar straddling the section edge |
| Services mega menu | `643:6404` | overlay diff | match within 1 px; panel 218 high |
| Tools & Data dropdown | `643:7280` | overlay diff | match; 246 high |
| Outputs dropdown | `643:6852` | overlay diff | match |
| Organization dropdown | `643:7354` | measured | 338 high as in Figma; not viewed side by side |
| Language dropdown | `643:7490` | overlay diff | match, one item instead of two |
| Mobile bar, light | `196:2374` | side by side | match |
| Mobile bar, dark | event detail mobile `659:35192` | side by side | match; logo within about 1 px |
| Mobile bar, language open | not drawn | viewed | white bar with dropdown under the globe |
| Mobile menu root | `196:4655`, `196:6219` | side by side | match |
| Mobile accordion open | `196:6506` | side by side | match |
| Mobile services drill-down | `196:6578`, `196:6646` | side by side, then viewed again after reordering to the Figma order | match within 1 px |
| Footer, 1440 | `643:4463` | overlay diff | match, glares included |
| Footer, 412 | `645:3097` | side by side | match |
| Preloader | `162:1389` | viewed | match apart from the bottom gradient |

Not verified: Safari and Firefox, widths between 412 and 1440 (only reasoned), keyboard use with a screen reader, a production build (`pnpm build` is off limits, so the script size is from esbuild and the logo `Image` output was only seen in dev).
