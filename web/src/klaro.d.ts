declare module 'klaro/dist/klaro-no-css' {
  export interface KlaroService {
    name: string
    title: string
    purposes: string[]
    required: boolean
    default: boolean
    onlyOnce: boolean
    cookies: (string | RegExp)[]
    callback?: (consent: boolean, service: { name: string }) => void
  }

  export interface KlaroConfig {
    version: number
    elementID: string
    storageMethod: 'cookie'
    storageName: string
    cookieExpiresAfterDays: number
    privacyPolicy: string
    mustConsent: boolean
    acceptAll: boolean
    hideDeclineAll: boolean
    hideLearnMore: boolean
    noticeAsModal: boolean
    groupByPurpose: boolean
    htmlTexts: boolean
    disablePoweredBy: boolean
    lang: string
    styling: { theme: string[] }
    translations: Record<string, Record<string, unknown>>
    services: KlaroService[]
  }

  export function setup(config: KlaroConfig): void
  export function show(config: KlaroConfig, modal: boolean): void
}
