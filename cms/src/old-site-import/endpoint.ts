import type { Endpoint } from 'payload'

import { runOldSiteImport } from './run'

export const oldSiteImportEndpoint: Endpoint = {
  path: '/old-site-import',
  method: 'post',
  handler: async (req) => {
    if (req.user?.collection !== 'users' || req.user.role !== 'admin')
      return Response.json({ error: 'Only an admin can run the import' }, { status: 403 })
    const hook = process.env.WEB_DEPLOY_HOOK_URL
    if (!hook) throw new Error('WEB_DEPLOY_HOOK_URL is not set')
    const report = await runOldSiteImport(req.payload)
    const rebuild = await fetch(hook, { method: 'POST' })
    if (!rebuild.ok) throw new Error(`Deploy hook answered ${rebuild.status}`)
    return new Response(report, { headers: { 'content-type': 'text/markdown; charset=utf-8' } })
  },
}
