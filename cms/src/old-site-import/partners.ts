import type { Payload } from 'payload'

import type { Partner } from '../payload-types'
import { importMedia } from './media'
import { record } from './report'
import { urlOf, type LegacyPartner } from './source'

const aliases: Record<string, string> = {
  'European Insulation Manufacturer Association (Eurima)': 'eurima',
  'Ostbayerische Technische Hochschule (OTH) Regensburg': 'OTH Regensburg',
  'Quadrature Charitable Foundation': 'Quadrature Climate Foundation',
  'TransnetBW GmbH': 'TransnetBW',
  'Google.com': 'Google',
}

const desktopArea = 4200
const desktopBox = { width: 145, height: 70 }
const mobileScale = 0.6
const mobileBox = { width: 81, height: 44 }

const fit = (ratio: number, area: number, box: { width: number; height: number }) => {
  const width = Math.sqrt(area * ratio)
  const scale = Math.min(1, box.width / width, box.height / (width / ratio))
  return { width: Math.round(width * scale), height: Math.round((width / ratio) * scale) }
}

const logoSizes = (width: number, height: number) => {
  const ratio = width / height
  return {
    logoDesktop: fit(ratio, desktopArea, desktopBox),
    logoMobile: fit(ratio, desktopArea * mobileScale * mobileScale, mobileBox),
  }
}

export type PartnerIds = Map<number, { id: number; hasLogo: boolean }>

export const migratePartners = async (
  payload: Payload,
  legacy: LegacyPartner[],
): Promise<PartnerIds> => {
  const existing = await payload.find({ collection: 'partners', limit: 1000, depth: 0 })
  const byName = new Map(existing.docs.map((doc) => [doc.name, doc]))
  const orders = existing.docs.flatMap((doc) => (typeof doc.order === 'number' ? [doc.order] : []))
  let nextOrder = Math.max(0, ...orders) + 1
  const ids: PartnerIds = new Map()

  for (const source of legacy) {
    const name = source.name.trim()
    const match = byName.get(Object.hasOwn(aliases, name) ? aliases[name] : name)
    const roles = { isFunder: source.type === 'funder', isPartner: source.type === 'partner' }

    if (match) {
      const data: Partial<Partner> = { ...roles }
      const website = urlOf(source.website)
      if (!match.website && website) data.website = website
      await payload.update({ collection: 'partners', id: match.id, data, depth: 0 })
      ids.set(source.id, { id: match.id, hasLogo: match.logo !== null && match.logo !== undefined })
      record({
        area: 'Partners and funders',
        title: match.name,
        action: 'updated',
        status: 'none',
        notes: [`${source.type}${name === match.name ? '' : `, matched "${name}"`}`],
      })
      continue
    }

    const logo = source.logo
    if (logo && (!logo.width || !logo.height)) throw new Error(`Logo of ${name} has no dimensions`)
    const notes: string[] = [source.type]
    if (!logo)
      notes.push('no logo on the old site: not shown on the partners page until one is added')
    const created = await payload.create({
      collection: 'partners',
      depth: 0,
      data: {
        name,
        website: urlOf(source.website),
        ...roles,
        showOnHome: false,
        ...(logo && logo.width && logo.height
          ? {
              showOnPartnersPage: true,
              order: nextOrder++,
              logo: await importMedia(payload, logo, name),
              ...logoSizes(logo.width, logo.height),
            }
          : { showOnPartnersPage: false }),
      },
    })
    if (logo) notes.push('logo size set from its proportions; check it on the partners page')
    ids.set(source.id, { id: created.id, hasLogo: logo !== null })
    record({ area: 'Partners and funders', title: name, action: 'created', status: 'none', notes })
  }
  return ids
}
