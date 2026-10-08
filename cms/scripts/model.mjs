const string = (options = {}) => ({ type: 'string', interface: 'input', ...options })
const text = (options = {}) => ({ type: 'text', interface: 'input-multiline', ...options })
const html = (options = {}) => ({ type: 'text', interface: 'input-rich-text-html', ...options })
const boolean = (options = {}) => ({ type: 'boolean', interface: 'boolean', default: false, ...options })
const date = (options = {}) => ({ type: 'date', interface: 'datetime', ...options })
const time = (options = {}) => ({ type: 'time', interface: 'datetime', ...options })
const dateTime = (options = {}) => ({ type: 'timestamp', interface: 'datetime', ...options })
const json = (options = {}) => ({ type: 'json', interface: 'input-code', ...options })
const select = (choices, options = {}) => ({
  type: 'string',
  interface: 'select-dropdown',
  choices,
  ...options,
})

const required = { required: true }
const seo = { seo_title: string(), seo_description: text() }
const brandShades = ['brand-400', 'brand-500', 'brand-600', 'brand-700', 'brand-800', 'brand-900']

const taxonomy = (extra = {}) => ({
  fields: { slug: string({ ...required, unique: true }), ...extra },
  translated: { name: string(required) },
})

export const languages = [{ code: 'en', name: 'English', direction: 'ltr', is_default: true, enabled: true }]

export const collections = {
  regions: taxonomy(),
  tags: taxonomy(),
  products: taxonomy(),
  publication_categories: taxonomy(),
  event_types: taxonomy(),
  tool_categories: {
    sort: true,
    ...taxonomy({ colour: select(['brand-500', 'brand-700', 'brand-900', 'neutral-600', 'neutral-900'], required) }),
  },

  value_thumbnails: {
    fields: { key: string({ ...required, unique: true }) },
    files: { image_sm: required, image_md: required, image_lg: required },
  },

  redirects: {
    fields: {
      from: string({ ...required, unique: true }),
      to: string(required),
      status_code: select(['301', '302'], { ...required, default: '301' }),
    },
  },

  form_submissions: {
    fields: { form: string(required), payload: json(required), locale: string(required) },
  },

  ui_strings: {
    fields: { key: string({ ...required, unique: true }) },
    translated: { value: text(required) },
  },

  job_themes: {
    fields: {
      greenhouse_department: string({ ...required, unique: true }),
      theme: select(
        ['finance', 'people', 'software', 'research', 'modeling', 'energy', 'grid', 'misc'],
        required,
      ),
    },
  },

  countries: {
    fields: {
      iso_code: string({ ...required, unique: true }),
      continent: select(
        ['africa', 'antarctica', 'asia', 'europe', 'north_america', 'oceania', 'south_america'],
        required,
      ),
    },
    files: { card_photo: {} },
    translated: { name: string(required) },
  },

  partners: {
    sort: true,
    fields: {
      name: string(required),
      url: string(),
      is_funder: boolean(),
      is_partner: boolean(),
      group: select(['trusted_partner', 'network_affiliation'], required),
      featured_on_home: boolean(),
    },
    files: { logo: required },
    m2o: { country: 'countries' },
  },

  team_members: {
    status: true,
    fields: {
      name: string(required),
      sort_name: string(required),
      slug: string({ ...required, unique: true }),
      is_senior_leadership: boolean(),
      email: string(),
      linkedin_url: string(),
      github_url: string(),
      website_url: string(),
    },
    files: { portrait: {} },
    m2o: { country: 'countries' },
    m2m: { departments: 'departments' },
    translated: { role: string(required), bio: html() },
  },

  departments: {
    status: true,
    sort: true,
    fields: {
      accent: select(['red', 'dark_red', 'charcoal', 'plum'], required),
      has_detail_page: boolean(),
    },
    files: { icon: {}, card_image: {}, card_image_mobile: {}, hero_art: {}, hero_art_mobile: {} },
    m2o: { head: 'team_members' },
    m2m: { projects: 'projects' },
    o2m: { work_topics: 'department_topics' },
    translated: {
      name: string(required),
      slug: string(required),
      lead: text(required),
      summary: text(),
      about: html(),
      works_intro: html(),
      works_outro: html(),
    },
  },

  department_topics: {
    sort: true,
    files: { icon: {} },
    translated: { title: string(required), description: text() },
  },

  tools: {
    status: true,
    sort: true,
    fields: {
      name: string(required),
      slug: string({ ...required, unique: true }),
      oet_role: select(['maintainer', 'co_maintainer', 'maintainers']),
      source_url: string(),
      website_url: string(),
      github_url: string(),
      featured_on_home: boolean(),
    },
    files: { logo: {} },
    m2m: { categories: 'tool_categories' },
    translated: { description: text(required) },
  },

  services: {
    status: true,
    sort: true,
    fields: { accent: select(brandShades, required), cta_links: json() },
    files: {
      icon: required,
      illustration_card: {},
      illustration_card_mobile: {},
      illustration_hero: {},
      illustration_hero_mobile: {},
      accordion_image: {},
      intro_image: {},
      cta_image: {},
      seo_image: {},
    },
    o2m: { offerings: 'service_offerings', values: 'service_values' },
    translated: {
      name: string(required),
      short_name: string(required),
      slug: string(required),
      nav_description: text(required),
      summary_1: text(required),
      summary_2: text(required),
      hero_lead: text(),
      intro_statement: text(),
      intro_text_1: text(),
      intro_text_2: text(),
      value_heading: string(),
      how_we_work: html(),
      cta_heading: string(),
      cta_text: text(),
      ...seo,
    },
  },

  service_offerings: {
    sort: true,
    fields: { link_url: string() },
    files: { icon: {} },
    o2m: { deliverables: 'service_deliverables' },
    translated: { title: string(required), description: text(required), link_label: string() },
  },

  service_deliverables: {
    sort: true,
    translated: { text: text(required) },
  },

  service_values: {
    sort: true,
    m2o: { thumbnail: 'value_thumbnails' },
    translated: { label: string(required), title: string(required), body: text(required) },
  },

  testimonials: {
    fields: { person_name: string(required) },
    files: { photo: {}, company_logo: {} },
    m2o: { project: 'projects' },
    translated: {
      quote: text(required),
      content: text({ ...required, max: 720 }),
      person_title: string(required),
    },
  },

  projects: {
    status: true,
    sort: true,
    fields: {
      start_date: date(required),
      end_date: date(),
      project_status: select(['completed', 'in_progress'], required),
      featured_on_home: boolean(),
    },
    files: { hero_image: {}, thumbnail: {}, seo_image: {} },
    m2o: {
      region: 'regions',
      cta_service: 'services',
      partner_tag: 'partners',
      contact: 'team_members',
      testimonial: 'testimonials',
    },
    m2m: {
      tags: 'tags',
      tools: 'tools',
      services: 'services',
      partners: 'partners',
      related_projects: 'projects',
    },
    o2m: { highlights: 'project_highlights', links: 'project_links' },
    translated: {
      title: string({ ...required, max: 90 }),
      slug: string(required),
      excerpt: text(required),
      body: html(),
      contact_role: string(),
      cta_heading: string(),
      cta_text: text(),
      cta_secondary_text: text(),
      ...seo,
    },
  },

  project_highlights: {
    sort: true,
    translated: { text: text({ ...required, max: 240 }) },
  },

  project_links: {
    sort: true,
    fields: {
      group: select(['tool', 'data', 'other'], required),
      url: string(required),
      disabled: boolean(),
    },
    translated: { label: string(required) },
  },

  publications: {
    status: true,
    fields: {
      type: select(['academic', 'blog', 'policy_brief', 'report'], required),
      publish_date: date(required),
      is_preprint: boolean(),
      doi: string(),
      citation_text: text(),
    },
    files: { hero_image: {}, thumbnail: {}, pdf: {}, seo_image: {} },
    m2o: {
      category: 'publication_categories',
      region: 'regions',
      contact: 'team_members',
      testimonial: 'testimonials',
      cta_service: 'services',
    },
    m2m: { tags: 'tags', related_publications: 'publications' },
    o2m: {
      authors: 'publication_authors',
      outputs: 'publication_outputs',
      links: 'publication_links',
    },
    translated: {
      title: string(required),
      slug: string(required),
      excerpt: text(required),
      highlights: text(),
      body: html(),
      journal_citation: text(),
      ...seo,
    },
  },

  publication_authors: {
    sort: true,
    fields: { name: string() },
    files: { photo: {} },
    m2o: { team_member: 'team_members' },
    translated: { title: string() },
  },

  publication_outputs: {
    sort: true,
    fields: { value: string(required) },
    files: { icon: {} },
    translated: { label: string(required) },
  },

  publication_links: {
    sort: true,
    fields: { group: select(['resource', 'link'], required), url: string() },
    files: { file: {} },
    translated: { label: string(required) },
  },

  events: {
    status: true,
    fields: {
      published_at: dateTime(required),
      event_date: date(required),
      start_time: time(required),
      end_time: time(),
      timezone: string(required),
      map_url: string(),
      registration_closes: date(),
      join_url: string(),
      calendar_url: string(),
      is_highlighted: boolean(),
      video_url: string(),
    },
    files: { poster: {}, highlight_media: {}, seo_image: {} },
    m2o: { type: 'event_types' },
    fileLists: ['gallery'],
    o2m: { contributors: 'event_contributors' },
    translated: {
      title: string(required),
      slug: string(required),
      brief: text(required),
      description: html(),
      location_region: string(required),
      location_address: text(),
      ...seo,
    },
  },

  event_contributors: {
    sort: true,
    fields: { name: string() },
    files: { photo: {} },
    m2o: { team_member: 'team_members' },
    translated: { title: string() },
  },

  cta_banners: {
    fields: {
      key: string({ ...required, unique: true }),
      tone: select(['red', 'light'], required),
    },
    files: { image: {} },
    o2m: { links: 'cta_banner_links' },
    translated: { heading: string(required), lead: text(), text: text(required) },
  },

  cta_banner_links: {
    sort: true,
    fields: {
      url: string(required),
      variant: select(['primary', 'outline', 'outline-light', 'white'], required),
    },
    translated: { label: string(required) },
  },

  site_settings: {
    singleton: true,
    fields: { site_name: string(required), contact_email: string(required), gtm_id: string() },
    files: { default_seo_image: {} },
    translated: { default_seo_title: string(required), default_seo_description: text(required) },
  },

  site_header: {
    singleton: true,
    fields: { contact_url: string(required), mega_footer_url: string(required) },
    files: { mega_menu_image: {} },
    o2m: { nav_groups: 'nav_groups' },
    translated: {
      contact_label: string(required),
      mega_footer_title: string(required),
      mega_footer_text: text(required),
    },
  },

  nav_groups: {
    sort: true,
    fields: { type: select(['list', 'mega'], required) },
    o2m: { links: 'nav_links' },
    translated: { label: string(required) },
  },

  nav_links: {
    sort: true,
    fields: { url: string(required) },
    files: { icon: {} },
    translated: { label: string(required), description: text() },
  },

  site_footer: {
    singleton: true,
    fields: { cta_email: string(required), cta_button_url: string(required) },
    o2m: { columns: 'footer_columns', legal_links: 'footer_legal_links' },
    translated: {
      blurb: text(required),
      copyright: string(required),
      cta_heading: string(required),
      cta_button_label: string(required),
    },
  },

  footer_columns: {
    sort: true,
    o2m: { links: 'footer_links' },
    translated: { title: string(required) },
  },

  footer_links: {
    sort: true,
    fields: { url: string(required) },
    translated: { label: string(required) },
  },

  footer_legal_links: {
    sort: true,
    fields: {
      action: select(['link', 'cookie_settings'], { ...required, default: 'link' }),
      url: string(),
    },
    translated: { label: string(required) },
  },

  home_page: {
    singleton: true,
    fields: {
      hero_primary_url: string(required),
      hero_secondary_url: string(required),
      vision_primary_url: string(required),
      vision_secondary_url: string(required),
      tools_url: string(required),
    },
    files: { vision_image: {}, seo_image: {} },
    o2m: {
      hero_slides: 'home_hero_slides',
      stats: 'home_stats',
      process_steps: 'home_process_steps',
    },
    translated: {
      hero_primary_label: string(required),
      hero_secondary_label: string(required),
      vision_tag: string(required),
      vision_statement: text(required),
      vision_text_1: text(required),
      vision_text_2: text(required),
      vision_primary_label: string(required),
      vision_secondary_label: string(required),
      services_tag: string(required),
      services_heading: text(required),
      services_button_label: string(required),
      tools_tag: string(required),
      tools_heading: text(required),
      tools_text_1: text(required),
      tools_text_2: text(required),
      tools_button_label: string(required),
      process_tag: string(required),
      process_heading: string(required),
      partners_label: string(required),
      networks_label: string(required),
      projects_tag: string(required),
      projects_heading: text(required),
      project_link_label: string(required),
      ...seo,
    },
  },

  home_hero_slides: {
    sort: true,
    files: { image: required },
    translated: {
      title: text(required),
      text_1: text(required),
      text_2: text(required),
      audience_label: string(required),
    },
  },

  home_stats: {
    sort: true,
    fields: { value: string(required) },
    files: { icon: {} },
    translated: { label: string(required) },
  },

  home_process_steps: {
    sort: true,
    fields: { tone: select(['brand-500', 'brand-700', 'brand-900'], required) },
    files: { image: required },
    translated: { title: string(required), body: html(required), footnote: text(required) },
  },
}
