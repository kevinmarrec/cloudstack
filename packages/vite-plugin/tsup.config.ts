import { raw } from 'esbuild-raw-plugin'
import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  esbuildPlugins: [raw()],
  format: ['esm'],
})
