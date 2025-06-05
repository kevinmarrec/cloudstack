import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: ['packages/*'],
    reporters: ['verbose'],
    coverage: {
      include: ['packages/*/src/**/*.ts'],
      reporter: ['text', 'text-summary', 'json-summary'],
    },
  },
})
