import type { ImageMetadata } from 'astro'
import type { SvgComponent } from 'astro/types'
import heroEurima from '../assets/outputs/hero-publication-eurima.webp'
import thumbAi from '../assets/outputs/pub-ai-coding-agents.webp'
import bodyImage from '../assets/outputs/pub-body-image.webp'
import thumbSovereignty from '../assets/outputs/pub-digital-sovereignty.webp'
import thumbEurima from '../assets/outputs/pub-eurima-case-study.webp'
import thumbPlanning from '../assets/outputs/pub-integrated-system-planning.webp'
import thumbShipping from '../assets/outputs/pub-shipping-liquid-hydrogen.webp'
import thumbSolvers from '../assets/outputs/pub-state-of-solvers.webp'
import thumbUkraine from '../assets/outputs/pub-ukraine-against-darkness.webp'
import type { FrameTone } from '../components/cards/types'
import AngleCircleRight from '../icons/angle-circle-right.svg'
import CircleDashed from '../icons/circle-dashed.svg'
import TimeQuarterTo from '../icons/time-quarter-to.svg'
import World from '../icons/world.svg'
import {
  authors,
  cta,
  type CtaContent,
  type LinkGroup,
  type LinkLabelPart,
  type Person,
  type ServiceSlug,
} from './outputs'
import { routes } from './routes'

export interface Stat {
  value: string
  label: string
  icon: SvgComponent
}

export type BodyBlock =
  | { kind: 'richText'; html: string }
  | { kind: 'stats'; title: string; stats: Stat[] }
  | { kind: 'image'; image: ImageMetadata; alt: string }

export interface PublicationDetail {
  highlight: string
  authorNames: string[]
  date: string
  region: string
  tags: string[]
  hero: ImageMetadata
  heroAlt: string
  body: BodyBlock[]
  linkGroups: LinkGroup[]
  authors: Person[]
  citation: string
  related: string[]
  cta: CtaContent
  service: ServiceSlug
}

export type PublicationTypeId = 'academic' | 'blogs' | 'policy-briefs' | 'reports'

export interface Publication {
  slug: string
  type: PublicationTypeId
  title: string
  excerpt: string
  date: string
  category: string
  thumbnail: ImageMetadata
  alt: string
  frame: FrameTone
  detail: PublicationDetail
}

const underlined = (text: string) => ({ text, underline: true })
const plain = (text: string) => ({ text, underline: false })

const link = (label: LinkLabelPart[], truncate: boolean) => ({
  label,
  truncate,
  href: routes.contact,
  disabled: false,
  newTab: false,
})

const anchor = (label: string) => `<a href="${routes.contact}">${label}</a>`

const exampleDetail: PublicationDetail = {
  highlight:
    'I was positively surprised by what the model could take into account when analysing energy prices and electricity costs. It was also welcomed by the policy makers and energy stakeholders  we discussed the results with. It was very impressive. - Salvatore Fantoni, Sustainable Construction and Communications Manager, Eurima',
  authorNames: ['Dr. Martha Maria Frysztacki', 'Charlotte Heikendorf'],
  date: 'May 1, 2026',
  region: 'Australia/Oceania',
  tags: ['#SoftwareDevelopment', '#Tags'],
  hero: heroEurima,
  heroAlt: '',
  body: [
    {
      kind: 'richText',
      html: `<h2>Develops an open, PyPSA-Earth-based model <br class="max-lg:hidden">for Australia</h2>
<p>I was positively surprised by what the model could take into account when analysing energy prices and electricity costs. It was also welcomed by the policy makers and energy stakeholders  we discussed the results with. It was very impressive. - Salvatore Fantoni, Sustainable Construction and Communications Manager, Eurima</p>
<p>The European Insulation Manufacturers Association ${anchor('(Eurima)')} commissioned a study together with the ${anchor('International Copper Association Europe')}  and the ${anchor('European Climate Foundation')} in 2023, titled "Flattening the Peak Demand Curve Through Energy Efficient Buildings: A Holistic Approach Towards Net-Zero Carbon," later turned into the ${anchor('Your Home, Our Future')} campaign.</p>
<p>Eurima is a Brussels-based business association representing mineral wool insulation manufacturers. Communicating the benefits of mineral wool insulation, Eurima assists its members in fields such as product standardisation and EU-focused issue monitoring and management, helping them to stay informed and contribute to EU affairs relevant to mineral wool insulation products and the industry's licence-to-operate.</p>`,
    },
    {
      kind: 'stats',
      title: 'Outputs',
      stats: [
        { value: '3', label: 'Policy Recommendations \nin the Light Report', icon: World },
        { value: '5', label: 'Stakeholder Workshops', icon: TimeQuarterTo },
        {
          value: '40+',
          label: 'Meetings Across the EU Energy and Construction Sectors',
          icon: CircleDashed,
        },
        { value: '6', label: 'Events Presenting the Findings', icon: AngleCircleRight },
      ],
    },
    {
      kind: 'richText',
      html: `<h3>Why Conduct an Open Energy System Study?</h3>
<p>${anchor("Buildings account for >30% of the EU's energy-related greenhouse gas emissions when using fossil fuels")}. The wish for a study was based on the need to address demand peaks through energy efficiency, flagged by members of Eurima.  It was a topic of great interest to the insulation and building sectors on how to achieve energy efficiency and performance requirements.</p>
<p>Eurima saw the need to address this issue by gathering arguments and narratives to contribute to European policy in the context of rapid electrification and the implementation of the ${anchor('Energy Performance of Buildings Directive')}. Research had to look into the cost-optimal mix of measures needed in buildings to drive decarbonisation, grid planning, and lower Europeans' electricity bills. It required an energy system modelling study with different scenarios.</p>
<p>After being introduced to an open energy model study with ${anchor('PyPSA-Eur')} in 2023, they decided to explore PyPSA further. "It seemed to be the perfect type of modelling instrument for our needs," says Salvatore Fantoni, Communications Manager at Eurima.</p>
<p>We needed the results to be scientifically sound, effective, and transparent to support our ongoing activities. The study was incredibly useful. Due to popular demand, we are now working towards a  second iteration of the study with even more granularity. - Dimitar Kolichev, Energy &amp; Climate Policy Manager, Eurima</p>
<h3>The Study</h3>
<ul>
<li>The objective of this study is to assess the impact of various energy efficiency measures in buildings on reducing energy generation needs, flattening the peak demand curve, and influencing energy system costs, and energy bill prices.</li>
<li>The focus of this particular study was on the representation of building retrofitting, which implies improvement of the building envelope, as well as the implementation of "active" demand-side measures.</li>
<li>${anchor('The Your Home, Our Future Campaign')}</li>
<li>${anchor('The results of the study were later published as an academic article in Applied Energy in April 2025.')}</li>
<li>${anchor('The model is publicly available on GitHub.')}</li>
<li>${anchor('See the project description on our website')}</li>
</ul>
<h3>Awareness and Behaviour Change</h3>
<p>"We are going for a paradigm shift," say Salvatore Fantoni (Sustainable Construction and Communication Manager) and Dimitar Kolichev (Energy &amp; Climate Policy Manager). Even though impact is not always easy to quantify, the study is widely seen as having made a strong contribution, with elements already incorporated into policy.</p>
<p>The results of the study were used in the ${anchor('Your Home, Our Future')} campaign. They contributed to policy communication, strategic partnerships across the construction and energy systems sectors, and presentations at various conferences.</p>
<p>As Salvatore Fantoni and Dimitar Kolichev explain, most European-level energy system modelling is based on proprietary tools, where underlying assumptions, methodologies and data inputs are not always fully transparent or accessible, which limits the ability of external stakeholders to scrutinise, replicate, or build upon the results.</p>
<p>The open model approach built credibility as the results, assumptions, and methods were transparent. Highlighting relevant code snippets or cost assumptions directly in the model (on GitHub) during the study fostered constructive discussions and suggestions for improvement.</p>
<p>One of the most remarkable findings, according to Salvatore Fantoni, was the impact that energy efficiency in buildings can have on actual physical space. Improving the energy performance of buildings optimises the supply-demand nexus, which means that energy generation infrastructure can be built fit for size to meet optimised consumption needs. These infrastructure optimisations can mean up to 200 km² more can be used for, for instance, biodiversity preservation in Europe simply by insulating buildings. It also means lower costs for the consumer.</p>
<p>The study is also meant to show homeowners that they have an important role to play in the energy transition. Peak demand impacts their lives and they can do something about it.</p>
<p>Changing behaviours does not happen overnight. It is a gradual process and Eurima will keep working on the peak demand and electrification agenda, possibly with another study very soon.</p>`,
    },
    { kind: 'image', image: bodyImage, alt: '' },
  ],
  linkGroups: [
    {
      title: 'Resources',
      links: [link([underlined('Case Study PDF')], false), link([underlined('Slides')], false)],
    },
    {
      title: 'Links',
      links: [
        link([underlined('The Your Home, Our Future Campaign')], false),
        link([underlined('The results of the study')], true),
        link([underlined('Model is publicly available on GitHub')], true),
        link([underlined('Project description on our website')], true),
      ],
    },
    {
      title: 'Journal & DOI',
      links: [
        link(
          [
            underlined('IEEE Power and Energy Magazine'),
            plain(', '),
            underlined('Volume: 24 Issue: 4'),
            plain(', pages 100 - 115'),
          ],
          false,
        ),
        link([plain('DOI: '), underlined('https://doi.org/10.1109/MPE.2025.3562145')], true),
      ],
    },
  ],
  authors,
  citation:
    'IEEE Power and Energy Magazine, Volume: 24 Issue: 4, pages 100 - 115. DOI: https://doi.org/10.1109/MPE.2025.3562145',
  related: ['ukraine-against-darkness'],
  cta,
  service: 'system-operators-and-utilities',
}

export const publications: Publication[] = [
  {
    slug: 'ukraine-against-darkness',
    title: 'Ukraine Against Darkness',
    excerpt:
      'Under Russia’s invasion, 60% of Ukraine’s power system capacity remains occupied, damaged, or destroyed, and the bombardments weaken the remaining coal, hydro and nuclear capacities',
    date: 'February 20, 2026',
    category: 'Academic Publications',
    type: 'academic',
    thumbnail: thumbUkraine,
    alt: '',
    frame: 'neutral-900',
    detail: exampleDetail,
  },
  {
    slug: 'techno-economic-impacts-of-shipping-liquid-hydrogen-ammonia-or-methanol',
    title: 'Techno-Economic Impacts of Shipping Liquid Hydrogen, Ammonia or Methanol on',
    excerpt: 'Published in: 2025 21st International Conference on the European Energy Market (EEM)',
    date: 'Preprint',
    category: 'Academic Publications',
    type: 'academic',
    thumbnail: thumbShipping,
    alt: '',
    frame: 'neutral-800',
    detail: exampleDetail,
  },
  {
    slug: 'integrated-system-planning-emerging-software-requirements-in-the-power',
    title: 'Integrated System Planning: Emerging Software Requirements in the Power',
    excerpt: 'Published in IEEE Power and Energy Magazine, Volume: 24 Issue: 4',
    date: 'February 20, 2026',
    category: 'Academic Publications',
    type: 'academic',
    thumbnail: thumbPlanning,
    alt: '',
    frame: 'neutral-950',
    detail: exampleDetail,
  },
  {
    slug: 'ai-coding-agents-should-optimize-for-less-owned-code',
    title: 'AI coding agents should optimize for less owned code',
    excerpt:
      'As AI makes code cheaper to produce, costs shift from generation to ownership. To avoid technical debt, coding agents need an open-source intelligence layer that helps them reuse trusted components before generating new code.',
    date: 'July 14, 2026',
    category: 'Blog | Category List Here',
    type: 'blogs',
    thumbnail: thumbAi,
    alt: '',
    frame: 'neutral-800',
    detail: exampleDetail,
  },
  {
    slug: 'case-study-communication-on-energy-efficient-and-flexible-buildings-with-eurima',
    title: 'Case Study: Communication on Energy-Efficient and Flexible Buildings with Eurima',
    excerpt:
      'The flattening of the peak energy demand study gave Eurima material for effective communications',
    date: 'April 27, 2026',
    category: 'Blog | Case Study',
    type: 'blogs',
    thumbnail: thumbEurima,
    alt: '',
    frame: 'neutral-950',
    detail: exampleDetail,
  },
  {
    slug: 'protecting-europes-digital-sovereignty-with-open-energy-models',
    title: 'Protecting Europe’s Digital Sovereignty with Open Energy Models',
    excerpt:
      'Open, auditable planning tools give Europe strategic control over its critical energy system decisions while improving transparency and innovation.',
    date: 'February 20, 2026',
    category: 'Blog',
    type: 'blogs',
    thumbnail: thumbSovereignty,
    alt: '',
    frame: 'neutral-900',
    detail: exampleDetail,
  },
  {
    slug: 'the-state-of-solvers-for-energy-planning',
    title: 'The State of Solvers for Energy Planning - Results of the 2025 Open Energy Benchmark',
    excerpt:
      'This report presents the 2025 results of the Open Energy Benchmark initiative, a transparent and reproducible benchmarking effort evaluating optimization solvers on realistic, community-contributed energy system models.',
    date: 'Preprint',
    category: 'Reports',
    type: 'reports',
    thumbnail: thumbSolvers,
    alt: '',
    frame: 'neutral-900',
    detail: exampleDetail,
  },
]

export const publicationBySlug = (slug: string): Publication => {
  const publication = publications.find((item) => item.slug === slug)
  if (!publication) throw new Error(`Unknown publication: ${slug}`)
  return publication
}

const academic = [
  'ukraine-against-darkness',
  'techno-economic-impacts-of-shipping-liquid-hydrogen-ammonia-or-methanol',
  'integrated-system-planning-emerging-software-requirements-in-the-power',
]

export const publicationsPage = {
  meta: {
    title: 'Publications | Open Energy Transition',
    description: 'Explore our publications, from academic works to thought leadership.',
  },
  hero: {
    title: 'Explore Our Publication from Academic Works to Thought Leadership.',
    links: [
      { label: 'Academic Publications', href: '#publications' },
      { label: 'Blogs', href: '#publications' },
      { label: 'Policy Briefs', href: '#publications' },
      { label: 'Reports', href: '#publications' },
    ],
  },
  listing: {
    id: 'publications',
    title: 'Our Publications',
    typeTabs: [
      { type: 'academic', label: 'Academic Publication', href: routes.publications },
      { type: 'blogs', label: 'Blogs', href: routes.blogs },
      { type: 'policy-briefs', label: 'Policy Briefs', href: routes.policyBriefs },
      { type: 'reports', label: 'Reports', href: routes.reports },
    ] satisfies { type: PublicationTypeId; label: string; href: string }[],
    mobilePageSize: 5,
    items: [
      ...academic,
      'ai-coding-agents-should-optimize-for-less-owned-code',
      'case-study-communication-on-energy-efficient-and-flexible-buildings-with-eurima',
      'protecting-europes-digital-sovereignty-with-open-energy-models',
      'the-state-of-solvers-for-energy-planning',
      'techno-economic-impacts-of-shipping-liquid-hydrogen-ammonia-or-methanol',
    ],
  },
  outputs: {
    title: 'Outputs',
    description: 'Read our Outputs out there on the socials\nlorem ipsum dolor sit amet',
    mobilePageSize: 5,
    items: [...academic, ...academic, ...academic],
  },
}
