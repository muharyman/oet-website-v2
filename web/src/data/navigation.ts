import { routes } from './routes'
export type HeaderTheme = 'light' | 'dark' | 'solid' | 'on-red'

export type ServiceIcon = 'pylon' | 'government' | 'engineer' | 'column' | 'research' | 'monitor'

export interface NavLink {
  label: string
  href: string
}

export interface NavServiceLink extends NavLink {
  description: string
  icon: ServiceIcon
}

export interface NavListGroup {
  kind: 'list'
  id: string
  label: string
  links: NavLink[]
}

export interface NavMegaGroup {
  kind: 'mega'
  id: string
  label: string
  links: NavServiceLink[]
  more: NavLink & { description: string }
}

export interface NavDirectLink {
  kind: 'link'
  id: string
  label: string
  href: string
}

export type NavGroup = NavListGroup | NavMegaGroup

export type MobileNavEntry = NavGroup | NavDirectLink

export interface Navigation {
  desktop: NavGroup[]
  mobile: MobileNavEntry[]
  contact: NavLink
  legal: NavLink[]
  consentLabel: string
  copyright: string
}

const toolsAndData: NavListGroup = {
  kind: 'list',
  id: 'tools-and-data',
  label: 'Tools & Data',
  links: [
    { label: 'Our Tools', href: routes.toolsAndData },
    { label: 'Models', href: routes.toolsCategory('models') },
    { label: 'Data', href: routes.toolsCategory('data') },
    { label: 'Open-Source Solver', href: routes.toolsCategory('open-source-solvers') },
    { label: 'Community', href: routes.toolsCategory('community') },
  ],
}

const services: NavMegaGroup = {
  kind: 'mega',
  id: 'services',
  label: 'Services',
  links: [
    {
      label: 'System Operators & Utilities',
      description:
        'We support model and data development, software deployment, validation, benchmarking, training, maintenance',
      href: routes.service('system-operators-and-utilities'),
      icon: 'pylon',
    },
    {
      label: 'Consultancies & Engineering Firm',
      description:
        'Add specialist open-source modelling, software and data capabilities to your client offer.',
      href: routes.service('consultancies-and-engineering-firms'),
      icon: 'engineer',
    },
    {
      label: 'Think Tanks, NGOs & Research Organizations',
      description:
        'We support model and data development, software deployment, validation, benchmarking, training, maintenance',
      href: routes.service('think-tanks-ngos-and-research-organizations'),
      icon: 'research',
    },
    {
      label: 'Regulators & Public Authorities',
      description:
        'Build independent and transparent analytical capabilities for energy policy, regulation and infrastructure assessment.',
      href: routes.service('regulators-and-public-authorities'),
      icon: 'government',
    },
    {
      label: 'Foundations & Development Partners',
      description:
        'Strengthen the shared tools, data and institutional capacity needed for transparent energy planning to spread.',
      href: routes.service('foundations-and-development-partners'),
      icon: 'column',
    },
    {
      label: 'Technology Developers & Investors',
      description:
        'We support model and data development, software deployment, validation, benchmarking, training, maintenance',
      href: routes.service('technology-developers-and-investors'),
      icon: 'monitor',
    },
  ],
  more: {
    label: 'Learn More About Our Service',
    description:
      'We support the full journey, from assessing suitable tools and use cases to building and integrating the components required for institutional use',
    href: routes.services,
  },
}

const servicesStacked: NavMegaGroup = {
  ...services,
  links: [0, 3, 1, 4, 2, 5].map((index) => services.links[index]),
}

const outputs: NavListGroup = {
  kind: 'list',
  id: 'outputs',
  label: 'Outputs',
  links: [
    { label: 'Success Stories', href: routes.successStories },
    { label: 'Publications', href: routes.publications },
    { label: 'Blogs', href: routes.blogs },
    { label: 'Policy Briefs', href: routes.policyBriefs },
    { label: 'Reports', href: routes.reports },
  ],
}

const organization: NavListGroup = {
  kind: 'list',
  id: 'organization',
  label: 'Organization',
  links: [
    { label: 'About Us', href: routes.about },
    { label: 'Department', href: routes.departments },
    { label: 'Partner', href: routes.partners },
    { label: 'Our Team', href: routes.team },
    { label: 'Career', href: routes.career },
    { label: 'News & Events', href: routes.newsAndEvents },
    { label: 'Theory of Change', href: routes.theoryOfChange },
  ],
}

const solutions: NavListGroup = {
  kind: 'list',
  id: 'solutions',
  label: 'Solutions',
  links: [
    { label: 'Projects', href: routes.successStories },
    { label: 'Success Stories', href: routes.successStories },
  ],
}

export const navigation: Navigation = {
  desktop: [toolsAndData, services, outputs, organization],
  mobile: [
    { kind: 'link', id: 'tools-and-data', label: 'Tools & Data', href: routes.toolsAndData },
    solutions,
    servicesStacked,
    outputs,
    organization,
  ],
  contact: { label: 'Contact Us', href: 'mailto:info@openenergytransition.org' },
  legal: [
    { label: 'Legal', href: routes.legal },
    { label: 'Privacy Statement', href: routes.privacyStatement },
    { label: 'Disclaimer', href: routes.disclaimer },
  ],
  consentLabel: 'Cookie Settings',
  copyright: '© 2026 Open Energy Transition gGmbH. All rights reserved.',
}
