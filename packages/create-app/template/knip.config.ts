import { useConfig } from '@kevinmarrec/cloudstack-knip-config'

export default useConfig({
  workspaces: {
    '.': {
      entry: ['*.config.ts'],
    },
    'frontend': {
      entry: ['*.config.ts', 'src/main.ts'],
    },
  },
})
