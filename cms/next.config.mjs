import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  agentRules: false,
  redirects: async () => [{ source: '/', destination: '/admin', permanent: false }],
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
