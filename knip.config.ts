import type { KnipConfig } from 'knip'

export default {
  workspaces: {
    'packages/frontend': {
      ignoreDependencies: [
        'uno.css',
        'virtual:generated-layouts',
        'virtual:pwa-register',
      ],
    },
    'packages/stylelint-config': {
      ignoreDependencies: [
        'stylelint-config-html',
        'stylelint-config-recess-order',
        'stylelint-config-recommended-scss',
      ],
    },
    'packages/unocss-preset': {
      ignoreDependencies: [/@unocss/, /@iconify-json/],
    },
  },
  ignore: [
    '**/fixtures/**',
    '**/playground/**',
    '**/tsconfig.json',
  ],
} satisfies KnipConfig
