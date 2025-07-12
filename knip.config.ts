import { useConfig } from '@kevinmarrec/cloudstack-knip-config'

Object.assign(import.meta.env, {
  DATABASE_URL: 'foo.db',
})

export default useConfig({
  workspaces: {
    'packages/create-app/template': {
      entry: ['*.config.ts'],
    },
    'packages/create-app/template/backend': {
      drizzle: {
        config: ['src/config/drizzle.ts'],
      },
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
