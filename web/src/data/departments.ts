import type { PartnerTag } from '../components/cards/types'
import { partnerTags } from './partnerTags'
import type { ImageMetadata } from 'astro'
import type { SvgComponent } from 'astro/types'
import heroEsmDesktop from '../assets/heroes/dept-energy-system-modeling-desktop.webp'
import heroEsmMobile from '../assets/heroes/dept-energy-system-modeling-mobile.webp'
import heroIndexDesktop from '../assets/heroes/dept-index-desktop.webp'
import heroIndexMobile from '../assets/heroes/dept-index-mobile.webp'
import heroMtdDesktop from '../assets/heroes/dept-modeling-tools-data-desktop.webp'
import heroMtdMobile from '../assets/heroes/dept-modeling-tools-data-mobile.webp'
import heroRmdDesktop from '../assets/heroes/dept-research-market-development-desktop.webp'
import heroRmdMobile from '../assets/heroes/dept-research-market-development-mobile.webp'
import heroSeDesktop from '../assets/heroes/dept-software-engineering-desktop.webp'
import heroSeMobile from '../assets/heroes/dept-software-engineering-mobile.webp'
import cardEsmDesktop from '../assets/organization/departments/energy-system-modeling-desktop.jpg'
import cardEsmMobile from '../assets/organization/departments/energy-system-modeling-mobile.jpg'
import cardMtdDesktop from '../assets/organization/departments/modeling-tools-and-data-desktop.jpg'
import cardMtdMobile from '../assets/organization/departments/modeling-tools-and-data-mobile.jpg'
import cardRmdDesktop from '../assets/organization/departments/research-and-market-development-desktop.jpg'
import cardRmdMobile from '../assets/organization/departments/research-and-market-development-mobile.jpg'
import cardSeDesktop from '../assets/organization/departments/software-engineering-desktop.jpg'
import cardSeMobile from '../assets/organization/departments/software-engineering-mobile.jpg'
import photoAbdelKhalek from '../assets/organization/heads/abdel-khalek.jpg'
import photoAugspurger from '../assets/organization/heads/augspurger.jpg'
import photoCoetzee from '../assets/organization/heads/coetzee.jpg'
import photoFrysztacki from '../assets/organization/heads/frysztacki.jpg'
import photoKrishna from '../assets/organization/heads/krishna.jpg'
import photoPrindulis from '../assets/organization/heads/prindulis.jpg'
import photoVanDerWeijde from '../assets/organization/heads/van-der-weijde.jpg'
import projectEFuels from '../assets/organization/projects/e-fuels.jpg'
import projectGeothermal from '../assets/organization/projects/geothermal.jpg'
import projectOpenmod from '../assets/organization/projects/openmod.jpg'
import CheckCircle from '../icons/check-circle.svg'
import CircleBolt from '../icons/circle-bolt.svg'
import CircleDashed from '../icons/circle-dashed.svg'
import CodeMerge from '../icons/code-merge.svg'
import Grid from '../icons/grid.svg'
import PeopleGroup from '../icons/people-group.svg'
import PersonalFinance from '../icons/personal-finance.svg'
import PopulationGlobe from '../icons/population-globe.svg'
import SolarSystem from '../icons/solar-system.svg'
import SquareBolt from '../icons/square-bolt.svg'
import WorldwideNetwork from '../icons/worldwide-network.svg'
import YogaBall from '../icons/yoga-ball.svg'
import type { Locale } from '../i18n/config'
import { t } from '../i18n/ui'
import { departmentSlugs, routes } from './routes'

export type DepartmentSlug = (typeof departmentSlugs)[number]
export type DepartmentAccent = 'red' | 'dark-red' | 'charcoal' | 'plum'

export interface ResponsiveImage {
  desktop: ImageMetadata
  mobile: ImageMetadata
}

export interface DepartmentHead {
  name: string
  role: string
  photo: ImageMetadata
}

export interface WorkTopic {
  title: string
  description: string | null
  icon: SvgComponent
}

export interface DepartmentProject {
  title: string
  excerpt: string
  period: string
  href: string
  image: ImageMetadata
  alt: string
  frame: 'brand-500' | 'bright' | 'brand-800'
  partnerTag: PartnerTag | null
}

export interface DepartmentDetail {
  slug: DepartmentSlug
  cardImage: ResponsiveImage
  hero: {
    title: string
    lead: string
    image: ResponsiveImage
    background: 'brand-600' | 'brand-900' | 'neutral-900'
    ornament: 'department' | 'department-inverse'
    peopleCount: string
  }
  about: string
  works: {
    intro: string
    topics: WorkTopic[]
    outro: string | null
  }
  projects: DepartmentProject[]
  mobileColumn: 326 | 332
}

export interface Department {
  name: string
  lead: string
  summary: string
  accent: DepartmentAccent
  icon: SvgComponent
  head: DepartmentHead
  detail: DepartmentDetail | null
}

const paragraphs = (items: string[]) => items.map((item) => `<p>${item}</p>`).join('')

const eFuels: DepartmentProject = {
  title: 'E-fuels in Australia',
  excerpt:
    'Supporting communication for the Government of Australia to identify potential policy issues from a security of supply perspective',
  period: 'MM/YYYY - MM/YYYY',
  href: routes.successStory('e-fuels-in-australia'),
  image: projectEFuels,
  alt: '',
  frame: 'bright',
  partnerTag: partnerTags.eskom,
}

const openmod: DepartmentProject = {
  title: 'Openmod meets USA 2023',
  excerpt:
    "Held in collaboration with Stanford's Bits & Watts Initiative, this event reignited the passion for open energy modelling, a domain where openmod has been a pioneering grassroots movement.",
  period: 'MM/YYYY - MM/YYYY',
  href: routes.successStory('openmod-meets-usa-2023'),
  image: projectOpenmod,
  alt: '',
  frame: 'brand-800',
  partnerTag: partnerTags.stanford,
}

const geothermal: DepartmentProject = {
  title: 'Exploring the Geothermal Resource Potential in the U.S.',
  excerpt: 'Viability Assessment of Geothermal Using Integrated Energy Planning',
  period: 'MM/YYYY - MM/YYYY',
  href: routes.successStory('exploring-the-geothermal-resource-potential-in-the-us'),
  image: projectGeothermal,
  alt: '',
  frame: 'brand-500',
  partnerTag: null,
}

export const departments: Department[] = [
  {
    name: 'Energy System Modeling',
    lead: 'The Energy System Modelling Department develops, applies, and advances integrated open-source energy and grid planning models for real-world decision-making.',
    summary:
      'Our team works across scenario development, market modelling, grid planning, and system analysis, using interoperable, scalable toolchains that align with OET’s open planning ecosystem.',
    accent: 'red',
    icon: SolarSystem,
    head: {
      name: 'Dr. Martha Maria Frysztacki',
      role: 'Head of Energy System Modeling, Co-Founder',
      photo: photoFrysztacki,
    },
    detail: {
      slug: 'energy-system-modeling',
      cardImage: { desktop: cardEsmDesktop, mobile: cardEsmMobile },
      hero: {
        title: 'Energy System\nModeling',
        lead: 'The Energy System Modelling Department develops, applies, and advances integrated open-source energy and grid planning models for real-world decision-making. We build transparent, reproducible modelling workflows that enable governments, regulators, TSOs, researchers, and civil society to explore, benchmark, or scrutinize future energy systems and long-term transition pathways.',
        image: { desktop: heroEsmDesktop, mobile: heroEsmMobile },
        background: 'brand-600',
        ornament: 'department',
        peopleCount: '12',
      },
      about: paragraphs([
        'Our team works across scenario development, market modelling, grid planning, and system analysis, using interoperable, scalable toolchains that align with OET’s open planning ecosystem.',
        'The Energy System Modelling Department co-designs and executes the analytical backbone of OET’s work: open, transparent, and decision-grade energy and grid planning studies. We apply and operationalize OET’s open-source modelling stack to support institutions, creating reproducible modelling workflows, building tailored data pipelines, and producing systemwide analyses used in national, regional, and continental planning processes. Rather than focussing on developing the underlying tools, we identify recurring modelling needs, test missing features in real projects, and feed requirements back to the Modelling Tools &amp; Data unit, helping them generalize, improve, and maintain the broader ecosystem.',
      ]),
      works: {
        intro: paragraphs([
          'Our work covers long-term decarbonisation scenarios, market modelling, grid expansion assessments, sector coupling, flexibility analyses, uncertainty studies, and resource adequacy. The department is structured into topic-focused teams:',
        ]),
        topics: [
          { title: 'Integrated Energy Networks', description: null, icon: CodeMerge },
          { title: 'Power-to-X', description: null, icon: SquareBolt },
          {
            title: 'Integrated Energy Resource Planning',
            description: null,
            icon: PopulationGlobe,
          },
          { title: 'Modelling Uncertainty', description: null, icon: CircleDashed },
          { title: 'Flexibility Assessments', description: null, icon: CheckCircle },
        ],
        outro: paragraphs([
          'Each working on a priority modelling area that is either strategically important or currently high-demand among planners.',
        ]),
      },
      projects: [eFuels, openmod, geothermal, geothermal],
      mobileColumn: 326,
    },
  },
  {
    name: 'Modeling Tools & Data',
    lead: 'The Modeling Tools and Data department develops and maintains an ecosystem of open energy modelling tools and datasets that forms the technical backbone of Open Energy Transition’s mission',
    summary:
      'Our team works to make energy planning open, transparent, and accessible. This ecosystem enables faster, inclusive, and more informed decision-making by offering flexibility, collaboration, and lower cost.',
    accent: 'dark-red',
    icon: WorldwideNetwork,
    head: {
      name: 'Dr. Hazem Abdel-Khalek',
      role: 'Head of Modeling Tools & Data, Co-Founder',
      photo: photoAbdelKhalek,
    },
    detail: {
      slug: 'modeling-tools-and-data',
      cardImage: { desktop: cardMtdDesktop, mobile: cardMtdMobile },
      hero: {
        title: 'Modeling\nTools & Data',
        lead: 'The Modeling Tools and Data department develops and maintains an ecosystem of open energy modelling tools and datasets that form the technical backbone of Open Energy Transition’s mission to make energy planning open, transparent, and accessible. This ecosystem enables faster, more inclusive, and more informed decision-making by offering greater flexibility, collaboration, and lower cost.',
        image: { desktop: heroMtdDesktop, mobile: heroMtdMobile },
        background: 'brand-900',
        ornament: 'department-inverse',
        peopleCount: '12',
      },
      about: paragraphs([
        'We design, develop, and maintain an ecosystem of open-source tools and open datasets that support energy planning across scales and sectors. These tools are central to how OET, and our partners, analyse energy systems, explore future scenarios, and design solutions for a just and rapid energy transition.',
      ]),
      works: {
        intro: paragraphs([
          'To cover this work end-to-end, we operate through two interconnected streams:',
        ]),
        topics: [
          {
            title: 'Open-source Tool\nDevelopment and Maintenance',
            description:
              'ensuring our modelling frameworks remain reliable, scalable, and user-friendly',
            icon: CodeMerge,
          },
          {
            title: 'Open Data\nDevelopment and Curation',
            description:
              'delivering rigorously validated, ready-to-use datasets that enable transparent and reproducible energy planning',
            icon: CodeMerge,
          },
        ],
        outro: paragraphs([
          'As core maintainers and regular contributors to leading energy modelling frameworks, we prioritise openness, quality, and usability. Our work follows clear development roadmaps, involves transparent collaboration with global communities, and adheres to established best practices in code and data management. This helps ensure our tools and datasets remain reliable, current, and straightforward to adopt and adapt.',
          'Within OET, we coordinate closely with other departments to align our development efforts with strategic goals and practical project requirements. Externally, we actively engage with open-source communities to shape common standards and maintain relevance.',
          'Ultimately, our aim is to create and support an open and collaborative ecosystem of modelling tools and data that facilitates informed decision-making for sustainable energy transitions.',
        ]),
      },
      projects: [geothermal],
      mobileColumn: 332,
    },
  },
  {
    name: 'Software Engineering',
    lead: 'The Software Engineering Department at Open Energy Transition (OET) builds the digital infrastructure that powers modern energy modelling that help modellers and policymakers works.',
    summary:
      "Our team supports and advances OET's mission to accelerate the energy transition through better modeling. We build software that simplify the creation, execution, and analysis of large-scale real-world energy models",
    accent: 'charcoal',
    icon: CircleBolt,
    head: {
      name: 'Dr. Siddharth Krishna',
      role: 'Head of Software Engineering',
      photo: photoKrishna,
    },
    detail: {
      slug: 'software-engineering',
      cardImage: { desktop: cardSeDesktop, mobile: cardSeMobile },
      hero: {
        title: 'Software\nEngineering',
        lead: 'The Software Engineering Department at Open Energy Transition (OET) builds the digital infrastructure that powers modern energy modelling. Our team designs, develops, and maintains tools that help modellers and policymakers work more efficiently, collaboratively, and securely.',
        image: { desktop: heroSeDesktop, mobile: heroSeMobile },
        background: 'neutral-900',
        ornament: 'department',
        peopleCount: '12',
      },
      about: paragraphs([
        "The Software Engineering Department plays a central role in supporting and advancing OET's mission to accelerate the energy transition through better modelling. We build and maintain software tools that simplify the creation, execution, and analysis of large-scale real-world energy models.",
      ]),
      works: {
        intro: paragraphs([
          "Our work includes developing cloud-based infrastructure to run large models automatically and efficiently, allowing modellers to focus on insight generation rather than operational complexity. We train modelling teams to use this infrastructure effectively and ensure it's secure, scalable, and well-documented.",
          'We also benchmark solvers and explore ways to make models faster and more resource-efficient. Our team investigates emerging technologies—including machine learning—to clean and enhance input data, assist with model configuration, and streamline workflows. We create interactive dashboards and web apps that allow the public and stakeholders to engage with model outputs and explore different energy scenarios.',
          'Internally, we promote software engineering best practices—such as continuous integration, version control workflows, and collaborative development tools—to help modelling teams build high-quality, maintainable open-source codebases. Finally, we’re working to establish a robust information security policy to protect sensitive client data and move towards industry-standard certifications.',
        ]),
        topics: [],
        outro: null,
      },
      projects: [eFuels, geothermal],
      mobileColumn: 332,
    },
  },
  {
    name: 'Research and Market Development',
    lead: 'The Research and Market Development Department at Open Energy Transition (OET) leads the charge in advancing and promoting open energy modeling. ',
    summary:
      'Our team works with research partners across the world to bring the latest new tools and methods into OET, grow the global user and contributor community through training, and drive global market.',
    accent: 'red',
    icon: YogaBall,
    head: {
      name: 'Dr. Harry van der Weijde',
      role: 'Head of Research & Market Development',
      photo: photoVanDerWeijde,
    },
    detail: {
      slug: 'research-and-market-development',
      cardImage: { desktop: cardRmdDesktop, mobile: cardRmdMobile },
      hero: {
        title: 'Research and Market\nDevelopment',
        lead: 'The Research and Market Development Department at Open Energy Transition (OET) leads the charge in advancing and promoting open energy modeling. We work with research partners across the world to bring the latest new tools and methods into OET, grow the global user and contributor community through training, and drive global market development by making the case for open-source solutions and identifying new application areas.',
        image: { desktop: heroRmdDesktop, mobile: heroRmdMobile },
        background: 'brand-600',
        ornament: 'department',
        peopleCount: '12',
      },
      about: paragraphs([
        'Our department’s work is structured around three core activities: Research, Training, and Business Development. Together, they pave the way for open energy tools and datasets to become mainstream across the world. ',
      ]),
      works: {
        intro: paragraphs([
          'In Research, we explore the frontiers of open-source energy modeling and data. This includes developing new models, datasets, and methodologies that support energy planning across sectors and regions. We participate in research consortia (e.g. through Horizon Europe), co-supervise students, and collaborate closely with universities and institutes to bring academic insights into applied, open tools. We also pioneer new applications for open models, from price forecasting and energy access to flexibility and resilience.',
          'In Training, we equip energy modelers and decision-makers with the skills and confidence to use open-source tools effectively. We deliver hands-on workshops and structured training sessions using PyPSA and related tools, and we actively foster a growing international user and developer community. Our goal is not just to teach the tools, but to build a support network that sustains long-term growth and collaboration in the open modeling ecosystem.',
          'In Business Development, we advocate for and expand the use of open-source tools across new user groups. We work with philanthropic funders, policymakers, consultants, and other partners to demonstrate the value of open modeling. This includes writing funding proposals, scoping projects, delivering proof-of-concept studies, and partnering with consultancies to apply open tools in real-world contexts. We help shape how open-source energy modeling enters mainstream decision-making.',
        ]),
        topics: [],
        outro: null,
      },
      projects: [],
      mobileColumn: 332,
    },
  },
  {
    name: 'Finance',
    lead: 'The Finance Team at Open Energy Transition (OET) builds, manages, and arranges the strong financial foundation behind our mission.',
    summary:
      'The team manages OET’s financial operations, planning, and reporting. Ensuring resources are used responsibly and sustainably to support our work and long-term impact.',
    accent: 'red',
    icon: PersonalFinance,
    head: { name: 'Andris Prindulis', role: 'Head of Finance', photo: photoPrindulis },
    detail: null,
  },
  {
    name: 'People and Culture',
    lead: 'The People and Culture Department at Open Energy Transition (OET) creates an inclusive, supportive environment where our people and community can thrive.',
    summary:
      'Our team nurtures OET’s culture, supports talent development, and strengthens collaboration across the organisations. Empowering people to do their best work and advance our shared mission.',
    accent: 'plum',
    icon: PeopleGroup,
    head: { name: 'Quintin Coetzee', role: 'Head of People', photo: photoCoetzee },
    detail: null,
  },
  {
    name: 'Grid Data',
    lead: 'The Grid Data Team at Open Energy Transition (OET) develops and maintains open, high-quality datasets that represent electricity networks and support transparent, reliable energy system modelling.',
    summary:
      'The team collects, validates, and structures grid data from diverse sources, for researchers, planners, and policymakers to understand energy systems and build credible models for the energy transition.',
    accent: 'dark-red',
    icon: Grid,
    head: { name: 'Dr. Tobias Augspurger', role: 'Head of Grid Data', photo: photoAugspurger },
    detail: null,
  },
]

export const departmentsHeading = {
  tag: 'Departments',
  title: 'United by a Culture\nof Transparency & Collaboration',
}

export const departmentsIndex = {
  meta: {
    title: 'Departments | Open Energy Transition',
    description:
      'Meet the teams behind OET—bringing together diverse expertise to advance open, collaborative solutions for the energy transition.',
  },
  hero: {
    title: 'The Departments\nof OET',
    lead: 'Meet the teams behind OET—bringing together diverse expertise to advance open, collaborative solutions for the energy transition.',
    image: { desktop: heroIndexDesktop, mobile: heroIndexMobile },
    count: { value: '7', label: 'Department' },
    icon: SolarSystem,
  },
}

export const departmentCard = (locale: Locale, department: Department) => ({
  variant: department.detail === null ? ('compact' as const) : ('full' as const),
  name: department.name,
  lead: department.lead,
  summary: department.summary,
  accent: department.accent,
  icon: department.icon,
  head: department.head,
  link:
    department.detail === null
      ? null
      : {
          label: t(locale, 'card.viewDepartment'),
          href: routes.department(department.detail.slug),
        },
  image: department.detail === null ? null : department.detail.cardImage,
})

export const heroStats = (locale: Locale, icon: SvgComponent, value: string, label: string) => ({
  groups: [
    [
      { kind: 'icon' as const, icon, tone: 'brand' as const },
      { kind: 'icon' as const, icon: PeopleGroup, tone: 'light' as const },
      { kind: 'count' as const, value, label, tone: 'glass' as const },
    ],
  ],
  action: {
    href: routes.team,
    label: t(locale, 'department.meetTheTeam'),
    icon: 'arrow-right' as const,
  },
})
