# Directus data model

Status: **draft for review**, 2026-10-08. Derived from the designer's field-spec frames (`643:7951`, `647:1128`, `660:39443`, `660:39823`), the design catalogue, and the content that exists on the live Payload site (11 pages, 19 posts, 32 projects, 4 events, 25 partners, 52 team members, 354 media).

Target: Directus 11 on Postgres, self-hosted in Docker. The model is committed as a schema snapshot in `cms/schema.yaml`.

## 1. Conventions

- Collection names: plural `snake_case`. Singletons: singular (`home_page`, `site_header`).
- Every routed collection has `id`, `status` (`draft` | `published` | `archived`), `sort`, `date_created`, `date_updated`, `user_created`, `user_updated`.
- **Translations:** each translatable collection `x` has `x_translations` (`id`, `x_id`, `languages_code`, translated fields). Structural fields (images, relations, dates, numbers, URLs, flags) live on the parent. Slugs are translated.
- `languages`: `code` (`en`), `name`, `direction`, `default` flag, `enabled` flag. English only at launch. When a translation is missing the site shows the English content (user decision).
- Required fields are enforced in Directus wherever the design depends on them, with the designer's character limits as validation.
- Repeaters with translatable text are child collections (O2M) with their own translations, not JSON fields, so editors translate them side by side. Purely structural repeaters (URLs) may be JSON.
- Images are `directus_files` relations with a required `alt` on the usage (translated), not on the file.
- Field names follow the designer's spec where one exists (mapping shown in brackets).

Legend: **T** = translated field. Relation types: M2O, O2M, M2M, M2A.

## 2. Content collections

### `projects` (Success Stories)

| Field | Type | Notes |
| --- | --- | --- |
| `title` **T** | string, max 90 | [`project-title`] |
| `slug` **T** | string, unique per language | |
| `excerpt` **T** | text | card text, 3-line clamp |
| `highlights` | O2M `project_highlights` (`text` **T**, max 240), max 4 | [`project-short-resume`] |
| `start_date`, `end_date` | date | [`project-start`, `project-end`]; cards show `MM/YYYY`, detail shows full dates |
| `project_status` | `completed` \| `in_progress` | [`project-status`] |
| `region` | M2O `regions` | [`project-region`] |
| `tags` | M2M `tags` | [`#project-tags`] |
| `tools` | M2M `tools` | [`tools-used-x`] |
| `services` | M2M `services` | [`relate-service-x`] |
| `cta_service` | M2O `services` | [`project-service-cta-related`] |
| `cta_heading`, `cta_text`, `cta_secondary_text` **T** | string / text | [`project-service-cta-content`]; empty → global CTA copy |
| `hero_image` | file, 1280x712 | [`project-hero-image`] |
| `thumbnail` | file, ~407x258, pre-composed | [`project-thumbnail-image`] |
| `partner_tag` | M2O `partners` | optional logo tag on the thumbnail |
| `body` **T** | WYSIWYG (HTML) | [`project-content-markdown-format`] |
| `tool_links`, `data_links`, `other_links` | O2M `project_links` (`group`, `label` **T**, `url`, `disabled`) | [`project-tool-link-x` …] |
| `contact` | M2O `team_members` | [`team-profile-fetch-data-*`] |
| `contact_role` **T** | string | [`project-contact-role`], e.g. "Project Lead" |
| `partners` | M2M `partners` | [`partner-logo-x`] |
| `testimonial` | M2O `testimonials` | [`project-testimony-*`] |
| `related_projects` | M2M `projects` | |
| `departments` | M2M `departments` | used on department pages |
| `featured_on_home` | boolean + `sort` | home carousel |
| SEO group **T** | `seo_title`, `seo_description`, `seo_image` | |

### `publications`

| Field | Type | Notes |
| --- | --- | --- |
| `title` **T**, `slug` **T** | | |
| `type` | `academic` \| `blog` \| `policy_brief` \| `report` | drives the listing tabs and nav entries |
| `category` | M2O `publication_categories` | e.g. "Case Study" |
| `excerpt` **T** | text | card text or citation line |
| `highlights` **T** | text | [`project-short-resume`] as a paragraph |
| `publish_date` | date | [`publish-date`] |
| `is_preprint` | boolean | shows "Preprint" in place of the date |
| `authors` | O2M `publication_authors` (`team_member` M2O nullable, `name`, `title` **T**, `photo`, `sort`), max 5 in header | [`author-name-a…e`]; external authors use the free-text fields |
| `region` | M2O `regions` | |
| `tags` | M2M `tags` | |
| `hero_image`, `thumbnail` | file | thumbnail optional → text-only card |
| `body` **T** | WYSIWYG | headings feed the table of contents |
| `outputs` | O2M `publication_outputs` (`value`, `label` **T**, `icon`), max 6 | [`output-x-content/label/icon`] |
| `resources` | O2M `publication_links` (`group` = resource \| link, `label` **T**, `url` or `file`) | |
| `journal_citation` **T**, `doi` | text, string | |
| `citation_text` | text | for "Cite" |
| `pdf` | file | for "Save as PDF" when a file exists |
| `contact` | M2O `team_members` | per spec |
| `testimonial` | M2O `testimonials` | per spec |
| `related_publications` | M2M `publications` | [`publication-related-fetch-link-x`] |
| `cta_service` | M2O `services` | |
| SEO group **T** | | |

Existing blog posts (19) migrate here with `type = blog`.

### `events`

| Field | Type | Notes |
| --- | --- | --- |
| `title` **T**, `slug` **T** | | [`event-title`] |
| `brief` **T** | text | [`event-description-brief`] |
| `description` **T** | WYSIWYG | [`event-description-full`] |
| `published_at` | datetime | [`event-post-date`] |
| `event_date`, `start_time`, `end_time` | date, time, time | [`event-date`, `event-start-time`, `event-end-time`]; duration derived |
| `timezone` | string (IANA, e.g. `Europe/Berlin`) | replaces today's free-text label |
| `type` | M2O `event_types` | Webinar, Event, Support Meetup, Open Call |
| `location_region` **T** | string | [`event-location-region`], e.g. "Online" |
| `location_address` **T** | text | [`event-location-address`] |
| `map_url` | string | [`event-location-google-maps-link`] |
| `registration_closes` | date | card line |
| `join_url`, `calendar_url` | string | "Join Event", "Mark Calendar" |
| `poster` | file, free aspect | [`event-poster-img`]; fitted, not cropped |
| `contributors` | O2M `event_contributors` (`team_member` M2O nullable, `name`, `title` **T**, `photo`, `sort`) | [`event-contributor-*`] |
| `is_highlighted` | boolean | |
| `highlight_media` | file (image or video) or `video_url` | [`event-documentation-media-highlight`] |
| `gallery` | M2M files | [`event-docs-file-x`], optional |
| SEO group **T** | | |

Upcoming vs past is derived from `event_date`, as on the current site.

### `tools`

| Field | Type | Notes |
| --- | --- | --- |
| `name`, `slug` | string | not translated |
| `categories` | M2M `tool_categories` | Tools, Model, Data, Open-source solvers, Community |
| `oet_role` | `maintainer` \| `co_maintainer` \| `maintainers` \| null | label text from the i18n dictionary |
| `description` **T** | text | |
| `source_url`, `website_url`, `github_url` | string | |
| `logo` | file (SVG preferred) | |
| `featured_on_home` | boolean + `sort` | home logo row |

### `services`

| Field | Type | Notes |
| --- | --- | --- |
| `name` **T**, `short_name` **T**, `slug` **T** | | long and nav forms differ |
| `nav_description` **T** | string | mega-menu one-liner |
| `icon` | file (SVG) | |
| `accent` | `brand-500` \| `brand-600` \| `brand-700` \| `brand-800` \| `brand-900` \| `brand-400` | shade per service |
| `illustration_card`, `illustration_card_mobile`, `illustration_hero`, `illustration_hero_mobile` | file | four delivered formats |
| `accordion_image` | file | home accordion photo |
| `summary` **T** | two paragraphs (WYSIWYG) | card and accordion |
| `hero_lead` **T** | text | |
| `intro_statement` **T**, `intro_text_1` **T**, `intro_text_2` **T**, `intro_image` | | |
| `offerings` | O2M `service_offerings` (`title` **T**, `description` **T**, `icon`, `link_label` **T**, `link_url`, `deliverables` O2M (`text` **T**), `sort`) | |
| `value_heading` **T** | string | "Why OET" |
| `values` | O2M `service_values` (`label` **T**, `title` **T**, `body` **T**, `thumbnail` M2O `value_thumbnails`, `sort`) | 5–6 per service |
| `how_we_work` **T** | WYSIWYG, optional | absent on one service |
| `related_projects` | M2M `projects` (inverse of `projects.services`) | |
| `cta_heading` **T**, `cta_text` **T**, `cta_image`, `cta_links` | | |
| SEO group **T** | | |

### `departments`

| Field | Type | Notes |
| --- | --- | --- |
| `name` **T**, `slug` **T** | | |
| `accent` | `red` \| `dark_red` \| `charcoal` \| `plum` | |
| `icon`, `card_image`, `card_image_mobile`, `hero_art`, `hero_art_mobile` | file | |
| `lead` **T**, `summary` **T** | text | |
| `head` | M2O `team_members` | |
| `has_detail_page` | boolean | three departments have none |
| `about` **T**, `works_intro` **T**, `works_outro` **T** | WYSIWYG | |
| `work_topics` | O2M `department_topics` (`title` **T**, `description` **T** optional, `icon`, `sort`) | |
| `projects` | M2M `projects` | |

People count is derived from `team_members`.

### `team_members`

| Field | Type | Notes |
| --- | --- | --- |
| `name`, `sort_name`, `slug` | string | |
| `role` **T** | string | |
| `portrait` | file (cut-out) | |
| `departments` | M2M `departments` | |
| `is_senior_leadership` | boolean | filter tab and tag |
| `country` | M2O `countries` | globe and continent counts |
| `email`, `linkedin_url`, `github_url`, `website_url` | string | |
| `bio` **T** | WYSIWYG | profile page (page not designed yet) |

### `countries`

`name` **T**, `iso_code`, `continent` (enum of 7), `card_photo`. Teammate counts are derived.

### `partners`

`name`, `logo`, `url`, `is_funder`, `is_partner`, `group` (`trusted_partner` | `network_affiliation`), `country` M2O, `sort`, `featured_on_home`.

### `jobs`

`title` **T**, `locations` **T**, `languages` **T**, `work_mode`, `employment_type`, `department` M2O (drives the thumbnail theme; null → miscellaneous), `external_url`, `status`.

Open decision: keep sourcing jobs live from Greenhouse (as today) and use this collection only for the department/thumbnail mapping, or manage jobs in Directus. See section 6.

### `testimonials`

`quote` **T**, `content` **T** (max 720), `person_name`, `person_title` **T**, `photo`, `company_logo`, `project` M2O.

### Small collections

| Collection | Fields |
| --- | --- |
| `regions` | `name` **T**, `slug` |
| `tags` | `name` **T**, `slug` |
| `products` | `name` **T**, `slug` (filter "All Products"; may collapse into `tools` — designer question) |
| `publication_categories` | `name` **T**, `slug` |
| `event_types` | `name` **T**, `slug` |
| `tool_categories` | `name` **T**, `slug`, `colour`, `sort` |
| `value_thumbnails` | `key`, `image_sm`, `image_md`, `image_lg` (the fixed set of 24) |
| `redirects` | `from`, `to`, `status_code` (301/302) |
| `form_submissions` | `form`, `payload` (JSON), `locale`, `date_created` — public create only |
| `ui_strings` | `key`, `value` **T** — for editor-managed UI text, if not kept in code |

## 3. Singletons

| Singleton | Content |
| --- | --- |
| `site_settings` | site name, default SEO **T**, social links, GTM id, contact email |
| `site_header` | `nav_groups` O2M (`label` **T**, `type` list \| mega, `links` O2M (`label` **T**, `description` **T**, `icon`, `url` or page relation)), mega-menu image, mega-menu footer row **T**, contact link **T** |
| `site_footer` | blurb **T**, copyright **T**, legal links, four link columns (O2M), CTA heading **T**, CTA email, CTA button **T** |
| `cta_banners` (collection, 3 items) | "Discuss a Technology Modelling Need", "Book OET for Support Sessions", "Monthly Updates Open Call": heading **T**, lead **T**, text **T**, links, collage image, tone |
| `home_page` | hero slides O2M (`title` **T**, `paragraphs` **T**, `image`, `audience_label` **T**), hero actions; vision (tag, statement, two texts, links, image) **T**; stats O2M (`value`, `label` **T**, `icon`); services heading **T**; tools heading and text **T**; process steps O2M (`title` **T**, `body` **T**, `footnote` **T**, `image`, `tone`); partner group labels **T**; projects heading **T** |
| `about_page`, `departments_page`, `partners_page`, `team_page`, `career_page`, `theory_of_change_page`, `services_page`, `tools_page`, `success_stories_page`, `publications_page`, `news_events_page` | each page's hero (title, eyebrow/chip, lead, image, actions), intro texts and section headings **T**, per the catalogue's "Singleton pages" list; `career_page` has the hiring steps O2M; `theory_of_change_page` has captions, approach steps, outcome columns |

Fixed-layout pages are singletons rather than a free page builder, because each designed page has one fixed composition. A generic `pages` collection with a block builder (M2A) is added for legal pages and any future free-form page: blocks `block_rich_text`, `block_cta_banner`, `block_image`, `block_link_list`.

## 4. Relations overview

```
projects  ─M2M─ tools        projects ─M2M─ services      projects ─M2M─ partners
projects  ─M2O─ team_members (contact)   projects ─M2O─ testimonials
projects  ─M2M─ departments  projects ─M2M─ projects (related)
publications ─O2M─ publication_authors ─M2O─ team_members
publications ─M2M─ publications (related)   publications ─M2O─ services (cta)
events ─O2M─ event_contributors ─M2O─ team_members
departments ─M2O─ team_members (head)   team_members ─M2M─ departments
team_members ─M2O─ countries   partners ─M2O─ countries
jobs ─M2O─ departments   tools ─M2M─ tool_categories
services ─O2M─ service_offerings ─O2M─ deliverables   services ─O2M─ service_values ─M2O─ value_thumbnails
```

## 5. Roles, permissions, workflow

| Role | Access |
| --- | --- |
| Public (unauthenticated) | read `published` items of public collections and their translations; read files; create `form_submissions`. Nothing else |
| Web build (static token) | same reads as public, used by Astro at build/revalidation time |
| Preview (static token) | read `draft` and `published`; used only by the `/preview` route |
| Editor | create/update content, upload files; cannot change the data model |
| Admin | everything |

- Publishing: `status` field; content versioning enabled on routed collections for drafts of published items.
- Scheduled publish: `publish_at` datetime + a Flow that promotes `draft` → `published`.
- Revalidation: a Flow on create/update/delete of any public collection calls the web app's revalidation endpoint with a secret.
- Files: Directus storage on an S3-compatible bucket in production (to be chosen), local volume in development.

## 6. Migration map (Payload → Directus)

| Payload | Directus | Notes |
| --- | --- | --- |
| `media` (354) | `directus_files` | old URL → new id map kept for body rewriting |
| `posts` (19) | `publications` (`type = blog`) | Lexical → HTML; embedded blocks flattened |
| `outputs` | `publications` (type by category) | field mapping to confirm against live data |
| `projects` (32) | `projects` | new fields (highlights, status, region, thumbnail) filled by editors after migration; thumbnails must be produced per the Thumbnail Maker Guide |
| `events` (4), `event-categories` | `events`, `event_types` | timezone label → IANA zone |
| `team-members` (52), `staff` categories | `team_members`, `departments` membership | country added by editors |
| `departments` | `departments` | |
| `partners` (25) | `partners` | funder/partner flags set by editors |
| `models` | `tools` | categories assigned by editors |
| `testimonials` | `testimonials` | |
| `jobs` | `jobs` or Greenhouse | per decision below |
| `categories` | `tags` / `publication_categories` | |
| `pages` (11) | singletons + `pages` | home/about etc. are re-authored to the new design, not migrated block by block; legal pages migrate to `pages` |
| `redirects` | `redirects` | plus redirects from every old URL to its new path |
| `forms`, `form-submissions` | `form_submissions` | forms are re-created; old submissions exported, not migrated |
| `search`, `link-scan-runs`, `users` | not migrated | search → Pagefind; editors are re-invited |

Old URLs (`/posts/x`, `/projects/x`, `/events/x`) get permanent redirects to the new structure.

## 7. Decisions needed

1. **Jobs:** keep Greenhouse as the source (recommended, since it is the hiring system of record) with a department mapping in Directus, or manage jobs in Directus?
2. **Publications vs outputs vs posts:** confirm that the current `posts` and `outputs` both become `publications` with a `type`.
3. **Products filter:** separate taxonomy, or the same as `tools`?
4. **Fixed pages as singletons** (recommended, matches the designs and keeps editors from breaking layouts) versus a free page builder for every page?
5. **External people** (authors, contributors who are not OET staff): free-text fields on the join row (as modelled), or a separate `people` collection?
6. **URL structure** as listed in `docs/design-inventory.md` section 4.
