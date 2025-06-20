import { useConfig } from '@kevinmarrec/cloudstack-knip-config'

export default useConfig({
  workspaces: {
    backend: {
      ignoreDependencies: ['pino-pretty'],
    },
    frontend: {
      entry: ['src/main.ts'],
    },
  },
})
