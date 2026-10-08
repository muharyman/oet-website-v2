import type { PartnerTag } from '../components/cards/types'
import { partnerTags } from './partnerTags'
import type { ImageMetadata } from 'astro'
import heroEfuels from '../assets/outputs/hero-e-fuels-in-australia.webp'
import heroStorage from '../assets/outputs/hero-energy-storage-germany.webp'
import heroGoogle from '../assets/outputs/hero-google-guarantee-of-origin.webp'
import heroGrid from '../assets/outputs/hero-grid-modelling-electrofuels.webp'
import heroMultiCountry from '../assets/outputs/hero-multi-country-electricity-transition.webp'
import heroOpenmod from '../assets/outputs/hero-openmod-meets-usa-2023.webp'
import heroTauritron from '../assets/outputs/hero-project-tauritron.webp'
import heroTraining from '../assets/outputs/hero-pypsa-training-session.webp'
import heroHydrogen from '../assets/outputs/hero-sustainable-hydrogen.webp'
import heroWallonia from '../assets/outputs/hero-wallonia-energy-plan.webp'
import thumbEfuels from '../assets/outputs/thumb-e-fuels-in-australia.webp'
import thumbStorage from '../assets/outputs/thumb-energy-storage-germany.webp'
import thumbGeothermal from '../assets/outputs/thumb-geothermal-resource-potential.webp'
import thumbGoogle from '../assets/outputs/thumb-google-guarantee-of-origin.webp'
import thumbGrid from '../assets/outputs/thumb-grid-modelling-electrofuels.webp'
import thumbMultiCountry from '../assets/outputs/thumb-multi-country-electricity-transition.webp'
import thumbOpenmod from '../assets/outputs/thumb-openmod-meets-usa-2023.webp'
import thumbTauritron from '../assets/outputs/thumb-project-tauritron.webp'
import thumbTraining from '../assets/outputs/thumb-pypsa-training-session.webp'
import thumbHydrogen from '../assets/outputs/thumb-sustainable-hydrogen.webp'
import thumbWallonia from '../assets/outputs/thumb-wallonia-energy-plan.webp'
import type { FrameTone } from '../components/cards/types'
import {
  contact,
  cta,
  partnerLogos,
  testimonials,
  type CtaContent,
  type LinkGroup,
  type PartnerLogo,
  type Person,
  type ServiceSlug,
  type Testimonial,
} from './outputs'
import { routes } from './routes'

export interface PartnerLink {
  label: string
  href: string
}

export interface ProjectDetail {
  highlights: string[]
  tools: string[]
  services: string[]
  start: string
  rangeWord: string
  end: string
  status: string
  region: string
  tags: string[]
  body: string
  linkGroups: LinkGroup[]
  contact: Person
  partners: PartnerLogo[]
  testimonial: Testimonial[]
  related: string[]
  cta: CtaContent
  service: ServiceSlug
}

export interface Project {
  slug: string
  title: string
  excerpt: string
  period: string
  thumbnail: ImageMetadata
  hero: ImageMetadata
  alt: string
  frame: FrameTone
  partnerTag: PartnerTag | null
  partnerLink: PartnerLink | null
  detail: ProjectDetail
}

const link = (label: string, disabled: boolean, truncate: boolean) => ({
  label: [{ text: label, underline: true }],
  truncate,
  href: routes.contact,
  disabled,
  newTab: false,
})

const exampleDetail: ProjectDetail = {
  highlights: [
    'Strengthens Australia’s energy security by reducing reliance on imported fuels.',
    'Identifies opportunities for locally produced green ammonia and methanol.',
    'Supports more informed e-fuel policies through open, transparent modelling.',
    'Helps decision-makers explore economic impacts under different energy scenarios. Demonstrates how OET and PyPSA-Earth can accelerate a resilient net-zero transition.',
  ],
  tools: ['PyPSA', 'Openmod-tracker', 'Detect-Infra'],
  services: ['SoftwareDevelopment', 'Open-source migration', 'Train and support'],
  start: 'May 1, 2026',
  rangeWord: 'to',
  end: 'May 1, 2026',
  status: 'Completed',
  region: 'Australia/Oceania',
  tags: ['#SoftwareDevelopment', '#Tags'],
  body: `<h2>Develops an open, PyPSA-Earth-based model <br class="max-lg:hidden">for Australia</h2>
<p>Australia is heavily reliant on imported fuel while, at the same time, having an abundance of solar and wind resources. This creates significant potential for producing and using e-fuels such as e-methanol and e-ammonia as replacements for traditional gas oil and ammonia-based fertilizers, respectively.</p>
<p>When produced using clean hydrogen and electricity, both are net-zero in terms of carbon emissions as the CO₂ released during use is captured during production. Investment in local production of synthetic fuel is a way to hedge against the risks of international price volatility, increasing the economic value of fuels by creating local jobs.</p>
<p>This project develops an open, PyPSA-Earth-based model for Australia. Its easy-to-use app provides a graphic user interface to change the required model inputs, and enables users to explore the economic benefits of switching to e-fuels such as e-ammonia and e-methanol in case of oil import price shocks.</p>
<h3>Project Aims</h3>
<p>Support communication with the Government of Australia to identify potential policy issues from a security of supply perspective especially for eFuels covering green Ammonia and green Methanol</p>
<p>Use PyPSA-Earth to model the eFuel demand of Australia. Within this project, eFuel reflects Ammonia (for use within fertilizers production) and Methanol (for use within diesel replacement).</p>
<p>Prepare a simple Streamlit interface for direct interaction with the model (e.g., capex assumptions, e-fuel share of production)</p>`,
  linkGroups: [
    {
      title: 'Tools',
      links: [
        link('Openmod-tracker', false, false),
        link('Power Net Zero', false, false),
        link('Open Energy Benchmark', false, false),
      ],
    },
    { title: 'Data', links: [link('Dataset A', true, false), link('Dataset B', false, false)] },
    {
      title: 'Links',
      links: [
        link('Repository', false, false),
        link('Interact With The Model (Streamlit)', false, true),
      ],
    },
  ],
  contact,
  partners: partnerLogos,
  testimonial: testimonials.single,
  related: [
    'e-fuels-in-australia',
    'openmod-meets-usa-2023',
    'exploring-the-geothermal-resource-potential-in-the-us',
    'exploring-the-geothermal-resource-potential-in-the-us',
  ],
  cta,
  service: 'consultancies-and-engineering-firms',
}

const period = 'MM/YYYY - MM/YYYY'

const icct: PartnerLink = {
  label: 'International Council on Clean Transportation',
  href: 'https://theicct.org',
}

export const projects: Project[] = [
  {
    slug: 'e-fuels-in-australia',
    title: 'E-fuels in Australia',
    excerpt:
      'Supporting communication for the Government of Australia to identify potential policy issues from a security of supply perspective',
    period,
    thumbnail: thumbEfuels,
    hero: heroEfuels,
    alt: '',
    frame: 'bright',
    partnerTag: partnerTags.eskom,
    partnerLink: null,
    detail: exampleDetail,
  },
  {
    slug: 'openmod-meets-usa-2023',
    title: 'Openmod meets USA 2023',
    excerpt:
      "Held in collaboration with Stanford's Bits & Watts Initiative, this event reignited the passion for open energy modelling, a domain where openmod has been a pioneering grassroots movement.",
    period,
    thumbnail: thumbOpenmod,
    hero: heroOpenmod,
    alt: '',
    frame: 'brand-800',
    partnerTag: partnerTags.stanford,
    partnerLink: null,
    detail: exampleDetail,
  },
  {
    slug: 'exploring-the-geothermal-resource-potential-in-the-us',
    title: 'Exploring the Geothermal Resource Potential in the U.S.',
    excerpt: 'Viability Assessment of Geothermal Using Integrated Energy Planning',
    period,
    thumbnail: thumbGeothermal,
    hero: heroEfuels,
    alt: '',
    frame: 'brand-500',
    partnerTag: null,
    partnerLink: null,
    detail: exampleDetail,
  },
  {
    slug: 'sustainable-hydrogen-and-power-to-x-ramp-up-in-africa',
    title: 'Sustainable Hydrogen and Power-to-X ramp-up in Africa',
    excerpt:
      'strengthening the global perspective of energy research, advancing sector coupling in the energy transition, and harnessing digitization to enhance energy systems',
    period,
    thumbnail: thumbHydrogen,
    hero: heroHydrogen,
    alt: '',
    frame: 'brand-600',
    partnerTag: null,
    partnerLink: null,
    detail: exampleDetail,
  },
  {
    slug: 'project-tauritron',
    title: 'Project Tauritron',
    excerpt:
      'This project will improve how people interact with energy data, enable simple calculations and visualizations, promote public engagement, and improve human-centered decision making.',
    period,
    thumbnail: thumbTauritron,
    hero: heroTauritron,
    alt: '',
    frame: 'brand-900',
    partnerTag: null,
    partnerLink: null,
    detail: exampleDetail,
  },
  {
    slug: 'google-guarantee-of-origin-study',
    title: 'Google Guarantee of Origin Study',
    excerpt: 'Exploring green energy in Europe for the world’s largest companies',
    period,
    thumbnail: thumbGoogle,
    hero: heroGoogle,
    alt: '',
    frame: 'brand-500',
    partnerTag: partnerTags.google,
    partnerLink: { label: 'Google.com', href: 'https://www.google.com' },
    detail: exampleDetail,
  },
  {
    slug: 'grid-modelling-to-assess-electrofuels-supply-potential',
    title: 'Grid Modelling to Assess Electrofuels Supply Potential',
    excerpt: 'Evaluating the impact of electrofuels adoption in the US on the electricity grid',
    period,
    thumbnail: thumbGrid,
    hero: heroGrid,
    alt: '',
    frame: 'brand-500',
    partnerTag: null,
    partnerLink: icct,
    detail: exampleDetail,
  },
  {
    slug: 'wallonia-energy-plan',
    title: 'Wallonia Energy Plan',
    excerpt: 'Open modeling to inform regional policy design and compare transition pathways',
    period,
    thumbnail: thumbWallonia,
    hero: heroWallonia,
    alt: '',
    frame: 'brand-500',
    partnerTag: null,
    partnerLink: null,
    detail: exampleDetail,
  },
  {
    slug: 'multi-country-electricity-transition-potential-and-challenges-project',
    title: 'Multi-Country Electricity Transition Potential and Challenges Project',
    excerpt: 'Training and supporting modelling teams in 10 countries',
    period,
    thumbnail: thumbMultiCountry,
    hero: heroMultiCountry,
    alt: '',
    frame: 'brand-700',
    partnerTag: null,
    partnerLink: null,
    detail: exampleDetail,
  },
  {
    slug: 'the-role-of-energy-storage-in-germany',
    title: 'The Role of Energy Storage in Germany',
    excerpt:
      'Quantification of energy storage benefits in reducing carbon emissions in the German electricity system',
    period,
    thumbnail: thumbStorage,
    hero: heroStorage,
    alt: '',
    frame: 'brand-800',
    partnerTag: null,
    partnerLink: icct,
    detail: exampleDetail,
  },
  {
    slug: 'comprehensive-pypsa-training-session',
    title: 'Comprehensive PyPSA Training Session',
    excerpt: 'Equipping energy professionals with advanced skills of open source energy modeling',
    period,
    thumbnail: thumbTraining,
    hero: heroTraining,
    alt: '',
    frame: 'brand-500',
    partnerTag: null,
    partnerLink: null,
    detail: exampleDetail,
  },
]

export const projectBySlug = (slug: string): Project => {
  const project = projects.find((item) => item.slug === slug)
  if (!project) throw new Error(`Unknown project: ${slug}`)
  return project
}

export const successStories = {
  meta: {
    title: 'Success Stories | Open Energy Transition',
    description:
      'Discover our innovative projects driving the energy transition towards a sustainable future with open-source and open data.',
  },
  hero: {
    title: 'Driving The Energy Transition With Open-Source & Open Data',
    links: [{ label: 'Success Stories', href: '#success-stories' }],
  },
  listing: {
    id: 'success-stories',
    title: 'Success Stories',
    description:
      'Discover our innovative projects driving the energy transition \ntowards a sustainable future with open-source and open data',
    tabs: [
      { label: 'Completed', href: routes.successStories, active: true },
      { label: 'In Progress', href: routes.successStories, active: false },
    ],
    mobilePageSize: 6,
    items: [
      'e-fuels-in-australia',
      'openmod-meets-usa-2023',
      'exploring-the-geothermal-resource-potential-in-the-us',
      'sustainable-hydrogen-and-power-to-x-ramp-up-in-africa',
      'project-tauritron',
      'google-guarantee-of-origin-study',
      'grid-modelling-to-assess-electrofuels-supply-potential',
      'wallonia-energy-plan',
      'multi-country-electricity-transition-potential-and-challenges-project',
      'the-role-of-energy-storage-in-germany',
      'comprehensive-pypsa-training-session',
    ],
  },
}
