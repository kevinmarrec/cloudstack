import type { ResolvedConfig } from 'vite'

export function configDiff(baseConfig: ResolvedConfig, resolvedConfig: ResolvedConfig) {
  return {
    plugins: resolvedConfig.plugins
      .filter(plugin => !baseConfig.plugins.some(basePlugin => basePlugin.name === plugin.name))
      .map(plugin => plugin.name),
  }
}
