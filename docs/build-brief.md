# Build brief — static page implementation

Rules for every agent implementing pages or components in `web/`. Read `CLAUDE.md`, `AGENTS.md`, `docs/component-library.md` and the catalogue entry for your pages in `docs/design-catalog/` first.

## Scope of this phase

All pages are built **static**: no CMS calls. Content lives in typed data modules and is passed to components as props, so the data source can be swapped for Directus later without touching components.

## Hard rules

- NO comments in code of any kind (`//`, `/* */`, `<!-- -->`, JSDoc, commented-out code).
- NO fallbacks: no `??`, `||` defaults, default prop values, optional chaining to swallow missing data, or silent `catch`. Props are required unless the design genuinely has a variant without them, in which case the variant is explicit in the type.
- No `any`, no `@ts-ignore`, no dead code, no duplicated markup.
- No new dependencies. No client framework. No animation or carousel libraries.
- Stay inside the files assigned to you. Never edit another agent's components, `src/styles/global.css`, `astro.config.mjs`, `package.json`, `BaseLayout.astro`, `src/i18n/*`, `CLAUDE.md`, `AGENTS.md` or anything outside `web/`. If you need a token, a UI string, a variant of a shared component or a layout change, list it in your report and work around it locally with a `class` prop until the coordinator adds it.
- Do not run `pnpm add`, `pnpm install`, `pnpm build`, `astro dev stop` or start another dev server. One dev server is already running at http://localhost:4321 with hot reload; use it.
- Do not use git commands that change state (no commit, add, checkout, stash, reset).

## Figma

- File key `r1JkQxEVEQ86vGHZ2X2OE7`. Load tools with ToolSearch: `select:mcp__figma__get_design_context,mcp__figma__get_screenshot,mcp__figma__get_metadata,mcp__figma__download_assets`.
- For every section you build, call `get_design_context` (`clientFrameworks: "astro"`, `clientLanguages: "typescript,css"`, `skillNames: "resource:figma-design-to-code"`) on the desktop node, the mobile node and every state node. If the response is too large or sparse, call it on the child nodes. Node ids are in `docs/design-inventory.md` and the catalogue.
- The returned code is a reference prototype with absolute positions. Translate it to flex/grid. Every spacing, size, colour, radius, font size, weight, line-height and letter-spacing must match Figma exactly at 1440 and at 412. Between those widths the layout must flow sensibly; desktop layout starts at `lg` (1024px).
- Where desktop and mobile differ beyond reflow (noted in the catalogue), implement what each frame shows.
- Placeholder content in Figma (lorem, "MM/YYYY", "IMG-PLACEHOLDER", repeated logos) is reproduced as drawn; list it in your report.
- Off-palette colours are mapped to the nearest token only when the difference is a rounding artefact; otherwise use the exact value as an arbitrary class and list it in your report.

## Code conventions

- Tokens: use the utilities from `src/styles/global.css` (`text-display-1…5`, `text-heading-1…4`, `text-body-2xl…2xs`, `brand-*`, `neutral-*`, `rounded-xs/sm/md/lg/full`, `max-w-page`, `px-gutter`, `lg:px-gutter-lg`). Tailwind's default colour, text-size and radius scales do not exist. Spacing uses Tailwind's 4px scale or arbitrary values.
- Full-width sections: `mx-auto w-full max-w-page`, gutters `px-gutter lg:px-gutter-lg`.
- Components: `.astro`, PascalCase, one per file, in `src/components/{ui,layout,blocks,cards,interactive}`. Typed `Props` interface. Variants are a typed prop mapped to classes.
- Shared primitives already exist: `ui/Button.astro` (`href`, `label`, `variant`: primary | outline | outline-light | white | link, `size`: sm | md, `arrow`, `newTab`, optional `class`), `ui/Tag.astro` (`label`, `tone`: dark | light). Icons are SVG files in `src/icons/` imported as components (`import ArrowRight from '../../icons/arrow-right.svg'`), using `currentColor`. Add new icons there with the exact path data of the Figma asset, kebab-case names.
- Images: download from Figma with the MCP into `src/assets/<area>/` (kebab-case names) and render with `Image` or `Picture` from `astro:assets` with explicit `widths`/`sizes`, `loading="lazy"` except the single above-the-fold hero image per page (`loading="eager"`, `fetchpriority="high"`). No CSS `background-image` for content photos. Decorative glows are CSS gradients where the Figma layer is a simple fill, gradient or blurred ellipse. Never leave a figma.com URL in code.
- Static content: `src/data/<page>.ts` exporting typed constants; pages import data and map it to component props. No copy inside components. UI strings that are not content (aria labels, "Next", "Sort By") come from `src/i18n/ui.ts` via `t(locale, key)`; request missing keys in your report and use a prop meanwhile.
- Interactivity: a `<script>` in the component implementing a custom element (`<oet-…>`), scoped to its own subtree, no global state. Content must be readable without JavaScript; honour `prefers-reduced-motion`; keyboard operable; visible focus; correct `aria-*`.
- Semantics: one `h1` per page, ordered headings, `nav`/`main`/`footer` landmarks, real links and buttons, alt text on content images, `alt=""` on decorative ones.
- Pages use `src/layouts/BaseLayout.astro` (`title`, `description`). The site header and footer are added to the layout by the coordinator; do not render them in pages.

## Verification you must do

- Screenshot your route: from `web/`, `MSYS_NO_PATHCONV=1 node scripts/shoot.mjs /your-route your-name 1440 412` (Git Bash needs `MSYS_NO_PATHCONV=1`, otherwise the leading slash is rewritten). Output goes to `.screenshots/`. The script also reports console errors.
- Get the Figma render of the same frame with `get_screenshot` (download with curl into `.screenshots/figma/`), view both with the Read tool, and fix differences section by section. Check heights: your page section heights should equal the Figma frame's within a few pixels.
- Run `pnpm exec prettier --write <your files>` and `pnpm check` (ignore errors in files you do not own; report them).
- Do not claim a match you have not looked at. In your report, state per section whether it was compared visually at 1440 and at 412, and list every remaining difference.

## Report

Write `docs/reports/<your-name>.md`: files created; components with their props; what the coordinator must add to shared files; placeholder content reproduced; assumptions; per-section verification status and remaining differences. Your final message is a short summary of that report.

## Wave B addendum (page agents)

Wave A is finished. Before writing anything, read these reports in full; they are the API reference for what already exists:

- `docs/reports/shared-parts.md` — `PageHero` (with the per-page table of layout, artwork key, background, ornament, title sizes), `HeroStatBar`, `PersonBadge`, `CtaBanner`, `SectionHeading`, `ListingHeader`, `FilterTabs`, `FilterBar`, `SortControl`, `Pagination`, `RichText`, `StatItem`, `PersonRow`, `LinkListGroup`, and the `Button` sizes (`xs`, `sm`, `sm-tall`, `md`, `lg`) and variants (`primary`, `outline`, `outline-light`, `white`, `link`, `secondary`, `tint`, `outline-tint`).
- `docs/reports/home.md` — `CardShell` (base for every card), `ProjectCard`, `CardCarousel`, `IntroStatement`, `BrandImage`, `LogoGrid`, `LogoRow`, `StatStrip`.
- `docs/reports/shell.md` — the header theme contract: a section sets `data-header-theme="light | dark | on-red | solid"`; the header is fixed and overlays the page, so pages provide their own top spacing.

Use those components as they are. Do not edit them. If one cannot express what your design needs, work around it locally with the `class` prop or a wrapper and describe the gap in your report; the coordinator reconciles after the wave.

Changes since the first brief:

- `BaseLayout` now renders the preloader, header and footer and requires a third prop: `headerTheme` (`light` | `dark` | `solid` | `on-red`), the theme when no section is under the bar. Pages never render header or footer.
- `pnpm check` works (TypeScript 5.9) and must pass for your files.
- Link targets come from `web/src/data/routes.ts` (`routes`, `serviceSlugs`, `departmentSlugs`). Do not invent other paths. For targets that have no designed page (contact, request a demo, handbook, profile pages), use `routes.contact` and list them in your report.
- Dynamic routes are static: `getStaticPaths` over your data module.
- Shared photo assets already downloaded: `web/src/assets/heroes/` (hero artwork per page, keys in the shared-parts report), `web/src/assets/shared/` (collages, person placeholder), `web/src/assets/home/` (service photos, partner and tool logos, project thumbnails). Reuse them instead of downloading again when your design uses the same image.
- Cross-agent components in this wave follow fixed contracts so consumers can code against them while the owner builds them:
  - `cards/ValueCard.astro` (owner: services agent): props `thumbnail: ImageMetadata`, `label: string`, `title: string`, `body: string`. One card; the consumer lays out the row.
  - `blocks/ApproachSteps.astro` (owner: services agent): props `columns: 4 | 5`, `steps: { number: string; title: string; text: string; image: ImageMetadata | null }[]`, `illustration: ImageMetadata | null`, `mobile: 'grid' | 'scroll'`.
  - `cards/DepartmentCard.astro` (owner: organization agent): props `variant: 'full' | 'compact'`, `name`, `lead`, `summary`, `accent: 'red' | 'dark-red' | 'charcoal' | 'plum'`, `icon`, `head: { name; role; photo }`, `link: { label; href } | null`, `image: { desktop: ImageMetadata; mobile: ImageMetadata } | null`.
  Owners build these first. Consumers build the rest of their pages first; if a contracted component is still missing when you need it, wait a few minutes and re-check, and if it never appears say so in your report rather than writing your own copy.
- The single dev server is shared by five agents. Another agent's syntax error can break hot reload for everyone for a moment: if your route errors on a file you do not own, wait and retry rather than editing that file.
