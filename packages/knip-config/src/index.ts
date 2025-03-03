import type { KnipConfig as RawKnipConfig } from 'knip'

interface KnipConfig extends RawKnipConfig {}

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
