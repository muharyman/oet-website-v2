import type { ImageMetadata } from 'astro'
import heroDesktop from '../assets/heroes/team-desktop.webp'
import heroMobile from '../assets/heroes/team-mobile.webp'
import andrisPrindulis from '../assets/team/andris-prindulis.webp'
import countryCard from '../assets/team/country-card.webp'
import fabrizioFinozzi from '../assets/team/fabrizio-finozzi.webp'
import harryVanDerWeijde from '../assets/team/harry-van-der-weijde.webp'
import hazemAbdelKhalek from '../assets/team/hazem-abdel-khalek.webp'
import jatmikoHerjati from '../assets/team/jatmiko-herjati.webp'
import kristijanFaust from '../assets/team/kristijan-faust.webp'
import laurenClisby from '../assets/team/lauren-clisby.webp'
import marthaMariaFrysztacki from '../assets/team/martha-maria-frysztacki.webp'
import maximilianParzen from '../assets/team/maximilian-parzen.webp'
import quintinCoetzee from '../assets/team/quintin-coetzee.webp'
import shantiChellaram from '../assets/team/shanti-chellaram.webp'
import siddharthKrishna from '../assets/team/siddharth-krishna.webp'
import snoopyF from '../assets/team/snoopy-f.webp'
import stefanRadnev from '../assets/team/stefan-radnev.webp'
import tobiasAugspurger from '../assets/team/tobias-augspurger.webp'
import type { SortValue } from '../i18n/groups'
import { routes } from './routes'

export type SocialKind = 'email' | 'github' | 'linkedin' | 'message'

export interface PortraitBox {
  x: number
  y: number
  width: number
  height: number
}

export interface Portrait {
  image: ImageMetadata
  desktop: PortraitBox
  mobile: PortraitBox
  rotate: number
}

export interface TeamMember {
  name: string
  role: string
  portrait: Portrait
  glow: 'center' | 'right'
  links: { kind: SocialKind; href: string }[]
  profile: { label: string; href: string }
  tags: string[]
}

export interface TeamCountry {
  code: string
  name: string
  count: string
  lon: number
  lat: number
}

const DESKTOP_FRAME = 280
const MOBILE_FRAME = 332

const box = (x: number, y: number, width: number, height: number): PortraitBox => ({
  x,
  y,
  width,
  height,
})

const recentred = (desktop: PortraitBox): PortraitBox => ({
  ...desktop,
  x: desktop.x + (MOBILE_FRAME - DESKTOP_FRAME) / 2,
})

const portrait = (image: ImageMetadata, desktop: PortraitBox, mobile: PortraitBox): Portrait => ({
  image,
  desktop,
  mobile,
  rotate: 0,
})

const desktopOnly = (image: ImageMetadata, desktop: PortraitBox): Portrait =>
  portrait(image, desktop, recentred(desktop))

const socials: TeamMember['links'] = [
  { kind: 'email', href: routes.contact },
  { kind: 'github', href: routes.contact },
  { kind: 'github', href: routes.contact },
  { kind: 'linkedin', href: routes.contact },
]

const readProfile = { label: 'Read Profile', href: routes.contact }
const read = { label: 'Read', href: routes.contact }

const siddharth: TeamMember = {
  name: 'Dr. Siddharth Krishna',
  role: 'Head of Software Engineering',
  portrait: portrait(siddharthKrishna, box(17.82, -19, 242.84, 318), box(21.13, -19, 287.93, 318)),
  glow: 'right',
  links: socials,
  profile: readProfile,
  tags: ['Senior Leadership', 'Software Engineering'],
}

export const members: TeamMember[] = [
  siddharth,
  {
    name: 'Shanti Chellaram',
    role: 'Senior Full-Stack Engineer',
    portrait: portrait(shantiChellaram, box(49.13, -18, 208.47, 273), box(58.25, -18, 247.19, 273)),
    glow: 'right',
    links: socials,
    profile: readProfile,
    tags: ['Software Engineering'],
  },
  {
    name: 'Lauren Clisby',
    role: 'Product Owner',
    portrait: portrait(laurenClisby, box(18.84, -27, 222.22, 291), box(22.33, -27, 263.49, 291)),
    glow: 'right',
    links: socials,
    profile: readProfile,
    tags: ['Software Engineering'],
  },
  {
    name: 'Kristijan Faust',
    role: 'Software Engineer',
    portrait: portrait(kristijanFaust, box(21.38, -31, 254.29, 333), box(25.35, -31, 301.52, 333)),
    glow: 'right',
    links: socials,
    profile: readProfile,
    tags: ['Software Engineering'],
  },
  {
    name: 'Dr. Maximilian Parzen',
    role: 'CEO, Co-Founder',
    portrait: portrait(
      maximilianParzen,
      box(-6, -19, 303, 281),
      box(-7.11, -45.09, 359.27, 333.19),
    ),
    glow: 'center',
    links: socials,
    profile: readProfile,
    tags: ['Senior Leadership'],
  },
  {
    name: 'Dr. Hazem Abdel-Khalek',
    role: 'Head of Modeling Tools & Data, Co-Founder',
    portrait: portrait(hazemAbdelKhalek, box(5, -21, 275, 294), box(5.93, -48.3, 326.07, 348.6)),
    glow: 'center',
    links: socials,
    profile: readProfile,
    tags: ['Senior Leadership', 'Modeling Tools & Data'],
  },
  {
    name: 'Dr. Martha Maria Frysztacki',
    role: 'Head of Energy System Modeling, Co-Founder',
    portrait: portrait(marthaMariaFrysztacki, box(-18, -19, 317, 257), box(8, -19, 317, 257)),
    glow: 'center',
    links: socials,
    profile: readProfile,
    tags: ['Senior Leadership', 'Energy System Modeling'],
  },
  {
    name: 'Quintin Coetzee',
    role: 'Head of People',
    portrait: portrait(quintinCoetzee, box(0, -19, 280, 297), box(0, -46.58, 332, 352.16)),
    glow: 'center',
    links: socials,
    profile: readProfile,
    tags: ['Senior Leadership', 'People And Culture'],
  },
  { ...siddharth, glow: 'center' },
  {
    name: 'Dr. Harry van der Weijde',
    role: 'Head of Research & Market Development',
    portrait: desktopOnly(harryVanDerWeijde, box(-5, -19, 295, 295)),
    glow: 'center',
    links: socials,
    profile: readProfile,
    tags: ['Senior Leadership', 'Research & Market Development'],
  },
  {
    name: 'Dr. Tobias Augspurger',
    role: 'Head of Grid Data',
    portrait: desktopOnly(tobiasAugspurger, box(-12, -19, 303, 322)),
    glow: 'center',
    links: socials,
    profile: read,
    tags: ['Senior Leadership', 'Grid Data'],
  },
  {
    name: 'Andris Prindulis',
    role: 'Head of Finance',
    portrait: desktopOnly(andrisPrindulis, box(0, -19, 294, 305)),
    glow: 'center',
    links: socials,
    profile: read,
    tags: ['Senior Leadership', 'Finance'],
  },
  {
    name: 'Dr. Fabrizio Finozzi',
    role: 'Software Engineer & Energy System Modeler',
    portrait: desktopOnly(fabrizioFinozzi, box(18.58, -40, 242.84, 318)),
    glow: 'right',
    links: socials,
    profile: readProfile,
    tags: ['Software Engineering'],
  },
  {
    name: 'Jatmiko Herjati',
    role: 'Geospatial Software Engineer',
    portrait: desktopOnly(jatmikoHerjati, box(41.75, -34, 225.27, 295)),
    glow: 'right',
    links: socials,
    profile: readProfile,
    tags: ['Software Engineering'],
  },
  {
    name: 'Stefan Radnev',
    role: 'DevSecOps Engineer',
    portrait: desktopOnly(stefanRadnev, box(13.75, -13, 251.24, 329)),
    glow: 'right',
    links: socials,
    profile: read,
    tags: ['Software Engineering'],
  },
  {
    name: 'Snoopy F',
    role: 'Visionary, Head of Wellbeing',
    portrait: { ...desktopOnly(snoopyF, box(-10.55, 2.72, 276.69, 370.23)), rotate: 18.44 },
    glow: 'center',
    links: [{ kind: 'message', href: routes.contact }],
    profile: read,
    tags: ['Senior Leadership'],
  },
]

export const mobilePageSize = 8

const groups = [
  'Show All',
  'Senior Leadership',
  'Finance',
  'People & Culture',
  'Software Engineering',
  'Modelling Tools & Data',
  'Energy System Modeling',
  'Grid Data',
  'Research & Market Development',
]

const slug = (label: string) =>
  label
    .toLowerCase()
    .replaceAll('&', 'and')
    .replaceAll(/[^a-z0-9]+/g, '-')

export const filterGroups = groups.map((label, index) => ({
  label,
  href: index === 0 ? `${routes.team}#team` : `${routes.team}?group=${slug(label)}#team`,
  active: index === 0,
}))

export const countries: TeamCountry[] = [
  { code: 'USA', name: 'USA', count: '12', lon: -98, lat: 39 },
  { code: 'CAN', name: 'Canada', count: '12', lon: -109, lat: 61.7 },
  { code: 'MEX', name: 'Mexico', count: '12', lon: -98.2, lat: 20 },
  { code: 'MLI', name: 'Mali', count: '12', lon: 1.2, lat: 18.4 },
  { code: 'TUR', name: 'Türkiye', count: '12', lon: 33.4, lat: 38.2 },
  { code: 'KAZ', name: 'Kazakhstan', count: '12', lon: 68.5, lat: 49.4 },
  { code: 'JPN', name: 'Japan', count: '12', lon: 143, lat: 43.5 },
]

export const globe = {
  view: { lon: -91.5, lat: 8 },
  selected: 'USA',
  photo: countryCard,
  photoAlt: '',
}

export const continents = {
  label: 'Where OET’s at Across The World',
  items: [
    { value: '99', label: 'Africa' },
    { value: '99', label: 'Antarctica' },
    { value: '99', label: 'Asia' },
    { value: '99', label: 'Europe' },
    { value: '99', label: 'North America' },
    { value: '99', label: 'South America' },
    { value: '99', label: 'Australia/Oceania' },
  ],
}

export const teamPage = {
  meta: {
    title: 'Team — Open Energy Transition',
    description:
      'A fully remote team of 50+ people across 21 countries: award-winning researchers and experienced energy modelers.',
  },
  hero: {
    title: 'Built on a Culture of Transparency, Collaboration, & Trust.',
    lead: [
      'Registered in Germany, since our founding in 2023, we have grown to a team of over 50 experts working remotely across multiple continents. We are led by award-winning energy modelers who are shaping the future of global energy planning.',
    ],
    stats: [
      { value: '9', label: 'Continents' },
      { value: '50+', label: 'Experts' },
      { value: '8', label: 'Department' },
    ],
    image: { desktop: heroDesktop, mobile: heroMobile },
  },
  intro: {
    tag: 'Team',
    title: 'A Fully remote team of 50+ people across 21 countries',
    subline:
      'Our team includes award-winning researchers and experienced energy modelers, united by a culture of transparency and collaboration.',
    actions: [
      {
        label: 'Work With Us',
        href: routes.career,
        variant: 'primary' as const,
        size: 'sm-tall' as const,
        arrow: true,
      },
      {
        label: 'Explore Departments',
        href: routes.departments,
        variant: 'secondary' as const,
        size: 'sm-tall' as const,
        arrow: false,
      },
    ],
  },
  listing: {
    id: 'team',
    title: 'Meet The Team',
    mobileDescription:
      'Discover our innovative projects driving the energy transition  towards a sustainable future with open-source and open data',
    sort: {
      id: 'sort-team',
      values: ['a-z', 'z-a'] satisfies SortValue[],
      selected: 'a-z',
    },
    pagination: { current: 1, total: 10 },
  },
}
