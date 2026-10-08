# Design inventory — OET Web Design (Figma)

Audited 2026-10-08 with the Figma MCP (read-only). File key `r1JkQxEVEQ86vGHZ2X2OE7`.

Note for future sessions: `get_metadata` without a node id lists only the first page ("Cover"). The real page list comes from a read-only `use_figma` script (`figma.root.children`).

## 1. Figma pages

| Page id | Name | Use |
| --- | --- | --- |
| `133:533` | Cover | File cover ("Web Design Handoff", August 2026) |
| `133:532` | Handoff: Home Page | **Build from this** |
| `599:2` | Handoff: Outputs / Success Stories, Publication* | **Build from this** |
| `648:10168` | Handoff: Organization / About Us, Depatrment | **Build from this** |
| `650:21101` | Handoff: Organization / Partners, Team, Career | **Build from this** |
| `654:3433` | Handoff: Organization / Theory of Change* | **Build from this** |
| `659:27439` | Handoff: Organization / News and Events | **Build from this** |
| `657:17198` | Handoff: Tools and Data | **Build from this** |
| `662:40197` | Handoff: Services* | **Build from this** |
| `230:22078` | Preview: For Review | Review copies; not a source |
| `268:4258` | Preview: Event Page (Old AD) | Old art direction; not a source |
| `0:1` | Iteration | Work-in-progress versions and designer notes; not a source, useful for intent |
| `28:31412` | Archieved | Not a source |

Three handoff pages carry a `*` in their name; its meaning is recorded in section 6 once confirmed.

## 2. Page frames (desktop 1440, mobile 412)

### Home (`133:532`)

| Frame | Node |
| --- | --- |
| Home, desktop | `162:686` |
| Home, mobile | `196:1458` |
| Mobile menu states | `196:4655`, `196:6506`, `196:6578` |
| Hero states on a page | `162:1330`, `162:1389` |
| Component set: hero-section | `162:1395` |
| Component set: top-nav | `162:1708` |
| Component set: menu-service-section (services accordion) | `173:12612` |
| Component set: carousel-vertical (Build / Deploy / Scale) | `188:1235` |
| Service images | `173:13311`, `173:13319`, `173:13303`, `173:13327`, `173:13335`, `173:13343` |
| Footer background art | `196:1406` |

### Outputs: success stories and publications (`599:2`)

| Frame | Desktop | Mobile |
| --- | --- | --- |
| Success stories (projects list) | `643:9903` | `643:10556` |
| Publications list | `645:14357` | `645:14863` |
| Project detail | `645:3668` | `645:11996` (to confirm) |
| Publication detail | `647:2023` | `647:5794` (to confirm) |
| Project/post metadata | `643:7951`, `647:1128` | |
| Hero states | `643:11939`, `645:13831` | |
| Project card variants | `645:4959`, `645:11090`, `645:11421`, `645:11537`, `645:11741`, `645:11848` | |
| "Thumbnail Maker Guide" section | `648:9363` | |

### Organization: About and Department (`648:10168`)

| Frame | Desktop | Mobile |
| --- | --- | --- |
| About | `648:15307` | `648:16936` |
| Department (five frames) | `648:15690`, `648:15897`, `648:16025`, `648:16167`, `648:16265` | `648:18733`, `648:19300`, `648:19806`, `648:20154`, `648:20417` |
| Hero state | `648:13535` | |
| Page header variants (`project-header`) | `648:20787`, `648:20793`, `648:20799`, `648:20805`, `648:20823`, `648:20829` | `648:20813`, `648:20821`, `648:20835`, `648:20841`, `648:20843`, `648:20845` |
| Card variants (`card-top`) | `648:20848`–`648:21077` | |

### Organization: Partners, Team, Career (`650:21101`)

| Frame | Desktop | Mobile |
| --- | --- | --- |
| Partners | `650:26653` | `650:26878` |
| Career | `650:27431` | `650:21852` |
| Team | `650:24621` | `651:28624` |
| Hero state | `650:21111` | |
| Team cards | `654:3207` and siblings | |
| Job thumbnails | `650:28308`, `650:28321`, `650:28334`, `650:28355`, `651:28441` and siblings | |

### Organization: Theory of Change (`654:3433`)

| Frame | Node |
| --- | --- |
| Theory of Change, desktop | `656:12898` |
| Theory of Change, mobile | `657:14499`, initial state `657:15304` |
| Component set: about-theory-of-change-initial | `654:6759` |
| Component set: outputs-interact | `654:6916` |
| Content frames | `656:14075` (grid), `656:14110`, `656:14234` (values), `656:14310` (trails) |
| Designer notes | `656:14404`, `656:14407`, `656:14445` |
| Footer globe icons | `656:14467` |

### Organization: News and Events (`659:27439`)

| Frame | Desktop | Mobile |
| --- | --- | --- |
| News and events | `659:38515` | `659:34941`, `659:35192` (to confirm) |
| Upcoming | `660:39226`, `660:39443` | |
| Highlighted | `659:38112`, `660:39823` | `660:39885` |
| Hero state | `659:35944` | |
| Page header | `674:67214` | `674:67244` |

### Tools and Data (`657:17198`)

| Frame | Desktop | Mobile |
| --- | --- | --- |
| Tools and data | `657:26425` | `657:22947` |
| Hero state | `657:23950` | |

### Services (`662:40197`)

| Frame | Desktop | Mobile |
| --- | --- | --- |
| Services | `662:51024` | `662:42561` |
| Service detail (six) | `662:45991`, `662:46520`, `662:47083`, `662:47631`, `662:48243`, `662:48742` | `662:55049`, `662:57136`, `672:58997`, `673:60961`, `673:62718`, `674:64234` |
| Hero state | `662:43564` | |
| Page headers, cards, illustrations | section `662:43576` | |

## 3. Tokens

The file has **no Figma variables collections and no local text, colour or effect styles** in it (they come from a linked library). The values below are measured from every text and shape node on the eight handoff pages.

### Colour

| Token | Hex | Notes |
| --- | --- | --- |
| brand-50 | `#fcece8` | tints on dark red, text on brand |
| brand-200 | `#f29c95` | |
| brand-300 | `#ed6c6c` | |
| brand-400 | `#e8424f` | |
| brand-500 | `#e31937` | primary |
| brand-600 | `#bf1534` | links and outlines on light pages |
| brand-700 | `#9b112e` | |
| brand-800 | `#760d27` | |
| brand-900 | `#52091d` | |
| brand-950 | `#2e0512` | |
| neutral-50 | `#fffefb` | page background, text on dark |
| neutral-100 | `#edece9` | dividers |
| neutral-200 | `#dcdad7` | |
| neutral-300 | `#b7b4b1` | |
| neutral-400 | `#a09e9b` | |
| neutral-500 | `#8a8885` | |
| neutral-600 | `#73716f` | secondary text |
| neutral-700 | `#5d5b59` | |
| neutral-800 | `#464544` | body text |
| neutral-900 | `#302f2e` | |
| neutral-950 | `#191918` | |
| white / black | `#ffffff` / `#000000` | plus white at 32% and 44% for glass borders, black at 1–2% for glass fills, black at 32% for tag borders |

Names for 50/200/300/950 are mine; Figma names were only available for 400–900 and the neutrals.

Off-palette values to resolve with the designer rather than copy: `#ee2042` (red text, ~170 uses), `#e9bc5b` (gold fill, >1,000 uses — likely image placeholders or thumbnail art), `#d9d9d9`, `#a5a5a5`, `#799da4`, `#bdb2ad` (placeholder fills), `#be320f`, `#f7c7bf`, `#333333`, `#444444`, `#4a4c56`, and bright debug strokes on the Theory of Change page (`#ff00f2`, `#3da1ff`, `#00ff9d`, `#eeff00`).

### Typography

One family: **Plus Jakarta Sans**. Letter-spacing is -1% on every style.

| Role | Sizes (px) | Line-height | Weights seen |
| --- | --- | --- | --- |
| Display | 72, 56, 48, 44, 36 | 112% | Medium; 36 also Bold and Medium Italic |
| Heading | 32, 28, 24, 22 | 112% | Medium; 22 also Bold; 24 SemiBold at 100% |
| Body | 24, 20, 18, 16, 14, 12, 10 | 120% | Regular, Medium; 20 and 18 also SemiBold; 20 also Italic |
| Tag / pill | 12, 14, 16 | 124% | Medium |
| Button | 16, 14 | 112% (some 100%) | SemiBold |

Weights needed: 400, 500, 600, 700, plus italic 400 and 500.

Strays to ignore or confirm: `Inter Medium 16/24` (2–14 nodes per page, one recurring component), `Poppins Regular 16` (18 nodes on News and Events, probably pasted from the old site), fractional sizes inside scaled thumbnails.

### Radius, layout

- Radius: 4 (cards, nav, inputs), 8, 12, 999 (pills), 1. Buttons are square. Radii in the hundreds are blurred glow ellipses, not UI.
- Canvas: desktop 1440, content 1280 with 80px gutters, full-bleed cards inset 20px; mobile 412 with 20px gutters.
- Recurring grid: 6 columns of 213.33px on desktop.

## 4. Sections and components per page

The section-by-section catalogue of every frame (node ids, component mapping, interactions, CMS content, designer field specs) is in:

- `docs/design-catalog/home-outputs-tools-news.md` — Home, Success Stories, Publications, Tools and Data, News and Events
- `docs/design-catalog/organization-services.md` — About, Departments, Partners, Team, Career, Theory of Change, Services

Coverage limits of that audit: in the second file, 13 of 19 mobile frames and five of six service-detail desktops were read from layer names and text, not viewed; `get_design_context` (exact spacing and values) was not run in either. Each frame gets its full design-context pass when its component is built.

### Routes designed

| Route | Notes |
| --- | --- |
| `/` | Home |
| `/outputs/success-stories`, `/outputs/success-stories/[slug]` | Projects list and detail |
| `/outputs/publications`, `/outputs/publications/[slug]` | One template; the nav also lists Blogs, Policy Briefs and Reports, which appear to share it |
| `/tools-and-data` | Tabs by category |
| `/services`, `/services/[slug]` | Six audience pages on one template |
| `/organization/about` | |
| `/organization/departments`, `/organization/departments/[slug]` | Index + four detail pages; three departments have no detail page |
| `/organization/partners`, `/organization/team`, `/organization/career` | |
| `/organization/theory-of-change` | Scroll-driven scene |
| `/organization/news-and-events`, `/organization/news-and-events/[slug]` | Detail has two states: upcoming and highlighted (past, with recap media) |

URL paths are my reading of the nav structure; the designs do not specify them.

### Unified component library

The two audits named components independently; this is the merged list (alias in brackets).

**Shell**

- `SiteHeader` [TopNav] — states: light over hero, dark, active/white with menu open, on-red sticky; dropdowns for Tools & Data, Services (mega menu), Outputs, Organization, language. Component set `162:1708` (five of seven variants are misnamed in Figma).
- `MobileMenu` — root, accordion open, services drill-down (`196:4655`, `196:6506`, `196:6578`).
- `Preloader` [LoadingSplash] — red panel with logo beside every page; reads as a global page-load state.
- `FooterCta` + `SiteFooter` — on every page; mobile reorders the columns.

**Primitives**

- `Button` [ActionButton] — primary red (with or without arrow), outline, light-on-red, large white, text link with arrow.
- `Tag` — pill, on light and on red.
- `SectionHeading` [SectionHeader] — tag + heading + optional subline, side columns or buttons.
- `BrandImage` — photo with colour grading and pixel-block overlay.
- `RichText`, `Pagination`, `FilterTabs` [SegmentedTabs], `FilterBar` (dropdowns), `SortControl`.

**Heroes and headers**

- `HomeHero` — three slides, each with a/b/c animation stages (`162:1395`).
- `PageHero` — six layouts in two heights (780 and 553): photo-centred, centred-dark, map-bottom-left, photo-left, map-left, illustration-left; listing variants with one or several buttons or an eyebrow.
- `HeroStatBar`, `PersonBadge` — inside the 553 heroes.
- `DetailHeader` + `MetaRow`, `DetailHeroImage` — project (red), publication (maroon), event (light).

**Content blocks**

- `IntroStatement` [SplitIntro], `ImageInfoCard`, `StatStrip` / `StatGrid`, `LogoRow`, `LogoGrid` [PartnerLogoGrid], `PartnerLogoList`.
- `ServiceAccordion` (`173:12612`), `VerticalCarousel` (`188:1235`), `ProjectCarousel`, `TestimonialSlider`.
- `ApproachSteps`, `NumberedStepList`, `WorkTopicGrid`, `OfferingList`, `OutcomeMatrix`.
- `CtaBanner` [CtaBand] (red with photo collage, light grey), `ServiceCtaBand` with `ServiceCtaCard`.
- `TableOfContents`, `ShareBar`, `LinkListGroup`, `ContactPersonCard` / `AuthorList`, `EventDetailsCard`, `EventPoster`, `VideoPoster`, `MediaGallery`.

**Cards** (one shared shell in Figma, `card-project`)

- `ProjectCard`, `PublicationCard` (image / text-only), `ToolCard` (five category colours), `EventCard` (upcoming / highlighted), `ServiceCard`, `DepartmentCard` (full / compact), `ValueCard`, `JobCard` + `JobThumbnail` (eight department themes), `TeamCard`, `GlobeCountryCard`.

**Bespoke interactive**

- `TeamGlobe` — half-globe with country pins and per-country cards; the only spec is a CodePen reference.
- `TheoryScrollScene` — pinned, scroll-driven three-state cube scene (`654:6760`, `654:6812`, `654:6864`).
- `ContinentStats`.

Roughly 55 components after merging; about 15 are shared across three or more pages.

## 5. Content model implied by the designs

| Collection | Key fields | Relations |
| --- | --- | --- |
| `projects` | title (max 90 chars), excerpt, highlights (up to 4), start/end date, status, region, tags, hero image 1280x712, pre-composed thumbnail ~407x258, optional partner-logo tag, body, tool/data/other links, CTA copy | tools, services, partners, contact (team), testimonial, related projects, departments |
| `publications` | title, type (academic, blog, policy brief, report), category, excerpt or citation, publish date or "Preprint", highlights, body (headings feed the table of contents), output stats (up to 6), resources, DOI, citation text, PDF | authors (team or external), related publications, service |
| `events` | title, brief, description, published date-time, event date, start/end time, timezone, location, map link, type (webinar, event, support meetup, open call), highlighted flag, registration close date, join and calendar links, poster, highlight media, gallery | contributors (team or external) |
| `tools` | name, OET role, description, source/website/GitHub URLs, logo, featured flag | categories (many-to-many: tools, model, data, open-source solvers, community) |
| `services` | name, short name, icon, accent shade, illustrations (4 formats), card summary, hero lead, intro, offerings (with deliverables), "Why OET" value cards, "How We Work" text, CTA banner | related projects |
| `departments` | name, accent colour, icon, lead, summary, card image, hero map art, has-detail-page flag, about text, works text, work topics | head (team), projects |
| `team_members` | name, role, portrait, social links, leadership flag, profile content, country | departments |
| `countries` | name, ISO code, continent, card photo | team members |
| `partners` | name, logo, type (funder / partner), country, URL, group (trusted partner / network) | |
| `jobs` | title, locations, languages, work mode, employment type, external URL | department (drives the thumbnail theme). The current site pulls jobs from Greenhouse |
| `testimonials` | quote, full text (max 720 chars), person, title + company, photo, company logo | project |
| Taxonomies | region, tag, product, publication category, event type | |
| Singletons | navigation, footer, footer CTA, home, about, department index, partners, career, team, theory of change, services index, each listing page's hero and intro, CTA bands | |

The designer's own field specs (names and character limits) are drawn in frames `643:7951`, `647:1128`, `660:39443`, `660:39823` and are transcribed in the first catalogue file; they take precedence over this table.

Every text field is translatable. Several components depend on text length (team role lines, three-line hero titles, fixed-height value cards), so truncation rules are needed for longer translations. Images with baked-in text (event posters, report covers, pre-composed thumbnails) are not translatable.

## 6. Gaps and questions for the designer

**Missing designs**

- Team member profile page ("Read Profile" target), contact page or form ("Contact Us", "Send an Inquiry", "Request a Demo"), search, 404, legal pages, "OET's Handbook" and "More About…" targets.
- Open and selected states of filter dropdowns and the sort control; hover and focus states; empty states (no results, no open roles, no upcoming events).
- Pagination on desktop (present on mobile listings only).
- Tablet breakpoint; controls on some carousels.
- An in-progress project example; nav dropdowns and mobile menu are drawn only on the Home canvas.
- `TeamGlobe`: no spec beyond a CodePen link.

**Inconsistencies**

- Mobile menu has a "Solutions" group that desktop lacks; the footer "Outputs" column differs from the nav dropdown.
- The publication detail example contradicts its own field spec (sidebar contents).
- The System Operators service page lacks the "How We Work" block the other five have.
- Counts disagree: "7 Department" vs "8 Department"; "9 Continents" vs 7 listed; "3 Open Roles" vs 4 cards.
- Home on mobile drops the stats strip and stacks Build/Deploy/Scale instead of a carousel; news pages swap the CTA on mobile; some mobile copy is stale.
- Off-palette colours and stray fonts listed in section 3.

**Placeholder content**

- Hero slide 3 ("UVP Marketing Statement for Government Here"), project dates "MM/YYYY", "IMG-PLACEHOLDER" in approach steps, lorem in publications, dummy counts, repeated logos/people/posters, copy-paste errors on Services, news hero photo marked as placeholder.

**To confirm**

- Meaning of `*` in three page names (best reading: the template stands in for sibling types, or artwork/motion is not final).
- Whether Blogs, Policy Briefs and Reports are separate listings or filters of Publications.
- Whether project thumbnails are uploaded pre-composed (per the Thumbnail Maker Guide) or composed in code.
- URL structure.
