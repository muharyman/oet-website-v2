import { defineMiddleware } from 'astro:middleware'
import { previewSecret, withPreview } from './lib/preview'

export const onRequest = defineMiddleware((context, next) => {
  if (!context.url.pathname.startsWith('/preview/')) return next()
  if (context.url.searchParams.get('secret') !== previewSecret())
    return new Response('Not found', { status: 404 })
  return withPreview(async () => {
    const response = await next()
    response.headers.set('Cache-Control', 'private, no-store')
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  })
})
