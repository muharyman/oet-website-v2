import toolsDesktop from '../assets/heroes/tools-and-data-desktop.webp'
import toolsMobile from '../assets/heroes/tools-and-data-mobile.webp'
import { routes } from './routes'

export type ToolCategoryId = 'tools' | 'model' | 'data' | 'solvers' | 'community'
export type ToolCategoryTone = 'brand' | 'brand-700' | 'neutral-900' | 'neutral-700' | 'brand-900'

export interface ToolCategory {
  id: ToolCategoryId
  slug: string
  label: string
  tabLabel: string
  tone: ToolCategoryTone
}

export interface Tool {
  name: string
  description: string[]
  categories: ToolCategoryId[]
  sourceHref: string
  websiteHref: string
  githubHref: string
}

export const toolCategories: ToolCategory[] = [
  { id: 'tools', slug: 'tools', label: 'Tools', tabLabel: 'Tools', tone: 'brand' },
  { id: 'model', slug: 'models', label: 'Model', tabLabel: 'Model', tone: 'brand-700' },
  { id: 'data', slug: 'data', label: 'Data', tabLabel: 'Data', tone: 'neutral-900' },
  {
    id: 'solvers',
    slug: 'open-source-solvers',
    label: 'Open-source solvers',
    tabLabel: 'Open Source Solvers',
    tone: 'neutral-700',
  },
  {
    id: 'community',
    slug: 'community',
    label: 'Community',
    tabLabel: 'Community',
    tone: 'brand-900',
  },
]

const tool = (name: string, categories: ToolCategoryId[], description: string[]): Tool => ({
  name,
  description,
  categories,
  sourceHref: routes.contact,
  websiteHref: routes.contact,
  githubHref: routes.contact,
})

export const tools: Tool[] = [
  tool(
    'Openmod-tracker',
    ['tools'],
    [
      'Maintainer | Explore and compare open-source energy modeling tools.',
      'Find metrics, documentation, and community activity for tools used in energy transition planning',
    ],
  ),
  tool('Power Net Zero', ['tools'], ['Maintainer | PyPSA-Earth Visualization Dashboard']),
  tool(
    'Open Energy Benchmark',
    ['tools', 'solvers'],
    [
      'Maintainer | An open-source benchmark of optimization solvers on representative problems from the energy planning domain',
    ],
  ),
  tool(
    'PyPSA',
    ['model'],
    [
      'Co-maintainer | A python software toolbox for simulating and optimising modern power systems',
    ],
  ),
  tool(
    'PyPSA-Earth',
    ['model'],
    [
      'Co-maintainer | A python software toolbox for simulating and optimising modern power systems globally',
    ],
  ),
  tool(
    'PyPSA-Eur',
    ['model'],
    [
      'Co-maintainer | A python software toolbox for simulating and optimising modern power systems in Europe',
    ],
  ),
  tool(
    'Open-TYNDP',
    ['model'],
    [
      'Maintainer | Interfacing open energy system planning with ENTSO-E Models and contributing to TYNDP',
    ],
  ),
  tool(
    'DemandCast',
    ['data'],
    [
      'Maintainer | A Python-based project focused on collecting, processing, and forecasting hourly electricity demand data',
    ],
  ),
  tool('Atlite', ['data'], ['Co-maintainer | Convert weather data to energy systems data']),
  tool(
    'Detect-Infra',
    ['data'],
    ['A machine learning pipeline to detect infrastructure from satellite images'],
  ),
  tool(
    'Powerplant matching',
    ['data'],
    ['Co-maintainer | A toolbox to combine multiple powerplant databases'],
  ),
  tool(
    'TechnologyData',
    ['data'],
    ['Co-maintainer | A tool that compiles assumptions on energy system technologies'],
  ),
  tool(
    'MapYourGrid',
    ['data', 'community'],
    [
      'Co-maintainer | MapYourGrid is an open, collaborative initiative that aims to map electricity grids around the world, focusing on high-voltage transmission lines, substations, power plants, and major energy consumers',
    ],
  ),
  tool(
    'Awesome Grid Model Data',
    ['data'],
    [
      'Maintainer | A curated collection of publicly available electricity grid (production cost, power flow, etc.) model datasets for academic and industry research',
    ],
  ),
  tool(
    'Awesome Electrical Grid Mapping',
    ['data'],
    ['Maintainers | A curated list of global electrical grid maps, datasets and resources'],
  ),
  tool(
    'Awesome Electricity Demand',
    ['data'],
    [
      'Maintainer | A curated collection of links to hourly or sub-hourly electricity demand data, designed to improve the accessibility and discoverability of datasets for energy system modelers and planners',
    ],
  ),
  tool('Linopy', ['solvers'], ['Maintainer | Linear optimization interface for Python']),
  tool(
    'HiGHS-campaign',
    ['solvers'],
    [
      'We organised a campaign, collecting +500k$, to make the worlds-fastest open-source solver HiGHS ready for large energy planning problems',
    ],
  ),
  tool(
    'PyPSA meets Earth',
    ['community'],
    [
      'The heart of the PyPSA meets Earth community life is happening on Discord. We hold there all our meetings, coffee breaks and exchanges. Discord provides voice channels, text channels, and event stages.',
    ],
  ),
]

export const toolsPage = {
  meta: {
    title: 'Tools and Data',
    description:
      'Open models, open-source software and open data supported or built by Open Energy Transition.',
  },
  hero: {
    eyebrow: { label: 'Tools & Data', mobile: false },
    title: 'Range of Open Models, Open-Source Software, and Open Data.',
    link: { label: 'Tools & Data', href: '#tools' },
    image: { desktop: toolsDesktop, mobile: toolsMobile },
  },
  intro: {
    id: 'tools',
    title: 'Tools and Data\nSupported or Built by Us',
    paragraphs: [
      'Open tools and data ensure transparency and reproducibility, collaboration and innovation, flexibility and speed, interoperability, capacity development, and lower cost. ',
      'We support a range of open models, open-source software, and open data. We are technology-agnostic with extensive expertise in PyPSA, Temoa, TIMES, and others.',
    ],
  },
  mobilePagination: { current: 1, total: 10 },
  cta: {
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
    collage: 'thermalpower' as const,
    breakout: true,
  },
}
