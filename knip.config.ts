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
    'packages/unocss-preset': {
      ignoreDependencies: ['@iconify-json/carbon'],
    },
    'packages/vite-plugin': {
      ignoreDependencies: [
        'the-new-css-reset',
        'vue-router',
      ],
    },
  },
} satisfies KnipConfig
