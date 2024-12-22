import type { KnipConfig } from 'knip'

export default {
  stylelint: false,
  workspaces: {
    '.': {
      entry: ['*.config.ts'],
    },
    'frontend': {
      entry: [
        'src/main.ts',
        'src/layouts/**/*.vue',
        'src/pages/**/*.vue',
        'src/components/**/*.vue',
      ],
    },
  },
} satisfies KnipConfig
