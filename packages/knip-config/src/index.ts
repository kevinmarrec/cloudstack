import type { KnipConfig } from 'knip'

export function useConfig(config: KnipConfig = {}): KnipConfig {
  return {
    stylelint: false,
    ...config,
    workspaces: {
      '.': {
        entry: ['*.config.ts'],
      },
      ...config?.workspaces,
    },
  }
}

export default useConfig()
