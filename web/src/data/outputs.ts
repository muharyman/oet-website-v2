import type { ImageMetadata } from 'astro'
import type { SvgComponent } from 'astro/types'
import authorPhoto from '../assets/outputs/author-photo.webp'
import contactPhoto from '../assets/outputs/contact-photo.webp'
import partnerLogo from '../assets/outputs/partner-logo-placeholder.png'
import serviceConsultancies from '../assets/outputs/service-consultancies.webp'
import serviceConsultanciesMobile from '../assets/outputs/service-consultancies-mobile.webp'
import serviceFoundations from '../assets/outputs/service-foundations.webp'
import serviceRegulators from '../assets/outputs/service-regulators.webp'
import serviceSystemOperators from '../assets/outputs/service-system-operators.webp'
import serviceTechnology from '../assets/outputs/service-technology.webp'
import serviceThinkTanks from '../assets/outputs/service-think-tanks.webp'
import testimonialLogo from '../assets/outputs/testimonial-logo.png'
import testimonialPortrait from '../assets/outputs/testimonial-portrait.webp'
import ArchitectPlan from '../icons/architect-plan.svg'
import DiscussionIdea from '../icons/discussion-idea.svg'
import FamilyLaw from '../icons/family-law.svg'
import LeadershipAlt from '../icons/leadership-alt.svg'
import UserHeadset from '../icons/user-headset.svg'
import WomanScientist from '../icons/woman-scientist.svg'
import type { Locale } from '../i18n/config'
import { sortOptions } from '../i18n/groups'
import { t } from '../i18n/ui'
import { routes, serviceSlugs } from './routes'

export interface Testimonial {
  quote: string
  name: string
  role: string
  portrait: ImageMetadata
  logo: ImageMetadata
  company: string
  paragraphs: string[]
}

export interface LinkLabelPart {
  text: string
  underline: boolean
}

export interface LinkGroup {
  title: string
  links: {
    label: LinkLabelPart[]
    truncate: boolean
    href: string
    disabled: boolean
    newTab: boolean
  }[]
}

export interface Person {
  name: string
  title: string
  photo: ImageMetadata
  role: string | null
  links: { kind: 'profile' | 'github' | 'linkedin'; href: string; label: string }[]
}

export interface PartnerLogo {
  name: string
  image: ImageMetadata
}

export type ServiceSlug = (typeof serviceSlugs)[number]

export interface ServiceCta {
  icon: SvgComponent
  iconTone: 'brand-500' | 'brand-600' | 'brand-700' | 'brand-800'
  frame: 'brand-500' | 'brand-600'
  title: string
  paragraphs: string[]
  link: { label: string; href: string }
  image: ImageMetadata
  imageMobile: ImageMetadata | null
}

export interface CtaContent {
  heading: string
  primary: string
  secondary: string
  actions: { label: string; href: string; emphasis: 'primary' | 'secondary' }[]
}

const choices = (all: string, values: string[]) => [
  { value: 'all', label: all },
  ...values.map((value) => ({ value: value.toLowerCase().replaceAll(' ', '-'), label: value })),
]

export const filters = (locale: Locale, prefix: string) => [
  {
    id: `${prefix}-filter-region`,
    label: t(locale, 'filter.region'),
    selected: 'all',
    options: choices(t(locale, 'filter.region.all'), [
      'Africa',
      'Asia',
      'Australia/Oceania',
      'Europe',
      'North America',
    ]),
  },
  {
    id: `${prefix}-filter-service`,
    label: t(locale, 'filter.services'),
    selected: 'all',
    options: choices(t(locale, 'filter.services.all'), [
      'Open-source migration',
      'SoftwareDevelopment',
      'Train and support',
    ]),
  },
  {
    id: `${prefix}-filter-product`,
    label: t(locale, 'filter.products'),
    selected: 'all',
    options: choices(t(locale, 'filter.products.all'), [
      'PyPSA',
      'Openmod-tracker',
      'Detect-Infra',
    ]),
  },
  {
    id: `${prefix}-filter-tag`,
    label: t(locale, 'filter.tags'),
    selected: 'all',
    options: choices(t(locale, 'filter.tags.all'), ['SoftwareDevelopment', 'Tags']),
  },
]

export const sort = (locale: Locale, prefix: string) => ({
  id: `${prefix}-sort`,
  label: t(locale, 'filter.sort'),
  prefix: t(locale, 'filter.sort'),
  selected: 'a-z',
  options: sortOptions(locale, ['a-z', 'z-a', 'newest', 'oldest']),
})

export const pagination = { current: 1, total: 10 }

const testimonial: Testimonial = {
  quote:
    '“I particularly appreciated the hands-on structure that allowed us to actively apply PyPSA in realistic modelling scenarios.”',
  name: 'Ntathu Masimula',
  role: 'Senior Environmental Scientist, Eskom',
  portrait: testimonialPortrait,
  logo: testimonialLogo,
  company: 'Eskom',
  paragraphs: [
    'The workshop exceeded my expectations in both content and delivery. I particularly appreciated the hands-on structure that allowed us to actively apply PyPSA in realistic modelling scenarios.',
    'The facilitation team created a collaborative environment where technical professionals and market analysts could learn from each other, something I found both rare and highly enriching.',
    'The training made a compelling case for using open-source modelling in African contexts especially where resource constraints limit access to commercial software. I was particularly inspired by the transparency and replicability that open-source platforms like PyPSA offer.',
  ],
}

export const testimonials = {
  heading: 'Partners & Clients Testimonials',
  subline: "Don't just listen to us. This is what our partners and clients say",
  items: [testimonial, testimonial, testimonial],
  single: [testimonial],
}

export const contact: Person = {
  name: 'Dr. Markus Groissbock',
  title: 'Project Director & Senior Energy System Modeler | Power-to-X (Team Lead)',
  photo: contactPhoto,
  role: 'Project Lead',
  links: [
    { kind: 'profile', href: routes.contact, label: 'Profile of Dr. Markus Groissbock' },
    { kind: 'github', href: routes.contact, label: 'GitHub of Dr. Markus Groissbock' },
    { kind: 'linkedin', href: routes.contact, label: 'LinkedIn of Dr. Markus Groissbock' },
  ],
}

export const authors: Person[] = [1, 2, 3].map(() => ({
  name: 'Dr. Martha Maria Frysztacki Name Here 2 Line Max',
  title: 'Title in OET/Company Here 1 Line Maximum Lorem ipsum dolor',
  photo: authorPhoto,
  role: null,
  links: [],
}))

export const partnerLogos: PartnerLogo[] = [1, 2, 3, 4, 5, 6].map(() => ({
  name: 'Climact',
  image: partnerLogo,
}))

export const cta: CtaContent = {
  heading: 'Discuss a Technology Modelling Need',
  primary:
    'Talk to our team about a technology, dataset or repeatable analytical tool that should be represented transparently in energy system planning.',
  secondary:
    'or check the relevant services curated for you on your right* adjust secondary CTA here.',
  actions: [
    { label: 'Contact Us', href: routes.contact, emphasis: 'primary' },
    { label: 'Request a Demo', href: routes.contact, emphasis: 'secondary' },
  ],
}

const serviceLink = (slug: ServiceSlug, name: string) => ({
  label: `Explore services for ${name}`,
  href: routes.service(slug),
})

export const serviceCtas: Record<ServiceSlug, ServiceCta> = {
  'system-operators-and-utilities': {
    icon: UserHeadset,
    iconTone: 'brand-500',
    frame: 'brand-500',
    title: 'System Operators and Utilities',
    paragraphs: [
      'Use open-source tools for complex planning workflows while meeting institutional requirements for security, reliability, performance and integration.',
      'We support model and data development, software deployment, validation, benchmarking, training, maintenance and ongoing technical support.',
    ],
    link: serviceLink('system-operators-and-utilities', 'System Operators and Utilities'),
    image: serviceSystemOperators,
    imageMobile: null,
  },
  'regulators-and-public-authorities': {
    icon: FamilyLaw,
    iconTone: 'brand-600',
    frame: 'brand-500',
    title: 'Regulators and Public Authorities',
    paragraphs: [
      'Build independent and transparent analytical capabilities for energy policy, regulation and infrastructure assessment.',
      'We help public institutions select and adopt appropriate tools, establish reliable data and modelling workflows, train internal teams and assess plans using reproducible methods.',
    ],
    link: serviceLink('regulators-and-public-authorities', 'Regulators and Public Authorities'),
    image: serviceRegulators,
    imageMobile: null,
  },
  'consultancies-and-engineering-firms': {
    icon: DiscussionIdea,
    iconTone: 'brand-500',
    frame: 'brand-500',
    title: 'Consultancies and Engineering Firms',
    paragraphs: [
      'Add specialist open-source modelling, software and data capabilities to your client offer.',
      'We work as a technical partner on bids and projects, provide advanced modelling and software development, and help consulting teams build their own capacity to support open-source tools.',
    ],
    link: serviceLink('consultancies-and-engineering-firms', 'Consultancies and Engineering Firms'),
    image: serviceConsultancies,
    imageMobile: serviceConsultanciesMobile,
  },
  'foundations-and-development-partners': {
    icon: LeadershipAlt,
    iconTone: 'brand-700',
    frame: 'brand-600',
    title: 'Foundations and Development Partners',
    paragraphs: [
      'Strengthen the shared tools, data and institutional capacity needed for transparent energy planning to spread.',
      'We design and deliver programmes that improve open-source infrastructure, close data and software gaps, support adoption by influential institutions and develop local delivery ecosystems.',
    ],
    link: serviceLink(
      'foundations-and-development-partners',
      'Foundations and Development Partners',
    ),
    image: serviceFoundations,
    imageMobile: null,
  },
  'think-tanks-ngos-and-research-organizations': {
    icon: WomanScientist,
    iconTone: 'brand-500',
    frame: 'brand-500',
    title: 'Think Tanks, NGOs and Research Orgs.',
    paragraphs: [
      'Develop credible open models, datasets and analytical workflows that can be scrutinised, reused and maintained.',
      'We support tool development, applied modelling, data infrastructure, quality assurance, training and strategies for publishing and sustaining open-source work.',
    ],
    link: serviceLink(
      'think-tanks-ngos-and-research-organizations',
      'Think Tanks, NGOs and Research Orgs.',
    ),
    image: serviceThinkTanks,
    imageMobile: null,
  },
  'technology-developers-and-investors': {
    icon: ArchitectPlan,
    iconTone: 'brand-600',
    frame: 'brand-600',
    title: 'Technology Developers and Investors',
    paragraphs: [
      'Apply transparent energy system modelling to investment or design questions.',
      'We develop transparent methods, datasets and tools to assess system value, infrastructure requirements and performance under future scenarios, working alongside commercial advisors where broader project or investment analysis is required.',
    ],
    link: serviceLink('technology-developers-and-investors', 'Technology Developers and Investors'),
    image: serviceTechnology,
    imageMobile: null,
  },
}
