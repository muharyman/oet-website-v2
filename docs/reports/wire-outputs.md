# Wiring report — outputs area

Success stories and publications now read the Payload CMS. No schema additions were needed.

## What is connected

| Route | Loader | Reads |
| --- | --- | --- |
| `/outputs/success-stories` | `loadSuccessStories`, `loadFilters` | `success-stories-page` (depth 2), `projects` (depth 2, sort `createdAt`), `regions`, `services`, `tools`, `tags` (depth 0) |
| `/outputs/success-stories/[slug]` (11) | `loadProjects` in `getStaticPaths` | `projects` (depth 2), `success-stories-page` (depth 0, status labels and testimonial heading) |
| `/outputs/publications`, `/outputs/blogs`, `/outputs/policy-briefs`, `/outputs/reports` | `loadPublicationsPage`, `loadFilters` | `publications-page` (depth 1), `publications` (depth 2, sort `createdAt`), the four filter collections |
| `/outputs/publications/[slug]` (7) | `loadPublications` in `getStaticPaths` | `publications` (depth 2) |

Depth 2 is needed for partner tag logo, testimonial portrait, team member head photo and the service card image.

### Data modules

- `web/src/data/outputs.ts`: types kept (`Testimonial`, `LinkLabelPart`, `LinkGroup`, `Person`, `PartnerLogo`, `ServiceSlug`, `ServiceCta`, `CtaContent`), `sort` and `pagination` kept. New: `loadFilters(locale, prefix)`, types `Filter`, `FilterOption`, `PersonSource`, and the shared mappers `longDate`, `monthOfYear`, `articleHtml`, `tagLabel`, `testimonial`, `linkGroups`, `ctaContent`, `serviceCta`, `personName`, `person`. Removed constants: `filters`, `testimonials`, `contact`, `authors`, `partnerLogos`, `cta`, `serviceCtas`.
- `web/src/data/projects.ts`: `loadProjects(locale)`, `loadSuccessStories(locale)`, `projectBySlug(projects, slug)` (now takes the list), exported mappers `partnerTag`, `partnerLink`, `projectPeriod` (usable by the other areas for project cards). Removed `projects`, `successStories`.
- `web/src/data/publications.ts`: `loadPublications(locale)`, `loadPublicationsPage(locale)`, `publicationBySlug(publications, slug)`. Removed `publications`, `publicationsPage`.
- `web/src/data/partnerTags.ts`: **deleted**. Nothing imported it any more when this pass ended (`home.ts`, `departments.ts`, `services.ts` had been rewritten).

View-model changes:

- `ProjectDetail.service` and `PublicationDetail.service` (a slug into the removed `serviceCtas`) became `serviceCta: ServiceCta`, built from the related `services` document (`ctaCard` group; link target `routes.service(slug)`).
- `ProjectDetail.testimonialHeading` added (from `success-stories-page.testimonials.heading`).
- `Person.title` is `string | null` (an outside author may have a photo and no position).

### Mapping rules

- Dates in UTC: `May 1, 2026` (`Intl.DateTimeFormat` with the locale), card period `05/2026 - 05/2026`.
- Status text of a project: the tab label of `success-stories-page.listing.tabs` for its `projectStatus`.
- Publication card date: "Preprint" (`publication.preprint`) when `preprint` is set, otherwise the date. The page header always shows the date.
- People: `team-member` → name, role as the position, head photo, links from `profile.href` and the first `github` / `linkedin` social link; `external` → the stored fields. Link labels come from `person.profile` / `person.github` / `person.linkedin` with the name. An author without a photo is listed by name in the header and has no sidebar row. A **project contact without a photo throws** (team member without head photo), because the contact box has no variant without one.
- Related cards: relation ids resolved against the published list, so an unpublished related document is skipped.
- Table of contents: derived from the h2 / h3 of the rich text blocks and the stats block title, as before.
- Rich text headings: a line break stored in a heading is rendered as ` <br class="max-lg:hidden">` (`articleHtml`), which restores the static behaviour (break on desktop only, a space on mobile). Without it the seeded heading broke after "model" at 412 and read "modelfor" in the table of contents.
- Tabs, anchors, page sizes, pagination state and sort options stay in code.

### Pages and components changed

- `web/src/pages/outputs/success-stories/index.astro`, `success-stories/[slug].astro`, `publications/[slug].astro`, `web/src/components/pages/PublicationsPage.astro`: call the loaders; hero images come from the globals.
- Optional sections are rendered only when they have content: "Service" group in the project header, "Partners" box, testimonial slider, "Related Projects" / "Related Publications", author rows.
- `web/src/components/ui/PersonRow.astro` (shared): `title` accepts `null` and the line is omitted then. Existing callers are unaffected.
- `web/src/components/blocks/tableOfContents.ts` (shared helper): `plain` turns `<br>` into a space and collapses whitespace, so a heading with a line break gets a correct label and id.
- `web/src/i18n/ui.ts`: added `detail.rangeWord`, `publication.preprint`, `person.profile`, `person.github`, `person.linkedin`.

## Verification

- `pnpm check`: 0 errors, 0 warnings (163 files) at the end of the pass.
- `prettier --check` on all changed files: clean.
- `node scripts/compare-content.mjs .screenshots/cms-before-html http://localhost:4321 /outputs`: 23 routes compared, all answer 200, every one reports differences; all are listed below.
- Screenshots of all 23 routes at 1440 and 412 in `web/.screenshots/cms-outputs/`, pixel-compared with `scripts/compare-snapshots.mjs` against `.screenshots/cms-before/`. No console errors on any route.

Looked at side by side (before | after): success stories listing 1440 (listing and slider/footer part); project detail "Comprehensive PyPSA Training Session" 1440 (whole page) and 412 (header to related cards); "Openmod meets USA 2023" 1440 (header, sidebar); "E-fuels in Australia" 412 (header to article); publications listing 1440 (lower half with the Outputs section); publication "AI coding agents…" 1440 (header to sidebar) and 412; "Ukraine Against Darkness" 1440 (end of the page). The other detail pages were **not looked at individually**; they share the template and their pixel-difference bands and heights are the same as the page looked at (table below).

| Route | Content diff | Screenshots |
| --- | --- | --- |
| `/outputs/blogs`, `/outputs/policy-briefs`, `/outputs/reports` | filter options only | pixel-identical at both widths |
| `/outputs/publications` | filter options; eighth (repeated) card gone; Outputs section 3 cards instead of 9 | 4881 → 4407 (1440), 7037 → 6563 (412) |
| `/outputs/publications/<slug>` (6 with a related card) | date in header; one author row; three author link targets | 1440 same height (6917); 412 119 px shorter (two author rows fewer) |
| `/outputs/publications/ukraine-against-darkness` | as above, and no "Related Publications" | 6917 → 6317, 10047 → 9328 |
| `/outputs/success-stories` | filter options; periods; one testimonial slide; tag alt | 5015 → 4983, 7319 → 7287 (slider without its progress bar) |
| `/outputs/success-stories/<slug>` (9 without services) | no "Service" group; periods; related list; no "Partners" box | 5127 → 5121 (1440); 412 369 px shorter |
| `/outputs/success-stories/e-fuels-in-australia`, `openmod-meets-usa-2023` | six service names; periods; related list; Partners box only on Openmod | 5127 → 5286 (1440) |

## Remaining differences (all from seeded content, none fixed in code)

1. **Filter options** come from the collections: services are the six audience documents (static: three invented names), products are all 19 tools (static: three). Regions and tags are unchanged. Option values are slugs (tool: id).
2. **Card period** `05/2026 - 05/2026` in place of the placeholder `MM/YYYY - MM/YYYY`.
3. **Project header "Service"**: six audience names on E-fuels in Australia and Openmod meets USA 2023 (the header is about 110 px taller on desktop there), no group on the other nine (header 4 px shorter).
4. **Partners box**: Stanford University on Openmod only; absent on ten projects (static: six "Climact" placeholders).
5. **Related projects**: each project once and never the project itself (two or three cards; static: four with a repeat).
6. **Testimonial slider on the listing**: one slide, so no progress bar (static: the same testimonial three times).
7. **Partner tag alt** "Stanford University" (static "Stanford"): one `partners` document.
8. **Publications listing**: seven cards (the static eighth repeated the second); Outputs section lists the three flagged publications once (static: three times).
9. **Publication date in the header** is the publication's own date (20 February, 27 April, 14 July 2026); preprints keep 1 May 2026.
10. **Authors sidebar**: one row, Dr. Martha Maria Frysztacki with her team role, head photo (light background instead of the red placeholder photo) and three link icons from her team profile, all pointing to the placeholder `mailto:`. Charlotte Heikendorf has no photo and therefore no row.
11. **Ukraine Against Darkness** has no related publication (it was the only related one), so the section is absent.
12. **"Privacy Statement" / `/privacy-statement`** appear as a removed and an added line on every route: the text is identical, so its position among the shell links moved. It is in the header/footer (site area); the cause was not investigated.
13. **Footer** is positioned differently at the bottom of the before/after screenshots on some routes (site area).

## Decisions to confirm

- Listings are sorted by `createdAt` ascending, as the outputs report prescribes for the seeded order. A real site wants `-startDate` / `-date`; that is a one-word change in `loadDocs` of each module.
- The success stories listing shows every published project under the active "Completed" tab; both tabs still link to the same route, as in the static page. All seeded projects are completed. Filtering by status needs a route or client-side filter decision.
- The four filters are shown on the publication listings too, as in the static page, although publications have no services or tools.
- A project contact that is a team member without a head photo stops the build. Either add a validation in `cms/src/areas/outputs` or give `PersonRow` a variant without a photo.

## For the coordinator

- `web/src/assets/outputs/*`, `web/src/assets/heroes/success-stories-*.webp`, `publications-*.webp` and `assets/home/partner-google.png` are no longer imported by the outputs modules; move or prune them.
- `ServiceCtaCard` props are unchanged; the detail pages now pass `services.ctaCard`.
- `projects.ts` exports `partnerTag`, `partnerLink` and `projectPeriod` if home, departments or services want one mapping for project cards (not checked whether they map cards themselves).
- Nothing was run with `pnpm build`; verification was against the dev server only.
