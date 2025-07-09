import { defineConfig } from 'drizzle-kit'

import { url } from './database'

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url,
  },
})
