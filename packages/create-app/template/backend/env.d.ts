interface ImportMetaEnv {
  readonly DATABASE_URL: string
  readonly NODE_ENV: 'development' | 'production' | 'test'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
