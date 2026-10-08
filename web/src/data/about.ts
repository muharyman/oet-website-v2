import type { ImageMetadata } from 'astro'
import heroDesktop from '../assets/heroes/about-desktop.webp'
import heroMobile from '../assets/heroes/about-mobile.webp'
import mountain from '../assets/organization/about/mountain.jpg'
import autonomy from '../assets/organization/values/autonomy.jpg'
import collaboration from '../assets/organization/values/collaboration.jpg'
import humility from '../assets/organization/values/humility.jpg'
import recognition from '../assets/organization/values/recognition.jpg'
import transparency from '../assets/organization/values/transparency.jpg'
import trust from '../assets/organization/values/trust.jpg'
import transparencyMobile from '../assets/organization/values/transparency-186.webp'
import collaborationMobile from '../assets/organization/values/collaboration-186.webp'
import humilityMobile from '../assets/organization/values/humility-186.webp'
import trustMobile from '../assets/organization/values/trust-186.webp'
import autonomyMobile from '../assets/organization/values/autonomy-186.webp'
import recognitionMobile from '../assets/organization/values/recognition-186.webp'
import { departmentSlugs, routes } from './routes'

export interface AboutAction {
  label: string
  href: string
  variant: 'primary' | 'secondary'
  arrow: boolean
}

export interface InfoCard {
  image: ImageMetadata
  alt: string
  title: string
  paragraphs: string[]
  action: { label: string; href: string } | null
}

export interface Value {
  thumbnail: ImageMetadata
  thumbnailMobile: ImageMetadata
  label: string
  title: string
  body: string
}

export const meta = {
  title: 'About Us | Open Energy Transition',
  description:
    'Our vision is to accelerate the energy transition by enabling better, faster, and more trusted energy decisions globally with open-source software and open data solutions.',
}

export const hero = {
  title: 'Committed to Building Solutions For a Sustainable Global Future.',
  links: [{ label: 'About Us', href: '#about' }],
  image: { desktop: heroDesktop, mobile: heroMobile },
}

export const intro = {
  id: 'about',
  statement:
    'Our vision is to accelerate the energy transition by enabling better, faster, and more trusted energy decisions globally with open-source software and open data solutions.',
  paragraphs: [
    'We conduct research, develop open-source tools, and provide training to inform decision-making and address energy planning challenges. Founded in 2023, we have grown into a fully remote team of 50+ people across 21 countries',
    'Our team includes award-winning researchers and experienced energy modelers, united by a culture of transparency and collaboration. Registered in Germany, we are committed to building solutions for a sustainable global future.',
  ],
  actions: [
    { label: 'Our Team', href: routes.team, variant: 'primary', arrow: true },
    { label: 'Departments', href: routes.departments, variant: 'primary', arrow: true },
    { label: 'OET’s Handbook', href: routes.contact, variant: 'secondary', arrow: false },
  ] satisfies AboutAction[],
}

export const infoCards: InfoCard[] = [
  {
    image: mountain,
    alt: '',
    title: 'Aim',
    paragraphs: [
      'We aim to make open source the standard in energy planning by 2030. Ambitious, yet possible.',
    ],
    action: null,
  },
  {
    image: mountain,
    alt: '',
    title: 'Offers',
    paragraphs: [
      'We offer energy transition studies, open-source platforms, and training and support.',
      'If you are interested a collaboration, please reach out to us.',
    ],
    action: { label: 'Career', href: routes.career },
  },
]

export const featuredDepartments: readonly string[] = departmentSlugs

export const values = {
  tag: 'Core Values',
  title: 'At Open Energy Transition,\nWe Have 6 Main Values\nThat Guide Everything We Do.',
  subline: 'These serve as the foundation of why we are here and how we have an impact on society.',
  items: [
    {
      thumbnail: transparency,
      thumbnailMobile: transparencyMobile,
      label: 'Transparency',
      title: 'We strive to be as forthcoming with information as possible',
      body: 'With open, fluid communication channels, and clear feedback that travels in all directions. In this way, we remain internally aligned, and aligned with our clients and partners, such that we all have the opportunity to learn and grow.',
    },
    {
      thumbnail: collaboration,
      thumbnailMobile: collaborationMobile,
      label: 'Collaboration',
      title: 'We consist of autonomous and self-managed individuals.',
      body: 'OET is a fully independent organization where collaboration is core to our identity.  We are willing to work with anyone who shares our vision, and internally foster a culture of collaboration across roles, Teams, Departments, and projects.',
    },
    {
      thumbnail: humility,
      thumbnailMobile: humilityMobile,
      label: 'Humility',
      title: 'We try our best to always remain modest.',
      body: 'And, even if we know we are the best at something, to always remember that someone else might have a great idea we did not think of, and that their input is still valued. We are all about open discussions, continuous growth, open-mindedness, mutual respect, and being humble about our achievements.',
    },
    {
      thumbnail: trust,
      thumbnailMobile: trustMobile,
      label: 'Trust',
      title: 'We trust our partners, our clients, and our team members inherently.',
      body: 'We are building an open-source ecosystem, which requires many different organizations and people to play their part. This can only happen if we trust each other.',
    },
    {
      thumbnail: autonomy,
      thumbnailMobile: autonomyMobile,
      label: 'Autonomy',
      title: 'We give the freedom to do what we do best.',
      body: 'OET team members are highly skilled, with many holding PhDs. Team members have a very high level of autonomy. We give them the freedom to do what they do best.',
    },
    {
      thumbnail: recognition,
      thumbnailMobile: recognitionMobile,
      label: 'Recognition',
      title: 'Across our teams, our culture is about uplifting one another.',
      body: 'We make a point of publicly and privately voicing our appreciation contributions and successes – whether mutual or individual. Across our teams, our culture is about uplifting one another, celebrating our wins, and giving credit where it is due.',
    },
  ] satisfies Value[],
}
