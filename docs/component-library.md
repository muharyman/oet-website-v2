# Component library specification

Status: **draft for review**, 2026-10-08. Derived from `docs/design-inventory.md` and `docs/design-catalog/`. Target: Astro components in `web/src/components/`, Tailwind 4, no client framework.

Exact spacing, sizes and colours of each component are pulled from its Figma nodes with `get_design_context` when it is built; this document fixes names, responsibilities, props, variants and build order.

## 1. Conventions

- One component per file, PascalCase, `.astro`. Props typed with a `Props` interface; no optional prop that silently hides missing content.
- Components take **already-resolved data** (plain objects), never fetch. Pages and block wrappers fetch from Directus and map to props.
- Variants are a typed `variant` prop mapped to classes, not boolean flags.
- Interactivity: a `<script>` in the component, written as a small custom element (`<oet-accordion>`, `<oet-carousel>` …) so behaviour is scoped, runs once per instance and works with view transitions. No global listeners unless stated.
- Every interactive component works with keyboard, has visible focus, honours `prefers-reduced-motion`, and renders usable content without JavaScript.
- Images go through `CmsImage` (Directus asset transforms, `srcset`, `sizes`, fixed aspect box). Decorative art is local and imported through `astro:assets`.
- Text comes from the CMS or from `web/src/i18n` dictionaries (UI strings such as "Next", "Sort by", aria labels). No hardcoded copy in components.
- Folders: `components/ui` (primitives), `components/layout` (shell), `components/blocks` (page sections), `components/cards`, `components/interactive`.

## 2. Tokens (`web/src/styles/theme.css`)

Defined once in `@theme`, from section 3 of the design inventory:

- Colours: `brand-50, 200, 300, 400, 500, 600, 700, 800, 900, 950`; `neutral-50 … 950`.
- Font: `--font-sans: "Plus Jakarta Sans"`; weights 400, 500, 600, 700; italic 400, 500.
- Type utilities (size / line-height / -1% tracking): `text-display-1` 72, `-2` 56, `-3` 48, `-4` 44, `-5` 36; `text-heading-1` 32, `-2` 28, `-3` 24, `-4` 22; `text-body-2xl` 24, `-xl` 20, `-lg` 18, `-md` 16, `-sm` 14, `-xs` 12, `-2xs` 10. Display and heading at 112%, body at 120%.
- Radius: `rounded-xs` 1, `rounded-sm` 4, `rounded-md` 8, `rounded-lg` 12, `rounded-full`.
- Layout: `--container: 1440px`, `--gutter: 20px` (mobile) / `80px` (desktop), `--inset: 20px`. Desktop layout from the `lg` breakpoint (1024px).

Scale names here replace the provisional ones used earlier in `AGENTS.md`.

## 3. Components

Legend — **JS**: none / small (under ~1 kB) / medium / heavy. **Pages**: where it is used.

### 3.1 Primitives (`components/ui`)

| Component | Props | Variants / states | JS |
| --- | --- | --- | --- |
| `Button` | `href` or `type`, `label`, `variant`, `size`, `arrow` | `primary`, `outline`, `outline-light`, `white`, `link`; sizes `md`, `sm`, `lg`; hover, focus, disabled | none |
| `Tag` | `label`, `tone` | `dark` (on light), `light` (on red/photo) | none |
| `Icon` | `name`, `size` | SVG sprite built from the Figma icon set | none |
| `CmsImage` | `asset`, `alt`, `sizes`, `aspect`, `priority` | lazy by default; `priority` for the LCP image | none |
| `BrandImage` | `asset`, `alt`, `overlay`, `aspect` | photo with colour grading + pixel-block overlay; overlay positions as named presets | none |
| `SectionHeading` | `tag`, `title`, `subline`, `columns[]`, `actions[]`, `tone` | plain; with subline; with side columns; with buttons | none |
| `RichText` | `html` | styles headings, lists, links, inline images, tables | none |
| `Pagination` | `current`, `total`, `hrefFor` | first / prev / pages with ellipsis / next / last | none (links) |
| `FilterTabs` | `options[]`, `active`, `name` | compact joined buttons; full-width equal columns; wrapping rows | none when filters are links; small when client-side |
| `FilterBar` | `filters[]`, `sort` | closed, open, selected (open state to be designed) | small |
| `SortControl` | `options[]`, `active` | closed, open (to be designed) | small |
| `StatItem` | `value`, `label`, `icon` | strip cell; grid cell | none |
| `PersonRow` | `name`, `title`, `photo`, `links[]` | plain; with role label and social icons | none |

### 3.2 Shell (`components/layout`)

| Component | Notes | JS |
| --- | --- | --- |
| `BaseLayout` | `<html lang>`, SEO, fonts, consent, header, footer, skip link | — |
| `Seo` | title, description, canonical, `hreflang` alternates, Open Graph | none |
| `SiteHeader` | Fixed bar. Themes: `light` (over hero), `dark`, `solid` (menu open), `on-red`. Theme is set per page section via a data attribute observed with `IntersectionObserver`. Dropdowns: Tools & Data, Outputs, Organization (simple lists); Services (mega menu with image, six items, footer row); language switcher; Contact Us | medium |
| `MobileMenu` | Full-screen panel, accordion groups, services drill-down, focus trap | medium (shares the header script) |
| `LanguageSwitcher` | Links to the same page in each locale | none |
| `Preloader` | Red panel with logo. Implemented only if confirmed as a real page-load state; if kept, it must not delay LCP (CSS-only, removed on first paint) | none |
| `FooterCta` | "Energy Transition Starts Now." + email + button | none |
| `SiteFooter` | Blurb, copyright, legal links (Cookie Settings opens the consent tool), four link columns; mobile order differs | none |
| `ConsentManager` | Klaro + consent-gated GTM, loaded deferred | existing behaviour |

### 3.3 Heroes and headers (`components/blocks`)

| Component | Props | Variants | JS |
| --- | --- | --- | --- |
| `HomeHero` | `slides[]` (title, paragraphs, image, audience label), `actions[]` | auto-advancing slides with progress bar and "Next" card; three animation stages per slide | small |
| `PageHero` | `title`, `eyebrow`, `chip`, `lead[]`, `image`, `actions[]`, `stats`, `person`, `layout`, `height` | layouts `photo-centered`, `centered-dark`, `map-bottom-left`, `photo-left`, `map-left`, `illustration-left`; heights `tall` (780) and `short` (553) | none |
| `HeroStatBar` | `stats[]`, `action` | counts only; counts + button; empty | none |
| `PersonBadge` | `person` | — | none |
| `DetailHeader` | `title`, `highlights`, `lists[]`, `meta[]`, `tone` | `project` (red), `publication` (maroon), `event` (light) | none |
| `DetailHeroImage` | `asset`, `alt` | — | none |
| `ListingHeader` | `title`, `description`, tabs/filters slot | — | none |

### 3.4 Content blocks (`components/blocks`)

| Component | Purpose | JS |
| --- | --- | --- |
| `IntroStatement` | Large statement + two text columns; with buttons, with photo, or text only | none |
| `ImageInfoCard` | Image, red rule, title, text, optional button | none |
| `StatStrip` / `StatGrid` | Six-across strip (home) / two-column grid (publication) | none |
| `LogoRow` | Tool logos row | none |
| `LogoGrid` | Bordered logo grid with optional label cell; 6 columns home, 4 columns partners | none |
| `ServiceAccordion` | Six numbered items; open item shows text, button and swaps the image | small |
| `VerticalCarousel` | Build / Deploy / Scale: pinned, scroll-driven on desktop; stacked on mobile | small |
| `CardCarousel` | Horizontal scroll-snap row with optional arrows (projects, related items) | small |
| `TestimonialSlider` | Wide slider with segmented progress; compact single | small |
| `ApproachSteps` | Numbered columns with image and text; 4 or 5 columns | none |
| `NumberedStepList` | Bordered rows: number, text, icon | none |
| `WorkTopicGrid` | Two-column bordered topic table | none |
| `OfferingList` | Red header band + offering rows with deliverables | none |
| `OutcomeMatrix` | Four columns output → outcome; collapsed then expanded when scrolled into view | small |
| `CtaBanner` | Heading, text, buttons, breakout photo collage; `red` and `light` tones | none |
| `ServiceCtaBand` | CTA copy + overlapping `ServiceCard` for the related service | none |
| `LinkListGroup` | Titled lists of link rows with arrow; disabled row state | none |
| `TableOfContents` | Built from body headings; active item on scroll | small |
| `ShareBar` | Share (Web Share API with copy-link when unavailable), Cite (copy citation), Save as PDF (print stylesheet) | small |
| `EventDetailsCard` | Date, location, time, contributors, calendar and join buttons; past variant without buttons, with poster | none |
| `MediaGallery` | Main image + thumbnail strip | small |
| `VideoPoster` | Poster with play button; loads the player on click | small |
| `ContinentStats` | Label cell + count cells | none |

### 3.5 Cards (`components/cards`)

All share one `CardShell` (tab label, body, footer link, framed media) to match the single `card-project` shell in Figma.

| Component | Content | Variants |
| --- | --- | --- |
| `ProjectCard` | title, excerpt, date range, link, thumbnail, partner tag/footer | frame colour; with/without partner tag |
| `PublicationCard` | type, title, citation/excerpt, date or "Preprint", link | image; text-only |
| `ToolCard` | category tab, name, role prefix + description, source/website/GitHub links | five category colours |
| `EventCard` | status tab, date, title, excerpt, registration close date, link, poster (fitted, not cropped) | upcoming; highlighted |
| `ServiceCard` | icon strip, illustration, name, two paragraphs, link | horizontal (desktop); vertical (mobile) |
| `DepartmentCard` | name, lead, summary, icon tile, head, link, image | full; compact (no image, no link) |
| `ValueCard` | thumbnail, label, title, body | three thumbnail widths |
| `JobCard` | title, location, language, work mode, type, link, themed thumbnail | eight department themes |
| `TeamCard` | portrait, name, role, social icons, profile link, group tags | social icons optional |
| `GlobeCountryCard` | photo, country, teammate count | — |

### 3.6 Bespoke interactive (`components/interactive`)

| Component | Approach | JS | Risk |
| --- | --- | --- | --- |
| `TeamGlobe` | Server-rendered list of countries with counts as the accessible base; canvas/SVG globe enhances it. Loaded only when scrolled near (`client:visible`-style dynamic import). Library choice (e.g. `d3-geo` orthographic projection on SVG, ~30 kB) decided in a spike, because the only spec is a CodePen | heavy, lazy | High: no design spec for interaction |
| `TheoryScrollScene` | Pinned section; three states driven by scroll position. Layers exported from Figma as SVG/WebP. CSS scroll-driven animations where supported, `IntersectionObserver` steps otherwise; reduced-motion shows the three states stacked | medium, lazy | Medium: asset export and timing need designer review |

## 4. Page composition

| Route | Blocks, top to bottom |
| --- | --- |
| Home | `HomeHero`, `IntroStatement` + `BrandImage`, `StatStrip`, `SectionHeading` + `ServiceAccordion`, `SectionHeading` + `LogoRow`, `VerticalCarousel`, `LogoGrid` x2, `SectionHeading` + `CardCarousel`(`ProjectCard`) |
| Success stories | `PageHero`, `ListingHeader` + `FilterTabs` + `FilterBar`, grid of `ProjectCard`, `TestimonialSlider`, `Pagination` |
| Project detail | `DetailHeader`, `DetailHeroImage`, `RichText`, `LinkListGroup`, testimonial, `CardCarousel`, sidebar (`PersonRow`, partner logos), `ServiceCtaBand` |
| Publications | `PageHero`, `ListingHeader` + `FilterTabs` + `FilterBar`, grid of `PublicationCard`, `Pagination` |
| Publication detail | `DetailHeader`, `DetailHeroImage`, `RichText`, `StatGrid`, `LinkListGroup`, related `PublicationCard`, sidebar (authors, `TableOfContents`, `ShareBar`), `ServiceCtaBand` |
| Tools and data | `PageHero`, `IntroStatement` + `FilterTabs`, grouped grid of `ToolCard`, `CtaBanner` |
| Services | `PageHero`, `IntroStatement`, grid of `ServiceCard`, `ApproachSteps`, `ValueCard` row, `CtaBanner` |
| Service detail | `PageHero`, `IntroStatement`, `OfferingList`, `ValueCard` row, `ApproachSteps` (optional), `CardCarousel`(`ProjectCard`), `CtaBanner` |
| About | `PageHero`, `IntroStatement`, `ImageInfoCard` x2, `DepartmentCard` list, `ValueCard` row |
| Department index | `PageHero` + `HeroStatBar`, `DepartmentCard` list |
| Department detail | `PageHero` + `PersonBadge`, `RichText`, `WorkTopicGrid` (optional), `CardCarousel`(`ProjectCard`) |
| Partners | `PageHero` + `HeroStatBar`, `IntroStatement`, `FilterTabs`, `LogoGrid` |
| Team | `PageHero` + `HeroStatBar`, `SectionHeading`, `TeamGlobe`, `ContinentStats`, `FilterTabs` + `SortControl`, grid of `TeamCard`, `Pagination` |
| Career | `PageHero` + `HeroStatBar`, `SectionHeading`, grid of `JobCard`, `NumberedStepList` |
| Theory of change | `PageHero`, `TheoryScrollScene`, `ApproachSteps`, `OutcomeMatrix`, `TeamGlobe` (decorative) |
| News and events | `PageHero`, `ListingHeader` + `FilterTabs` x2 + `SortControl`, grid of `EventCard`, `CtaBanner` x2, `Pagination` |
| Event detail | `DetailHeader`, `EventPoster` or `VideoPoster`, `EventDetailsCard`, `RichText`, `MediaGallery` (past), `CtaBanner` x2 |

Every page ends with `FooterCta` + `SiteFooter`.

## 5. Listing behaviour (filters, sort, pagination)

- Listings are prerendered. Filters that map to routes (publication type, event state, tool category) are links to prerendered URLs, so they work without JavaScript and are indexable.
- Combined filters (region + service + product + tag) and sort are applied client-side over a compact JSON index emitted with the page, with the state mirrored in the query string. This keeps pages static and avoids a server round trip.
- Pagination is rendered on both desktop and mobile (desktop design pending), as real links.

## 6. JavaScript budget

| Scope | Budget (gzip) |
| --- | --- |
| Every page: header + mobile menu + consent bootstrap | 6 kB |
| Home additions: hero, accordion, vertical carousel, card carousel | 5 kB |
| Listing additions: filter/sort | 4 kB |
| Detail additions: TOC, share, gallery | 3 kB |
| `TeamGlobe`, `TheoryScrollScene` | lazy-loaded, excluded from initial load; measured separately |

## 7. Build order

1. **Foundation:** tokens, fonts, `BaseLayout`, `Seo`, `Button`, `Tag`, `Icon`, `CmsImage`, `BrandImage`, `SectionHeading`, `RichText`.
2. **Shell:** `SiteHeader`, `MobileMenu`, `LanguageSwitcher`, `FooterCta`, `SiteFooter`, consent.
3. **Home:** `HomeHero`, `IntroStatement`, `StatStrip`, `ServiceAccordion`, `LogoRow`, `VerticalCarousel`, `LogoGrid`, `CardShell`, `ProjectCard`, `CardCarousel`.
4. **Shared page parts:** `PageHero` (all layouts), `HeroStatBar`, `CtaBanner`, `FilterTabs`, `FilterBar`, `SortControl`, `Pagination`, `ListingHeader`.
5. **Outputs:** remaining cards, `DetailHeader`, `LinkListGroup`, `TestimonialSlider`, `TableOfContents`, `ShareBar`, `StatGrid`, `ServiceCtaBand`.
6. **Tools and data; News and events** (`ToolCard`, `EventCard`, `EventDetailsCard`, `MediaGallery`, `VideoPoster`).
7. **Services** (`ServiceCard`, `OfferingList`, `ApproachSteps`, `ValueCard`).
8. **Organization** (`DepartmentCard`, `WorkTopicGrid`, `JobCard`, `NumberedStepList`, `TeamCard`, `ContinentStats`, `ImageInfoCard`).
9. **Bespoke:** `OutcomeMatrix`, `TheoryScrollScene`, `TeamGlobe` (after a spike and designer answers).

Each step ends with screenshot comparison against Figma at 1440 and 412 and a Lighthouse run.

## 8. Decisions needed

1. `Preloader`: is the red logo panel a real page-load screen? A blocking preloader works against the Lighthouse goal; my recommendation is to drop it or make it a non-blocking CSS fade.
2. `TeamGlobe`: accept a spike to pick the technique, and a simplified first version (static map with pins) if the designer has no further spec?
3. Thumbnails for projects: uploaded pre-composed (as the Thumbnail Maker Guide implies), with only the partner tag overlaid in code?
4. The designer questions in section 6 of `docs/design-inventory.md` (missing states and pages).
