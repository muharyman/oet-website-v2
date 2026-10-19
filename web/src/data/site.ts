import type { ImageMetadata } from 'astro'
import type { Locale } from '../i18n/config'
import { findGlobal, required } from '../lib/cms'
import { image } from '../lib/media'

export interface SiteSettings {
  name: string
  shareImage: ImageMetadata
  profiles: string[]
  tagManagerId: string | null
}

export const loadSiteSettings = async (locale: Locale): Promise<SiteSettings> => {
  const settings = await findGlobal('site-settings', locale, 1)
  const tagManagerId = settings.googleTagManagerId
  return {
    name: settings.siteName,
    shareImage: image(settings.shareImage, 'site share image'),
    profiles: required(settings.socialLinks, 'site social links').map((link) => link.url),
    tagManagerId:
      tagManagerId === null || tagManagerId === undefined || tagManagerId === ''
        ? null
        : tagManagerId,
  }
}
