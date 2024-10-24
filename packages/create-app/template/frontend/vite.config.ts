import { fileURLToPath } from 'node:url'

import Cloudstack from '@kevinmarrec/cloudstack-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [Cloudstack()],
  resolve: {
    alias: {
      '@frontend': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
