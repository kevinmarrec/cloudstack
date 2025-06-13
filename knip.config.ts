import { useConfig } from '@kevinmarrec/cloudstack-knip-config'

export default useConfig({
  workspaces: {
    'packages/create-app/template': {
      entry: ['*.config.ts'],
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
