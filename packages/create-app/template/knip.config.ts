import { useConfig } from '@kevinmarrec/cloudstack-knip-config'

Object.assign(import.meta.env, {
  DATABASE_URL: 'foo.db',
})

export default useConfig({
  workspaces: {
    backend: {
      drizzle: {
        config: ['src/config/drizzle.ts'],
      },
      ignoreDependencies: ['pino-pretty'],
    },
    frontend: {
      entry: [
        'src/main.ts',
        'src/pages/**/*.vue',
      ],
    },
  },
})
