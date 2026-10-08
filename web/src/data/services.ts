import type { PartnerTag } from '../components/cards/types'
import { partnerTags } from './partnerTags'
import type { ImageMetadata } from 'astro'
import heroConsultanciesDesktop from '../assets/heroes/service-consultancies-desktop.webp'
import heroConsultanciesMobile from '../assets/heroes/service-consultancies-mobile.webp'
import heroFoundationsDesktop from '../assets/heroes/service-foundations-desktop.webp'
import heroFoundationsMobile from '../assets/heroes/service-foundations-mobile.webp'
import heroRegulatorsDesktop from '../assets/heroes/service-regulators-desktop.webp'
import heroRegulatorsMobile from '../assets/heroes/service-regulators-mobile.webp'
import heroSystemOperatorsDesktop from '../assets/heroes/service-system-operators-desktop.webp'
import heroSystemOperatorsMobile from '../assets/heroes/service-system-operators-mobile.webp'
import heroTechnologyDesktop from '../assets/heroes/service-technology-desktop.webp'
import heroTechnologyMobile from '../assets/heroes/service-technology-mobile.webp'
import heroThinkTanksDesktop from '../assets/heroes/service-think-tanks-desktop.webp'
import heroThinkTanksMobile from '../assets/heroes/service-think-tanks-mobile.webp'
import heroServicesDesktop from '../assets/heroes/services-desktop.webp'
import heroServicesMobile from '../assets/heroes/services-mobile.webp'
import cardConsultanciesDesktop from '../assets/services/cards/consultancies-desktop.webp'
import cardConsultanciesMobile from '../assets/services/cards/consultancies-mobile.webp'
import cardFoundationsDesktop from '../assets/services/cards/foundations-desktop.webp'
import cardFoundationsMobile from '../assets/services/cards/foundations-mobile.webp'
import cardRegulatorsDesktop from '../assets/services/cards/regulators-desktop.webp'
import cardRegulatorsMobile from '../assets/services/cards/regulators-mobile.webp'
import cardSystemOperatorsDesktop from '../assets/services/cards/system-operators-desktop.webp'
import cardSystemOperatorsMobile from '../assets/services/cards/system-operators-mobile.webp'
import cardTechnologyDesktop from '../assets/services/cards/technology-desktop.webp'
import cardTechnologyMobile from '../assets/services/cards/technology-mobile.webp'
import cardThinkTanksDesktop from '../assets/services/cards/think-tanks-desktop.webp'
import cardThinkTanksMobile from '../assets/services/cards/think-tanks-mobile.webp'
import howWeWork from '../assets/services/how-we-work.webp'
import introConsultancies from '../assets/services/intro/consultancies.webp'
import introFoundations from '../assets/services/intro/foundations.webp'
import introRegulators from '../assets/services/intro/regulators.webp'
import introSystemOperators from '../assets/services/intro/system-operators.webp'
import introTechnology from '../assets/services/intro/technology.webp'
import introThinkTanks from '../assets/services/intro/think-tanks.webp'
import projectEfuels from '../assets/services/projects/e-fuels-in-australia.webp'
import projectOpenmod from '../assets/services/projects/openmod-meets-usa-2023.webp'
import anatomicalHeart248 from '../assets/services/values/anatomical-heart-248.webp'
import badge248 from '../assets/services/values/badge-248.webp'
import bookOpenReader248 from '../assets/services/values/book-open-reader-248.webp'
import boxConnection207 from '../assets/services/values/box-connection-207.webp'
import boxConnection248 from '../assets/services/values/box-connection-248.webp'
import boxSecurity248 from '../assets/services/values/box-security-248.webp'
import boxSecurityAlt207 from '../assets/services/values/box-security-alt-207.webp'
import bullseyeArrow207 from '../assets/services/values/bullseye-arrow-207.webp'
import bullseyeArrow248 from '../assets/services/values/bullseye-arrow-248.webp'
import circleDashed207 from '../assets/services/values/circle-dashed-207.webp'
import circleDashed248 from '../assets/services/values/circle-dashed-248.webp'
import circleUser248 from '../assets/services/values/circle-user-248.webp'
import codeSimple207 from '../assets/services/values/code-simple-207.webp'
import codeSimple248 from '../assets/services/values/code-simple-248.webp'
import dataInsight207 from '../assets/services/values/data-insight-207.webp'
import emergencyStop207 from '../assets/services/values/emergency-stop-207.webp'
import endlessLoop207 from '../assets/services/values/endless-loop-207.webp'
import endlessLoop248 from '../assets/services/values/endless-loop-248.webp'
import flag207 from '../assets/services/values/flag-207.webp'
import flag248 from '../assets/services/values/flag-248.webp'
import globalResearch207 from '../assets/services/values/global-research-207.webp'
import handBackFist207 from '../assets/services/values/hand-back-fist-207.webp'
import handFist248 from '../assets/services/values/hand-fist-248.webp'
import handsTogether207 from '../assets/services/values/hands-together-207.webp'
import handsTogether248 from '../assets/services/values/hands-together-248.webp'
import heartCircleUser207 from '../assets/services/values/heart-circle-user-207.webp'
import modelCube207 from '../assets/services/values/model-cube-207.webp'
import modelCubeSpace207 from '../assets/services/values/model-cube-space-207.webp'
import modelCubeSpace248 from '../assets/services/values/model-cube-space-248.webp'
import roadmap207 from '../assets/services/values/roadmap-207.webp'
import vision248 from '../assets/services/values/vision-248.webp'
import anatomicalHeart186 from '../assets/services/values/anatomical-heart-186.webp'
import badge186 from '../assets/services/values/badge-186.webp'
import bookOpenReader186 from '../assets/services/values/book-open-reader-186.webp'
import boxConnection186 from '../assets/services/values/box-connection-186.webp'
import boxSecurity186 from '../assets/services/values/box-security-186.webp'
import boxSecurityAlt186 from '../assets/services/values/box-security-alt-186.webp'
import bullseyeArrow186 from '../assets/services/values/bullseye-arrow-186.webp'
import circleDashed186 from '../assets/services/values/circle-dashed-186.webp'
import circleUser186 from '../assets/services/values/circle-user-186.webp'
import codeSimple186 from '../assets/services/values/code-simple-186.webp'
import dataInsight186 from '../assets/services/values/data-insight-186.webp'
import emergencyStop186 from '../assets/services/values/emergency-stop-186.webp'
import endlessLoop186 from '../assets/services/values/endless-loop-186.webp'
import flag186 from '../assets/services/values/flag-186.webp'
import globalResearch186 from '../assets/services/values/global-research-186.webp'
import handBackFist186 from '../assets/services/values/hand-back-fist-186.webp'
import handFist186 from '../assets/services/values/hand-fist-186.webp'
import handsTogether186 from '../assets/services/values/hands-together-186.webp'
import heartCircleUser186 from '../assets/services/values/heart-circle-user-186.webp'
import modelCube186 from '../assets/services/values/model-cube-186.webp'
import modelCubeSpace186 from '../assets/services/values/model-cube-space-186.webp'
import roadmap186 from '../assets/services/values/roadmap-186.webp'
import vision186 from '../assets/services/values/vision-186.webp'
import { routes, serviceSlugs } from './routes'

export type ServiceSlug = (typeof serviceSlugs)[number]
export type Accent = 'brand-500' | 'brand-600' | 'brand-700' | 'brand-800' | 'brand-900'
export type HeroBackground = 'brand-600' | 'brand-700' | 'brand-800' | 'brand-900'
export type Collage = 'wind' | 'thermalpower' | 'biz'
export type OfferingIcon =
  | 'ballot-check'
  | 'book-open-reader'
  | 'compliance-document'
  | 'data-migration'
  | 'data-model'
  | 'handshake'
  | 'laptop-code'
  | 'leadership-alt'
  | 'plan-strategy'
  | 'search-alt'
  | 'software-development'
  | 'solar-system'
  | 'team'
  | 'team-check'
  | 'workshop'

export interface ResponsiveImage {
  desktop: ImageMetadata
  mobile: ImageMetadata
}

export interface Link {
  label: string
  href: string
}

export interface ValueItem {
  thumbnail: ImageMetadata
  thumbnailMobile: ImageMetadata
  label: string
  title: string
  body: string
}

export type OfferingText = string | { list: string[] }

export interface Offering {
  accent: Accent
  icon: OfferingIcon
  title: string
  text: OfferingText[]
  link: Link | null
  deliverables: string[]
}

export interface ApproachStep {
  number: string
  title: string
  text: string
  image: ImageMetadata | null
}

export interface CtaAction {
  label: string
  href: string
  emphasis: 'primary' | 'secondary'
  newTab: boolean
}

export interface RelatedProject {
  title: string
  excerpt: string
  period: string
  href: string
  image: ImageMetadata
  alt: string
  frame: 'bright' | 'brand-800'
  partnerTag: PartnerTag
}

export interface Service {
  slug: ServiceSlug
  name: string
  meta: { title: string; description: string }
  hero: {
    title: string | { desktop: string; mobile: string }
    lead: string
    image: ResponsiveImage
    background: HeroBackground
  }
  card: { title: string; paragraphs: string[]; link: Link; image: ResponsiveImage }
  intro: { tag: string; title: string; paragraphs: string[]; image: ImageMetadata; alt: string }
  offerings: { tag: string; title: string; items: Offering[] }
  values: { tag: string; title: string; columns: 5 | 6; items: ValueItem[] }
  approach: { tag: string; title: string; paragraphs: string[] } | null
  related: RelatedProject[]
  cta: { heading: string; text: string; background: HeroBackground; collage: Collage }
}

const moreAbout = (label: string): Link => ({ label: `More About ${label}`, href: routes.contact })

export const approachSteps: ApproachStep[] = [
  {
    number: '01',
    title: 'Identify Your Needs',
    text: 'Together, we identify what your organisation needs to achieve, what systems and capabilities already exist and where open-source software can add value. We then assemble the right combination of modelling, software, data, deployment, training and support.',
    image: null,
  },
  {
    number: '02',
    title: 'Build on Open Source Tools',
    text: 'We build on existing open-source tools and communities wherever possible. We develop new components where there is a genuine, reusable gap, prove them in important real-world planning processes and help institutions, consultancies and regional partners take on wider adoption and support.',
    image: null,
  },
  {
    number: '03',
    title: 'Applied Study',
    text: 'Applied studies are part of this approach when they validate or improve shared tools, data and methods. We often deliver them with commercial consultants, engineering firms and regional partners.',
    image: null,
  },
  {
    number: '04',
    title: 'Engagement & Support',
    text: 'Applied studies are part of this approach when they validate or improve shared tools, data and methods. We often deliver them with commercial consultants, engineering firms and regional partners.',
    image: null,
  },
]

export const approach = {
  illustration: howWeWork,
  placeholder: 'IMG-PLACEHOLDER',
  steps: approachSteps,
}

export const serviceDetail = { eyebrow: { label: 'Services', mobile: true } }

export const ctaActions: CtaAction[] = [
  { label: 'Contact Us', href: routes.contact, emphasis: 'primary', newTab: false },
  { label: 'Request a Demo', href: routes.contact, emphasis: 'secondary', newTab: false },
]

export const relatedProjects = {
  items: [
    {
      title: 'E-fuels in Australia',
      excerpt:
        'Supporting communication for the Government of Australia to identify potential policy issues from a security of supply perspective',
      period: 'MM/YYYY - MM/YYYY',
      href: routes.successStory('e-fuels-in-australia'),
      image: projectEfuels,
      alt: '',
      frame: 'bright',
      partnerTag: partnerTags.eskom,
    },
    {
      title: 'Openmod meets USA 2023',
      excerpt:
        "Held in collaboration with Stanford's Bits & Watts Initiative, this event reignited the passion for open energy modelling, a domain where openmod has been a pioneering grassroots movement.",
      period: 'MM/YYYY - MM/YYYY',
      href: routes.successStory('openmod-meets-usa-2023'),
      image: projectOpenmod,
      alt: '',
      frame: 'brand-800',
      partnerTag: partnerTags.stanford,
    },
  ] satisfies RelatedProject[],
}

export const servicesPage = {
  meta: {
    title: 'Services | Open Energy Transition',
    description:
      'Open Energy Transition strengthens the shared open-source planning stack and helps expert institutions put it into use.',
  },
  hero: {
    title: 'Make open-source energy planning work for your organisation',
    links: [{ label: 'Services', href: '#services' }],
    image: { desktop: heroServicesDesktop, mobile: heroServicesMobile },
  },
  intro: {
    id: 'services',
    tag: 'For Sectors and Industries',
    title:
      'Open-source energy models are capable of supporting complex, high-stakes planning decisions.',
    columns: [
      'Open Energy Transition strengthens the shared open-source planning stack and helps expert institutions put it into use.',
      'We build missing infrastructure, operationalize it in real planning workflows and enable institutions and partners to sustain it over time.',
    ],
  },
  approach: {
    tag: 'How We Work',
    title: 'We start with the planning workflow, not with a preferred tool.',
  },
  values: {
    tag: 'Why OET',
    title: 'Your Reliable Partner',
    items: [
      {
        thumbnail: vision248,
        thumbnailMobile: vision186,
        label: 'Security-Conscious',
        title: 'Security-Conscious Deployment and Data Handling',
        body: 'OET is certified to ISO/IEC 27001:2022, the international standard for information security management systems. Our security processes support the responsible handling of confidential data and the development and deployment of software for institutional use.',
      },
      {
        thumbnail: bookOpenReader248,
        thumbnailMobile: bookOpenReader186,
        label: 'Open Source',
        title: 'Open-Source Software Built for Institutional Use',
        body: 'We combine leading energy modelling expertise as co-maintainers of some of the most widely used energy system models with professional software and data engineering. This allows us to address the entire planning stack rather than treating the model in isolation.',
      },
      {
        thumbnail: anatomicalHeart248,
        thumbnailMobile: anatomicalHeart186,
        label: 'Independent',
        title: 'Independent and Mission-Driven',
        body: 'OET is an independent non-profit. We strengthen shared open-source infrastructure rather than maximise software licence revenue or lock clients into a proprietary product.',
      },
      {
        thumbnail: boxConnection248,
        thumbnailMobile: boxConnection186,
        label: 'Ecosystem',
        title: 'Connected\nAcross the Ecosystem',
        body: 'We connect planning institutions with open-source maintainers, technical experts, consultancies, research organisations, non-profits and funders. We also build the skills, systems, documentation and partnerships needed to sustain transparent planning over time.',
      },
      {
        thumbnail: handFist248,
        thumbnailMobile: handFist186,
        label: 'Support',
        title: 'Support Across the Complete Lifecycle',
        body: 'OET can remain involved from initial assessment and development through deployment, maintenance, upgrades and service level support.',
      },
    ] satisfies ValueItem[],
  },
  cta: {
    heading: 'Discuss a Technology Modelling Need',
    text: 'Talk to our team about a technology, dataset or repeatable analytical tool that should be represented transparently in energy system planning.',
  },
}

const migrationDeliverables = [
  'Use-case prioritisation',
  'Tool-fit assessment',
  'Data readiness assessment',
  'IT, solver and compute options',
  'Security and confidentiality requirements',
  'Integration with existing workflows',
  'Maintenance and governance strategies',
]

export const services: Service[] = [
  {
    slug: 'system-operators-and-utilities',
    name: 'System Operators and Utilities',
    meta: {
      title: 'System Operators and Utilities | Services | Open Energy Transition',
      description:
        'Open Energy Transition helps system operators and utilities assess, adopt and operate open-source planning tools with confidence.',
    },
    hero: {
      title: 'System Operators\nand Utilities',
      lead: 'Open Energy Transition helps system operators and utilities assess, adopt and operate open-source planning tools with confidence.',
      image: { desktop: heroSystemOperatorsDesktop, mobile: heroSystemOperatorsMobile },
      background: 'brand-700',
    },
    card: {
      title: 'System Operators and Utilities',
      paragraphs: [
        'Use open-source tools for complex planning workflows while meeting institutional requirements for security, reliability, performance and integration.',
        'We support model and data development, software deployment, validation, benchmarking, training, maintenance and ongoing technical support.',
      ],
      link: {
        label: 'Explore services for System Operators and Utilities',
        href: routes.service('system-operators-and-utilities'),
      },
      image: { desktop: cardSystemOperatorsDesktop, mobile: cardSystemOperatorsMobile },
    },
    intro: {
      tag: 'How We Help',
      title: 'Put open-source planning tools into institutional use',
      paragraphs: [
        'Open-source energy models can offer greater transparency, flexibility and control. But professional adoption requires reliable software, robust data pipelines, secure deployment, validation, training and ongoing support.',
        'Open Energy Transition helps system operators and utilities assess, adopt and operate open-source planning tools with confidence.',
      ],
      image: introSystemOperators,
      alt: '',
    },
    offerings: {
      tag: 'How We Work',
      title: 'How We Can Help',
      items: [
        {
          accent: 'brand-500',
          icon: 'data-migration',
          title: 'Open-source migration support',
          text: [
            'We identify where open-source tools can create the strongest value with the lowest risk, and help you get ready to migrate.',
          ],
          link: moreAbout('Open-source migration support'),
          deliverables: [
            ...migrationDeliverables,
            'Technical and organisational business cases to inform management decision making',
          ],
        },
        {
          accent: 'brand-600',
          icon: 'ballot-check',
          title: 'Benchmark and validate',
          text: [
            'We help establish whether tools are suitable for high-stakes use. Where solvers are compared, we work with their developers to ensure fair tuning and testing.',
          ],
          link: moreAbout('Benchmark and validate'),
          deliverables: [
            'Solver benchmarking',
            'Model comparison',
            'Performance and scalability testing',
            'Validation against existing workflows',
            'Data quality and reproducibility reviews',
          ],
        },
        {
          accent: 'brand-800',
          icon: 'laptop-code',
          title: 'Build and integrate',
          text: [
            'We adapt existing tools and develop the missing components needed for institutional use.',
          ],
          link: moreAbout('Build and integrate'),
          deliverables: [
            'Model extensions',
            'Data pipelines',
            'User interfaces',
            'Workflow automation',
            'Interoperability with proprietary tools, existing data formats and established planning workflows',
            'Local, cloud or managed deployment',
            'Testing and documentation',
          ],
        },
        {
          accent: 'brand-700',
          icon: 'workshop',
          title: 'Train and support',
          text: [
            'We adapt existing tools and develop the missing components needed for institutional use.',
          ],
          link: moreAbout('Build and integrate'),
          deliverables: [
            'Hands-on training',
            'Train-the-trainer programmes',
            'Regular expert support sessions',
            'Ticket-based technical support',
            'Software maintenance',
            'Model and data updates',
            'Service level agreements with defined response times, including a 24-hour response option',
          ],
        },
        {
          accent: 'brand-900',
          icon: 'book-open-reader',
          title: 'Keystone deployments and applied studies',
          text: [
            'We undertake planning studies where they help establish open-source tools in real institutional workflows, validate new capabilities or create reusable models, data and methods.\n\nRelevant applications include resource adequacy, flexibility, grid expansion, renewable integration, storage, market modelling and sector coupling.\n\nWe can lead the technical work or collaborate with commercial consultancies and engineering firms.',
          ],
          link: moreAbout('Open-source migration support'),
          deliverables: [],
        },
      ],
    },
    values: {
      tag: 'Why OET',
      title: 'Why OET',
      columns: 5,
      items: [
        {
          thumbnail: modelCubeSpace248,
          thumbnailMobile: modelCubeSpace186,
          label: 'Expertise',
          title: 'Deep expertise across the open modelling ecosystem',
          body: 'Our team includes more than 50 experts in energy modelling, software engineering and data infrastructure.\n\nOET team members co-maintain PyPSA, PyPSA-Eur and other tools in the PyPSA ecosystem, as well as other energy system models such as OSeMOSYS and Calliope. This gives us a broad view of the available open-source landscape rather than tying our work to a single tool.',
        },
        {
          thumbnail: badge248,
          thumbnailMobile: badge186,
          label: 'Quality',
          title: 'Institutional-quality open-source software',
          body: 'We combine energy modelling with software engineering, data infrastructure and deployment expertise.',
        },
        {
          thumbnail: boxSecurity248,
          thumbnailMobile: boxSecurity186,
          label: 'Security',
          title: 'Security-conscious deployment and data handling',
          body: 'OET is certified to ISO/IEC 27001:2022. We combine organisation-wide information security management with deployment approaches designed around confidential data, access control, local data ownership and institutional security requirements.',
        },
        {
          thumbnail: codeSimple248,
          thumbnailMobile: codeSimple186,
          label: 'Capability',
          title: 'Capability that remains in-house',
          body: 'We build the tools, skills and governance needed for your organisation to operate independently over time.',
        },
        {
          thumbnail: circleDashed248,
          thumbnailMobile: circleDashed186,
          label: 'Lifecycle',
          title: 'Support Across the Complete Lifecycle',
          body: 'We build the tools, skills and governance needed for your organisation to operate independently over time.',
        },
      ],
    },
    approach: null,
    related: relatedProjects.items,
    cta: {
      heading: 'Discuss a Technology Modelling Need',
      text: 'Talk to our team about a technology, dataset or repeatable analytical tool that should be represented transparently in energy system planning.',
      background: 'brand-700',
      collage: 'wind',
    },
  },
  {
    slug: 'regulators-and-public-authorities',
    name: 'Regulators and Public Authorities',
    meta: {
      title: 'Regulators and Public Authorities | Services | Open Energy Transition',
      description:
        'Open Energy Transition helps regulators and public authorities adopt open-source modelling tools, strengthen internal analytical capability and make planning decisions more transparent and reproducible.',
    },
    hero: {
      title: {
        desktop: 'Regulators and Public Authorities',
        mobile: 'Regulators \nand Public Authorities',
      },
      lead: 'Open Energy Transition helps regulators and public authorities adopt open-source modelling tools, strengthen internal analytical capability and make planning decisions more transparent and reproducible.',
      image: { desktop: heroRegulatorsDesktop, mobile: heroRegulatorsMobile },
      background: 'brand-800',
    },
    card: {
      title: 'Regulators and Public Authorities',
      paragraphs: [
        'Build independent and transparent analytical capabilities for energy policy, regulation and infrastructure assessment.',
        'We help public institutions select and adopt appropriate tools, establish reliable data and modelling workflows, train internal teams and assess plans using reproducible methods.',
      ],
      link: {
        label: 'Explore services for Regulators and Public Authorities',
        href: routes.service('regulators-and-public-authorities'),
      },
      image: { desktop: cardRegulatorsDesktop, mobile: cardRegulatorsMobile },
    },
    intro: {
      tag: 'How We Help',
      title: 'Build independent, transparent planning capability',
      paragraphs: [
        'Regulators and public institutions need to assess infrastructure plans, market reforms and transition pathways with confidence. Yet many still depend on proprietary tools, external consultants or analysis provided by regulated entities.',
        'Open Energy Transition helps regulators and public authorities adopt open-source modelling tools, strengthen internal analytical capability and make planning decisions more transparent and reproducible.',
      ],
      image: introRegulators,
      alt: '',
    },
    offerings: {
      tag: 'How We Work',
      title: 'How We Can Help',
      items: [
        {
          accent: 'brand-500',
          icon: 'data-migration',
          title: 'Open-source migration support',
          text: [
            'We identify where open-source tools can strengthen your role and reduce dependence on opaque analytical workflows.',
          ],
          link: moreAbout('Open-source migration support'),
          deliverables: [
            ...migrationDeliverables,
            'Technical and organisational business cases to inform management decision making',
          ],
        },
        {
          accent: 'brand-600',
          icon: 'laptop-code',
          title: 'Build independent modelling capability',
          text: [
            'We adapt existing tools and develop the components needed for public-sector use.',
          ],
          link: moreAbout('Benchmark and validate'),
          deliverables: [
            'National and regional models',
            'Regulatory assessment tools',
            'Data pipelines',
            'Scenario management',
            'User Interfaces and Visualisation',
            'Interoperability with proprietary tools, existing data formats and established planning workflows',
            'Local, cloud or managed deployment',
            'Testing and documentation',
          ],
        },
        {
          accent: 'brand-800',
          icon: 'search-alt',
          title: 'Review and challenge evidence',
          text: [
            'We help public institutions independently assess modelling submitted by utilities, system operators, developers and other stakeholders.',
          ],
          link: moreAbout('Build and integrate'),
          deliverables: [
            'Reproduction of submitted results',
            'Review of assumptions and methods',
            'Comparison of alternative scenarios',
            'Sensitivity and uncertainty analysis',
            'Model and data quality assessment',
            'Transparency and reproducibility reviews',
          ],
        },
        {
          accent: 'brand-700',
          icon: 'workshop',
          title: 'Train and support',
          text: ['We help internal teams use, maintain and develop open-source tools.'],
          link: moreAbout('Build and integrate'),
          deliverables: [
            'Hands-on training',
            'Train-the-trainer programmes',
            'Coaching during implementation',
            'Regular expert support sessions',
            'Ticket-based technical support',
            'Software and data maintenance',
            'Service level agreements with defined response times, including a 24-hour response option',
          ],
        },
        {
          accent: 'brand-900',
          icon: 'compliance-document',
          title: 'Applied policy and regulatory studies',
          text: [
            'We undertake studies where they help establish transparent tools in real policy or regulatory processes, validate new capabilities or create reusable models, data and methods.\n\nRelevant applications include infrastructure planning, resource adequacy, flexibility needs, market design, investment assessment, energy security and transition pathways.\n\nWe can lead the technical work or collaborate with commercial consultancies, legal advisors and local policy partners.',
          ],
          link: moreAbout('Open-source migration support'),
          deliverables: [],
        },
      ],
    },
    values: {
      tag: 'Why OET',
      title: 'Why Work with OET',
      columns: 6,
      items: [
        {
          thumbnail: flag207,
          thumbnailMobile: flag186,
          label: 'Independence',
          title: 'A neutral and independent partner',
          body: 'OET is an independent non-profit organisation. We are not owned by a software vendor, consultancy, utility or other market participant.\n\nOur recommendations are guided by the needs of the planning process and the public interest, not by a requirement to sell a particular tool, licence or proprietary methodology.',
        },
        {
          thumbnail: modelCubeSpace207,
          thumbnailMobile: modelCubeSpace186,
          label: 'Expertise',
          title: 'Expertise across the open modelling ecosystem',
          body: 'Our team includes more than 50 experts in energy modelling, software engineering and data infrastructure.\n\nOET team members co-maintain PyPSA, PyPSA-Eur and other tools in the PyPSA ecosystem, as well as other energy system models such as OSeMOSYS and Calliope.\n\nWe can assess and combine tools according to the needs of the institution rather than promote a single solution.',
        },
        {
          thumbnail: globalResearch207,
          thumbnailMobile: globalResearch186,
          label: 'Analytics',
          title: 'Greater analytical independence',
          body: 'Open-source tools allow public institutions to inspect assumptions, test alternatives and challenge evidence without relying entirely on external providers or analysis supplied by regulated entities.',
        },
        {
          thumbnail: codeSimple207,
          thumbnailMobile: codeSimple186,
          label: 'Capability',
          title: 'Capability that remains in-house',
          body: 'We help build the tools, skills, documentation and governance needed for institutions to operate increasingly independently over time.',
        },
        {
          thumbnail: emergencyStop207,
          thumbnailMobile: emergencyStop186,
          label: 'Decision Making',
          title: 'Transparent and defensible decisions',
          body: 'We develop workflows in which models, data and assumptions can be scrutinised, reproduced and clearly communicated to stakeholders.',
        },
        {
          thumbnail: circleDashed207,
          thumbnailMobile: circleDashed186,
          label: 'Lifecycle',
          title: 'Support across the full lifecycle',
          body: 'OET can support the journey from initial assessment and development through deployment, training, maintenance and service level support.',
        },
      ],
    },
    approach: {
      tag: 'How We Work',
      title: 'We start with the decision or regulatory process that needs to be supported.',
      paragraphs: [
        'Adoption can begin with one use case, an independent model comparison or a pilot assessment, then expand into a wider analytical platform and long-term support arrangement.',
      ],
    },
    related: relatedProjects.items,
    cta: {
      heading: 'Discuss Your\nAnalytical Needs',
      text: 'Talk to our team about the decisions you need to assess, the tools you use today and what it would take to build transparent in-house planning capability.',
      background: 'brand-900',
      collage: 'thermalpower',
    },
  },
  {
    slug: 'consultancies-and-engineering-firms',
    name: 'Consultancies and Engineering Firms',
    meta: {
      title: 'Consultancies and Engineering Firms | Services | Open Energy Transition',
      description:
        'Open Energy Transition works with consultancies and engineering firms as a specialist technical partner. We help you deliver stronger projects, reduce technical risk and expand your open-source offer.',
    },
    hero: {
      title: 'Consultancies and Engineering Firms',
      lead: 'Open Energy Transition works with consultancies and engineering firms as a specialist technical partner. We help you deliver stronger projects, reduce technical risk and expand your open-source offer.',
      image: { desktop: heroConsultanciesDesktop, mobile: heroConsultanciesMobile },
      background: 'brand-600',
    },
    card: {
      title: 'Consultancies and Engineering Firms',
      paragraphs: [
        'Add specialist open-source modelling, software and data capabilities to your client offer.',
        'We work as a technical partner on bids and projects, provide advanced modelling and software development, and help consulting teams build their own capacity to support open-source tools.',
      ],
      link: {
        label: 'Explore services for Consultancies and Engineering Firms',
        href: routes.service('consultancies-and-engineering-firms'),
      },
      image: { desktop: cardConsultanciesDesktop, mobile: cardConsultanciesMobile },
    },
    intro: {
      tag: 'How We Help',
      title: 'Extend your open-source modelling capabilities',
      paragraphs: [
        'Clients increasingly expect transparent methods, adaptable software and reproducible analysis. But building every modelling, data and software capability in-house is rarely efficient.',
        'Open Energy Transition works with consultancies and engineering firms as a specialist technical partner. We help you deliver stronger projects, reduce technical risk and expand your open-source offer.',
      ],
      image: introConsultancies,
      alt: '',
    },
    offerings: {
      tag: 'How We Work',
      title: 'How We Can Help',
      items: [
        {
          accent: 'brand-500',
          icon: 'leadership-alt',
          title: 'Specialist modelling support',
          text: [
            'Add experienced energy modellers to your project team. We can deliver a defined work package or work as part of an integrated project team.',
          ],
          link: null,
          deliverables: [
            'Energy system planning',
            'Resource adequacy',
            'Grid expansion',
            'Market modelling',
            'Flexibility and storage',
            'Renewable integration',
            'Hydrogen and sector coupling',
            'Geospatial and infrastructure analysis',
          ],
        },
        {
          accent: 'brand-600',
          icon: 'laptop-code',
          title: 'Model and software development',
          text: ['Build or adapt the tools needed for a client assignment.'],
          link: null,
          deliverables: [
            'Model configuration and extension',
            'New analytical functionality',
            'Data pipelines',
            'User interfaces and visualisation',
            'Workflow automation',
            'Interoperability with proprietary tools, existing data formats and established planning workflows',
            'Testing and documentation',
            'Performance optimisation',
          ],
        },
        {
          accent: 'brand-500',
          icon: 'data-migration',
          title: 'Open-source migration support',
          text: ['Help your own departments or your clients assess and adopt open-source tools.'],
          link: moreAbout('Open-source migration support'),
          deliverables: [...migrationDeliverables, 'Transition roadmaps'],
        },
        {
          accent: 'brand-600',
          icon: 'ballot-check',
          title: 'Benchmarking and validation',
          text: [
            'Provide independent technical evidence on model, solver and software performance. Where solvers are compared, we work with their developers to ensure fair tuning and testing.',
          ],
          link: null,
          deliverables: [
            'Solver benchmarking',
            'Model comparison',
            'Scalability and performance testing',
            'Validation against existing workflows',
            'Reproducibility and quality reviews',
          ],
        },
        {
          accent: 'brand-700',
          icon: 'workshop',
          title: 'Train and support',
          text: ['Build your team’s ability to use and support open-source tools.'],
          link: moreAbout('Build and integrate'),
          deliverables: [
            'Hands-on training',
            'Training based on live client projects',
            'Train-the-trainer programmes',
            'Coaching during implementation',
            'Ongoing expert support',
            'Maintenance and service level agreements',
          ],
        },
        {
          accent: 'brand-900',
          icon: 'handshake',
          title: 'Delivery partnerships',
          text: [
            'We can work with you:',
            {
              list: [
                'As a named consortium partner',
                'As a specialist subcontractor',
                'As a technical delivery partner',
                'Through long-term framework agreements',
              ],
            },
            '\nOur aim is to complement your client relationships, sector expertise and delivery capacity, not compete with them.',
          ],
          link: moreAbout('Open-source migration support'),
          deliverables: [],
        },
      ],
    },
    values: {
      tag: 'Why OET',
      title: 'Why OET',
      columns: 6,
      items: [
        {
          thumbnail: handBackFist207,
          thumbnailMobile: handBackFist186,
          label: 'Strengthen',
          title: 'Designed to strengthen your offer',
          body: 'OET leads frontier development and technically demanding first deployments.\n\nWe then help consulting partners build the capability to deliver and support routine adoption work themselves.\n\nOur objective is to expand the market for transparent planning, not to take over established client relationships. Success means consultancies, regional experts and institutions can use, improve and sustain these solutions without OET becoming a bottleneck.',
        },
        {
          thumbnail: modelCube207,
          thumbnailMobile: modelCube186,
          label: 'Expertise',
          title: 'Broad tool expertise',
          body: 'We are not tied to a single modelling framework. We help select and combine tools according to the needs of the project.',
        },
        {
          thumbnail: handsTogether207,
          thumbnailMobile: handsTogether186,
          label: 'Specialist',
          title: 'A team of more than 50 specialists',
          body: 'Our team combines energy modelling, software engineering and data infrastructure expertise.\nOET team members co-maintain PyPSA, PyPSA-Eur and other tools in the PyPSA ecosystem, as well as other energy system models such as OSeMOSYS and Calliope.',
        },
        {
          thumbnail: boxSecurityAlt207,
          thumbnailMobile: boxSecurityAlt186,
          label: 'Low Risk',
          title: 'Lower technical delivery risk',
          body: 'We provide specialist support for the most demanding parts of open-source modelling, data and software delivery.',
        },
        {
          thumbnail: endlessLoop207,
          thumbnailMobile: endlessLoop186,
          label: 'Reusability',
          title: 'Reusable capabilities',
          body: 'Our work strengthens shared tools, methods and your team’s internal capability rather than creating isolated one-off outputs.',
        },
        {
          thumbnail: roadmap207,
          thumbnailMobile: roadmap186,
          label: 'Flexibility',
          title: 'Flexible ways of working',
          body: 'We can support a single technical task, join a larger delivery team or provide ongoing specialist capability through a framework agreement.',
        },
      ],
    },
    approach: {
      tag: 'How We Work',
      title:
        'We start by defining the technical capability your project or client requires and where OET can add the most value.',
      paragraphs: [
        'We then agree on a clear role, interfaces with the wider team and how intellectual property, open-source contributions, client communication and ongoing support will be handled. We can either work together as one team, providing opportunities for your staff to learn alongside us, or split off discrete tasks.',
      ],
    },
    related: relatedProjects.items,
    cta: {
      heading: 'Strengthen your next project',
      text: 'Talk to our team about a bid, client assignment or capability gap where open-source modelling, software or data expertise would strengthen your offer.',
      background: 'brand-800',
      collage: 'wind',
    },
  },
  {
    slug: 'foundations-and-development-partners',
    name: 'Foundations and Development Partners',
    meta: {
      title: 'Foundations and Development Partners | Services | Open Energy Transition',
      description:
        'Open Energy Transition helps foundations and development partners invest in the shared infrastructure, institutional capability and partnerships needed for transparent energy planning to spread.',
    },
    hero: {
      title: 'Foundations and Development Partners',
      lead: 'Open Energy Transition helps foundations and development partners invest in the shared infrastructure, institutional capability and partnerships needed for transparent energy planning to spread.',
      image: { desktop: heroFoundationsDesktop, mobile: heroFoundationsMobile },
      background: 'brand-900',
    },
    card: {
      title: 'Foundations and Development Partners',
      paragraphs: [
        'Strengthen the shared tools, data and institutional capacity needed for transparent energy planning to spread.',
        'We design and deliver programmes that improve open-source infrastructure, close data and software gaps, support adoption by influential institutions and develop local delivery ecosystems.',
      ],
      link: {
        label: 'Explore services for system operators and utilities',
        href: routes.service('foundations-and-development-partners'),
      },
      image: { desktop: cardFoundationsDesktop, mobile: cardFoundationsMobile },
    },
    intro: {
      tag: 'How We Help',
      title: 'Build lasting open-source planning capacity',
      paragraphs: [
        'Many energy planning institutions lack access to reliable tools, trusted data, computing infrastructure and local technical support.\n\nOpen Energy Transition helps foundations and development partners invest in the shared infrastructure, institutional capability and partnerships needed for transparent energy planning to spread.',
        'We combine technical delivery with deep connections across the energy planning ecosystem, including system operators, utilities, regulators, consultancies, research institutions, open-source communities, non-profits and funders.',
      ],
      image: introFoundations,
      alt: '',
    },
    offerings: {
      tag: 'How We Work',
      title: 'How We Can Help',
      items: [
        {
          accent: 'brand-500',
          icon: 'plan-strategy',
          title: 'Programme design and partnership building',
          text: ['Turn a strategic objective into an implementable open-source programme.'],
          link: null,
          deliverables: [
            'Problem definition and stakeholder mapping',
            'Identification of high-impact use cases',
            'Technical and institutional feasibility assessment',
            'Programme architecture and governance',
            'Selection and convening of delivery partners',
            'Connections to relevant institutions and existing initiatives',
            'Budgeting, milestones and impact indicators',
          ],
        },
        {
          accent: 'brand-600',
          icon: 'laptop-code',
          title: 'Open-source tool development',
          text: [
            'Strengthen the software infrastructure needed for real institutional use. We work with existing maintainers and communities wherever possible, helping investments strengthen the wider ecosystem rather than create isolated tools.',
          ],
          link: null,
          deliverables: [
            'Development of missing functionality',
            'Maintenance and modularisation',
            'User interfaces and workflow automation',
            'Interoperability between tools',
            'Testing, documentation and security',
            'Cloud and local deployment options',
            'Benchmarking and quality assurance',
          ],
        },
        {
          accent: 'brand-800',
          icon: 'data-model',
          title: 'Open data infrastructure',
          text: ['Improve the availability, quality and usability of data for energy planning.'],
          link: null,
          deliverables: [
            'Data gap assessment',
            'Collection and harmonisations',
            'Reproducible data pipelines',
            'Validation and quality metrics',
            'Documentation and traceability',
            'Licensing and publication strategies',
            'Governance and long-term stewardship',
          ],
        },
        {
          accent: 'brand-700',
          icon: 'team',
          title: 'Institutional adoption',
          text: [
            'Help ministries, regulators, system operators, utilities and research institutions put open-source tools into practice. Our relationships with planning institutions help programmes respond to real operational needs and create credible routes to adoption.',
          ],
          link: null,
          deliverables: [
            'Use-case prioritisation',
            'Tool adaptation',
            'Data integration',
            'Secure deployment',
            'Pilot applications',
            'Training and coaching',
            'Maintenance and ongoing support',
          ],
        },
        {
          accent: 'brand-600',
          icon: 'workshop',
          title: 'Capacity building and ecosystem development',
          text: [
            'Build the local expertise and partnerships needed to sustain open-source planning beyond a single project.',
          ],
          link: null,
          deliverables: [
            'Professional training programmes',
            'Train-the-trainer initiatives',
            'University partnerships',
            'Communities of practice',
            'Seminars and technical dialogues across the open-source community',
            'Support for regional consultants and technical partners',
            'Connections to international experts and peer institutions',
            'Openly licensed teaching materials',
          ],
        },
        {
          accent: 'brand-500',
          icon: 'ballot-check',
          title: 'Technical review and validation',
          text: ['Assess proposed programmes, grants or technology investments.'],
          link: null,
          deliverables: [
            'Technical feasibility',
            'Software maturity',
            'Duplication with existing initiatives',
            'Governance and maintenance plans',
            'Adoption potential',
            'Opportunities for collaboration',
            'Long-term public value',
          ],
        },
      ],
    },
    values: {
      tag: 'Why OET',
      title: 'Why work with OET',
      columns: 6,
      items: [
        {
          thumbnail: bullseyeArrow207,
          thumbnailMobile: bullseyeArrow186,
          label: 'Mission Driven',
          title: 'A mission-driven non-profit',
          body: 'OET is an independent non-profit organisation. Our objective is to strengthen the open planning commons and expand access to high-quality energy planning tools.\n\nWe are not seeking to maximise licence revenue or create dependence on proprietary systems.',
        },
        {
          thumbnail: boxConnection207,
          thumbnailMobile: boxConnection186,
          label: 'Ecosystem',
          title: 'Connected across the energy planning ecosystem',
          body: 'OET works with system operators, utilities, regulators, consultancies, universities, software maintainers, civil-society organisations and funders.\n\nThese relationships help us identify genuine gaps, avoid duplicating existing work, assemble strong partnerships and connect shared infrastructure to institutions that can use it.',
        },
        {
          thumbnail: dataInsight207,
          thumbnailMobile: dataInsight186,
          label: 'Infrastructure',
          title: 'From shared infrastructure to real adoption',
          body: 'We combine software development, modelling, data, deployment and institutional capacity building. This allows us to connect investment in shared tools directly to their use in real planning processes.',
        },
        {
          thumbnail: handsTogether207,
          thumbnailMobile: handsTogether186,
          label: 'Specialist',
          title: 'A team of more than 50 specialists',
          body: 'Our team includes experts in energy modelling, software engineering, data infrastructure and institutional implementation.\n\nOET team members co-maintain PyPSA, PyPSA-Eur and other tools in the PyPSA ecosystem, as well as other energy system models such as OSeMOSYS and Calliope.',
        },
        {
          thumbnail: heartCircleUser207,
          thumbnailMobile: heartCircleUser186,
          label: 'Support',
          title: 'Local ownership and long-term sustainability',
          body: 'We work with local institutions, universities, consultants and technical experts so that capability remains in the region after the programme ends.',
        },
        {
          thumbnail: endlessLoop207,
          thumbnailMobile: endlessLoop186,
          label: 'Reusability',
          title: 'Reusable public value',
          body: 'Our programmes aim to leave behind maintained software, stronger data infrastructure, trained institutions and methods that can be reused across organisations and countries.',
        },
      ],
    },
    approach: {
      tag: 'How We Work',
      title:
        'We begin by identifying the systemic barrier to better planning and the institutions best positioned to create wider change.',
      paragraphs: [
        'We then bring together the relevant combination of planning institutions, technical communities, local partners, consultants, non-profits and funders. Programmes may combine shared software and data development with keystone deployments, training and long-term support.',
        'OET can lead technical demanding early work, but the long-term objective is for institutions, consultants and regional experts to sustain and expand adoption without OET becoming the bottleneck.',
      ],
    },
    related: relatedProjects.items,
    cta: {
      heading: 'Discuss a Programme With Us',
      text: 'Talk to our team about a region, institution or planning challenge where investment in open-source tools, data, partnerships and capability could create lasting impact.',
      background: 'brand-600',
      collage: 'biz',
    },
  },
  {
    slug: 'think-tanks-ngos-and-research-organizations',
    name: 'Think Tanks, NGOs and Research Organisations',
    meta: {
      title: 'Think Tanks, NGOs and Research Organisations | Services | Open Energy Transition',
      description:
        'Open Energy Transition helps organisations develop transparent analytical workflows, strengthen open-source tools and build internal capability.',
    },
    hero: {
      title: 'Think Tanks, NGOs and Research Organisations',
      lead: 'Open Energy Transition helps organisations develop transparent analytical workflows, strengthen open-source tools and build internal capability.',
      image: { desktop: heroThinkTanksDesktop, mobile: heroThinkTanksMobile },
      background: 'brand-700',
    },
    card: {
      title: 'Think Tanks, NGOs and Research Orgs.',
      paragraphs: [
        'Develop credible open models, datasets and analytical workflows that can be scrutinised, reused and maintained.',
        'We support tool development, applied modelling, data infrastructure, quality assurance, training and strategies for publishing and sustaining open-source work.',
      ],
      link: {
        label: 'Explore services for Think Tanks, NGOs and Research Organizations',
        href: routes.service('think-tanks-ngos-and-research-organizations'),
      },
      image: { desktop: cardThinkTanksDesktop, mobile: cardThinkTanksMobile },
    },
    intro: {
      tag: 'How We Help',
      title: 'Build credible open-source analysis',
      paragraphs: [
        'Think tanks, NGOs and research organisations need models and data that can withstand scrutiny, support public debate and be reused across projects.\n\nOpen Energy Transition helps organisations develop transparent analytical workflows, strengthen open-source tools and build internal capability.',
        'We combine energy modelling, software engineering, data infrastructure and close connections across the wider energy planning ecosystem.',
      ],
      image: introThinkTanks,
      alt: '',
    },
    offerings: {
      tag: 'How We Work',
      title: 'How We Can Help',
      items: [
        {
          accent: 'brand-500',
          icon: 'software-development',
          title: 'Develop and improve open models',
          text: [
            'We adapt existing open-source tools or develop missing capabilities for policy, research and advocacy work.',
          ],
          link: null,
          deliverables: [
            'National and regional models',
            'New analytical functionality',
            'Scenario management',
            'Data pipelines',
            'User interfaces and visualisation',
            'Testing and documentation',
            'Performance improvement',
            'Interoperability with other tools',
          ],
        },
        {
          accent: 'brand-600',
          icon: 'laptop-code',
          title: 'Build reliable data foundations',
          text: [
            'We help create the data infrastructure needed for credible and reproducible analysis.',
          ],
          link: null,
          deliverables: [
            'Data collection and harmonisation',
            'Reproducible processing pipelines',
            'Validation and quality checks',
            'Documentation and traceability',
            'Licensing and publication support',
            'Open data governance',
            'Maintenance and stewardship',
          ],
        },
        {
          accent: 'brand-800',
          icon: 'solar-system',
          title: 'Selected applied studies',
          text: [
            'We undertake selected studies where they establish transparent methods, improve shared tools or create reusable models and datasets.',
          ],
          link: null,
          deliverables: [
            'Energy transition pathways',
            'Grid and infrastructure planning',
            'Renewable integration',
            'Resource adequacy',
            'Flexibility and storage',
            'Market design',
            'Hydrogen and sector coupling',
            'Policy and investment scenarios',
          ],
        },
        {
          accent: 'brand-700',
          icon: 'ballot-check',
          title: 'Review and strengthen existing work',
          text: ['We provide independent technical review before publication or external use.'],
          link: null,
          deliverables: [
            'Model review',
            'Code and data quality assessment',
            'Reproducibility checks',
            'Sensitivity and uncertainty analysis',
            'Sensitivity and uncertainty analysis',
            'Review of assumptions and methods',
            'Validation against other models or datasets',
          ],
        },
        {
          accent: 'brand-600',
          icon: 'workshop',
          title: 'Train and support your team',
          text: ['We help teams use, adapt and maintain open-source tools independently.'],
          link: null,
          deliverables: [
            'Hands-on technical training',
            'Training based on live projects',
            'Train-the-trainer programmes',
            'Coaching during implementation',
            'Ongoing expert support',
            'Software and data maintenance',
            'Service level agreements',
          ],
        },
      ],
    },
    values: {
      tag: 'Why OET',
      title: 'Why work with OET',
      columns: 5,
      items: [
        {
          thumbnail: bullseyeArrow248,
          thumbnailMobile: bullseyeArrow186,
          label: 'Mission Driven',
          title: 'A mission-driven non-profit',
          body: 'OET is an independent non-profit organisation focused on strengthening the open planning commons.\n\nWe are not seeking to lock organisations into proprietary tools or retain routine consulting work indefinitely.',
        },
        {
          thumbnail: handsTogether248,
          thumbnailMobile: handsTogether186,
          label: 'Specialist',
          title: 'A team of more than 50 specialists',
          body: 'Our team combines energy modelling, software engineering and data infrastructure expertise.\n\nOET team members co-maintain PyPSA, PyPSA-Eur and other tools in the PyPSA ecosystem, as well as other energy system models such as OSeMOSYS and Calliope.',
        },
        {
          thumbnail: boxConnection248,
          thumbnailMobile: boxConnection186,
          label: 'Ecosystem',
          title: 'Connected across the ecosystem',
          body: 'We work with system operators, regulators, consultancies, universities, open-source maintainers, funders and other non-profits.\n\nThese connections help us avoid duplication, identify where tools are genuinely needed and connect research outputs to wider adoption.',
        },
        {
          thumbnail: endlessLoop248,
          thumbnailMobile: endlessLoop186,
          label: 'Reusability',
          title: 'Transparent and reusable outputs',
          body: 'Our work is designed to leave behind models, data, methods and documentation that others can inspect, improve and reuse.',
        },
        {
          thumbnail: codeSimple248,
          thumbnailMobile: codeSimple186,
          label: 'Capability',
          title: 'Capability that remains in-house',
          body: 'We help build the skills, systems and governance needed for organisations to sustain open-source analysis over time.',
        },
      ],
    },
    approach: {
      tag: 'How We Work',
      title:
        'We start with the decision, policy question or research objective that needs to be supported',
      paragraphs: [
        'We then identify which existing tools can be reused, what needs to be developed and how the work can contribute to the wider open-source ecosystem.',
        'Projects may combine model development, data, applied analysis, training and long-term support.',
      ],
    },
    related: relatedProjects.items,
    cta: {
      heading: 'Strengthen your next open-source project',
      text: 'Talk to our team about a model, dataset, study or internal capability that you want to develop on a transparent and reusable basis.',
      background: 'brand-700',
      collage: 'wind',
    },
  },
  {
    slug: 'technology-developers-and-investors',
    name: 'Technology Developers and Investors',
    meta: {
      title: 'Technology Developers and Investors | Services | Open Energy Transition',
      description:
        'Open Energy Transition develops transparent, reusable modelling methods, datasets and tools that represent new technologies in energy system planning.',
    },
    hero: {
      title: 'Technology Developers and Investors',
      lead: 'Open Energy Transition develops transparent, reusable modelling methods, datasets and tools that represent new technologies in energy system planning. We focus on work that strengthens shared open-source infrastructure rather than one-off commercial analysis.',
      image: { desktop: heroTechnologyDesktop, mobile: heroTechnologyMobile },
      background: 'brand-800',
    },
    card: {
      title: 'Technology Developers\nand Investors',
      paragraphs: [
        'Apply transparent energy system modelling to investment or design questions.',
        'We develop transparent methods, datasets and tools to assess system value, infrastructure requirements and performance under future scenarios, working alongside commercial advisors where broader project or investment analysis is required.',
      ],
      link: {
        label: 'Explore services for Technology Developers and Investors',
        href: routes.service('technology-developers-and-investors'),
      },
      image: { desktop: cardTechnologyDesktop, mobile: cardTechnologyMobile },
    },
    intro: {
      tag: 'How We Help',
      title: 'Represent new technologies in transparent energy system models',
      paragraphs: [
        'Technology developers and investors need to understand how assets will perform within a changing energy system.\n\nOpen Energy Transition develops transparent, reusable modelling methods, datasets and tools that represent new technologies in energy system planning.',
        'We focus on work that strengthens shared open-source infrastructure rather than one-off commercial analysis.\n\nWe often work alongside commercial consultancies, engineering firms and financial advisors, who lead broader project, transaction and investment work.',
      ],
      image: introTechnology,
      alt: '',
    },
    offerings: {
      tag: 'How We Work',
      title: 'How We Can Help',
      items: [
        {
          accent: 'brand-500',
          icon: 'leadership-alt',
          title: 'Represent technologies in open models',
          text: [
            'Develop transparent representations of emerging technologies and their interactions with the wider energy system. We support analysis of:',
          ],
          link: null,
          deliverables: [
            'Technology characteristics and operating constraints',
            'System value and flexibility contributions',
            'Grid and infrastructure dependencies',
            'Interactions with storage, hydrogen and sector coupling',
            'Long-term market and policy scenarios',
            'Transparent assumptions and validation methods',
          ],
        },
        {
          accent: 'brand-600',
          icon: 'laptop-code',
          title: 'Develop reusable datasets and methods',
          text: [
            'Create reusable technology datasets, scenario assumptions and modelling methods that can be applied across studies and planning institutions.',
          ],
          link: null,
          deliverables: [
            'Technology cost and performance datasets',
            'Scenario assumptions',
            'Sensitivity and uncertainty methods',
            'Regional adaptation',
            'Validation against operational evidence',
            'Documentation and open licensing',
          ],
        },
        {
          accent: 'brand-800',
          icon: 'leadership-alt',
          title: 'Build repeatable screening and planning tools',
          text: [
            'Develop open-source tools that allow teams and their advisors to update assumptions and repeat analysis as technologies and markets evolve.',
          ],
          link: null,
          deliverables: [
            'Technology modules for existing models',
            'Automated data pipelines',
            'Scenario management',
            'Screening and comparison tools',
            'Interactive interfaces',
            'Local or cloud deployment',
            'Integration with established planning workflows',
          ],
        },
        {
          accent: 'brand-700',
          icon: 'ballot-check',
          title: 'Technical review and validation',
          text: [
            'Review whether technology representations, assumptions and system integration claims are technically credible and reproducible. We can assess:',
          ],
          link: null,
          deliverables: [
            'Modelling methodology',
            'Technology and cost assumptions',
            'System integration claims',
            'Data quality',
            'Sensitivities',
            'Reproducibility',
            'Consistency with wider planning evidence',
          ],
        },
        {
          accent: 'brand-900',
          icon: 'team-check',
          title: 'Work with your advisors',
          text: [
            'We frequently collaborate with commercial consultants, engineering firms and other specialist providers.\n\nThey can lead the broader commercial, technical or financial assignment, while OET provides specialist open-source modelling, software and data expertise.',
          ],
          link: null,
          deliverables: [],
        },
      ],
    },
    values: {
      tag: 'Why OET',
      title: 'Why work with OET',
      columns: 5,
      items: [
        {
          thumbnail: flag248,
          thumbnailMobile: flag186,
          label: 'Independence',
          title: 'Independent and transparent analysis',
          body: 'OET is an independent non-profit organisation. We are not owned by a technology vendor, utility, developer or investor.\n\nOur analysis is not designed to promote a particular commercial product or proprietary tool.',
        },
        {
          thumbnail: handsTogether248,
          thumbnailMobile: handsTogether186,
          label: 'Specialist',
          title: 'A team of more than 50 specialists',
          body: 'Our team combines energy modelling, software engineering and data infrastructure expertise.\n\nOET team members co-maintain PyPSA, PyPSA-Eur and other tools in the PyPSA ecosystem, as well as other energy system models such as OSeMOSYS and Calliope.',
        },
        {
          thumbnail: boxConnection248,
          thumbnailMobile: boxConnection186,
          label: 'Ecosystem',
          title: 'Connected across the ecosystem',
          body: 'We work with system operators, regulators, consultancies, universities, open-source maintainers, funders and other non-profits.\n\nThese connections help us avoid duplication, identify where tools are genuinely needed and connect research outputs to wider adoption.',
        },
        {
          thumbnail: endlessLoop248,
          thumbnailMobile: endlessLoop186,
          label: 'Reusability',
          title: 'Reusable tools and methods',
          body: 'Where possible, our work improves shared models, data and methods rather than producing a one-off black-box result.',
        },
        {
          thumbnail: circleUser248,
          thumbnailMobile: circleUser186,
          label: 'Role',
          title: 'A defined role alongside commercial advisors',
          body: 'We provide specialist open-source modelling, software and data expertise. We do not provide general project finance, transaction or investment advisory services.',
        },
      ],
    },
    approach: {
      tag: 'How We Work',
      title:
        'We begin with the technology representation or reusable analytical capability that needs to be developed.',
      paragraphs: [
        'We then identify the appropriate open-source tools, data and scenarios, and agree how the work will connect to commercial, engineering or financial advice provided by specialist partners.',
        'OET takes on this work where it improves reusable infrastructure, demonstrates the value of transparent planning or supports wider adoption through partners.',
      ],
    },
    related: relatedProjects.items,
    cta: {
      heading: 'Discuss a technology modelling need',
      text: 'Talk to our team about a technology, dataset or repeatable analytical tool that should be represented transparently in energy system planning.',
      background: 'brand-800',
      collage: 'biz',
    },
  },
]
