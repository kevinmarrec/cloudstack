import { useConfig } from '@kevinmarrec/cloudstack-knip-config'

// @ts-expect-error - Required to make Knip happy
import.meta.env.DATABASE_URL = 'postgresql://user:password@host:5432/database'

export default useConfig({
  ignoreBinaries: ['docker-compose'],
  workspaces: {
    'packages/create-app/template': {
      entry: ['*.config.ts'],
    },
    'packages/create-app/template/backend': {
      ignoreDependencies: ['pino-pretty'],
    },
    'packages/create-app/template/frontend': {
      entry: ['src/main.ts'],
    },
    'packages/stylelint-config': {
      ignoreDependencies: [
        'stylelint-config-html',
        'stylelint-config-recess-order',
        'stylelint-config-recommended-scss',
        'stylelint-order',
        'stylelint-plugin-use-baseline',
      ],
    },
  },
})
