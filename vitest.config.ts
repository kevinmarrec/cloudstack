import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      include: ['packages/*/src/**/*.ts'],
      exclude: ['packages/create-app/src/index.ts'],
      reporter: ['text', 'html'],
    },
    onConsoleLog: (_, type) => type === 'stderr',
  },
})
