import type { KnipConfig } from 'knip'

export default {
  ignore: ['*.config.*'],
  ignoreDependencies: [
    '@kevinmarrec/cloudstack-eslint-config',
    '@kevinmarrec/cloudstack-stylelint-config',
    '@kevinmarrec/cloudstack-tsconfig',
    'taze',
  ],
  workspaces: {
    frontend: {
      entry: [
        'src/main.ts',
        'src/layouts/**/*.vue',
        'src/pages/**/*.vue',
        'src/components/**/*.vue',
      ],
    },
  },
} satisfies KnipConfig
