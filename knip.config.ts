import type { KnipConfig } from 'knip'

export default {
  workspaces: {
    'packages/stylelint-config': {
      ignoreDependencies: [
        'stylelint-config-html',
        'stylelint-config-recess-order',
        'stylelint-config-recommended-scss',
      ],
    },
  },
  ignore: [
    '**/dist/**',
    '**/test/**',
  ],
} satisfies KnipConfig
