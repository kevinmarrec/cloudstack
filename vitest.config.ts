import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    workspace: ['packages/*'],
    reporters: ['verbose'],
    coverage: {
      include: ['packages/*/src/**/*.ts'],
      reporter: ['text', 'text-summary', 'json-summary'],
    },
  },
})
