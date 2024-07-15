import Cloudstack from '@kevinmarrec/cloudstack-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Cloudstack({
      root: import.meta.dirname,
      autoImports: true,
      components: true,
      devtools: true,
      layouts: true,
      pwa: true,
      router: true,
      unocss: true,
    }),
  ],
})
