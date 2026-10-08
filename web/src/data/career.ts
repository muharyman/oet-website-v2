import type { SvgComponent } from 'astro/types'
import heroDesktop from '../assets/heroes/career-desktop.webp'
import heroMobile from '../assets/heroes/career-mobile.webp'
import AttributionPen from '../icons/attribution-pen.svg'
import DigitalId from '../icons/digital-id.svg'
import Document from '../icons/document.svg'
import MagnifyingGlassEye from '../icons/magnifying-glass-eye.svg'
import Meeting from '../icons/meeting.svg'
import OnlineInterview from '../icons/online-interview.svg'
import PaperPlane from '../icons/paper-plane.svg'
import PersonRays from '../icons/person-rays.svg'
import PersonThroughWindow from '../icons/person-through-window.svg'
import ReferralAlt from '../icons/referral-alt.svg'
import TableList from '../icons/table-list.svg'
import { routes } from './routes'

export type JobTheme =
  | 'finance'
  | 'people-and-culture'
  | 'software-engineering'
  | 'research-and-market-development'
  | 'modeling-tools-and-data'
  | 'energy-system-modeling'
  | 'grid-data'
  | 'miscellaneous'

export interface Job {
  title: string
  location: string
  languages: string
  workMode: string
  employmentType: string
  href: string
  newTab: boolean
  theme: JobTheme
}

export interface HiringStep {
  number: string
  text: string
  icon: SvgComponent
}

export const meta = {
  title: 'Career | Open Energy Transition',
  description:
    'Join OET and work alongside a global community creating open, transparent solutions for a faster and more equitable energy transition.',
}

export const hero = {
  title: 'Work\nWith Us',
  lead: [
    'Our culture is one founded on the principles of autonomy, trust, growth, and transparency. These values are embodied by all OETers, across our Departments, and all of our teams.',
    'Join OET and work alongside a global community creating open, transparent solutions for a faster and more equitable energy transition.',
  ],
  image: { desktop: heroDesktop, mobile: heroMobile },
  icon: DigitalId,
  count: { value: '3', label: 'Open Roles' },
  action: { label: 'Explore Opportunities', href: '#open-roles' },
}

export const roles = {
  id: 'open-roles',
  tag: 'Open Roles',
  title: 'Currently Open Roles',
  columns: [
    'If you have any issues with or questions to your application, you are welcome to reach out to our team at: <a href="mailto:careers@openenergytransition.org">careers@openenergytransition.org</a>.',
    'All roles are fully-remote. If any travel is required, the job spec will state this.  In brackets are the fixed location of hire, as well as any mandatory language fluency requirements.',
    'Please only apply for roles where you fulfil these aspects. We&#39;re excited to review your application!',
  ],
  jobs: [
    {
      title: 'Business Operations Manager at IT & Climate NGO',
      location: 'Southern Africa, Eastern Europe',
      languages: 'English',
      workMode: 'Fully Remote',
      employmentType: 'Full-Time',
      href: routes.contact,
      newTab: false,
      theme: 'research-and-market-development',
    },
    {
      title: 'Finance Manager at Climate Software NGO',
      location: 'Central/Eastern Europe, Southeastern Europe',
      languages: 'English',
      workMode: 'Fully Remote',
      employmentType: 'Full-Time',
      href: routes.contact,
      newTab: false,
      theme: 'finance',
    },
    {
      title: 'Head of Finance and Operations at IT/​Energy Nonprofit',
      location: 'Germany, Eastern Europe, Southern Africa',
      languages: 'English, German',
      workMode: 'Fully Remote',
      employmentType: 'Full-Time',
      href: routes.contact,
      newTab: false,
      theme: 'finance',
    },
    {
      title: 'Proactive Application: Energy System Modeler',
      location: 'Global',
      languages: 'English',
      workMode: 'Fully Remote',
      employmentType: 'Full-Time',
      href: routes.contact,
      newTab: false,
      theme: 'energy-system-modeling',
    },
  ] satisfies Job[],
}

export const hiring = {
  title: 'Our Hiring Process',
  paragraphs: [
    'Hiring at OET is crafted by our People & Culture Department.',
    'While the hiring process may be adjusted slightly role to role, we strive for consistency wherever possible. This is definitely the case for all candidates within a given role, for the sake of fairness.',
    'As standard, our hiring process is as follows:',
  ],
  steps: [
    {
      number: '01',
      text: 'Our People Team drafts and then posts a new role at OET\non this page',
      icon: Document,
    },
    {
      number: '02',
      text: 'Our Marketing Team posts about the role on OET social media',
      icon: ReferralAlt,
    },
    { number: '03', text: 'Interested candidates apply via the links above', icon: PersonRays },
    {
      number: '04',
      text: 'The relevant OET team reviews the candidate pool on a rolling basis',
      icon: MagnifyingGlassEye,
    },
    { number: '05', text: 'Candidates of interest are shortlisted internally', icon: TableList },
    {
      number: '06',
      text: 'Select applicants are contacted for a quick, 15-min screening voice call',
      icon: Meeting,
    },
    {
      number: '07',
      text: 'Select applicants are contacted for a 1-hour, panel format video interview, centered on Role Fit (Round 1/R1)',
      icon: OnlineInterview,
    },
    {
      number: '08',
      text: 'Select applicants are contacted for a 1-hour, panel format video interview, centered on Culture Fit (Round 2/R2)',
      icon: PersonThroughWindow,
    },
    {
      number: '09',
      text: 'A finalist is chosen, and an offer letter is sent out',
      icon: PaperPlane,
    },
    { number: '10', text: 'Documents are signed, and onboarding begins!', icon: AttributionPen },
  ] satisfies HiringStep[],
}
