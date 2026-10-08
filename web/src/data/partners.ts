import type { ImageMetadata } from 'astro'
import type { SvgComponent } from 'astro/types'
import heroDesktop from '../assets/heroes/partners-desktop.webp'
import heroMobile from '../assets/heroes/partners-mobile.webp'
import agora from '../assets/home/logos/agora.png'
import ember from '../assets/home/logos/ember.png'
import icct from '../assets/home/logos/icct.png'
import oth from '../assets/home/logos/oth-regensburg.png'
import quadrature from '../assets/home/logos/quadrature.png'
import sequoia from '../assets/home/logos/sequoia.png'
import stanford from '../assets/home/logos/stanford.png'
import transnetbw from '../assets/home/logos/transnetbw.png'
import Employees from '../icons/employees.svg'
import GlobeAlt from '../icons/globe-alt.svg'
import Handshake from '../icons/handshake.svg'
import { routes } from './routes'

export interface PartnerLogo {
  name: string
  image: ImageMetadata
  width: number
  height: number
}

export interface PartnerStat {
  icon: SvgComponent
  tone: 'brand' | 'light'
  value: string
  label: string
}

export const meta = {
  title: 'Partners | Open Energy Transition',
  description:
    'Our partners and funders expertise, and commitment enable us to accelerate the energy transition.',
}

export const hero = {
  title:
    'Partnerships and Funding Powers OET’s Vision to Lasting Change for Communities Worldwide.',
  image: { desktop: heroDesktop, mobile: heroMobile },
  stats: [
    { icon: GlobeAlt, tone: 'brand', value: '9', label: 'Country' },
    { icon: Employees, tone: 'light', value: '99', label: 'Partners' },
    { icon: Handshake, tone: 'light', value: '999', label: 'Funders' },
  ] satisfies PartnerStat[],
}

export const intro = {
  statement:
    'Our partners and funders expertise, and commitment enable us to accelerate the energy transition.',
  paragraphs: [
    'Their commitment turns shared ambition into meaningful action, expands our reach, and creates lasting impact in communities around the world.',
    'Together, we are building a more inclusive and sustainable future—bringing OET’s vision to communities around the world.',
  ],
}

export const filter = {
  options: [
    { label: 'Funders', href: `${routes.partners}?type=funders`, active: false },
    { label: 'Partners', href: `${routes.partners}?type=partners`, active: false },
  ],
}

const upperRow: PartnerLogo[] = [
  { name: 'Agora Energiewende', image: agora, width: 93, height: 40 },
  { name: 'International Council on Clean Transportation', image: icct, width: 99, height: 59 },
  { name: 'Sequoia Climate Foundation', image: sequoia, width: 127, height: 40 },
  { name: 'Quadrature Climate Foundation', image: quadrature, width: 133, height: 40 },
]

const lowerRow: PartnerLogo[] = [
  { name: 'Stanford University', image: stanford, width: 117, height: 52 },
  { name: 'TransnetBW', image: transnetbw, width: 145, height: 18 },
  { name: 'OTH Regensburg', image: oth, width: 93, height: 61 },
  { name: 'Ember', image: ember, width: 93, height: 40 },
]

const repeat = <Item>(items: Item[], times: number) =>
  Array.from({ length: times }, () => items).flat()

export const logos: PartnerLogo[] = repeat([...upperRow, ...lowerRow], 3)

export const logosMobile: PartnerLogo[] = repeat(
  upperRow.flatMap((logo, index) => [logo, lowerRow[index]]),
  2,
)
