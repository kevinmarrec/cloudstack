import { useConfig } from '@kevinmarrec/cloudstack-knip-config'

export default useConfig({
  ignoreBinaries: ['docker-compose'],
  workspaces: {
    backend: {
      ignoreDependencies: ['pino-pretty'],
    },
    frontend: {
      entry: ['src/main.ts'],
    },
  },
})
