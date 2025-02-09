import { useConfig } from '@kevinmarrec/cloudstack-knip-config'

export default useConfig({
  workspaces: {
    frontend: {
      entry: [
        'src/main.ts',
        'src/pages/**/*.vue',
      ],
    },
  },
})
