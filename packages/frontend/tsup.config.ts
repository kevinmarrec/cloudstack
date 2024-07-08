import { defineConfig } from 'tsup'

export default defineConfig([
  {
    clean: true,
    dts: true,
    entry: {
      client: 'src/client/index.ts',
      vite: 'src/vite/index.ts',
    },
    format: 'esm',
    external: ['virtual:generated-layouts', 'virtual:pwa-register', 'uno.css'],
  },
  {
    entry: {
      'darkMode.script': 'src/vite/darkMode.script.js',
    },
    format: 'esm',
  },
])
