import type { KnipConfig } from 'knip'

export default {
  exclude: ['optionalPeerDependencies'],
  ignore: [
    '**/fixtures/**',
    '**/template/**',
    'bump.config.ts',
    'taze.config.ts',
    'uno.config.ts',
  ],
  ignoreDependencies: [
    '@iconify-json/carbon',
    'stylelint-config-html',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-scss',
    'taze',
    'the-new-css-reset',
  ],
} satisfies KnipConfig
