import type { KnipConfig } from 'knip'

export default {
  stylelint: false,
  workspaces: {
    '.': {
      entry: ['*.config.ts'],
      ignore: ['**/template/**'],
    },
    'packages/stylelint-config': {
      ignoreDependencies: [
        'stylelint-config-html',
        'stylelint-config-recess-order',
        'stylelint-config-recommended-scss',
      ],
    },
    'packages/vite-plugin': {
      ignoreDependencies: [
        'the-new-css-reset',
        'vue-router',
      ],
    },
  },
} satisfies KnipConfig
