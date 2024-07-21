import { defineConfig } from 'tsup'

export default defineConfig([
  {
    clean: true,
    dts: true,
    entry: ['src/index.ts'],
    format: 'esm',
  },
  {
    entry: ['src/plugins/main/darkMode.script.js'],
    format: 'esm',
  },
])
