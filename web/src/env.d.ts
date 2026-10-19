interface ImportMetaEnv {
  readonly PAYLOAD_URL: string
  readonly SITE_INDEXING: string
  readonly PREVIEW_SECRET: string
  readonly PAYLOAD_PREVIEW_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
