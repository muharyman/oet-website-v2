import type { ImageMetadata } from 'astro'
import type { SvgComponent } from 'astro/types'
import type { Locale } from '../i18n/config'
import type { SortValue } from '../i18n/groups'
import { t } from '../i18n/ui'
import { findAll, findGlobal, required, resolved, texts, type Doc } from '../lib/cms'
import { facet, type PageSize } from '../lib/listing'
import { altOf, icon, image } from '../lib/media'
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

export interface TeamStat {
  icon: SvgComponent
  tone: 'brand' | 'light'
  value: string
  label: string
}

const listingId = 'team'
const seniorLeadershipGroup = 'senior-leadership'
const sortValues: SortValue[] = ['a-z', 'z-a']

const box = ({ x, y, width, height }: PortraitBox): PortraitBox => ({ x, y, width, height })

const toMember = (doc: Doc<'team-members'>, seniorLeadershipLabel: string): TeamMember => {
  const departments = required(doc.departments, `departments of ${doc.name}`).map(
    (department) => resolved(department, `department of ${doc.name}`).teamLabel,
  )
  return {
    name: doc.name,
    role: doc.role,
    portrait: {
      image: image(doc.portrait, `portrait of ${doc.name}`),
      desktop: box(doc.portraitDesktop),
      mobile: box(doc.portraitMobile),
      rotate: doc.portraitRotation,
    },
    glow: doc.glow,
    links: required(doc.socialLinks, `social links of ${doc.name}`).map(({ kind, href }) => ({
      kind,
      href,
    })),
    profile: { label: doc.profile.label, href: doc.profile.href },
    tags: doc.seniorLeadership === true ? [seniorLeadershipLabel, ...departments] : departments,
  }
}

const groupHref = (group: string) => `${routes.team}?group=${group}#${listingId}`

export const loadTeamPage = async (locale: Locale) => {
  const [page, members, departments, countries] = await Promise.all([
    findGlobal('team-page', locale, 1),
    findAll('team-members', locale, { depth: 1, sort: 'order' }),
    findAll('departments', locale, { depth: 0, sort: 'teamOrder' }),
    findAll('countries', locale, { depth: 1, sort: 'code' }),
  ])
  const { seniorLeadershipLabel } = page.listing
  const selectedId = resolved(page.globe.selectedCountry, 'team page selected country').id
  const selected = required(
    countries.find((country) => country.id === selectedId),
    'team page selected country',
  )
  return {
    meta: page.meta,
    hero: {
      title: page.hero.title,
      lead: texts(page.hero.lead, 'team page hero lead'),
      stats: required(page.hero.stats, 'team page hero stats').map((stat): TeamStat => ({
        icon: icon(stat.icon),
        tone: stat.tone,
        value: stat.value,
        label: stat.label,
      })),
      image: {
        desktop: image(page.hero.image.desktop, 'team page hero image desktop'),
        mobile: image(page.hero.image.mobile, 'team page hero image mobile'),
      },
    },
    intro: {
      tag: page.intro.tag,
      title: page.intro.title,
      subline: page.intro.subline,
      actions: required(page.intro.actions, 'team page intro actions').map((action) => ({
        label: action.label,
        href: action.href,
        variant: action.variant,
        size: 'sm-tall' as const,
        arrow: action.arrow === true,
      })),
    },
    globe: {
      view: { lon: page.globe.view.longitude, lat: page.globe.view.latitude },
      selected: selected.code,
      photo: image(selected.photo, `photo of ${selected.name}`),
      photoAlt: altOf(selected.photo, `photo of ${selected.name}`),
    },
    countries: countries.map((country): TeamCountry => ({
      code: country.code,
      name: country.name,
      count: country.teammates,
      lon: country.longitude,
      lat: country.latitude,
    })),
    continents: {
      label: page.continents.label,
      items: required(page.continents.items, 'team page continents').map(({ value, label }) => ({
        value,
        label,
      })),
    },
    listing: {
      id: listingId,
      title: page.listing.title,
      mobileDescription: page.listing.mobileDescription,
      sort: {
        id: 'sort-team',
        values: sortValues,
        selected: 'a-z',
      },
      pageSize: { desktop: 16, mobile: 8 } satisfies PageSize,
    },
    filterGroups: [
      { label: t(locale, 'tabs.showAll'), href: groupHref('all'), active: true },
      { label: seniorLeadershipLabel, href: groupHref(seniorLeadershipGroup), active: false },
      ...departments.map((department) => ({
        label: department.teamLabel,
        href: groupHref(department.slug),
        active: false,
      })),
    ],
    members: [...members]
      .sort((a, b) => a.name.localeCompare(b.name, locale))
      .map((member) => ({
        card: toMember(member, seniorLeadershipLabel),
        group: facet([
          ...(member.seniorLeadership === true ? [seniorLeadershipGroup] : []),
          ...required(member.departments, `departments of ${member.name}`).map(
            (department) => resolved(department, `department of ${member.name}`).slug,
          ),
        ]),
      })),
  }
}
