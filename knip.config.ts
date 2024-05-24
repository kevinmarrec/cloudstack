import type { KnipConfig } from 'knip'

export default <KnipConfig> {
  workspaces: {
    'packages/stylelint': {
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
  ignoreBinaries: ['eslint'],
}
