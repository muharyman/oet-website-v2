import partnerGoogle from '../assets/home/partner-google.png'
import partnerEskom from '../assets/outputs/partner-eskom.png'
import partnerStanford from '../assets/outputs/partner-stanford.png'
import type { PartnerTag } from '../components/cards/types'

export const partnerTags = {
  eskom: { name: 'Eskom', logo: partnerEskom, width: 73, height: 26 },
  stanford: { name: 'Stanford', logo: partnerStanford, width: 98.82, height: 35 },
  google: { name: 'Google', logo: partnerGoogle, width: 70, height: 25 },
} satisfies Record<string, PartnerTag>
