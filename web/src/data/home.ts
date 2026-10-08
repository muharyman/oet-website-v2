import { routes } from './routes'
import type { PartnerTag, TitleLines } from '../components/cards/types'
import { partnerTags } from './partnerTags'
import type { ImageMetadata } from 'astro'
import hero1 from '../assets/home/hero-1.jpg'
import hero1Mobile from '../assets/home/hero-1-mobile.jpg'
import hero2 from '../assets/home/hero-2.jpg'
import hero2Mobile from '../assets/home/hero-2-mobile.jpg'
import hero3 from '../assets/home/hero-3.jpg'
import hero3Mobile from '../assets/home/hero-3-mobile.jpg'
import heroThumb1 from '../assets/home/hero-thumb-1.jpg'
import heroThumb2 from '../assets/home/hero-thumb-2.jpg'
import heroThumb3 from '../assets/home/hero-thumb-3.jpg'
import introImage from '../assets/home/intro.jpg'
import service1 from '../assets/home/service-1.jpg'
import service2 from '../assets/home/service-2.jpg'
import service3 from '../assets/home/service-3.jpg'
import service4 from '../assets/home/service-4.jpg'
import service5 from '../assets/home/service-5.jpg'
import service6 from '../assets/home/service-6.jpg'
import stepBuild from '../assets/home/step-build.jpg'
import stepDeploy from '../assets/home/step-deploy.jpg'
import stepScale from '../assets/home/step-scale.jpg'
import project1 from '../assets/home/project-1.jpg'
import project2 from '../assets/home/project-2.jpg'
import project3 from '../assets/home/project-3.jpg'
import pypsa from '../assets/home/logos/pypsa.png'
import pypsaAtlite from '../assets/home/logos/pypsa-atlite.png'
import calliope from '../assets/home/logos/calliope.png'
import osemosys from '../assets/home/logos/osemosys.png'
import linopy from '../assets/home/logos/linopy.png'
import genx from '../assets/home/logos/genx.png'
import times from '../assets/home/logos/times.png'
import openstreetmap from '../assets/home/logos/openstreetmap.png'
import bmbf from '../assets/home/logos/bmbf.png'
import edf from '../assets/home/logos/edf.png'
import ccg from '../assets/home/logos/ccg.png'
import verfassungsschutz from '../assets/home/logos/verfassungsschutz-bw.png'
import agora from '../assets/home/logos/agora.png'
import icct from '../assets/home/logos/icct.png'
import sequoia from '../assets/home/logos/sequoia.png'
import quadrature from '../assets/home/logos/quadrature.png'
import climact from '../assets/home/logos/climact.png'
import breakthrough from '../assets/home/logos/breakthrough-energy.png'
import uc from '../assets/home/logos/uc.png'
import stanford from '../assets/home/logos/stanford.png'
import transnetbw from '../assets/home/logos/transnetbw.png'
import oth from '../assets/home/logos/oth-regensburg.png'
import ember from '../assets/home/logos/ember.png'
import ecf from '../assets/home/logos/ecf.png'
import eurima from '../assets/home/logos/eurima.png'

export interface Logo {
  name: string
  image: ImageMetadata
  width: number
  height: number
}

export interface HeroSlide {
  label: string
  title: string
  paragraphs: [string, string]
  image: ImageMetadata
  imageMobile: ImageMetadata
  thumbnail: ImageMetadata
  alt: string
}

export type StatIcon = 'blueprint' | 'handshake' | 'employees' | 'world' | 'folder-edit' | 'license'

export interface Stat {
  value: string
  label: string
  icon: StatIcon
}

export interface ServiceItem {
  title: string
  paragraphs: string[]
  href: string
  image: ImageMetadata
  alt: string
}

export interface CarouselStep {
  title: string
  paragraphs: string[]
  note: string
  image: ImageMetadata
  alt: string
}

export interface LogoGroup {
  label: string | null
  logos: Logo[]
}

export interface Project {
  title: string
  titleLines: TitleLines
  excerpt: string
  period: string
  href: string
  image: ImageMetadata
  alt: string
  partnerTag: PartnerTag | null
  partnerLink: { label: string; href: string } | null
}

export const meta = {
  title: 'Open Energy Transition',
  description:
    'OET is a non-profit tackling energy planning challenges. We develop, co-maintain, and apply open-source tools that empower energy planners to make informed decisions for a sustainable tomorrow.',
}

export const hero = {
  actions: {
    secondary: { label: 'About Us', href: routes.about },
    primary: { label: 'Explore Our Tools', href: routes.toolsAndData },
  },
  slides: [
    {
      label: 'OET for Business',
      title: 'Mainstreaming\nOpen Energy Models\nfor a Global Sustainable Tomorrow',
      paragraphs: [
        'OET is a non-profit\ntackling energy planning challenges',
        'We Develop, co-maintain, and apply open-source tools that empower energy planners to make informed decisions for a sustainable tomorrow.',
      ],
      image: hero1,
      imageMobile: hero1Mobile,
      thumbnail: heroThumb1,
      alt: 'Wind turbines at sunset',
    },
    {
      label: 'OET for NGO',
      title: 'Better, Faster, & More Trusted Energy Decisions Globally.',
      paragraphs: [
        'Registered in Germany, we are committed to building solutions for a sustainable global future.',
        'We conduct research, develop open-source tools, and provide training to inform decision-making and address energy planning challenges',
      ],
      image: hero2,
      imageMobile: hero2Mobile,
      thumbnail: heroThumb2,
      alt: 'High-voltage transmission tower against a cloudy sky',
    },
    {
      label: 'OET for Governance',
      title: 'UVP Marketing Statement for\nGovernment Here',
      paragraphs: [
        'Registered in Germany, we are committed to building solutions for a sustainable global future.',
        'We conduct research, develop open-source tools, and provide training to inform decision-making and address energy planning challenges',
      ],
      image: hero3,
      imageMobile: hero3Mobile,
      thumbnail: heroThumb3,
      alt: 'Statue with a European flag in front of a government building',
    },
  ] satisfies HeroSlide[],
}

export const intro = {
  tag: 'How We Help',
  title: 'We envision a world\nwhere energy systems\nare sustainable and equitable for all.',
  paragraphs: [
    'To succeed with this, energy planning tools must be transparent, innovative, and locally adapted – and collaboration is key to make this happen.',
    'Therefore it is our mission to mainstream open-source tools that enable this vision and empower all decision-makers and communities to plan, model and implement energy transition effectively.',
  ],
  actions: [
    {
      label: 'Theory of Change',
      href: routes.theoryOfChange,
      variant: 'primary',
      arrow: true,
    },
    { label: 'About Us', href: routes.about, variant: 'outline', arrow: false },
  ] as const,
  image: introImage,
  alt: 'Solar panels on a roof at dusk',
}

export const stats: Stat[] = [
  { value: '35', label: 'Projects', icon: 'blueprint' },
  { value: '25', label: 'Partners', icon: 'handshake' },
  { value: '50+', label: 'Team Members', icon: 'employees' },
  { value: '40+', label: 'Countries', icon: 'world' },
  { value: '19', label: 'Tools & Data', icon: 'folder-edit' },
  { value: '€0', label: 'Price per License', icon: 'license' },
]

export const services = {
  tag: 'Services',
  title: 'Make open-source energy planning\nwork for your organization',
  items: [
    {
      title: 'System Operators & Utilities',
      paragraphs: [
        'Use open-source tools for complexdemanding planning workflows while meeting institutional requirements for security, reliability, performance and integration.',
        'We support model and data development, software deployment, validation, benchmarking, training, maintenance and ongoing technical support.',
      ],
      href: routes.service('system-operators-and-utilities'),
      image: service1,
      alt: 'Line workers servicing equipment on a transmission tower',
    },
    {
      title: 'Regulators & Public Authorities',
      paragraphs: [
        'Build independent and transparent analytical capabilities for energy policy, regulation and infrastructure assessment. We help public institutions select and adopt appropriate tools, establish reliable data and modelling workflows, train internal teams and assess plans using reproducible methods.',
      ],
      href: routes.service('regulators-and-public-authorities'),
      image: service2,
      alt: '',
    },
    {
      title: 'Consultancies & Engineering Firms',
      paragraphs: [
        'Add specialist open-source modelling, software and data capabilities to your client offer. We work as a technical partner on bids and projects, provide advanced modelling and software development, and help consulting teams build their own capacity to support open-source tools.',
      ],
      href: routes.service('consultancies-and-engineering-firms'),
      image: service3,
      alt: '',
    },
    {
      title: 'Foundations & Development Partners',
      paragraphs: [
        'Strengthen the shared tools, data and institutional capacity needed for transparent energy planning to spread. We design and deliver programmes that improve open-source infrastructure, close data and software gaps, support adoption by influential institutions and develop local delivery ecosystems.',
      ],
      href: routes.service('foundations-and-development-partners'),
      image: service4,
      alt: '',
    },
    {
      title: 'Think Tanks, NGOs & Research Organizations',
      paragraphs: [
        'Open-source energy models can offer greater transparency, flexibility and control. But professional adoption requires reliable software, robust data pipelines, secure deployment, validation, training and ongoing support.',
      ],
      href: routes.service('think-tanks-ngos-and-research-organizations'),
      image: service5,
      alt: '',
    },
    {
      title: 'Technology Developers & investors',
      paragraphs: [
        'Apply transparent energy system modelling to investment or design questions. We develop transparent methods, datasets and tools to assess system value, infrastructure requirements and performance under future scenarios, working alongside commercial advisors where broader project or investment analysis is required.',
      ],
      href: routes.service('technology-developers-and-investors'),
      image: service6,
      alt: '',
    },
  ] satisfies ServiceItem[],
}

export const tools = {
  tag: 'Tools Support',
  title: 'OET Supports\na Broad Range\nof Modeling Platforms',
  paragraphs: [
    'We support a broad range of modeling platforms to meet diverse needs and also build secure, open-source applications that integrate proprietary data, ensuring accessibility, privacy, and local self-maintenance without requiring public sharing.',
    'These include Python for Power System Analysis (PyPSA), the PyPSA-based European and global sector-coupled energy systems models PyPSA-Eur and PyPSA-Earth',
  ],
  action: { label: 'See All Tools', href: routes.toolsAndData },
  logos: [
    { name: 'PyPSA', image: pypsa, width: 140, height: 56 },
    { name: 'PyPSA/atlite', image: pypsaAtlite, width: 127, height: 44 },
    { name: 'Calliope', image: calliope, width: 148, height: 44 },
    { name: 'OSeMOSYS', image: osemosys, width: 120, height: 44 },
    { name: 'linopy', image: linopy, width: 133, height: 44 },
    { name: 'GenX.jl', image: genx, width: 115, height: 44 },
    { name: 'TIMES', image: times, width: 133, height: 56 },
    { name: 'OpenStreetMap', image: openstreetmap, width: 92, height: 56 },
  ] satisfies Logo[],
}

export const steps = {
  tag: 'How We Help',
  title: 'Build, Deploy, Scale',
  items: [
    {
      title: 'Build',
      paragraphs: [
        'We build and maintain open-source data and software solutions for energy planning',
        'Energy transition and planning studies with actionable insights for low-carbon strategy, investment, and resource adequacy, tailored to your needs.',
      ],
      note: 'Powered by transparent, reproducible open-source models, which we always make available to the client to adapt and re-use down the line.',
      image: stepBuild,
      alt: 'Wind turbines silhouetted against an orange sunset',
    },
    {
      title: 'Deploy',
      paragraphs: [
        'Enterprise-grade open-source platforms with flexible, secure and scalable software tools that meet your energy planning needs.',
        'We deploy open tools to create trusted studies and insights, help institutions to develop the same capability and infrastructure and become more independent of proprietary modeling tool',
      ],
      note: 'Built on the latest international academic and industry knowledge, integrated into your data pipelines, and fully adapted to your requirements',
      image: stepDeploy,
      alt: 'Source code on a screen',
    },
    {
      title: 'Scale',
      paragraphs: [
        'Hands-on training programs, comprehensive guidance, and real-time technical support. We help best practises to spread through training and support, awareness building, benchmarks',
      ],
      note: 'For organizations and individuals who use open-source tools for impactful, smarter, and more sustainable energy planning.',
      image: stepScale,
      alt: 'Colleagues talking during a training session',
    },
  ] satisfies CarouselStep[],
}

const edfLogo: Logo = { name: 'Environmental Defense Fund', image: edf, width: 122, height: 40 }
const ccgLogo: Logo = { name: 'Climate Compatible Growth', image: ccg, width: 70, height: 70 }
const verfassungsschutzLogo: Logo = {
  name: 'Verfassungsschutz Baden-Württemberg',
  image: verfassungsschutz,
  width: 120,
  height: 63,
}
const bmbfLogo: Logo = {
  name: 'Bundesministerium für Bildung und Forschung',
  image: bmbf,
  width: 127,
  height: 67,
}
const ucLogo: Logo = { name: 'University of Canterbury', image: uc, width: 61, height: 50 }
const agoraLogo: Logo = { name: 'Agora Energiewende', image: agora, width: 93, height: 40 }
const icctLogo: Logo = {
  name: 'The International Council on Clean Transportation',
  image: icct,
  width: 99,
  height: 59,
}
const sequoiaLogo: Logo = {
  name: 'Sequoia Climate Foundation',
  image: sequoia,
  width: 127,
  height: 40,
}
const quadratureLogo: Logo = {
  name: 'Quadrature Climate Foundation',
  image: quadrature,
  width: 133,
  height: 40,
}
const climactLogo: Logo = { name: 'Climact', image: climact, width: 79, height: 60 }
const breakthroughLogo: Logo = {
  name: 'Breakthrough Energy',
  image: breakthrough,
  width: 136,
  height: 42,
}

const sharedLogos: Logo[] = [
  agoraLogo,
  icctLogo,
  sequoiaLogo,
  quadratureLogo,
  climactLogo,
  breakthroughLogo,
]

export const partnerGroups: LogoGroup[] = [
  {
    label: 'Our Trusted Partners',
    logos: [bmbfLogo, edfLogo, ccgLogo, verfassungsschutzLogo, ...sharedLogos],
  },
  {
    label: 'Our Global Networks and Affiliations',
    logos: [ucLogo, edfLogo, ccgLogo, verfassungsschutzLogo, ...sharedLogos],
  },
]

export const partnerGroupsMobile: LogoGroup[] = [
  {
    label: 'Our Trusted Partners',
    logos: [
      { ...bmbfLogo, width: 69, height: 36 },
      { ...verfassungsschutzLogo, width: 69, height: 36 },
      ucLogo,
      { ...edfLogo, width: 76, height: 25 },
      { ...ccgLogo, width: 55, height: 55 },
      { ...agoraLogo, width: 69, height: 30 },
      { ...icctLogo, width: 67, height: 40 },
      { ...edfLogo, width: 76, height: 25 },
      { ...sequoiaLogo, width: 69, height: 22 },
      { ...quadratureLogo, width: 69, height: 21 },
      { ...climactLogo, width: 54, height: 41 },
      { ...breakthroughLogo, width: 70, height: 22 },
      { name: 'Stanford University', image: stanford, width: 72, height: 32 },
      { name: 'TransnetBW', image: transnetbw, width: 81, height: 10 },
      { name: 'OTH Regensburg', image: oth, width: 67, height: 44 },
      { name: 'Ember', image: ember, width: 67, height: 29 },
      { name: 'European Climate Foundation', image: ecf, width: 60, height: 29 },
      { name: 'eurima', image: eurima, width: 76, height: 28 },
    ],
  },
]

export const projects = {
  tag: 'Projects',
  title:
    'Helping governments, businesses, and the non-profit sector make better evidence-informed decisions.',
  label: 'Projects',
  items: [
    {
      title: 'Sustainable Hydrogen and Power-to-X ramp-up in Africa',
      titleLines: 3,
      excerpt:
        'strengthening the global perspective of energy research, advancing sector coupling in the energy transition, and harnessing digitization to enhance energy systems',
      period: 'MM/YYYY - MM/YYYY',
      href: routes.successStory('sustainable-hydrogen-and-power-to-x-ramp-up-in-africa'),
      image: project1,
      alt: '',
      partnerTag: null,
      partnerLink: null,
    },
    {
      title: 'Project Tauritron',
      titleLines: 2,
      excerpt:
        'This project will improve how people interact with energy data, enable simple calculations and visualizations, promote public engagement, and improve human-centered decision making.',
      period: 'MM/YYYY - MM/YYYY',
      href: routes.successStory('project-tauritron'),
      image: project2,
      alt: '',
      partnerTag: null,
      partnerLink: null,
    },
    {
      title: 'Google Guarantee of Origin Study',
      titleLines: 2,
      excerpt: 'Exploring green energy in Europe for the world’s largest companies',
      period: 'MM/YYYY - MM/YYYY',
      href: routes.successStory('google-guarantee-of-origin-study'),
      image: project3,
      alt: '',
      partnerTag: partnerTags.google,
      partnerLink: { label: 'Google.com', href: 'https://www.google.com' },
    },
  ] satisfies Project[],
}
