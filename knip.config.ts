import { useConfig } from '@kevinmarrec/cloudstack-knip-config'

export default useConfig({
  workspaces: {
    'packages/create-app/template': {
      entry: ['*.config.ts'],
    },
    'packages/create-app/template/frontend': {
      entry: [
        'src/main.ts',
        'src/pages/**/*.vue',
      ],
    },
    'packages/stylelint-config': {
      ignoreDependencies: [
        'stylelint-config-html',
        'stylelint-config-recess-order',
        'stylelint-config-recommended-scss',
      ],
    },
    'packages/vite-plugin': {
      ignoreDependencies: ['the-new-css-reset'],
    },
  },
})
