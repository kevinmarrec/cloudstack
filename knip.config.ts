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
    // 'packages/unocss-preset': {
    //   ignoreDependencies: [/@unocss/, /@iconify-json/],
    // },
  },
  exclude: ['optionalPeerDependencies'],
  ignoreWorkspaces: [
    'playground',
  ],
  ignore: [
    '**/fixtures/**',
    '**/playground/**',
    '**/tsconfig.json',
  ],
} satisfies KnipConfig
