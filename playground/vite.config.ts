import Framework from '@kevinmarrec/cloudstack-frontend/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Framework({
      root: import.meta.dirname,
    }),
  ],
})
