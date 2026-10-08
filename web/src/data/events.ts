import type { ImageMetadata } from 'astro'
import documentationSubstation from '../assets/events/documentation-substation.webp'
import highlightSession from '../assets/events/highlight-session.webp'
import posterSquare from '../assets/events/poster-pypsa-support.webp'
import posterTall from '../assets/events/poster-pypsa-support-tall.webp'
import newsDesktop from '../assets/heroes/news-and-events-desktop.webp'
import newsMobile from '../assets/heroes/news-and-events-mobile.webp'
import personPlaceholder from '../assets/shared/person-placeholder.png'
import type { SortValue } from '../i18n/groups'
import { routes } from './routes'

export type EventTypeId = 'webinars' | 'events' | 'support-meetups' | 'open-calls'
export type EventStatus = 'upcoming' | 'highlighted' | 'archived'

export type PosterFit = 'cover' | 'contain'

export interface EventImage {
  image: ImageMetadata
  alt: string
}

export interface EventContributor {
  name: string
  title: string
  photo: ImageMetadata
}

export interface EventVideo {
  embedUrl: string
  watchUrl: string
  title: string
}

export interface EventHighlight extends EventImage {
  video: EventVideo | null
}

export interface EventItem {
  slug: string
  title: string
  excerpt: string
  brief: string
  descriptionHtml: string
  type: EventTypeId
  timeZone: string
  start: string
  end: string
  publishedAt: string
  registrationClosesAt: string | null
  featuredAsHighlight: boolean
  locationRegion: string
  locationAddress: string
  mapHref: string
  calendarHref: string
  joinHref: string
  contributors: EventContributor[]
  poster: EventImage
  posterFit: PosterFit
  highlight: EventHighlight | null
  gallery: EventImage[]
}

export const eventTypes: { id: EventTypeId; label: string }[] = [
  { id: 'webinars', label: 'Webinars' },
  { id: 'events', label: 'Events' },
  { id: 'support-meetups', label: 'Support Meetups' },
  { id: 'open-calls', label: 'Open Calls' },
]

const contributor: EventContributor = {
  name: 'Dr. Martha Maria Frysztacki Name Here 2 Line Max',
  title: 'Title in OET/Company Here 1 Line Maximum Lorem ipsum dolor',
  photo: personPlaceholder,
}

const brief =
  'Get support from OET’s experts on your questions about:  The PyPSA ecosystem (PyPSA, Linopy, Atlite, PyPSA-Eur, Open-TYNDP, Snakemake, etc. Implementation details  IT infrastructure and self-hosting requirements Lorem Ipsum Dolor Sit Amet'

const descriptionHtml = `<p>Energy grid planning is one of the most critical components in shaping the future of global energy systems. As modern societies become increasingly dependent on electricity for everything from communication and transportation to healthcare and industry, ensuring a stable, efficient, and sustainable power supply has become a top priority.</p>
<p>Ultimately, energy grid planning is not just a technical discipline; it’s a vital part of national development strategy. It links energy policy with environmental goals, industrial growth, and social welfare.</p>
<p>Ultimately, energy grid planning is not just a technical discipline; it’s a vital part of national development strategy. It links energy policy with environmental goals, industrial growth, and social welfare.</p>`

const locationAddress =
  'Location, Country, Address, Additional Location Detail Here No Maximum Line Lorem Ipsum Dolor Sit Amet'

const shared = {
  brief,
  descriptionHtml,
  timeZone: 'Europe/Berlin',
  publishedAt: '2025-11-02T13:07:00+01:00',
  locationRegion: 'Online',
  locationAddress,
  mapHref: routes.contact,
  calendarHref: routes.contact,
  joinHref: routes.contact,
}

const support = {
  ...shared,
  title: 'Free Monthly PyPSA Support for European Transmission System Operators',
  excerpt:
    'Get support from OET’s experts on your questions about:  The PyPSA ecosystem (PyPSA, Linopy, Atlite, PyPSA-Eur, Open-TYNDP, Snakemake, etc.) Implementation details IT infrastructure and self-hosting requirements',
  type: 'support-meetups' as const,
  start: '2026-12-03T10:00:00+01:00',
  end: '2026-12-03T11:00:00+01:00',
  registrationClosesAt: '2026-10-01T12:00:00+02:00',
  featuredAsHighlight: false,
  contributors: [contributor, contributor],
  highlight: null,
  gallery: [],
}

const posterAlt =
  'Poster: Online Sessions, Free Monthly PyPSA Support for European Transmission System Operators'

const documentation: EventImage = {
  image: documentationSubstation,
  alt: 'Electrical substation under a cloudy sky',
}

const recap = {
  ...shared,
  title: 'Sharing Session: Communication on Energy-Efficient and Flexible Buildings with Eurima',
  excerpt:
    'The flattening of the peak energy demand study gave Eurima material for effective communications',
  type: 'webinars' as const,
  start: '2026-08-10T10:00:00+02:00',
  end: '2026-08-10T11:00:00+02:00',
  registrationClosesAt: null,
  featuredAsHighlight: true,
  contributors: [contributor, contributor, contributor],
  poster: { image: posterSquare, alt: posterAlt },
  posterFit: 'cover' as const,
  highlight: {
    image: highlightSession,
    alt: 'Three participants at a table during the session',
    video: {
      embedUrl: 'https://www.youtube-nocookie.com/embed/VIDEO_ID?autoplay=1',
      watchUrl: 'https://www.youtube.com/watch?v=VIDEO_ID',
      title: 'Event recap video',
    },
  },
  gallery: [documentation, documentation, documentation, documentation, documentation],
}

export const events: EventItem[] = [
  {
    ...support,
    slug: 'free-monthly-pypsa-support-for-european-transmission-system-operators',
    poster: { image: posterSquare, alt: posterAlt },
    posterFit: 'cover',
  },
  {
    ...support,
    slug: 'free-monthly-pypsa-support-for-european-transmission-system-operators-2',
    poster: { image: posterTall, alt: posterAlt },
    posterFit: 'contain',
  },
  { ...recap, slug: 'sharing-session-energy-efficient-and-flexible-buildings-with-eurima' },
  { ...recap, slug: 'sharing-session-energy-efficient-and-flexible-buildings-with-eurima-2' },
  { ...recap, slug: 'sharing-session-energy-efficient-and-flexible-buildings-with-eurima-3' },
]

export const eventStatus = (event: EventItem, now: Date): EventStatus => {
  if (new Date(event.end).getTime() > now.getTime()) return 'upcoming'
  return event.featuredAsHighlight ? 'highlighted' : 'archived'
}

const partsOf = (locale: string, options: Intl.DateTimeFormatOptions, iso: string) => {
  const parts = new Intl.DateTimeFormat(locale, options).formatToParts(new Date(iso))
  return (type: Intl.DateTimeFormatPartTypes) => {
    const part = parts.find((item) => item.type === type)
    if (!part) throw new Error(`Date part "${type}" missing for ${iso}`)
    return part.value
  }
}

export const formatEventDay = (locale: string, timeZone: string, iso: string) => {
  const part = partsOf(locale, { timeZone, day: 'numeric', month: 'long', year: 'numeric' }, iso)
  return `${part('day')} ${part('month')} ${part('year')}`
}

export const formatEventWeekday = (locale: string, timeZone: string, iso: string) => {
  const part = partsOf(
    locale,
    { timeZone, weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' },
    iso,
  )
  return `${part('weekday')}, ${part('day')}/${part('month')}/${part('year')}`
}

export const formatEventTimes = (
  locale: string,
  timeZone: string,
  start: string,
  end: string,
  minutesLabel: string,
) => {
  const clock = (iso: string) => {
    const part = partsOf(
      locale,
      { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
      iso,
    )
    return `${part('hour')}:${part('minute')}`
  }
  const minutes = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000)
  return `${clock(start)} - ${clock(end)} (${minutes} ${minutesLabel})`
}

export const formatEventPublished = (locale: string, timeZone: string, iso: string) => {
  const part = partsOf(
    locale,
    {
      timeZone,
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    },
    iso,
  )
  return `${part('month')} ${part('day')}, ${part('year')}, ${part('hour')}:${part('minute')} ${part('dayPeriod')} ${part('timeZoneName')}`
}

const cta = {
  support: {
    tone: 'brand-600' as const,
    heading: 'Book OET\nfor Support Sessions',
    lead: 'Connect directly with the OET team for practical guidance, technical support, and expert insight.',
    text: 'Whether you’re exploring our tools, working through a challenge, or looking for ways to contribute, book a session tailored to your needs.',
    actions: [
      {
        label: 'Sign Up for a Call',
        href: routes.contact,
        emphasis: 'primary' as const,
        newTab: false,
      },
      {
        label: 'Request a Demo',
        href: routes.contact,
        emphasis: 'secondary' as const,
        newTab: false,
      },
    ],
    collage: 'wind' as const,
    breakout: true,
  },
  discuss: {
    tone: 'brand-600' as const,
    heading: 'Discuss a Technology Modelling Need',
    lead: null,
    text: 'If you are interested in collaborating with us on energy transition studies, open-source platforms, and training and support, please contact us.',
    actions: [
      { label: 'Contact Us', href: routes.contact, emphasis: 'primary' as const, newTab: false },
      {
        label: 'Request a Demo',
        href: routes.contact,
        emphasis: 'secondary' as const,
        newTab: false,
      },
    ],
    collage: 'wind' as const,
    breakout: true,
  },
  updates: {
    tone: 'light' as const,
    heading: 'Monthly Updates\nOpen Call',
    lead: 'Open call for the latest OET updates, project insights, and opportunities to connect and contribute.',
    text: 'A recurring monthly event where you can hear the latest from OET, connect with the community, and join the conversation.',
    actions: [
      {
        label: 'New Updates Every 7th of The Month',
        href: routes.contact,
        emphasis: 'secondary' as const,
        newTab: false,
      },
    ],
    collage: 'thermalpower' as const,
    breakout: false,
  },
}

export const eventsPage = {
  meta: {
    title: 'News and Events',
    description:
      'From community meetups to industry forums: upcoming and highlighted events from Open Energy Transition.',
  },
  hero: {
    title: 'News and Events from Community Meetups to Industry Forums',
    link: { label: 'News & Events', href: '#news-and-events' },
    image: { desktop: newsDesktop, mobile: newsMobile },
  },
  listing: {
    id: 'news-and-events',
    title: 'News and Events',
    description:
      'From community meetups to industry forums, each event reflects our commitment to advancing open, transparent, and collaborative solutions for the energy transition.',
  },
  stateTabs: [
    { id: 'all', label: 'All Events' },
    { id: 'highlighted', label: 'Highlighted Events' },
    { id: 'upcoming', label: 'Upcoming Events' },
  ],
  sort: {
    selected: 'a-z',
    values: ['a-z', 'z-a', 'newest', 'oldest'] satisfies SortValue[],
  },
  mobilePagination: { current: 1, total: 10 },
  cta,
}
