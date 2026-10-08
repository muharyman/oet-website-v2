# OET Figma handoff audit — catalogue A

File key `r1JkQxEVEQ86vGHZ2X2OE7`. Pages covered: Home (`133:532`), Outputs (`599:2`), Tools and Data (`657:17198`), Organization / News and Events (`659:27439`).

Method: `get_metadata` on the four pages (node tree, text-node names), full-resolution `get_screenshot` of every page frame listed in the brief, sliced and read. `get_design_context` was not used; all copy quoted below comes from text-node names in the metadata or from the screenshots. Where a text node is long, the metadata name is the full string, so quotes are reliable.

Not inspected in detail (seen only as part of a larger screenshot, or not at all): the six `img-service-*` asset frames (`173:13311`, `173:13319`, `173:13303`, `173:13327`, `173:13335`, `173:13343`), `footer-bg` `196:1406` (structure read from metadata only: two "glare" rectangles and two pixel-block groups, no text), the middle third of the Thumbnail Maker Guide (rows for Openmod meets USA, Ukraine against Darkness, Tauritron, Zambia, Kazakhstan, Stanford Training, Multi-Country, Hydropower Africa — labels read, images not viewed), hover states (none exist as frames).

Conventions: desktop frames are 1440 wide, mobile 412. Component names in `PascalCase` are my proposals and are used consistently in sections A–C.

---

## A. Per page frame

### A1. Home — desktop `162:686` (1440 x 6154)

Route: `/` (per locale). Label frame `196:2218` reads "Home Page / Preloader / Desktop" and spans three frames: preloader `162:1389`, hero pre-reveal `162:1330`, full page `162:686`.

| # | Node | What it shows | Component | Behaviour | CMS content |
|---|------|---------------|-----------|-----------|-------------|
| 0 | `162:1389` (separate frame) | Full-screen red preloader with centred white OET mark (`162:1393`) | `Preloader` | Shown before hero; implies an intro animation into state `162:1330` | None (static) |
| 0b | `162:1330` (separate frame) | Hero with image, nav, CTAs and "Next" thumbnail but no headline/copy yet (hero variant `1a`) | `HomeHero` state | Step 2 of the load animation: text reveals afterwards | — |
| 1 | `162:1326` | Top navigation, transparent over hero. In this frame the Services mega menu `249:30122` ("menu-services-b") is drawn open over the hero | `SiteHeader` + `ServicesMegaMenu` | Dropdowns per item, mega menu for Services, language switcher (globe), "Contact Us" button | Global navigation: 4 groups + children; services list (title, one-line description, icon); mega-menu image; "Learn More About Our Service" link + description |
| 2 | `227:19985` | Hero slider: headline "Mainstreaming Open Energy Models for a Global Sustainable Tomorrow", two boxed paragraphs, buttons "About Us" / "Explore Our Tools", bottom-right "Next" card with thumbnail of the next slide and its label ("OET for NGO"), progress bar under it | `HomeHero` | Auto-advancing slider with progress bar; "Next" card is clickable; 3 slides designed | Per slide: headline, 2 short paragraphs, background image, slide label (audience name, e.g. "OET for NGO", "OET for Business", "OET for Governance"), 2 CTAs (shared across slides in the design) |
| 3 | `163:10304` + `163:10319` | Tag "How We Help", heading "We envision a world where energy systems are sustainable and equitable for all.", two paragraphs, buttons "Theory of Change" / "About Us"; right: treated image with pixel blocks | `SplitIntro` (text + `BrandImage`) | None | Page-level: tag, heading, 2 paragraphs, 2 links, image |
| 4 | `163:10332` | Stat strip, 6 cells: 35 Projects, 25 Partners, 50+ Team Members, 40+ Countries, 19 Tools & Data, €0 Price per License; icon each | `StatStrip` / `StatItem` | None | Repeater: value, label, icon. Could be computed from collections (projects, partners, team, tools) or hand-entered — design does not say |
| 5 | `162:1211` + `173:13195` | Tag "Services", heading "Make open-source energy planning work for your organization"; left image, right 6-item numbered accordion (01 System Operators & Utilities … 06 Technology Developers & investors). Open item shows 2 paragraphs + "View Service" button; image changes per open item | `ServiceAccordion` | Accordion, single-open; image swaps with the open item | `services` collection: order number, title, 2 paragraphs, image, link to service page |
| 6 | `162:1274` + `162:1286` | Tag "Tools Support", heading "OET Supports a Broad Range of Modeling Platforms", two paragraphs, "See All Tools" button; row of 8 logos (PyPSA, PyPSA/atlite, Calliope, OSeMOSYS, linopy, GenX.jl, TIMES, OpenStreetMap) | `SectionHeader` + `LogoRow` | Button links to `/tools-and-data` | Page-level text; logo list (relation to tools or a simple logo repeater) |
| 7 | `173:13264` | Second `top-nav` instance pinned at the top of the red section | `SiteHeader` (sticky, on-colour state) | Implies the header is sticky and changes style over coloured sections | — |
| 8 | `188:1240` | Red full-bleed panel: tag "How We Help", heading "Build, Deploy, Scale"; card with sub-heading "Build", 2 paragraphs, footnote paragraph, image; vertical progress rail at right | `VerticalCarousel` | Scroll-driven (or auto) 3-step carousel; background darkens per step (red → dark red → maroon); rail shows position | Repeater of 3: title, lead paragraph, body paragraph, footnote, image |
| 9 | `162:1100` | 158px-tall frame between carousel and partners; appeared empty in the screenshot | (spacer — not inspected further) | — | — |
| 10 | `643:4619`, `643:4805`, `643:4818`, `643:4996` | Logo grid in 4 rows: "Our Trusted Partners" + 4 logos, row of 6 logos, "Our Global Networks and Affiliations" + 4 logos, row of 6 logos | `PartnerLogoGrid` | None shown | `partners` collection with a group/type field (trusted partner vs network/affiliation); logo, name, (link) |
| 11 | `643:4383` | Tag "Projects", heading "Helping governments, businesses, and the non-profit sector make better evidence-informed decisions.", prev/next arrows; horizontally scrolling `ProjectCard`s (3 visible, bleeding off the right edge) | `ProjectCarousel` + `ProjectCard` | Horizontal carousel, prev (disabled at start) / next | Page-level tag + heading; relation to `projects` (featured or latest) |
| 12 | `643:4463` | Footer: big "Energy Transition Starts Now.", email field showing `info@openenergytransition.org` + "Send an Inquiry" button; below: about blurb, © line, legal links, 4 link columns | `SiteFooter` (+ `InquiryBar`) | See gap list: unclear whether the email box is an input or a mailto link | Global: tagline, email, blurb, legal links, 4 nav columns |

### A2. Home — mobile `196:1458` (412 x 9930)

Same route. Sections: `196:2374` top-nav (logo, Contact Us, globe, hamburger), `196:2328` hero, `196:2435` vision intro, `196:2465` services + tools, `196:3238` "carousel-vertical-a", `196:3353` (spacer), `196:3653`/`196:3842`/`196:4031`/`196:4261`/`196:4402` partner logo rows, `196:4507` projects carousel, `645:3097` footer.

Differences beyond reflow:
- **No stat strip** — the `StatStrip` (desktop `163:10332`) is absent on mobile.
- **Hero**: the "Next" control becomes a text row ("Next … OET for NGO →") without thumbnail, above the CTAs; loader bar `196:2431`/`196:2433` sits under it.
- **Build / Deploy / Scale** is not a carousel: all three cards are stacked in one tall red block (`196:3243`, `196:3262`, `196:3281`), each text block followed by its image.
- **Tool logos**: 2 rows of 4 (`196:2487`, `196:2693`).
- **Partners**: one label cell "Our Trusted Partners" followed by 18 logos in a 4-column grid; the "Our Global Networks and Affiliations" label was not visible, and the logo set differs from desktop (adds Stanford, TransnetBW, OTH Regensburg, Ember, European Climate Foundation, eurima).
- **Projects carousel**: arrows move above the cards; one card + peek.
- **Footer**: stacked email + button, 2x2 link columns, legal links separated by "/" (desktop uses "|") and "Cookie Settings" (desktop "Cookies Settings").

### A3. Home — mobile menu states (label `196:2226` "Home Page / Menu / Mobile")

| Node | State |
|------|-------|
| `196:4655` | Menu open, root level, full red screen. Header shows close (X). Items: "Tools & Data" (no chevron), "Solutions" (chevron down), "Services" (chevron right), "Outputs" (chevron down), "Organization" (chevron down). Bottom bar `196:6492`: Legal, Privacy Statement, Disclaimer, Cookie Settings; © line |
| `196:6506` | "Solutions" expanded inline (`196:6557` "menu-solution-a"): Projects, Success Stories |
| `196:6578` | "Services" drill-down panel (`196:6646`): header "Services" + close, six services with icon + description, "Learn More About Our Service" row |

Component: `MobileMenu` (accordion for simple groups, drill-down panel for Services).

### A4. Home — component sets (section `173:13302`)

- `162:1395` hero-section — 7 variants, see B.
- `162:1708` top-nav — 7 variants, see B.
- `173:12612` menu-service-section — 6 variants (`ServiceAccordion` with item 01…06 open).
- `188:1235` carousel-vertical — 3 variants a/b/c.
- `196:1406` footer-bg — background art for the footer (glares + pixel blocks), no content.

### A5. Success Stories listing — desktop `643:9903`, mobile `643:10556`

Route: `/outputs/success-stories` (footer also lists "Completed Success Stories" and "Ongoing Success Stories", suggesting `?status=` or sub-routes). Labels: `643:9886` "Success Stories", `643:9892` "Success Stories [Mobile]". Frame `643:11939` to the left is the red preloader again.

| # | Node | What it shows | Component | Behaviour | CMS content |
|---|------|---------------|-----------|-----------|-------------|
| 1 | `643:10554` | Header | `SiteHeader` | — | — |
| 2 | `645:1319` | Dark-red hero with map-line artwork, pixel blocks, title "Driving The Energy Transition With Open-Source & Open Data", one outlined button "Success Stories" | `PageHero` | Button looks like an anchor to the list | Page-level: title, background image, 1..n anchor buttons |
| 3 | `645:1383` | "Success Stories" heading + description; status tabs "Completed" (active) / "In Progress"; filter bar: All Region, All Services, All Products, All Tags, Sort By: A to Z | `ListingHeader` + `SegmentedTabs` + `FilterBar` | Tabs filter by status; 4 dropdown filters + sort toggle | Page-level title/description; filter options from taxonomies (regions, services, products/tools, tags) |
| 4 | `645:1416`, `645:1486`, `645:1552`, `645:1609` | 3-column grid of `ProjectCard` (11 visible) | `ProjectCard` | "View Project →" link; optional partner link in card footer | `projects` items |
| 5 | `645:1397` | "Partners & Clients Testimonials" + sub-line; one testimonial: red quote panel (pull quote, name, role/company, portrait, company logo) + long text panel; 3-segment progress bar `645:1412` | `TestimonialSlider` | Slider with segmented progress (3 items); no arrows drawn | `testimonials`: pull quote, full text, person name, title, photo, company logo |
| 6 | `645:1329` | Footer | `SiteFooter` | — | — |

Mobile differences: filter controls wrap into 3 rows; **pagination** (`« ‹ 1 2 … 10 › »`) appears both above and below the card list — desktop has no pagination at all; only 6 cards are shown; testimonial stacks quote panel over text panel.

### A6. Publications listing — desktop `645:14357`, mobile `645:14863`

Route: `/outputs/publications` (nav dropdown lists Publications, Blogs, Policy Briefs, Reports separately; footer lists "Academic Publication", "Blogs", "Policy Briefs", "Reports" — likely the same page with a type filter). Labels `645:13826` "Publications", `645:13828` "Publications [Mobile]". `645:13831` is the preloader frame.

| # | Node | What it shows | Component | Behaviour | CMS content |
|---|------|---------------|-----------|-----------|-------------|
| 1 | `645:14774` | Header | `SiteHeader` | — | — |
| 2 | `645:14553` | Maroon hero, title "Explore Our Publication from Academic Works to Thought Leadership.", 4 joined outlined buttons: Academic Publications, Blogs, Policy Briefs, Reports | `PageHero` (multi-button) | Buttons pre-select the type tab below | Page-level title, image; buttons derived from publication types |
| 3 | `645:14412` | "Our Publications"; type tabs Show All (active) / Academic Publication / Blogs / Policy Briefs / Reports; same filter bar as Success Stories | `ListingHeader` + `SegmentedTabs` + `FilterBar` | Type tabs + filters + sort | Publication type taxonomy; regions/services/products/tags |
| 4 | `645:14568`, `645:14640`, `645:14707` | 3-column grid of image cards (8 visible): title, excerpt (or "Published in: …" citation line), date **or** the word "Preprint", "Read →", dark-framed image, footer line with type and category ("Academic Publications", "Blog | Category List Here", "Blog | Case Study", "Reports") | `PublicationCard` (image variant) | "Read →" | `publications` items |
| 5 | `645:14427` | Heading "Outputs" + "Read our Outputs out there on the socials lorem ipsum dolor sit amet" | `SectionHeader` | — | Page-level (placeholder copy) |
| 6 | `645:14431`, `645:14471`, `645:14511` | 3-column grid of the same card **without image** (8 visible) | `PublicationCard` (text-only variant) | "Read →" — destination unclear (external posts?) | Unclear whether this is a second collection (external/social outputs) or publications lacking a thumbnail |
| 7 | `645:14358` | Footer | `SiteFooter` | — | — |

Mobile differences: pagination above the first list and below both lists (two independent paginators); first list shows 5 cards, second 2; hero buttons wrap 2+2.

### A7. Success Story / Project detail — desktop `645:3668`, mobile `645:11996` (confirmed)

Route: `/outputs/success-stories/[slug]` (frame is named "projects-detail"; label `645:3160` says "Success Stories / Details"; mobile label `645:12354` "Success Stories/Details [Mobile]"; the mobile frame is misnamed "home-page-mobile").

| # | Node | What it shows | Component | Behaviour | CMS content |
|---|------|---------------|-----------|-----------|-------------|
| 1 | `645:4052` | Header over red band | `SiteHeader` | — | — |
| 2 | `645:4005` (`645:4006` title-group, `645:4031` title-details) | Title ("E-fuels in Australia Title Maximum of 3 Lines Lorem Ipsum"); "Highlights" bullet list; "Tools" list (PyPSA, Openmod-tracker, Detect-Infra); "Service" list (SoftwareDevelopment, Open-source migration, Train and support); meta rows: date "May 1, 2026 to May 1, 2026" + status chip "Completed"; region "Australia/Oceania"; tags "#SoftwareDevelopment #Tags" | `DetailHeader` (project variant) + `MetaRow` | Tool/service names are presumably links | Per item: title, highlights[], tools (relation), services (relation), start/end date, status, region, tags |
| 3 | `645:3671` | Large hero image built from the thumbnail recipe (photo, isolated object, pixel blocks, grain) | `DetailHeroImage` | — | Per item: hero image (see Thumbnail Maker Guide) |
| 4 | `645:3739`, `645:3742` | Rich text: H2 + paragraphs, "Project Aims" | `RichText` ("body-text-format") | — | Per item: body (spec frame says markdown) |
| 5 | `645:3745` | Three link lists: Tools (Openmod-tracker, Power Net Zero, Open Energy Benchmark), Data (Dataset A greyed/disabled, Dataset B), Links (Repository, "Interact With The Model…") | `LinkListGroup` / `LinkListItem` | Each row is a link with arrow; a disabled/grey state exists ("Dataset A") | Per item: 3 repeaters of {label, url}; tools may be relations to `tools` |
| 6 | `645:3765` + `645:3767` | "Partners & Clients Testimonials": single testimonial, compact layout | `TestimonialCard` | Single (no slider) | Per item: testimonial (quote, name, photo, logo, title, content) |
| 7 | `645:3778` + `645:3780` | "Related Projects": horizontal row of `ProjectCard`s bleeding off the right edge | `ProjectCarousel` | Horizontal scroll; no arrows drawn | Relation: related projects |
| 8 | `645:3990` (`645:3991`, `677:67727`) | Sidebar: "Contact" — photo, role label "Project Lead", name, job title, 3 small icons (profile, GitHub, LinkedIn); "Partners" — 6 partner logos in a 3-column grid | `ContactPersonCard`, `PartnerLogoList` | Icons link out | Relation to team member + role label; relation to partners |
| 9 | `645:3870` (`645:3871`, `645:3879`) | CTA band: left "Discuss a Technology Modelling Need" + primary paragraph + secondary paragraph + buttons "Contact Us" / "Request a Demo"; right an overlapping `ServiceCtaCard` ("Consultancies and Engineering Firms", 2 paragraphs, "Explore services for …" link, isometric illustration) | `ServiceCtaBand` + `ServiceCtaCard` | Two buttons; card links to the service page | CTA copy (global or per item — spec names it `project-service-cta-content`); relation to one service (`project-service-cta-related`) |
| 10 | `645:4053` | Second header instance at the top of the footer (all-outline, "Contact Us" not filled) | `SiteHeader` (footer/on-red state) | Suggests a sticky header that restyles over the footer | — |
| 11 | `645:3684` | Footer | `SiteFooter` | — | — |

Mobile differences: order becomes header block → hero image → **Contact + Partners (sidebar moves above the body)** → body → link lists → testimonial → related (horizontal scroll) → CTA (text block then service card) → footer. Title placeholder reads "E-fuels in Australia Title Lines Responsive to width". Link "Interact With The Model (Streamlit)" is fully visible on mobile but truncated on desktop.

### A8. Publication detail — desktop `647:2023`, mobile `647:5794` (confirmed)

Route: `/outputs/publications/[slug]` (also the template for blogs / policy briefs / reports as far as the design shows). Labels `647:1383` "Publications / Details", `647:5792` "Publications/Details [Mobile]".

| # | Node | What it shows | Component | Behaviour | CMS content |
|---|------|---------------|-----------|-----------|-------------|
| 1 | `647:2370` | Header over maroon band | `SiteHeader` | — | — |
| 2 | `647:2327` (`647:2328`, `647:2345`) | Title; "Highlights" as a paragraph (quote); "Authors" list (2 names); meta rows: single date "May 1, 2026", region, tags | `DetailHeader` (publication variant) | — | title, highlights, authors, publish date, region, tags |
| 3 | `647:2362` | Hero image | `DetailHeroImage` | — | hero image |
| 4 | `647:2079` … `647:2113` | Rich text with inline links, H2 sections, bullet lists, an inline full-width image | `RichText` | Headings feed the table of contents | body |
| 5 | `647:2082` | "Outputs": 2x2 grid of stat cells (3 Policy Recommendations in the Light Report, 40+ Meetings…, 5 Stakeholder Workshops, 6 Events Presenting the Findings), icon each | `StatGrid` / `StatItem` | — | repeater: value (`output-x-content`), label, icon; spec shows up to 6 (a–f) |
| 6 | `647:2117` | Link lists: Resources (Case Study PDF, Slides), Links (4), Journal & DOI (journal citation, "DOI: https://doi.org/10.…") | `LinkListGroup` | Links / downloads | repeaters of {label, url/file}; journal citation + DOI |
| 7 | `647:2138` + `647:2140` | "Related Publications": one `PublicationCard` (image variant) | `PublicationCard` | — | relation: related publications |
| 8 | `647:2295` (`647:2296`, `647:2313`, `647:2320`) | Sidebar: "Authors" (3 rows: photo, name "2 Line Max", title "1 Line Maximum"); "Table of Contents" (4 entries, first active in red); buttons Share / Cite / Save as PDF | `AuthorList`, `TableOfContents`, `ShareBar` | TOC scroll-spy with active state; Share, Cite and PDF export actions | authors (relation to team or free-text people); TOC generated from headings; citation text |
| 9 | `647:2168` | CTA band with `ServiceCtaCard` "System Operators and Utilities" | `ServiceCtaBand` | — | as A7 |
| 10 | `647:2024` | Footer | `SiteFooter` | — | — |

Mobile differences: sidebar (Authors, TOC, Share/Cite/Save) moves between hero image and body; stat grid becomes one column; link lists stack.

### A9. Field-spec frames `643:7951` and `647:1128` ("project-post-metadata")

These are annotated copies of the two detail templates where every piece of content is replaced by its intended field name. They are the designer's data contract and are not routes.

`643:7951` (project): `project-title [Maximum 90 Character]`; Highlights: 4 x `project-short-resume [Maximum 240 Character]`; Tools: `tools-used-a/b/c`; Service: `relate-service-a/b/c`; `project-start` to `project-end`, `project-status`; `project-region`; `#project-tags` (many, overflow clipped); `project-hero-image`; `project-content-markdown-format`; Tools list `project-tool-link-x` + `project-tool-label-x`; Data list `project-data-link-x` + `project-data-label-x`; Links list `project-link-link-x` + `project-link-label-x`; Contact: `project-contact-role`, `team-profile-fetch-data-name`, `team-profile-fetch-data-title` (i.e. fetched from the team collection); Partners: `partner-logo-a/b/c`; testimonial: `project-testimony-quote`, `project-testimony-name`, `project-testimony-photo`, `project-testimony-logo`, `project-testimony-title`, `project-testimony-content [Maximum 720 Character]`; Related Projects: `project-related-fetch-link-a/b/c`; `project-thumbnail-image` (card `643:8111`, with partner logo tag); `project-service-cta-content` (CTA-Headline-Content-Text, CTA-Bodytext-Primary-Content-Text, CTA-Bodytext-Secondary-Content-Text) and `project-service-cta-related`.

`647:1128` (publication): same title/highlights fields; Authors `author-name-a…e`; `publish-date`; `project-region`; `#project-tags`; `project-hero-image`; `project-content-markdown-format`; Outputs grid `output-a…f-content` / `-label` / `-icon`; the same Tools / Data / Links lists; testimonial block; "Related Publication": `publication-related-fetch-link-a/b/c`; Contact sidebar (same team fetch); `project-thumbnail-image`; same CTA pair.

### A10. Outputs — local components section `643:9882`

Heading text `645:11419` "project-service-cta-related". Six frames named `card-project`, one per service audience: `645:4959` System Operators and Utilities, `645:11090` Regulators and Public Authorities, `645:11421` Consultancies and Engineering Firms, `645:11537` Foundations and Development Partners, `645:11741` Think Tanks, NGOs and Research Orgs., `645:11848` Technology Developers and Investors. Each: icon tile (shade of red differs per card), title, 2 paragraphs, "Explore services for <name> →" link, isometric line illustration on red. These are the six possible values of the `ServiceCtaCard` shown at the bottom of detail pages — content comes from the `services` collection.

### A11. Thumbnail Maker Guide — section `648:9363`

What it is: an art-direction guide for whoever produces the project images, not a UI component set. It defines how the card thumbnail (`thumbnail-card`, ~407 x 258) and the detail hero (`thumbnail-project-header`, 1280 x 712) are composed, and it supplies finished pairs for existing projects.

Top block (label `648:9906` "Variants / Arranged by Availability and Priority of Choice") — five recipes in priority order, each shown as result + "composed of:" layers:
1. `648:9919` "Documentation Photo of/related to the Project" — brand-colour frame + documentation photo + texture and colour grading + "partner-logo-tag* optional, if available" (`648:10158` shows Stanford and Google tags).
2. `648:9924` "Data Visualization of/related to the Project" — brand-colour frame "+ image with blend mode* oprional" [sic] + chart on plain background.
3. `648:9927` "Photo as Illustration of the Project" — brand-colour frame + stock photo background + object isolation (centrepiece) with greyscale background + "OET energy trail" pixel blocks overlapping the centrepiece + texture and colour grading.
4. `648:9930` "Collage as Illustration of the Project" — brand-colour frame + collage assets + OET colour blocks and energy trail + texture and colour grading.
5. `648:9933` "Stock Photo reflective of the Project's topic" — brand-colour frame + stock photo + texture and colour grading.

Lower block: 18 labelled pairs "Success Stories *Completed* : <project>" each with a `thumbnail-card` and a `thumbnail-project-header`: E-fuels in Australia (`677:67327`/`677:67342`), Coal-exit modelling in Jharkhand, India (`682:68031`/`682:68045`), Google Guarantee of Origin Study (`677:67370`/`677:67384`), Sustainable Hydrogen and Power-to-X ramp-up in Africa (`682:68081`/`682:68096`), Wallonia Energy Plan (`677:67683`/`677:67694`), Flattening the Energy Curve (`683:68159`/`683:68177`), Multi-Country Electricity Transition… (`677:67808`/`677:67824`), Exclusive Stanford University Training (`684:68217`/`684:68228`), Project Tauritron (`677:67882`/`677:67873`), Openmod meets USA 2023 (`684:68274`/`684:68264`), Energy System Chef Zambia (`677:67917`/`677:67926`), Ukraine against Darkness (`684:68293`/`684:68306`), Energy Transition Kazakhstan (`678:67958`/`678:67971`), Advancing Hydropower Integration in Africa with PyPSA (`684:68356`/`684:68367`), Grid modelling to assess electrofuels supply potential (`684:68385`/`684:68403`), The Role of Energy Storage in Germany (`684:68455`/`684:68475`), Comprehensive PyPSA Training Session (`684:68504`/`684:68524`). Loose partner-logo images sit next to some pairs (eurima / ICA / ECF `683:68146`–`683:68152`, Agora `678:67988`, icct `684:68446`).

Implication for build: the frame, grain and pixel blocks are baked into exported images, so the CMS stores two finished images per project (thumbnail + header). The only part that is overlaid in code is the optional partner logo tag in the card's top-left corner (black tab with white logo), and possibly the coloured frame if the team prefers to do it in CSS. All 18 samples are "Completed"; no in-progress example exists.

### A12. Tools and Data — desktop `657:26425`, mobile `657:22947`

Route: `/tools-and-data` (nav children Our Tools, Models, Data, Open-Source Solver, Community map to the category tabs). Labels `657:20840` "tools-and-data", `657:20842` "tools-and-data [Mobile]". `657:23950` is the preloader frame.

| # | Node | What it shows | Component | Behaviour | CMS content |
|---|------|---------------|-----------|-----------|-------------|
| 1 | `657:26933` | Header | `SiteHeader` | — | — |
| 2 | `657:26921` | Near-black hero with red grid-map artwork; eyebrow "Tools & Data" (`657:26928`), title "Range of Open Models, Open-Source Software, and Open Data.", button "Tools & Data" | `PageHero` (with eyebrow) | — | eyebrow, title, image, button |
| 3 | `657:26480` | Heading "Tools and Data Supported or Built by Us", two paragraphs; full-width tab bar `657:26487`: Show All (active), Tools, Model, Data, Open Source Solvers, Community | `SplitIntro` (text only) + `SegmentedTabs` (full-width variant) | Category filter | Page-level text; tool category taxonomy |
| 4 | `657:26513` | Row "Tools": 3 cards | `ToolCard` | Rows are grouped per category with a divider line between groups | `tools` items |
| 5 | `657:26688` | Row "Model": 4 cards (PyPSA, PyPSA-Earth, PyPSA-Eur, Open-TYNDP) | `ToolCard` | | |
| 6 | `657:26745`, `657:26802`, `657:26859` | "Data": 4 + 4 + 1 cards | `ToolCard` | | |
| 7 | `657:26571` | "Open-source solvers": 3 cards | `ToolCard` | | |
| 8 | `657:26629` | "Community": 2 cards | `ToolCard` | | |
| 9 | `657:26494` | CTA band: "Discuss a Technology Modelling Need", one paragraph, "Contact Us" / "Request a Demo", collage image (`collage-thermalpower`) breaking out of the top edge | `CtaBand` (collage variant) | — | title, text, 2 buttons, collage image |
| 10 | `657:26426` | Footer | `SiteFooter` | — | — |

`ToolCard` content (e.g. `657:26514`): category tab (colour differs by category: Tools red, Model dark red, Data charcoal, Open-source solvers grey, Community maroon), name, description that starts with a role prefix ("Maintainer | …", "Co-maintainer | …", "Maintainers | …", or none), "Source Code" link, two icon links (globe = website, GitHub).

Mobile differences: single-column cards with **no category grouping/dividers**; **pagination** above and below the list (absent on desktop); tabs wrap to 2 rows; CTA text sits above the collage. Only 11 cards shown.

### A13. News and Events listing — desktop `659:38515`, mobile `659:34941`

Route: `/organization/news-and-events` (nav: Organization → News & Events). Labels `659:32834` "organization-newsevent", `659:32836` "organization-newsevent [Mobile]" (the mobile frame itself is misnamed "success-stories-mobile"). `659:35944` is the preloader frame.

| # | Node | What it shows | Component | Behaviour | CMS content |
|---|------|---------------|-----------|-----------|-------------|
| 1 | `659:38746` | Header | `SiteHeader` | — | — |
| 2 | `659:38533` | Photo hero (people at an event, red grading), title "News and Events from Community Meetups to Industry Forums", button "News & Events" | `PageHero` | — | title, image, button. Designer note `674:67312`: "*placeholder, need HD photos of OET'ers in event space" |
| 3 | `659:38516` | "News and Events" + description; left tabs: All Events (active) / Highlighted Events / Upcoming Events; right: type chips Show All (active) / Webinars / Events / Support Meetups / Open Calls + "Sort By: A to Z" | `ListingHeader` + 2 x `SegmentedTabs` + sort | Two independent filters (state, type) + sort | description; event type taxonomy |
| 4 | `659:38556`, `659:38605` | 3-column grid, 5 cards visible: 2 "Upcoming", 3 "Highlighted" | `EventCard` | Upcoming → "Register →"; Highlighted → "View Event Recap →" | `events` items |
| 5 | `659:38658` | Red CTA band "Book OET for Support Sessions", bold lead + paragraph, "Sign Up for a Call" / "Request a Demo", wind-turbine collage (`collage-wind`) | `CtaBand` (collage, red) | — | title, lead, text, 2 buttons, image |
| 6 | `659:38672` | Light-grey CTA band "Monthly Updates Open Call", bold lead + paragraph, single outlined button "New Updates Every 7th of The Month", collage (`collage-thermalpower`) | `CtaBand` (collage, light) | Button target unknown | title, lead, text, 1 button, image |
| 7 | `659:38691` | Footer | `SiteFooter` | — | — |

`EventCard` content (`659:38557` upcoming, `659:38589` highlighted): status tab ("Upcoming" red / "Highlighted" near-black), date "3 December 2026", title, excerpt (3-line clamp), "Registration Closed at : 1 October 2026" (upcoming only; the highlighted node still contains this text node `659:38599` but it is not visible), CTA, poster image. The second card (`659:38573`) shows a poster with a different aspect ratio letterboxed with dark bars — i.e. posters are fitted, not cropped.

Mobile differences: pagination above and below the list; the red CTA is a **different block**: "Discuss a Technology Modelling Need" with "Contact Us" / "Request a Demo" over the wind collage (`660:39094`) instead of "Book OET for Support Sessions"; "Monthly Updates Open Call" (`660:39178`) is unchanged.

### A14. Event detail, upcoming — desktop `660:39226`, spec `660:39443`, mobile `659:35192`

Route: `/organization/news-and-events/[slug]` for an event whose date is in the future. Label `659:32842` "organization-newsevent-upcoming"; mobile label `659:32844` is wrong ("Success Stories/Details [Mobile]", copy-paste) and the frame is misnamed "home-page-mobile".

| # | Node | What it shows | Component | Behaviour | CMS content |
|---|------|---------------|-----------|-----------|-------------|
| 1 | `660:39373` | Header in **light** state (white bar, red logo) over a pale pink gradient | `SiteHeader` (light) | — | — |
| 2 | `660:39229` | Title (black on white), brief paragraph, meta rows: "Published November 2, 2025, 1:07 Pm CET", "Online" | `DetailHeader` (event variant, light) | — | `event-title`, `event-description-brief`, `event-post-date`, `event-location-region` |
| 3 | `660:39279` | Event poster, left column, 847 wide | `EventPoster` | Spec: "fill and scale to width, hug to height" | `event-poster-img` |
| 4 | `660:39248` | "Event Details" card: title, date "DAY, DD/MM/YYYY", location text + map-pin link, time "HH:MM - HH:MM (MMM Min)"; "Contributors" (photo, name, title) x2; buttons "Mark Calendar" (outline) / "Join Event →" (filled) | `EventDetailsCard` + `PersonRow` | Spec: Mark Calendar = "link mark google calendar"; Join Event = "registration/contact link"; pin = Google Maps link | `event-date`, `event-location-address`, `event-location-google-maps-link`, `event-start-time`, `event-end-time`, "event time-count (minutes)" (derived), contributors (`event-contributor-name-x`, `event-contributor-title-x`, photo), calendar link, join link |
| 5 | `660:39369` | "About Event" + rich text | `RichText` | — | `event-description-full` |
| 6 | `660:39281`, `660:39295` | The two CTA bands from the listing | `CtaBand` x2 | — | shared/global |
| 7 | `660:39314` | Footer | `SiteFooter` | — | — |

Mobile differences: order is header → poster → Event Details card (full width, buttons below) → About Event → CTAs; again the red CTA is "Discuss a Technology Modelling Need" (`660:39771`) rather than "Book OET for Support Sessions". The mobile Event Details card still contains spec placeholder text ("event-title lorem ipsum dolor sit amet", "event-date DAY, DD/MM/YYYY", "(link mark google calendar)").

### A15. Event detail, highlighted (past event recap) — desktop `659:38112`, spec `660:39823`, mobile `660:39885`

Same route, state for a past event flagged as highlight. Label `660:39819` "organization-newsevent-highlighted"; mobile label `660:39821` wrong ("Success Stories/Details [Mobile]").

Differences from the upcoming state:
- `659:38169`: the main media slot shows a documentation photo/video with a red play button (`659:38171`, instance "Primary") instead of the poster. Spec: `event-documentation-media-highlight (can be photo or video)`.
- `659:38134`: Event Details card has 3 contributors, **no Mark Calendar / Join Event buttons**, and the poster (`event-poster-img`) is appended at the bottom of the card (spec `660:40138`).
- `659:38264`: extra section "Event Documentations" — gallery with one large image and 5 thumbnails, first selected (red tint/border). Spec `660:40164`: "Event Documentation: event-docs-file-a, event-docs-file-b*, event-docs-file-c*, etc — *optional". Heading is plural in the design, singular in the spec.
- Remaining sections identical (About Event `659:38261`, CTAs `659:38172`/`659:38186`, footer `659:38205`).

Component: `MediaGallery` (main image + thumbnail strip), `VideoPoster` (image with play button).

Mobile: header → media highlight (cropped; frame is 847 wide positioned at x -217) → Event Details card → poster → About Event → Event Documentations gallery → CTAs → footer.

### A16. News and Events — local components section `659:35956`

`674:67214` (1400 x 780) and `674:67244` (412 x 800): the desktop and mobile crops of the listing hero photo, both named "project-header". Note `674:67312`: "*placeholder, need HD photos of OET'ers in event space".

---

## B. Component catalogue

| Component | Variants / states (node ids) | Used in |
|-----------|-----------------------------|---------|
| `Preloader` | Single state: `162:1389` (home), `643:11939`, `645:13831`, `657:23950`, `659:35944` (identical red screen + logo) | Shown beside every top-level page → appears to be global page-load state |
| `SiteHeader` (top-nav set `162:1708`) | `162:1738` "State=Light, Menu=None" (transparent, white text — used over heroes); `162:1709` "State=Dark, Menu=None" (red logo, dark text, transparent); `643:6404` "State=Active, Menu=Service" (white bar + Services mega menu); `643:6852` named "State=Active, Menu=Service" but draws the **Outputs** dropdown (Success Stories, Publications, Blogs, Policy Briefs, Reports); `643:7280` named "Menu=Output" but draws the **Tools & Data** dropdown (Our Tools, Models, Data, Open-Source Solver, Community); `643:7354` named "Menu=Output" but draws the **Organization** dropdown (About Us, Department, Partner, Our Team, Career, News & Events, Theory of Change); `643:7490` named "Menu=Output" but draws the **language** dropdown (English, Spanish). Extra in-page states: on-red sticky `173:13264` (home), footer-overlap `645:4053` (outline Contact Us), light bar `660:39373` (event detail). Mobile bar: `196:2374` (closed), `196:6219` (open, X) | Every page |
| `ServicesMegaMenu` | Desktop `643:6404` / in-page `249:30122`; mobile drill-down `196:6646` | Header |
| `MobileMenu` | Root `196:4655`; accordion open `196:6506`; services panel `196:6578` | Mobile header |
| `HomeHero` (set `162:1395`) | `162:1543` 1a (image + CTAs only), `162:1396` 1b (text in, progress bar start), `162:1442` 1c (progress full); `162:1653` 2a, `162:1598` 2b, `162:1488` 2c (slide 2 "Better, Faster, & More Trusted Energy Decisions Globally."); `179:884` 3c (slide 3 "UVP Marketing Statement for Government Here" — placeholder). a/b/c are animation stages of one slide; there is no 3a/3b. Mobile: `196:2328` | Home |
| `PageHero` | Single button: `645:1319` (success stories), `659:38533` (news); multi-button: `645:14553` (publications, 4 buttons); with eyebrow: `657:26921` (tools). Mobile: `645:2575`, `645:15237`, `658:27084`, `660:38860`. Pixel-block ornament position varies per page | All listing pages |
| `SplitIntro` | With image `163:10304` + `163:10319`; text-only two-paragraph `657:26480` | Home, Tools |
| `BrandImage` | Image + colour grading + pixel-block "energy trail" overlay (`163:10319`, service images `173:13311`…) | Home, accordion, carousel |
| `StatStrip` / `StatGrid` / `StatItem` | 6-across strip `163:10332`; 2-column grid `647:2082` | Home (desktop only), publication detail |
| `SectionHeader` (tag pill + heading + optional text + button) | `162:1211`, `162:1274`, `645:14427` | Home, Publications |
| `Tag` / pill | "How We Help", "Services", "Tools Support", "Projects" | Home |
| `Button` | Primary filled red with arrow; secondary outline; white-on-red; text link with arrow ("View Project →", "Read →", "Register →"); instances named "Primary" / "Secondary" (`660:39278`, `660:39277`) | Everywhere |
| `ServiceAccordion` (set `173:12612`) | Open item 01 `173:12610`, 02 `173:12611`, 03 `173:12613`, 04 `173:12720`, 05 `173:12826`, 06 `173:12932`; mobile `196:2580` | Home |
| `LogoRow` | `162:1286`; mobile `196:2487` + `196:2693` | Home |
| `VerticalCarousel` (set `188:1235`) | a `188:1232` (Build, red), b `188:1233` (Deploy, dark red), c `188:1234` (Scale, maroon); mobile stacked `196:3238` | Home |
| `PartnerLogoGrid` | Desktop `643:4619`–`643:4996`; mobile `196:3653`–`196:4402` | Home |
| `PartnerLogoList` (sidebar) | `677:67727` | Project detail |
| `ProjectCard` | With partner tag + partner link footer (`645:1417`: Eskom tag; "Google.com", "International Council on Clean Transportation" footers); without tag; frame colour varies (red / dark red / pink). Thumbnail-only reference `643:8111` | Home carousel `643:4383`, success stories grid, related projects `645:3780` |
| `ProjectCarousel` | With arrows `643:4383`; without arrows `645:3780` | Home, project detail |
| `PublicationCard` | Image variant `645:14569`; text-only variant `645:14432` | Publications listing, publication detail (related) |
| `ToolCard` | Category colour variants: Tools `657:26514`, Model `657:26689`, Data `657:26746`, Open-source solvers `657:26572`, Community `657:26630` | Tools and Data |
| `EventCard` | Upcoming `659:38557`; Highlighted `659:38589` | News and Events listing |
| `ListingHeader` | `645:1383`, `645:14412`, `659:38516` | Listings |
| `SegmentedTabs` | Compact left-aligned (`645:1387`, publications, news); full-width equal columns `657:26487` | Listings |
| `FilterBar` (dropdowns + sort) | Closed state only: All Region / All Services / All Products / All Tags / Sort By: A to Z | Success stories, publications; news has sort only |
| `Pagination` | `« ‹ 1 2 … 10 › »`, current page boxed — **mobile frames only** (`643:10556`, `645:14863`, `657:22947`, `659:34941`) | Listings (mobile) |
| `TestimonialSlider` / `TestimonialCard` | Wide slider with 3-segment progress `645:1397`; compact single `645:3767`; spec `643:7951` | Success stories, project detail, (publication spec) |
| `DetailHeader` + `MetaRow` | Project `645:4005` (red); publication `647:2327` (maroon); event `660:39229` / `659:38115` (light) | Detail pages |
| `DetailHeroImage` | `645:3671`, `647:2362` | Project / publication detail |
| `RichText` | "body-text-format" frames: headings, paragraphs, links, bullets, inline image | All detail pages |
| `LinkListGroup` / `LinkListItem` | Default (red outline, underlined label, arrow); disabled/grey ("Dataset A"); two-line label | Project `645:3745`, publication `647:2117` |
| `ContactPersonCard` / `PersonRow` / `AuthorList` | With role label + social icons `645:3991`; plain rows `647:2296`, `660:39264` | Detail pages |
| `TableOfContents` | `647:2313` (active item red) | Publication detail |
| `ShareBar` | Share / Cite / Save as PDF `647:2320` | Publication detail |
| `ServiceCtaBand` | Dark red `645:3870`; brighter red `647:2168`; spec `645:4816` | Project + publication detail |
| `ServiceCtaCard` | Six audiences `645:4959`, `645:11090`, `645:11421`, `645:11537`, `645:11741`, `645:11848` | Inside `ServiceCtaBand` |
| `CtaBand` (collage) | Red + thermal-power collage `657:26494`; red + wind collage `659:38658`; light grey `659:38672` | Tools, news listing, event details |
| `EventDetailsCard` | Upcoming with buttons `660:39248`; highlighted with poster, no buttons `659:38134` | Event detail |
| `EventPoster` | `660:39279` | Event detail (upcoming), inside card (highlighted) |
| `VideoPoster` | `659:38169` | Event detail (highlighted) |
| `MediaGallery` | `659:38264` | Event detail (highlighted) |
| `SiteFooter` | Desktop `643:4463` (and per-page copies); mobile `645:3097`; background art `196:1406` | Every page |

---

## C. Content model implied

### Collections

**projects** (success stories)
- title (max 90 chars, max 3 lines), slug
- short description / excerpt for cards (3-line clamp)
- highlights[] (up to 4 bullets, max 240 chars each)
- start date, end date (cards show `MM/YYYY - MM/YYYY`; detail shows full dates), status (Completed / In Progress)
- region (single; e.g. "Australia/Oceania"), tags[] (hashtag style)
- tools used → relation to `tools` (many)
- services → relation to `services` (many) — header list; plus one "CTA related service" → relation to `services` (one)
- products (filter "All Products" exists; not shown on the detail page — possibly the same as tools)
- hero image (1280 x 712), thumbnail image (~407 x 258, pre-composed per the Thumbnail Maker Guide), optional partner logo tag on the thumbnail
- body (markdown / rich text)
- tool links[], data links[], other links[] — each {label, url}, with a disabled state
- contact → relation to `team` + role label ("Project Lead")
- partners → relation to `partners` (many); card footer shows one partner name/link
- testimonial → relation to `testimonials` (or inline group)
- related projects → relation (many)
- CTA copy override (headline, primary text, secondary text) — spec names it per project

**publications** (academic publications, blogs, policy briefs, reports)
- title, slug, type (Academic Publication / Blog / Policy Brief / Report), category (e.g. "Case Study"; "Category List Here" placeholder implies a list)
- excerpt or citation line ("Published in: …")
- publish date, and a "Preprint" state shown in place of the date
- highlights (paragraph or bullets), authors (up to 5 in the header; relation to `team` and/or free-text external people with name, title, photo)
- region, tags, (services/products for the shared filter bar)
- hero image, thumbnail (optional — text-only card variant)
- body (markdown; headings feed the TOC)
- output stats[] (up to 6): value, label, icon
- resources[] (files), links[], journal citation, DOI
- tools / data / links lists, contact, testimonial (in spec only)
- related publications → relation (many)
- CTA related service → relation to `services`
- citation text (for "Cite"), PDF (for "Save as PDF") — implied by buttons, not specified

**events**
- title, slug, brief description, full description (rich text)
- post/published date-time with timezone, event date, start time, end time (duration derived)
- location region ("Online" or a place), location address, Google Maps link
- type (Webinar / Event / Support Meetup / Open Call)
- state: upcoming vs past is date-derived; `highlighted` flag
- registration close date, join/registration link, calendar link
- poster image (free aspect ratio)
- contributors[] → relation to `team` or free-text (name, title, photo)
- highlight media (photo or video), documentation gallery files[] (optional)

**tools** (tools and data)
- name, category (Tools / Model / Data / Open-source solvers / Community)
- OET role (Maintainer / Co-maintainer / Maintainers / none), description
- source code URL, website URL, GitHub URL
- logo (for the home logo row) — only 8 logos shown, so possibly a "featured" flag
- Note: "MapYourGrid" appears under both Data and Community, and "Open Energy Benchmark" under both Tools and Open-source solvers → category is many-to-many.

**services** (six audiences)
- order number, title (long form and short nav form differ slightly: "Consultancies & Engineering Firm" vs "…Firms"; "Think Tanks, NGOs and Research Orgs."), nav one-liner, 2 paragraphs, icon, accordion photo, isometric CTA illustration, colour shade, link to service page

**partners**: name, logo, URL, group (trusted partner / global network or affiliation)

**team**: name, job title, photo, profile/GitHub/LinkedIn links (referenced by projects, publications, events)

**testimonials**: pull quote, full text (max 720 chars), person name, title + company, photo, company logo; relation to project

### Taxonomies / filters
- region, service, product, tag (shared filter bar on success stories and publications)
- project status (Completed / In Progress)
- publication type (+ category)
- tool category
- event type; event state (All / Highlighted / Upcoming)
- sort (only "A to Z" shown)

### Globals / singletons
- Navigation (4 groups, children, services mega menu image and "Learn more" row), languages (English, Spanish shown)
- Footer (tagline, email, blurb, legal links, link columns, © line)
- Home page: hero slides[], intro, stats[], services section header, tools section, Build/Deploy/Scale steps[], partner section labels, projects section header
- Listing pages: hero (title, image, buttons), intro text
- CTA bands: "Discuss a Technology Modelling Need", "Book OET for Support Sessions", "Monthly Updates Open Call"

### Relations
projects ↔ tools, projects ↔ services, projects ↔ partners, projects → team (contact), projects → testimonials, projects ↔ projects (related); publications → team/authors, publications ↔ publications, publications → services; events → team (contributors); home → projects, partners, tools, services.

All text fields need translations (language switcher present); images with baked-in text (event posters, report covers) are not translatable.

---

## D. Gaps and questions

### Missing states and pages
1. **Pagination on desktop** — every listing has pagination on mobile and none on desktop. Desktop grids show 11 projects, 8 + 8 publications, 21 tools, 5 events. Needs a decision (paginate, load more, or show all).
2. **Filter dropdowns** — no open state for All Region / All Services / All Products / All Tags, no selected state, no multi-select indication, no "clear filters". "Sort By: A to Z" has no alternative shown (Z to A? date?), odd as the only sort for dated content.
3. **Empty states** — no "no results" for any filtered list, no empty In Progress tab.
4. **"In Progress" projects** — no card or detail example; all 18 guide samples and the detail page are "Completed". Unknown what an open-ended date range looks like.
5. **Search** — no search UI or results page anywhere in these four pages.
6. **404 / error pages** — not present in these pages.
7. **Forms** — "Contact Us", "Request a Demo", "Sign Up for a Call", "Send an Inquiry", "Join Event", "Register" have no destination frames here. The footer email box looks like an input but is pre-filled with OET's own address: is it a mailto link or a field?
8. **Hover / focus / pressed states** — none designed for cards, buttons, links, tabs or nav items (only the nav "Active" state).
9. **Home hero slide 3** has only the final stage (`179:884`) and placeholder copy; no 3a/3b; slide body text of slide 3 duplicates slide 2.
10. **Services mega menu on mobile** exists, but Tools & Data, Outputs and Organization open states on mobile are not drawn (only "Solutions").
11. **Language switcher on mobile** — icon present, no open state.
12. **Publication detail extras** — Share, Cite and Save as PDF have no popover/modal states. TOC behaviour on mobile (static list) is not specified.
13. **Event detail** — no state for a past event that is not highlighted, no "registration closed" upcoming state on the detail page, no video player state.
14. **Testimonial slider** — no arrows or swipe hint; only 1 of 3 items drawn.
15. **Tools and Data** — no detail page for a tool; cards only link out.
16. **Service pages** — "View Service" and "Explore services for …" targets are outside these four Figma pages (not checked here).

### Inconsistencies
1. **Navigation structure**: mobile menu has a top-level "Solutions" (Projects, Success Stories) that does not exist on desktop; mobile "Tools & Data" has no chevron while desktop has a 5-item dropdown. Desktop Outputs dropdown (Success Stories, Publications, Blogs, Policy Briefs, Reports) differs from the footer Outputs column (Success Stories, Completed Success Stories, Ongoing Success Stories, Academic Publication, Blogs, Policy Briefs, Reports).
2. **top-nav variant names are wrong/duplicated**: two variants called "State=Active, Menu=Service" and three called "State=Active, Menu=Output" actually draw Services, Outputs, Tools & Data, Organization and Language menus.
3. **"Projects" vs "Success Stories"**: home section tag "Projects", stat "35 Projects", mobile menu lists both, frame named "projects-detail", label says "Success Stories / Details". Decide whether these are one collection.
4. **Status wording**: tabs "Completed / In Progress", footer "Completed / Ongoing Success Stories".
5. **Publication type wording**: "Academic Publications" (hero, card footer) vs "Academic Publication" (tab, footer) vs "Publications" (nav); "Blog" vs "Blogs".
6. **Mobile CTA differs from desktop** on News and Events listing and upcoming detail: mobile shows "Discuss a Technology Modelling Need / Contact Us" where desktop shows "Book OET for Support Sessions / Sign Up for a Call".
7. **Publication detail vs its spec**: the example (`647:2023`) has Authors + Table of Contents + Share bar in the sidebar and Resources / Links / Journal & DOI lists; the spec (`647:1128`) has a Contact sidebar, Tools / Data / Links lists and a testimonial. Neither is a superset.
8. **Highlights**: bullet list on project, plain paragraph on publication; spec shows bullets for both.
9. **Project card dates** `MM/YYYY - MM/YYYY` vs detail `May 1, 2026 to May 1, 2026`.
10. **Home partner grid**: desktop has two labelled groups with repeated logos (same six logos in both groups — placeholder); mobile shows one label and a different, larger logo set.
11. **Home stats strip missing on mobile.**
12. **Footer details**: "Cookies Settings" + "|" separators on desktop, "Cookie Settings" + "/" on mobile; desktop blurb on the left, mobile blurb below the link columns.
13. **Service names**: "Consultancies & Engineering Firm" (nav/footer) vs "Firms" (accordion, CTA card); "Technology Developers & investors" (accordion, lower-case i) vs "Investors"; "&" vs "and"; "Think Tanks, NGOs and Research Orgs." abbreviated in the CTA card.
14. **Event card**: the Highlighted card retains a hidden "Registration Closed at" node; the second upcoming card letterboxes its poster with dark bars while others fill.
15. **"Event Documentations"** (design) vs "Event Documentation" (spec).
16. **Mislabelled frames**: `645:11996`, `647:5794`, `659:35192` are named "home-page-mobile"; `659:34941` is named "success-stories-mobile"; labels `659:32844` and `660:39821` read "Success Stories/Details [Mobile]" above event-detail mobiles.
17. **CTA band reds** differ between project detail (`645:3870`, dark red) and publication detail (`647:2168`, brighter red) — may be intentional (matches each header colour) but is not stated.

### Placeholder / unfinished content
- Hero slide 3: "UVP Marketing Statement for Government Here".
- Project title: "E-fuels in Australia Title Maximum of 3 Lines Lorem Ipsum" / mobile "Title Lines Responsive to width".
- All project card dates are literally "MM/YYYY - MM/YYYY".
- Publications "Outputs" section: "Read our Outputs out there on the socials lorem ipsum dolor sit amet"; card footer "Blog | Category List Here"; the text-only list repeats the same two items.
- CTA secondary text: "or check the relevant services curated for you on your right* adjust secondary CTA here."
- Tags "#SoftwareDevelopment #Tags"; authors "Dr. Martha Maria Frysztacki Name Here 2 Line Max" / "Title in OET/Company Here 1 Line Maximum Lorem ipsum dolor"; publication detail H2 "Develops an open, PyPSA-Earth-based model for Australia" is copied from the project page.
- Partner logos on the project detail: the same Climact logo six times.
- Event details: "DAY, DD/MM/YYYY", "HH:MM - HH:MM (MMM Min)", "Location, Country, Address, Additional Location Detail Here No Maximum Line Lorem Ipsum Dolor Sit Amet"; event brief ends with "Lorem Ipsum Dolor Sit Amet"; About Event repeats a paragraph; all event cards reuse one poster (poster says "AUG 2026" while the card says 3 December 2026); gallery thumbnails are one image five times.
- News hero photo: "*placeholder, need HD photos of OET'ers in event space" (`674:67312`).
- Tool cards: several descriptions are duplicated ("We support model and data development…" for three services in the mega menu).
- Typos in design copy: "complexdemanding" (accordion item 01), "oprional" (guide), "1:07 Pm".

### What the `*` means
Inside the file an asterisk is the designer's footnote marker for something optional or still to be adjusted: "partner-logo-tag* optional, if available", "image with blend mode* oprional", "event-docs-file-b* … *optional", "curated for you on your right* adjust secondary CTA here", "*placeholder, need HD photos…". In the page name "Handoff: Outputs / Success Stories, Publication*" the most likely reading is therefore "Publication and its optional/derived sub-types" — i.e. the Publications template also stands in for Blogs, Policy Briefs and Reports, which have no frames of their own. It could instead flag the Publications part as not final (it carries the most placeholder content). The file does not define it; confirm with the designer.

### Questions for the designer / client
1. Are Blogs, Policy Briefs and Reports separate routes or filters of one Publications page? Do they share the publication detail template?
2. What is the text-only "Outputs" list on the Publications page — external posts, or publications without thumbnails?
3. Is "Products" in the filter bar the same taxonomy as Tools?
4. Should home stats be computed from the CMS or typed in?
5. Which sidebar is correct for publication detail (Contact vs Authors + TOC + Share)?
6. Is the CTA band content per item, per collection, or global? Which CTA is correct on mobile event pages?
7. Is the preloader shown on every page load or only on the first visit / home?
8. Is the sticky header restyling over red sections and the footer (`173:13264`, `645:4053`) intended behaviour?
9. Are thumbnail frames and pixel blocks always baked into images, or should the frame/tag be rendered in code?
