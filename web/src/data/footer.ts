import { routes } from './routes'
export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterCtaContent {
  headline: string[]
  email: FooterLink
  action: FooterLink
}

export interface FooterContent {
  cta: FooterCtaContent
  blurb: string
  copyright: string
  legal: FooterLink[]
  consentLabel: string
  consentLabelCompact: string
  columns: FooterColumn[]
}

export const footer: FooterContent = {
  cta: {
    headline: ['Energy Transition', 'Starts Now.'],
    email: {
      label: 'info@openenergytransition.org',
      href: 'mailto:info@openenergytransition.org',
    },
    action: { label: 'Send an Inquiry', href: 'mailto:info@openenergytransition.org' },
  },
  blurb:
    'Open Energy Transition is a registered nonprofit dedicated to accelerating the energy transition by tackling energy planning challenges.',
  copyright: '© 2026 Open Energy Transition gGmbH. All rights reserved.',
  legal: [
    { label: 'Legal', href: routes.legal },
    { label: 'Disclaimer', href: routes.disclaimer },
    { label: 'Privacy Statement', href: routes.privacyStatement },
  ],
  consentLabel: 'Cookies Settings',
  consentLabelCompact: 'Cookie Settings',
  columns: [
    {
      title: 'Tools & Data',
      links: [
        { label: 'Our Tools', href: routes.toolsAndData },
        { label: 'Models', href: routes.toolsCategory('models') },
        { label: 'Data', href: routes.toolsCategory('data') },
        { label: 'Open-Source Solver', href: routes.toolsCategory('open-source-solvers') },
        { label: 'Community', href: routes.toolsCategory('community') },
      ],
    },
    {
      title: 'Services',
      links: [
        {
          label: 'System Operators & Utilities',
          href: routes.service('system-operators-and-utilities'),
        },
        {
          label: 'Consultancies & Engineering Firm',
          href: routes.service('consultancies-and-engineering-firms'),
        },
        {
          label: 'Think Tanks, NGOs & Research Organizations',
          href: routes.service('think-tanks-ngos-and-research-organizations'),
        },
        {
          label: 'Regulators & Public Authorities',
          href: routes.service('regulators-and-public-authorities'),
        },
        {
          label: 'Foundations & Development Partners',
          href: routes.service('foundations-and-development-partners'),
        },
        {
          label: 'Technology Developers & Investors',
          href: routes.service('technology-developers-and-investors'),
        },
      ],
    },
    {
      title: 'Outputs',
      links: [
        { label: 'Success Stories', href: routes.successStories },
        { label: 'Completed Success Stories', href: routes.successStoriesByStatus('completed') },
        { label: 'Ongoing Success Stories', href: routes.successStoriesByStatus('ongoing') },
        { label: 'Academic Publication', href: routes.publications },
        { label: 'Blogs', href: routes.blogs },
        { label: 'Policy Briefs', href: routes.policyBriefs },
        { label: 'Reports', href: routes.reports },
      ],
    },
    {
      title: 'Organization',
      links: [
        { label: 'About Us', href: routes.about },
        { label: 'Department', href: routes.departments },
        { label: 'Partner', href: routes.partners },
        { label: 'Our Team', href: routes.team },
        { label: 'Career', href: routes.career },
        { label: 'Theory of Change', href: routes.theoryOfChange },
        { label: 'News & Events', href: routes.newsAndEvents },
      ],
    },
  ],
}
