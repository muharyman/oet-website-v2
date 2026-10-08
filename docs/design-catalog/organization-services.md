# Catalog B — Organization (About, Departments, Partners, Team, Career, Theory of Change) and Services

Figma file `r1JkQxEVEQ86vGHZ2X2OE7`. Read-only audit. Sources: `get_metadata` on the four canvases (text-layer names give the copy) plus screenshots of the frames. Written incrementally; sections marked "not inspected" were not looked at.

Component names used throughout (defined in part B): `TopNav`, and the rest of the names listed in the table in part B.

---

# A. Per page frame

## A1. Canvas "Handoff: Organization / About Us, Depatrment" (`648:10168`)

Labels: `648:10425` "organization-about", `648:10427` "organization-about [Mobile]", `648:18728` "organization-department", `648:18730` "organization-department [Mobile]", `648:16541` "organization-department" (spanning the four sub-frames), `648:16259` "organization-department / Energy System Modeling", `648:16545` / `648:16551` / `648:16557` "Organization / Department" (generic, no department name), mobile labels `648:19295`, `648:20019`, `648:20287`, `648:20564` "[Mobile]".

### `648:13535` hero-section (1440x840) — loading / intro state
- Full-bleed red panel with only the white OET logo centred (`648:13539`), `top-nav` instance `648:13540` and `hero-section` instance `648:13538` underneath. Reads as the page-load splash / hero intro state before content animates in. Same frame exists on the other canvases (`650:21111`, `654:7144`, `662:43564`).
- Component: `LoadingSplash` (state of `PageHero`). Behaviour: intro animation on load (no spec text found on this canvas). CMS: none.

### `648:15307` about (desktop 1440x4876) — route `/organization/about` (label "organization-about")
1. `648:17767` top-nav — `TopNav`: logo, four dropdown items (Tools & Data, Services, Outputs, Organization), language/globe icon button, "Contact Us" button. Global content (navigation).
2. `648:15659` project-header (1400x780, inset 20px in a red frame) — `PageHero` variant "photo-centered": headline `648:15667` "Committed to Building Solutions For a Sustainable Global Future." centred over a team group photo with grain/colour-grading overlay, centred glass chip `648:15665` "About Us", decorative pixel blocks bottom right. CMS page-level: headline, chip label, hero image.
3. `648:15362` intro block — large statement "Our vision is to accelerate the energy transition…", two columns of body copy (`648:15365`, `648:15366`), stacked buttons `648:15367`: "Our Team" (primary, arrow), "Departments" (primary, arrow), "OET's Handbook" (secondary/outline). Component: `IntroStatement` + `ActionButton`. CMS page-level: statement, two rich-text columns, up to 3 links.
4. `648:15633` and `648:15644` — two staggered image cards to the right of the intro: image with filter, red rule, title + text ("Aim — We aim to make open source the standard in energy planning by 2030. Ambitious, yet possible." / "Offers — We offer energy transition studies, open-source platforms, and training and support. If you are interested a collaboration, please reach out to us." with outline button "Career"). Component: `ImageInfoCard` (optional CTA). CMS page-level repeater: image, title, text, optional link. Both cards use the same placeholder mountain image.
5. `648:15371` — `SectionHeading`: `Tag` "Departments" + heading "United by a Culture of Transparency & Collaboration".
6. `648:18525`, `648:18589` — 2x2 grid of `DepartmentCard` (`card-project`, 620x520): name, short lead paragraph, grey secondary paragraph, coloured square icon tile top right (colour differs per department: red, dark red, charcoal), head-of-department avatar + name + role, "View Department →" link, and a 620x258 framed image thumbnail at the bottom (`card-top`). Shows 4 of the departments: Energy System Modeling, Modeling Tools & Data, Software Engineering, Research and Market Development. CMS: `departments` collection (relation; page picks featured ones or shows first four).
7. `648:15440` — `SectionHeading`: `Tag` "Core Values", heading "At Open Energy Transition, We Have 6 Main Values That Guide Everything We Do.", subline "These serve as the foundation…"; then `648:15446` a single row of 6 `ValueCard`s: red illustrated thumbnail with line icon, small label (Transparency, Collaboration, Humility, Trust, Autonomy, Recognition), bold statement, body text. CMS: `values` collection or page-level repeater (label, statement, body, icon/thumbnail).
8. `648:15308` footer (1440x847) — `FooterCta` ("Energy Transition Starts Now.", email `info@openenergytransition.org` + "Send an Inquiry" button, glare and pixel decorations) and `SiteFooter` (blurb, copyright "© 2026 Open Energy Transition gGmbH", legal links Legal | Disclaimer | Privacy Statement | Cookies Settings, four link columns Tools & Data / Services / Outputs / Organization). Global.

### `648:16936` about mobile (412x9390, frame is mis-named "home-page-mobile")
Same sections in the same order (metadata): `648:17722` top-nav (logo, "Contact Us" button, language icon, burger icon — the four menu items collapse into a burger), `648:17877` hero (412x799, headline left-aligned at 371 wide), `648:17887` intro, `648:17915` / `648:17926` image cards (kept at 305 wide and offset left/right rather than full width), `648:17944` heading, `648:17950` department cards stacked — **four cards on mobile too** (`648:17951`, `648:17982`, `648:18021`, `648:18053`), `648:18097` values as 3 rows of 2 cards (186 wide each), `648:17664` footer (CTA button full width under the email; link columns stacked in `648:17680`). Not visually inspected at readable resolution; structure taken from metadata.

### `648:16265` about-department (desktop 1440x3582) — route `/organization/departments` (department index; label "organization-department")
1. `TopNav` (dark/transparent on dark hero).
2. `PageHero` variant "map-left": dark plum background with red network-map artwork, left-aligned title "The Departments of OET", lead text, and a `HeroStatBar` at bottom left: two icon tiles, count chip "7 Department", red button "Meet The Team →". Pixel blocks bottom right. CMS page-level: title, lead; count derived from collection; link to team page.
3. `SectionHeading`: `Tag` "Departments" + "United by a Culture of Transparency & Collaboration" (same as About).
4. Grid of 7 `DepartmentCard`s, 2 columns. First four (Energy System Modeling, Modeling Tools & Data, Software Engineering, Research and Market Development) have image thumbnail and "View Department →"; the last three (Finance — Andris Prindulis; People and Culture — Quintin Coetzee; Grid Data — Dr. Tobias Augspurger) have **no image and no "View Department" link** — i.e. a compact variant for departments without a detail page. Seventh card leaves an empty grid cell.
5. `FooterCta` + `SiteFooter`.

### `648:15690` about-department (desktop 1440x2906) — route `/organization/departments/energy-system-modeling` (label `648:16259` "organization-department / Energy System Modeling")
1. `TopNav`.
2. `PageHero` variant "map-left" in red: title "Energy System Modeling", lead paragraph, `HeroStatBar` ("12 People", "Meet The Team →"), and bottom right a `PersonBadge` (photo, "Dr. Martha Maria Frysztacki", "Head of Energy System Modeling, Co-Founder").
3. "About Department" — heading + two paragraphs of rich text, left column only (right half empty).
4. "Works" — heading, intro paragraph, `WorkTopicGrid`: 2-column bordered table of topic rows with an icon each (Integrated Energy Networks, Power-to-X, Integrated Energy Resource Planning, Modelling Uncertainty, Flexibility Assessments; last cell empty), closing sentence.
5. "Department Projects" — horizontally overflowing row of `ProjectCard`s (title, short description, "MM/YYYY – MM/YYYY" date range placeholder, "View Project →", framed image with optional partner logo chip such as Eskom / Stanford). Fourth card is cut off at the frame edge, implying a horizontal scroll / `CardCarousel`; no arrows or dots drawn.
6. `FooterCta` + `SiteFooter`.

### How the five `about-department` frames differ
They are **one index page plus four different departments** (not states). All four detail pages share one template; sections are optional per department.

| Desktop | Mobile | What it is | Hero colour / map art | Works section | Department Projects |
|---|---|---|---|---|---|
| `648:16265` | `648:18733` | Department index ("The Departments of OET", "7 Department") | dark plum, red network | n/a | n/a |
| `648:15690` | `648:19300` | Energy System Modeling (head: Dr. Martha Maria Frysztacki) | red | intro + `WorkTopicGrid` of 5 icon rows + closing line | 4 cards (overflow) |
| `648:15897` | `648:19806` | Modeling Tools & Data (head: Dr. Hazem Abdel-Khalek) | dark maroon | intro + 2 topic cells **with a description line each** + 3 paragraphs | 1 card |
| `648:16025` | `648:20154` | Software Engineering (head: Dr. Siddharth Krishna) | charcoal | 3 paragraphs only, no grid | 2 cards |
| `648:16167` | `648:20417` | Research and Market Development (head: Dr. Harry van der Weijde) | red | 3 paragraphs only | **section absent** (no projects) |

- The hero colour matches the department's icon-tile colour on its `DepartmentCard` (per-department accent colour).
- All four detail heroes say "12 People" — identical count on every department, so placeholder.
- Finance, People and Culture and Grid Data have index cards but no detail frames (and no "View Department" link on their cards).
- Mobile detail frames (metadata only, not viewed): same sections stacked; project cards are stacked in metadata order (ESM mobile `648:19300` has 4 project cards, the 3rd and 4th identical "Exploring the Geothermal Resource Potential in the U.S." = duplicated placeholder).

### Section `648:13547` "Sections, Assets and Local Components" (asset sheet, no labels)
- `project-header` = hero background artwork exports, not components with content:
  - `648:20805` (1400x780) and `648:20813` (412x799): the About photo hero background with the "About Us" chip, desktop and mobile.
  - `648:20799`, `648:20823`, `648:20793`, `648:20787` (1400x553): four crops of one map image (`quebec_grid_noctilux_glow…`) at different offsets, each with the pixel-block decoration — the hero backgrounds of the four department detail pages. Mobile crops `648:20845`, `648:20835`, `648:20843`, `648:20841` (412x676).
  - `648:20829` (1400x553) and `648:20821` (413x573): `portugal_grid_noctilux_glow…` crop — the department index hero background, desktop and mobile.
- `card-top` = thumbnail artwork:
  - `648:20848`, `648:20861`, `648:20875`, `648:20889` (620x258) and `648:20957`, `648:20970`, `648:20984`, `648:20998` (372x258): the four department card images in desktop and mobile sizes (photo + colour grading + pixel blocks inside a coloured frame).
  - `648:21012`, `648:21025`, `648:21038`, `648:21051`, `648:21064`, `648:21077` (213x144): the six core-value thumbnails, each a red tile with a 48px line icon (first is `fi-rs-vision`).
- Implication: hero and card artwork is delivered as flat composed images (map crop + decoration), so the CMS needs an image field per department (desktop and mobile crop) or the decoration must be rebuilt in CSS over a plain image.

---

## A2. Canvas "Handoff: Organization / Partners, Team, Career" (`650:21101`)

Labels: `650:21103` "organization-partners", `650:21105` "organization-partners [Mobile]", `650:21107` "organization-career", `650:21109` "organization-career [Mobile]", `651:28619` "organization-team", `651:28621` "organization-team [Mobile]". Designer note `654:3157` next to the team mobile frame: "Globe Component Reference [https://codepen.io/ohheychelsea/pen/vYOeOxX]".

### `650:21111` hero-section
`LoadingSplash`, same as `648:13535` (not re-screenshotted; identical name, size and structure in metadata).

### `650:26653` organization-partners (desktop 1440x2400) — route `/organization/partners`
1. `TopNav`.
2. `PageHero` variant "photo-left" (1400x553): photo of two hands, left-aligned headline "Partnerships and Funding Powers OET's Vision to Lasting Change for Communities Worldwide.", `HeroStatBar` with three icon+count chips: "9 Country", "99 Partners", "999 Funders" (placeholder numbers). No CTA button in this hero. CMS: headline, image; counts derived from the partners collection (or manual numbers).
3. Two-column body. Left: text column with statement "Our partners and funders expertise, and commitment enable us to accelerate the energy transition." + two paragraphs. Right: `FilterTabs` ("Show All" active / "Funders" / "Partners") above a `LogoGrid`, 4 columns x 6 rows of bordered logo cells (Agora Energiewende, icct, Sequoia Climate Foundation, Quadrature Climate Foundation, Stanford University, TransnetBW, OTH Regensburg, Ember — the same 8 logos repeated three times = placeholder). Behaviour: client-side filter by type. No link/hover state, no pagination or "load more" drawn. CMS: `partners` collection (name, logo, type funder/partner, presumably URL and country for the "9 Country" count).
4. `FooterCta` + `SiteFooter`.

### `650:26878` organization-partners-mobile (412x3628) — viewed
Same sections. Differences beyond reflow: nav collapses to logo + "Contact Us" + language + burger; hero stat chips wrap onto two rows; filter tabs sit under the text (not beside the grid); logo grid is 2 columns x 12 rows; `FooterCta` stacks the email above a full-width "Send an Inquiry" button; `SiteFooter` re-orders — link columns first in a 2x2 bordered grid, then blurb, then legal links (separator changes from "|" to "/", and "Cookies Settings" becomes "Cookie Settings"), then copyright.

### `650:27431` organization-career (desktop 1440x3647) — route `/organization/career`
1. `TopNav`.
2. `PageHero` variant "photo-left": staircase photo, title "Work With Us", two lead paragraphs, `HeroStatBar` with one icon tile, "3 Open Roles" count and red button "Explore Opportunities" with a down arrow (anchor scroll to the roles list). The count says 3 but 4 cards are listed below.
3. `SectionHeading`: `Tag` "Open Roles" + "Currently Open Roles" + three columns of helper text (contact `careers@openenergytransition.org` as link; remote policy; apply note).
4. Grid of `JobCard`s, 3 columns (4 cards, so the second row has one): title, location line with pin icon (e.g. "Southern Africa, Eastern Europe"), language line ("English", "English, German"), work mode ("Fully Remote") and employment type ("Full-Time") side by side, "See Job Board →" link, and a department-themed thumbnail (`JobThumbnail`). Cards shown: "Business Operations Manager at IT & Climate NGO", "Finance Manager at Climate Software NGO", "Head of Finance and Operations at IT/ Energy Nonprofit", "Proactive Application: Energy System Modeler". Data: jobs (the current site reads the Greenhouse board API): title, locations, languages, work mode, employment type, department (drives the thumbnail), external job-board URL. No job detail page is designed — cards link out.
5. "Our Hiring Process": left text (heading + three paragraphs), right `NumberedStepList` — 10 bordered rows, each with number (01–10), text and a line icon. CMS: page-level repeater (text, icon).
6. `FooterCta` + `SiteFooter`.

### `650:21852` organization-career-mobile (412x6111) — metadata only, not viewed
Same order: hero `650:21860` / `650:27924` (two overlapping `project-header` layers), heading block `650:21853`, four stacked job cards `650:27963`, `650:27998`, `650:28033`, `650:28093` (372x459), hiring process `650:28141` (text, then step list `650:28151`), footer `650:22034`.

### `650:24621` organization-team (desktop 1440x4651) — route `/organization/team`
1. `TopNav`.
2. `PageHero` variant "photo-left" `650:25951`: blurred video-call photo, headline "Built on a Culture of Transparency, Collaboration, & Trust.", lead paragraph, `HeroStatBar`: "9 Continents", "50+ Experts", "8 Department".
3. `650:24677` `SectionHeading`: `Tag` "Team", "A Fully remote team of 50+ people across 21 countries", lead text, buttons "Work With Us →" (primary) and "Explore Departments" (outline).
4. `650:24685` `TeamGlobe` — half-globe map with country outlines; one country highlighted in red with a glow (USA); small red pin chips with a people icon and count ("12") on other countries; an open `GlobeCountryCard` over the highlighted country (photo, country chip "USA", "12 OET Teammates"). Behaviour: interactive globe with hover/click per country (codepen reference in note `654:3157`). CMS: per country — name, ISO code, teammate count, photo (label `654:3428`: "Our Team Globe Card per Country / Need Photo and Count").
5. `650:25510` `ContinentStats` row: label cell "Where OET's at Across The World" + 7 cells (Africa, Antarctica, Asia, Europe, North America, South America, Australia/Oceania), all "99" placeholders.
6. `650:25534` "Meet The Team" heading + `FilterTabs` in two rows (Show All active, Senior Leadership, Finance, People & Culture, Software Engineering, Modelling Tools & Data, Energy System Modeling, Grid Data, Research & Market Development) and a `SortControl` button "Sort By: A to Z" at the right.
7. `650:25551`, `650:25652`, `650:25753`, `650:25854` — 4x4 grid of `TeamCard` (320x411): cut-out portrait on a soft pink radial glow, name, role (truncated with ellipsis when long), four small social icon links (mail plus three others; too small to identify with certainty), "Read Profile →" link (shortened to "Read →" on some cards), footer line of group tags ("Senior Leadership | Software Engineering"). One card (Snoopy F, "Visionary, Head of Wellbeing") shows a single icon, so social links are optional. Dr. Siddharth Krishna appears twice (placeholder duplication). CMS: `team_members` (name, role, cut-out photo, departments many-to-many including the "Senior Leadership" group, social links, profile slug/body, country).
8. `FooterCta` + `SiteFooter`.

### `651:28624` organization-team-mobile (412x7437) — partly viewed (filter block `653:2572`, pagination `654:3158`, globe `651:31640`)
Differences beyond reflow:
- `Pagination` instances `654:3158` (above the list) and `653:3126` (below): first/prev, pages "1 2 … 10", next/last. **The desktop frame has no pagination at all.** Mobile lists 8 cards per page (`653:2878` … `653:3062`), desktop shows 16.
- "Meet The Team" on mobile has an extra subtitle ("Discover our innovative projects driving the energy transition towards a sustainable future with open-source and open data") that desktop lacks and that reads as copied from a projects page.
- Globe `651:31640` is a cropped 412x444 view with pins only; no open country card is drawn on mobile.
- Continent stats become 2 rows of 4 cells (`651:32456`, `651:32481`).
- Filter tabs wrap to 4 rows; the sort button moves below the tabs.

### Section `650:23565` "Sections, Assets and Local Components" — viewed
- Labels `650:28297` "Vacancy Thumbnail Default", `650:28299` "Thumbnails adjusted by department placement of each vacancy", `650:28302` "Large (Desktop, Tab)", `650:28305` "Small (Mobile)".
- `JobThumbnail`, 8 department themes x 2 sizes (427x258 and 372x258), each a coloured frame + icon + pixel blocks:
  - finance `650:28321` / `650:28368` (grey)
  - people and culture `651:28441` / `651:28454` (black)
  - software engineering `651:28402` / `651:28419` (dark red; frames named "thumbnail-job-tech-L")
  - research and market development `650:28308` / `650:28355` (charcoal)
  - modeling tools and system `650:28334` / `650:28381` (red)
  - energy system modeling `651:28501` / `651:28518` (red)
  - grid data `651:28545` / `651:28562` (red)
  - miscellaneous `651:28472` / `651:28485` (light grey) — fallback for vacancies without a department
  - Several small variants are mis-named "-L" (`650:28381`, `651:28518`, `651:28562`, `651:28419`).
- Label `654:3428` "Our Team Globe Card per Country / Need Photo and Count" above 12 `card-team-america` frames (`654:3207`, `654:3226`, `654:3245`, `654:3261`, `654:3282`, `654:3298`, `654:3314`, `654:3330`, `654:3355`, `654:3371`, `654:3387`, `654:3403`, 305x276): all twelve are identical (same conference photo, "USA", "12 OET Teammates") — a template for per-country cards awaiting real photos and counts.

---

## A3. Canvas "Handoff: Organization / Theory of Change*" (`654:3433`)

Labels: `654:7132` "organization-theoryofchange" (spans everything), `656:13964` "theory-section sequence", `656:13967` "theory-section components", `654:7134` "organization-theoryofchange [Mobile]".

### `654:7144` hero-section
`LoadingSplash` (same structure as on the other canvases; not re-screenshotted).

### `656:12898` about-theory-of-change (desktop 1440x5273) — route `/organization/theory-of-change`
1. `656:13829` `TopNav`.
2. `656:13819` `PageHero` variant "centered-dark" (1400x780): near-black background with a white line-map artwork on the left, centred title "Our Theory of Change: Driving Global Impact", two short centred columns of lead text (`656:13827`, `656:13828`), and a centred outline button `656:13823` "Read Our Theory of Change" (anchor scroll to the story section, or a document link — target not specified). CMS page-level: title, two lead paragraphs, button label + target.
3. `656:12899` instance of `about-theory-of-change-initial` (1440x900) — `TheoryScrollScene`. Note `656:14404`: "This Section's Animation is Scroll Triggered. Check sequence or prototype". Full-viewport pinned scene with an isometric wireframe cube on a grid of diamonds and a caption row at the bottom (label left, statement centre with an underlined italic phrase, two small text columns right). Three states in component set `654:6759`:
   - `654:6760` "Property 1=initial" — dark (#191918-like) background, cube closed, caption "The Challenge" / "Traditional 'black-box' modelling approach in energy planning lacks transparency and *slows down the global energy transition.*" / "Furthermore, there are challenges in getting open-source tools adopted" / "in companies due to the lack of support and software requirement gaps."
   - `654:6812` "Property 1=trans-a" — background turns red, cube still closed, caption switches to "Our Goal" / "Is to address these challenges and accelerate the global energy transition." / "We aim to make energy planning more transparent, accessible, and collaborative" / "and to make open-source tools more adoptable for companies, thus driving a global impact."
   - `654:6864` "Property 1=end" — cube opens: lid lifts, side walls move apart, the four words "Transparent / Accessible / Collaborative / Adoptable" appear inside, pixel-block "energy trails" appear left and right.
   - Layer build sheet (label "theory-section components"): `656:14075` content-grid (layer 1), `656:14110` and `656:14234` content-values (layers 2–3), `656:14310` content-trails (layer 4), with designer spec text nodes:
     - `656:14355`: "layer-1 grid align-center-bottom"
     - `656:14201`: "layer-2 text group align-center-bottom padding 400pt from bottom opacity 0%" → end state `656:14373`: "… opacity 100%"
     - `656:14357`: "layer-3 cube-a align-center-bottom padding 323 from bottom fill color 191918; cube-b align-center-bottom fill color 191918; cube-c align-center-bottom fill color 191918" → end state `656:14371`: "cube-a … padding 442 from bottom (on mobile 560 from bottom) fill color BF1534; cube-b … move 200pt to right fill color BF1534; cube-c … move 200pt to left fill color BF1534"
     - `656:14375`: "layer-4 - energy trail: trail a (left) align-left-bottom opacity 0%, trail-b-right align-right-bottom opacity 0%" → end state `656:14308`: both "opacity 100%"
   - CMS: two caption sets (label, statement with emphasised phrase, two side texts) and the four value words; the artwork is code/SVG, not CMS.
4. `656:13762` "Our Approach" — centred heading + subline "Facilitate. Advance. Provide. Build. Expand.", then `657:16003` `ApproachSteps`: 5 bordered columns, each with a number (01–05), a tall image area that is literally "IMG-PLACEHOLDER", and below it number + title + text: 01 Facilitate Standardization of Open Data, 02 Advance Open-Source Planning Tools, 03 Provide Reliable Support, 04 Build Credibility & Regulatory Support, 05 Expand User & Developer Community. CMS: repeater (title, text, image/illustration).
5. `656:13814` heading "Output and Outcomes" + `656:13816` instance of `outputs-interact` — `OutcomeMatrix`. Note `656:14407`: "This Section's Animation is Screen/Mouse Enter triggered. Check sequence or prototype". Four columns (Open Data Quality, Users of Open Source, Adoptions, Studies): top row = output title + description, bottom row = outcome statement ("More robust and sustainable energy systems.", "Increased public acceptance of energy infrastructure upgrades.", "Lower costs of the whole energy infrastructure.", "Increased adoption of inclusive open-source tools."). States in component set `654:6916`: `654:6917` "Property 1=initial" (1280x441, collapsed — thin empty middle row) and `654:6949` "Property 1=final" (1280x681, middle row expanded to show a coloured line icon per column). The page frame shows the final state. CMS: repeater of 4 (output title, output text, icon, outcome text).
6. `656:13757` "Impact" — heading + one large paragraph, centred narrow column.
7. `656:12954` `TeamGlobe` reused as decoration. Note `656:14445`: "This Section use the same globe from Team page, with randomized iconset." Pins show generic icons instead of counts; icon set in section `656:14467` "footer-globe-icons": `656:14448` ic-globe-a (code-merge), `656:14450` ic-globe-b (code-fork), `656:14458` ic-globe-c (people-group), `656:14456` ic-globe-d (link-horizontal), `656:14454` ic-globe-e (box-connection), `656:14452` ic-globe-f (tools). The globe is cut off by the footer (only the top arc shows).
8. `656:12900` `FooterCta` + `SiteFooter`.

### `657:14499` theory of change mobile (412x6927, mis-named "home-page-mobile") — viewed
Same order. Differences beyond reflow:
- Hero text centred, lead paragraphs stacked.
- `TheoryScrollScene` mobile state `657:15304` (412x900, only the end/"goal" composition is laid out as a separate frame; the page frame shows the initial "The Challenge" state). The cube artwork is cropped to the viewport; the two small side texts sit in two columns under the statement.
- "Our Approach" has a `Tag` "Departments" above the heading that the desktop does not have (looks like a leftover); the steps become a 2-column grid (01/02, 03/04, 05 alone).
- `OutcomeMatrix` keeps its 4 columns and overflows the viewport horizontally (second column is cut off at the frame edge) — implies horizontal scroll/swipe on mobile; no scroll indicator drawn.
- Globe is a cropped view with icon pins.

### Section `654:10699` "Sections, Assets and Local Components"
- `657:15409` (1280x977) — an alternative/earlier "Our Approach" block in which a single wide isometric illustration (`657:15414` "image 3052") sits behind the five "IMG-PLACEHOLDER" columns. It suggests the intended artwork is one illustration sliced across the five columns; the page frame itself has only placeholders.

---

## A4. Canvas "Handoff: Services*" (`662:40197`)

Labels: `662:40454` "services", `662:40456` "services [Mobile]", `662:46514` "services-sub-pages" (spans the six detail pages), then per page `662:46516` "service-systemoperators" / `662:54806` "[Mobile]", `662:47079` "service-regulators" / `662:57134`, `672:58992` "service-consultancies" / `672:58994`, `673:60956` "service-foundations" / `673:60958`, `673:62713` "service-thinktanks" / `673:62715`, `674:64229` "service-technology" / `674:64231`. Asset labels: `662:56945` "Values Thumbnail", `674:65595` "Services Thumbnail", `674:67211` "Illustration".

### `662:43564` hero-section
`LoadingSplash` (same structure as on the other canvases; not re-screenshotted).

### `662:51024` services (desktop 1440x5353) — route `/services`
1. `662:51678` `TopNav`.
2. `662:51663` `PageHero` variant "map-bottom-left" (1400x780): dark maroon background with red network-map artwork on the right, headline bottom-left "Make open-source energy planning work for your organisation", outline chip `662:51674` "Services" under it, pixel blocks top-left. CMS page-level: headline, chip label, artwork.
3. `662:51079` intro: `Tag` "For Sectors and Industries", statement "Open-source energy models are capable of supporting complex, high-stakes planning decisions.", two small text columns on the right (`662:51085`, `662:51086`). Component: `SectionHeading` (variant with side columns).
4. `662:51382`, `662:51251`, `662:51554` — 3 rows x 2 of `ServiceCard` (`card-project`, 630x295): left a coloured vertical strip with an audience icon plus an isometric line illustration on a red gradient, right the audience name, two short paragraphs, and an underlined link "Explore services for <audience> →" (truncated with ellipsis when long). Order: System Operators and Utilities, Regulators and Public Authorities, Consultancies and Engineering Firms, Foundations and Development Partners, Think Tanks, NGOs and Research Orgs., Technology Developers and Investors. CMS: `services` collection (name, short name, two summary paragraphs, icon, illustration, accent shade, slug).
5. `662:51087` "How We Work": `Tag` "How We Work" + heading "We start with the planning workflow, not with a preferred tool.", then `ApproachSteps` (same component as Theory of Change "Our Approach") with 4 columns: a single wide isometric illustration spanning the four image cells with "IMG-PLACEHOLDER" text still visible on top of it, then 01 Identify Your Needs, 02 Build on Open Source Tools, 03 Applied Study, 04 Engagement & Support with a paragraph each. Column 2's text box is taller and breaks the bottom border line (uneven heights). CMS: page-level repeater (title, text) + one illustration.
6. `662:51131` "Why OET": `Tag` "Why OET" + heading "Your Reliable Partner", then a row of 5 `ValueCard`s (same component as About "Core Values"): Security-Conscious, Open Source, Independent, Ecosystem, Support — each with red icon thumbnail, small label, bold title, body. CMS: repeater (label, title, body, icon/thumbnail).
7. `662:51238` `CtaBanner`: red panel, left `662:51239` heading "Discuss a Technology Modelling Need" + text + buttons "Contact Us →" (light/primary-on-red) and "Request a Demo" (outline); right `662:51246` "collage-wind" — wind-turbine photo collage that breaks out of the top of the panel, with pixel blocks. CMS: heading, text, two links, image. Note the copy talks about a "Technology Modelling Need" on the generic services page (looks copied from the technology sub-page).
8. `662:51025` `FooterCta` + `SiteFooter`.

### `662:42561` services-mobile (412x10081) — first two thirds viewed
Same order. Differences beyond reflow:
- `ServiceCard` flips from horizontal (strip + illustration left, text right) to vertical (illustration banner 372x200 on top with the icon strip at its left, text below). Separate mobile artwork exists for this (`card-mobile` assets below).
- `ApproachSteps` ("How We Work") keeps its columns side by side and overflows the viewport — horizontal scroll/swipe, no indicator drawn.
- `ValueCard`s become a 2-column grid.
- Link labels are truncated harder ("Explore services for System Operators a…").

### Service detail pages — `services-details` (label "services-sub-pages") — route `/services/[slug]`
One template, six audiences. Desktop/mobile pairs:

| Service | Desktop | Mobile | Hero lead starts | "How We Can Help" offerings | "Why OET" cards | Extra "How We Work" block | CTA heading |
|---|---|---|---|---|---|---|---|
| System Operators and Utilities | `662:45991` (6128 tall) | `662:55049` | "…helps system operators and utilities assess, adopt and operate…" | 5: Open-source migration support (8 items), Benchmark and validate (5), Build and integrate (7), Train and support (7), Keystone deployments and applied studies (no list, 3 paragraphs) | 5: Expertise, Quality, Security, Capability, Lifecycle | **no** | "Discuss a Technology Modelling Need" |
| Regulators and Public Authorities | `662:46520` (7259) | `662:57136` | "…helps regulators and public authorities adopt open-source modelling tools…" | 5: Open-source migration support (8), Build independent modelling capability (8), Review and challenge evidence (6), Train and support (7), Applied policy and regulatory studies | 6: Independence, Expertise, Analytics, Capability, Decision Making, Lifecycle | yes | "Discuss Your Analytical Needs" |
| Consultancies and Engineering Firms | `662:47631` (7486) | `672:58997` | "…works with consultancies and engineering firms as a specialist technical partner…" | 6: Specialist modelling support, Model and software development, Open-source migration support, Benchmarking and validation, Train and support, Delivery partnerships | 6: Strengthen, Expertise, Specialist, Low Risk, Reusability, Flexibility | yes | "Strengthen your next project" |
| Foundations and Development Partners | `662:47083` (7364) | `673:60961` | "…helps foundations and development partners invest in…" | 6: Programme design and partnership building, Open-source tool development, Open data infrastructure, Institutional adoption, Capacity building and ecosystem development, Technical review and validation | 6: Mission Driven, Ecosystem, Infrastructure, Specialist, Support, Reusability | yes | "Discuss a Programme With Us" |
| Think Tanks, NGOs and Research Organisations | `662:48243` (6968) | `673:62718` | "…helps organisations develop transparent analytical workflows…" | 5: Develop and improve open models, Build reliable data foundations, Selected applied studies, Review and strengthen existing work, Train and support your team | 5: Mission Driven, Specialist, Ecosystem, Reusability, Capability | yes | "Strengthen your next open-source project" |
| Technology Developers and Investors | `662:48742` (6878) | `674:64234` | "…develops transparent, reusable modelling methods, datasets and tools…" | 5: Represent technologies in open models, Develop reusable datasets and methods, Build repeatable screening and planning tools, Technical review and validation, Work with your advisors (4 items) | 5: Independence, Specialist, Ecosystem, Reusability, Role | yes | "Discuss a technology modelling need" |

Mobile frames inspected: `662:57136` (regulators, first two thirds viewed); the other five mobiles were not viewed — their labels and sizes are taken from metadata.

Section order of the template (node ids from System Operators `662:45991`; viewed in full):
1. `662:46513` `TopNav`.
2. `662:46392` `PageHero` variant "illustration-left" (1400x553): dark-red gradient with a large isometric line illustration on the right (solar panels, wind turbine, pylons, Newton's cradle, pie chart, chip — one per audience), eyebrow "Services", title (audience name), lead paragraph, and at the bottom left a small red icon tile followed by an empty dark rectangle (reads as an unfilled `HeroStatBar`; no count or button in it). CMS per service: name, lead, illustration (desktop + mobile crop), icon.
3. `662:46046` + `662:46500` — `IntroStatement` with image: `Tag` "How We Help", large statement (e.g. "Put open-source planning tools into institutional use"), two small text columns; right a 630x460 duotone photo with pixel blocks (`img-filter`). CMS per service: statement, two paragraphs, photo.
4. `662:46053` "How We Can Help" — `OfferingList`: red header band with `Tag` "How We Work" (tag text does not match the heading) + heading "How We Can Help" and pixel blocks; then stacked `OfferingRow`s, each with a coloured left strip holding an icon (shade darkens row by row), title, description, underlined link "More About <offering> →", and on the right a numbered list (01–08) of deliverables. The last row on some pages has longer text and no list. Behaviour: static list as drawn (no accordion affordance); link targets are not designed. CMS per service: repeater of offerings (title, description, icon, link, list of deliverables).
5. `662:46217` "Why OET" — `Tag` "Why OET" + heading ("Why OET" / "Why Work with OET" / "Why work with OET" — capitalisation varies by page) + row of 5 or 6 `ValueCard`s. Cards have unequal heights and each has its own border box, so the bottom edge is ragged. CMS per service: repeater (label, title, body, thumbnail from the "Values Thumbnail" set).
6. Only on the five later pages (inside the same frame as Why OET, e.g. `662:46752` on regulators, texts `662:46882`–`662:46924`): "How We Work" — `Tag` + intro paragraphs specific to the audience + the same 4-step `ApproachSteps` block as on `/services` (Identify Your Needs, Build on Open Source Tools, Applied Study, Engagement & Support, with the illustration and "IMG-PLACEHOLDER" overlays). Steps text is identical on every page, so it is shared content; the intro paragraphs are per service.
7. "Related Projects" (`662:46325` heading) — row of `ProjectCard`s (2 shown on every page: "E-fuels in Australia", "Openmod meets USA 2023", same as on department pages). CMS: relation service → projects.
8. `662:46376` `CtaBanner` — same layout as on `/services` (red panel, heading, text, "Contact Us →" + "Request a Demo", wind-turbine collage). Heading and text differ per service.
9. `662:45992` `FooterCta` + `SiteFooter`.

Mobile (`662:57136` regulators): hero stacks with the illustration behind the text; intro photo goes full-bleed below the text; `OfferingRow` stacks description, link, then the numbered list under it, keeping the coloured icon strip at the left; `ValueCard`s in 2 columns; `ApproachSteps` overflows horizontally.

### Section `662:43576` "Sections, Assets and Local Components" — viewed
- Label `662:56945` "Values Thumbnail": 24 rows of `card-top` value thumbnails, each in three widths (248 / 207 / 186 or 183 px, all 144 tall) with a text label beside the row: Security-Conscious (`662:56765`, `673:60773`, `662:56781`), Open Source (`662:56797`…), Independent (`662:56836`…), Ecosystem (`662:56883`…), Support (`662:56914`…), Expertise (`662:56948`…), Quality (`662:56979`…), Security (`662:57010`…), Capability (`662:57041`…), Lifecycle (`662:57103`…), Independence (`672:58809`…), Analytics (`672:58870`…), Decision Making (`672:58931`…), Strengthen (`673:60588`…), Expertise (second, different icon, `673:60601`…), Specialist (`673:60614`…), Low Risk (`673:60627`…), Reusability (`673:60640`…), Flexibility (`673:60653`…), Mission Driven (`673:62200`…), Infrastructure (`673:62213`…), Support (second, different icon, `673:62226`…), Reusability (second, `673:62239`…), Role (`674:65201`…). Three widths correspond to the card widths for 5-card rows, 6-card rows and mobile.
- Label `674:65595` "Services Thumbnail": per service, in rows labelled by text nodes (`662:54008` System Operators and Utilities, `662:54171` Consultancies and Engineering Firms, `662:54244` Think Tanks, NGOs and Research Orgs., `662:54072` Regulators and Public Authorities, `662:54203` Foundations and Development Partners, `662:54310` Technology Developers and Investors):
  - `card-desktop` (172x295, strip + illustration for the desktop `ServiceCard`): `674:67158`, `674:67159`, `674:67160`, `674:67161`, `674:67162`, `674:67163`
  - `card-mobile` (372x200): `674:65973`, `674:66128`, `674:66242`, `674:66072`, `674:66218`, `674:66274`
  - `project-header` desktop hero (1400x553, with title text baked in for reference): `674:66347`, `674:66550`, `674:66650`, `674:66454`, `674:66518`, `674:66690`
  - `project-header` mobile hero (412x573, artwork only): `674:66781`, `674:66936`, `674:67042`, `674:66880`, `674:67133`, `674:67074`
  (ids listed in the order System Operators, Consultancies, Think Tanks, Regulators, Foundations, Technology, matched by row position.)
- Label `674:67211` "Illustration": `674:67164` (1280x804) — the 4-step "How We Work" block with the wide isometric illustration, i.e. the source for the `ApproachSteps` artwork.

---

# B. Component catalogue

Node ids are examples of each variant; "used on" lists the page frames from part A.

| Component | What it is | Variants / states (node ids) | Used on |
|---|---|---|---|
| `TopNav` | Bordered bar: logo, 4 dropdown items, language button, "Contact Us" | Desktop instance (`648:17767`, `650:25989`, `656:13829`, `662:51678`); light-on-photo and light-on-dark colourings; mobile = logo + Contact Us + language + burger (`648:17722`, `650:27131`, `651:28912`). Dropdown-open and mobile-menu-open states are **not on these canvases**. | every page |
| `LoadingSplash` | Red full-hero panel with centred white logo | `648:13535`, `650:21111`, `654:7144`, `662:43564` | page-load state of every page |
| `PageHero` | Rounded panel inset 20px in a red frame, with pixel-block decoration | "photo-centered" 1400x780, centred title + chip (`648:15659`; mobile `648:17877`); "centered-dark" 1400x780, title + 2 lead columns + outline button (`656:13819`); "map-bottom-left" 1400x780 (`662:51663`); "photo-left" 1400x553 with stat bar (`650:25951` team, partners, career); "map-left" 1400x553 with stat bar and optional `PersonBadge` (department index `648:16265`, department details); "illustration-left" 1400x553 with eyebrow (service details `662:46392`). Mobile heights 573 / 676 / 799. | all |
| `HeroStatBar` | Row of icon tiles, "count + label" chips and an optional red button | counts only (partners: 3 chips; team: 3 chips); count + button ("7 Department / Meet The Team", "12 People / Meet The Team", "3 Open Roles / Explore Opportunities"); empty (service detail heroes) | partners, team, career, department index + details, service details |
| `PersonBadge` | Photo + name + role in an outlined box | one variant (in department detail heroes) | department details |
| `Tag` | Small rounded outline pill | on light and on red (`662:46053` header) | section headings everywhere |
| `SectionHeading` | `Tag` + heading + optional subline, optional side text columns, optional buttons | plain; with subline; with 3 helper columns (career); with 2 side columns (services); with buttons (team) | most sections |
| `ActionButton` | Rectangular button | primary red with arrow; outline/secondary; light on red; large white ("Send an Inquiry"); underlined text link with arrow ("View Department", "Explore services for…", "More About…", "Read Profile", "See Job Board", "View Project") | everywhere. Hover/focus states not on these canvases. |
| `IntroStatement` | Large statement + two small text columns (+ stacked buttons or + photo) | with buttons (about `648:15362`); with photo (service details `662:46046` + `662:46500`); text-only left column (partners) | about, partners, service details |
| `ImageInfoCard` | Image, red rule, title, text, optional outline button | without / with CTA (`648:15633`, `648:15644`) | about |
| `DepartmentCard` | Name, lead, secondary text, accent icon tile, head avatar+name+role, link, framed image | full (image + "View Department", `648:18526`); compact (no image, no link — Finance, People and Culture, Grid Data on `648:16265`); mobile 372 wide | about, department index |
| `ValueCard` | Red icon thumbnail, label, bold title, body | row of 6 (about), 5 or 6 (services); mobile 2-column; thumbnails in 3 widths (assets `648:21012`…, `662:56765`…) | about, services, all service details |
| `WorkTopicGrid` | 2-column bordered table of topic rows with icon | title-only rows (`648:15690`); title + description rows (`648:15897`) | department details (ESM, MTD) |
| `ProjectCard` | Title, description, date range, "View Project", framed image, optional partner-logo chip | one variant; used in an overflowing row (`CardCarousel` implied) on ESM | department details, service details ("Related Projects") |
| `FilterTabs` | Row(s) of joined outline buttons, active one filled red | 3 options (partners); 9 options wrapping to 2 rows desktop / 4 rows mobile (team `650:25534`, `653:2572`) | partners, team |
| `SortControl` | Outline button "Sort By: A to Z" with sort icon | closed state only | team |
| `LogoGrid` | Bordered grid of logo cells | 4 columns desktop, 2 mobile | partners |
| `JobCard` | Title, location, language, work mode, employment type, link, `JobThumbnail` | 3-column desktop (427 wide), stacked mobile (372x459) | career |
| `JobThumbnail` | Department-themed thumbnail | 8 themes x L/S (ids in A2) | career |
| `NumberedStepList` | Bordered rows: number, text, icon | 10 rows (`650:27431`) | career |
| `TeamGlobe` | Half-globe with country outlines and pins | team: count pins + highlighted country + open `GlobeCountryCard` (`650:24685`); decorative: icon pins (`656:12954`, icons `656:14448`…`656:14458`); mobile crops (`651:31640`) | team, theory of change |
| `GlobeCountryCard` | Photo + country chip + teammate count | template `654:3207` (x12 identical) | team |
| `ContinentStats` | Label cell + 7 count cells | 1 row desktop (`650:25510`), 2x4 mobile (`651:32456`, `651:32481`) | team |
| `TeamCard` | Portrait, name, role, social icons, profile link, group tags | one variant (320x411); social icons optional | team |
| `Pagination` | first / prev / pages with ellipsis / next / last | instance `654:3158`, `653:3126` (page 1 active) | team mobile only |
| `TheoryScrollScene` | Pinned scroll-driven cube animation with captions | `654:6760` initial, `654:6812` trans-a, `654:6864` end; mobile `657:15304`; layers `656:14075`, `656:14110`, `656:14234`, `656:14310` | theory of change |
| `ApproachSteps` | Numbered columns with image area and title + text | 5 columns, placeholders only (`657:16003`); 4 columns with shared illustration (`662:51092`, asset `674:67164`); mobile 2-col grid (theory) vs horizontal overflow (services) | theory of change, services, 5 service details |
| `OutcomeMatrix` | 4 columns: output, icon, outcome | `654:6917` initial (collapsed), `654:6949` final (expanded with icons) | theory of change |
| `ServiceCard` | Icon strip + illustration + name + 2 paragraphs + link | horizontal 630x295 desktop; vertical on mobile | services |
| `OfferingList` / `OfferingRow` | Red header band + rows with icon strip, title, text, link, numbered deliverables | row with list; row without list (long text) | service details |
| `CtaBanner` | Red panel with heading, text, 2 buttons and breakout photo collage | one variant (`662:51238`, `662:46376`) | services, service details |
| `FooterCta` | "Energy Transition Starts Now." + email + "Send an Inquiry" | desktop inline; mobile stacked full-width | every page |
| `SiteFooter` | Blurb, copyright, legal links, 4 link columns | desktop 5 columns; mobile reordered 2x2 grid then blurb/legal/copyright | every page |

---

# C. Content model implied

**Globals**
- Navigation: 4 groups (Tools & Data, Services, Outputs, Organization) with child links as listed in the footer; "Contact Us" target; language switcher.
- Footer: blurb, copyright, legal links (Legal, Disclaimer, Privacy Statement, Cookies Settings — the last one opens the consent tool), link columns.
- Footer CTA: heading, contact email, button label + target.

**`departments`**: name, slug, accent colour (red / dark red / charcoal / plum), icon, short lead (card + hero), secondary summary (card), head (relation → team member), card image (desktop 620x258 / mobile 372x258), hero map artwork (desktop/mobile), `has_detail_page` flag (three departments have none), "About Department" rich text, "Works" rich text (intro + outro), work topics repeater (title, optional description, icon), projects (relation → projects), people count (derived from team members). Also used as the taxonomy for team filters and job thumbnails.

**`team_members`**: name (with title prefix), role, cut-out portrait, departments (many-to-many), leadership flag or a "Senior Leadership" group (it appears as a filter and as a tag next to the department), social links (email + up to three profiles), profile page slug/content ("Read Profile" — page not on these canvases), country (for globe and continent counts), sort name.

**`countries` (or a field group on the team page)**: name, ISO code, continent, teammate count (derived or manual), card photo. Continent totals for 7 continents.

**`partners`**: name, logo, type (funder | partner — both may apply), country (hero counts "Country / Partners / Funders"), URL (not shown but expected), sort order.

**`jobs`**: title, locations (free text list), languages, work mode, employment type, department (→ thumbnail theme, with "miscellaneous" fallback), external job-board URL. Open-roles count derived. The existing site sources these from Greenhouse.

**`projects`** (referenced, defined elsewhere): title, summary, start/end month, partner logo, image, slug; relations from departments and from services.

**`services`** (6 items): name, short name, slug, icon, accent shade, isometric illustration (card desktop, card mobile, hero desktop, hero mobile), card summary (2 paragraphs), hero lead, intro statement + 2 paragraphs + photo, offerings repeater (title, description, icon, link, deliverables list), "Why OET" heading + value cards repeater (label, title, body, thumbnail key), "How We Work" intro paragraphs (optional), related projects (relation), CTA banner (heading, text, 2 links, image).

**`values` / reusable value cards**: label, title, body, icon thumbnail. The services pages reuse labels with different titles/bodies per page (e.g. "Capability", "Specialist", "Reusability"), so either a per-page repeater that picks a thumbnail from a fixed set of 24, or a shared collection with per-service overrides.

**Singleton pages**
- About: hero (headline, chip, image), vision statement, 2 paragraphs, 3 links, 2 image-info cards, departments heading, featured departments, values heading + 6 values.
- Department index: hero title, lead.
- Partners: hero headline + image, statement + 2 paragraphs.
- Career: hero title, 2 paragraphs, open-roles heading + 3 helper texts (with careers email), hiring-process text + 10 steps (text, icon).
- Team: hero headline, lead, 3 stats; team section heading, lead, 2 links; globe data; "Meet The Team" heading.
- Theory of Change: hero (title, 2 leads, button), challenge caption set, goal caption set, 4 value words, approach heading + subline + 5 steps (title, text, image), outputs heading + 4 columns (output title, output text, icon, outcome), impact heading + text.
- Services index: hero headline + chip, intro (tag, statement, 2 texts), how-we-work (tag, heading, 4 steps + illustration), why-OET (tag, heading, 5 value cards), CTA banner.

**Taxonomies / filters shown**: partner type (Show All / Funders / Partners); team group (Show All, Senior Leadership, Finance, People & Culture, Software Engineering, Modelling Tools & Data, Energy System Modeling, Grid Data, Research & Market Development); team sort (A to Z; other options not drawn); job department themes (finance, people and culture, software engineering, research and market development, modeling tools and system, energy system modeling, grid data, miscellaneous).

**Relations**: department → head (team member); team member ↔ departments; department → projects; service → projects; job → department; team member → country → continent; partner → country.

**Multi-language note**: every string above is translatable; several designs depend on text length (truncated role lines on `TeamCard`, truncated "Explore services for…" links, 3-line hero titles, fixed-height `ValueCard` rows), so longer translations will need the truncation/wrapping rules decided.

---

# D. Gaps and questions

**Missing pages / states**
- Team member profile page ("Read Profile →" on every `TeamCard`) is not on these canvases.
- Detail pages for Finance, People and Culture and Grid Data departments do not exist; their cards have no link. Confirm this is intended.
- Targets of "More About <offering> →" links in service details are not designed (anchor, modal or page?).
- "Request a Demo" and "Contact Us" / "Send an Inquiry" targets (contact page or form) are not on these canvases. No form design at all here.
- "OET's Handbook" link target unknown (external document?).
- Job detail page: none; cards say "See Job Board" (external). Empty state for zero open roles is not designed.
- No empty state for partner or team filters with no results; no hover/active/focus states for tabs, cards, buttons, logo cells, globe pins.
- `SortControl` open state / other sort options not designed.
- Pagination exists only on the team mobile frame (`654:3158`, `653:3126`); desktop team grid has none. Partners grid has no pagination or "load more".
- `TopNav` dropdown menus, language switcher menu and mobile burger menu are not on these four canvases (may be on another canvas).
- `CardCarousel` for "Department Projects" (ESM `648:15690`): cards run off the frame edge with no arrows, dots or scrollbar; on mobile they are simply stacked.
- `TeamGlobe`: only one static state (USA highlighted). No spec for rotation, zoom, which countries are clickable, what a country without photo shows, or the mobile interaction (no open card on mobile). Reference is only the codepen in note `654:3157`.
- `TheoryScrollScene` mobile: only the end composition (`657:15304`) is laid out; initial and trans-a mobile states are not separate frames. The designer notes say "Check sequence or prototype" — the prototype was not inspected (not reachable through the tools used).
- `OutcomeMatrix`: trigger is "Screen/Mouse Enter" per note `656:14407`; no mobile state for it and it overflows the mobile viewport.
- Tablet breakpoint: only 1440 and 412 frames exist; the label "Large (Desktop, Tab)" on job thumbnails is the only mention of tablet.
- Dark mode: no dark variants on these canvases.

**Placeholder / unfinished content**
- "IMG-PLACEHOLDER" in every `ApproachSteps` image cell (theory of change `657:15983`…, services `662:51097`…, all service details); on the services pages the placeholder text is still visible on top of the real illustration.
- Project date ranges are literally "MM/YYYY - MM/YYYY"; the same two or three projects repeat everywhere, with duplicates inside one list (`648:19300`).
- Counts: "12 People" on all four departments; "9 Country / 99 Partners / 999 Funders"; "99" for every continent; "12" on every globe pin; twelve identical USA country cards. Label `654:3428` says "Need Photo and Count".
- Inconsistent real numbers: department index hero says "7 Department", team hero says "8 Department" (the team filter lists 8 groups + Senior Leadership counted how?); team hero says "9 Continents" while the stats row lists 7; career hero says "3 Open Roles" with 4 cards.
- Partner logos: 8 logos repeated 3 times. Team grid repeats Dr. Siddharth Krishna; includes a dog ("Snoopy F").
- About `ImageInfoCard`s use the same placeholder photo twice.
- Copy errors: services index CTA reuses "Discuss a Technology Modelling Need"; System Operators detail CTA also uses that heading; "Foundations and Development Partners" card link reads "Explore services for system operators and utilities" (`662:51380`); "More About…" link labels do not match their rows (e.g. "More About Build and integrate" under "Train and support", `662:46159`); "Engagement & Support" step repeats the "Applied Study" paragraph (`662:51130`); "Train and support" on System Operators repeats the "Build and integrate" description (`662:46157`); Lifecycle value card repeats the Capability body (`662:46323`); `OfferingList` header tag says "How We Work" above the heading "How We Can Help".
- Team mobile "Meet The Team" subtitle is copied from a projects page; theory-of-change mobile "Our Approach" carries a "Departments" tag.
- Regulators detail: desktop "How We Work" heading text is "We start with the decision or regulatory process that needs to be supported." (`662:46884`) while the mobile frame `662:57136` shows the generic "We start with the planning workflow, not with a preferred tool." — mobile copies were not all updated.
- Canvas name typo "Depatrment"; mobile frames mis-named "home-page-mobile" (`648:16936`, `648:18733`…, `657:14499`); small job thumbnails mis-named "-L".

**Inconsistencies between frames**
- `PageHero` comes in two heights (780 and 553) and six layouts; the About and Theory heroes centre the title, the rest left-align. Decide whether these are variants of one component.
- `DepartmentCard` has a compact variant only on the index page; About shows 4 cards on both desktop and mobile while the index shows 7.
- `ValueCard` rows have 5 or 6 cards and ragged bottoms on service pages but an even row on About.
- `ApproachSteps` on mobile is a 2-column grid on Theory of Change but a horizontal overflow on Services.
- "Why OET" heading capitalisation varies ("Why OET", "Why Work with OET", "Why work with OET"); footer legal separator and label differ between desktop ("| … Cookies Settings") and mobile ("/ … Cookie Settings"); "Modelling" vs "Modeling" spelling varies across department names and filters; "Research Orgs." vs "Research Organizations" vs "Research Organisations".
- System Operators detail lacks the "How We Work" block that the other five service pages have.
- "TeamCard" link label is "Read Profile" on some cards and "Read" on others.
- Service detail hero has an icon tile next to an empty dark box where other heroes have counts/buttons.

**What the `*` in page names appears to mean**
The two starred canvases ("Theory of Change*", "Services*") are the ones that still contain placeholder artwork ("IMG-PLACEHOLDER" illustrations) and motion specs that say "Check sequence or prototype", and Services has the most copy-paste copy errors. The unstarred canvases have placeholder data but complete layouts. My reading is that `*` marks pages whose design/assets are not final or that carry animation needing extra attention; nothing in the file states this explicitly, so confirm with the designer.

**Not inspected**
- Visually: mobile frames `648:16936`, `648:18733`, `648:19300`, `648:19806`, `648:20154`, `648:20417`, `650:21852`, most of `651:28624`, `662:55049`, `672:58997`, `673:60961`, `673:62718`, `674:64234`, the last third of `662:42561` and `662:57136`; desktop service details other than `662:45991` (structure and copy for those come from metadata, plus one section screenshot of `662:46752`). The lower third of the desktop team page (footer) and the three later `LoadingSplash` frames were not screenshotted.
- `get_design_context` was not called; component properties, exact tokens (colours, type sizes, spacing) and prototype interactions are therefore not recorded here.
