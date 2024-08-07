import Cloudstack from '@kevinmarrec/cloudstack-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Cloudstack({}),
  ],
})
