import process from 'node:process'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      include: ['packages/*/src/**/*.ts'],
      exclude: ['packages/create-app/src/index.ts'],
      reporter: [
        ...process.env.GITHUB_ACTIONS ? ['github-actions'] : [],
        'text',
        'json',
        'json-summary',
      ],
    },
  },
})
