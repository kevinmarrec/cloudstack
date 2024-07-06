import { defineConfig } from 'vite'

import Framework from './src/vite'

export default defineConfig({
  plugins: [
    Framework({
      root: __dirname,
    }),
  ],
})
