import type { KnipConfig } from 'knip'

export function useConfig(config?: KnipConfig): KnipConfig {
  return {
    stylelint: false,
    ...config,
  }
}

export default useConfig()
