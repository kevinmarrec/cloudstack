import type { KnipConfig } from 'knip'

export default {
  exclude: ['optionalPeerDependencies'],
  ignore: [
    '**/fixtures/**',
    '**/playground/**',
    'bump.config.ts',
    'taze.config.ts',
  ],
  ignoreDependencies: [
    '@iconify-json/carbon',
    'stylelint-config-html',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-scss',
    'taze',
    'the-new-css-reset',
  ],
  ignoreWorkspaces: ['playground'],
} satisfies KnipConfig
