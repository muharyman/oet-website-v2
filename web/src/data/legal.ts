export type LegalPageId = 'legal' | 'privacy-statement' | 'disclaimer'

export interface LegalPageContent {
  meta: { title: string; description: string }
  tag: string
  title: string
  body: string
}

const placeholder = (subject: string) =>
  [
    `<p>[Placeholder] The ${subject} of Open Energy Transition has not been written or designed yet. This text marks the position of the final content and must be replaced before launch.</p>`,
    '<h2>[Placeholder] Section heading</h2>',
    '<p>[Placeholder] Body text of the first section.</p>',
    '<h2>[Placeholder] Section heading</h2>',
    '<p>[Placeholder] Body text of the second section.</p>',
  ].join('')

export const legalPages: Record<LegalPageId, LegalPageContent> = {
  legal: {
    meta: {
      title: 'Legal | Open Energy Transition',
      description: 'Legal notice of Open Energy Transition.',
    },
    tag: 'Legal',
    title: 'Legal',
    body: placeholder('legal notice'),
  },
  'privacy-statement': {
    meta: {
      title: 'Privacy Statement | Open Energy Transition',
      description: 'Privacy statement of Open Energy Transition.',
    },
    tag: 'Legal',
    title: 'Privacy Statement',
    body: placeholder('privacy statement'),
  },
  disclaimer: {
    meta: {
      title: 'Disclaimer | Open Energy Transition',
      description: 'Disclaimer of Open Energy Transition.',
    },
    tag: 'Legal',
    title: 'Disclaimer',
    body: placeholder('disclaimer'),
  },
}
