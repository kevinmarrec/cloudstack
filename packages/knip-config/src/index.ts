import defu from 'defu'

import type { KnipConfig } from 'knip'

export function useConfig(config?: KnipConfig): KnipConfig {
  return defu<KnipConfig, KnipConfig[]>(config, {
    stylelint: false,
    workspaces: {
      '.': {
        entry: ['*.config.ts'],
      },
    },
  })
}

export default useConfig()
