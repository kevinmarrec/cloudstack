import type { KnipConfig } from 'knip'

export default {
  stylelint: false,
  workspaces: {
    '.': {
      entry: ['*.config.ts'],
    },
    'frontend': {
      entry: ['*.config.ts', 'src/main.ts'],
    },
  },
} satisfies KnipConfig
