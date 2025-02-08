import plugin, { type CloudstackPluginOptions } from '@kevinmarrec/cloudstack-vite-plugin'
import { defineConfig, mergeConfig, type UserConfigExport } from 'vite'

declare module 'vite' {
  interface UserConfig {
    cloudstack?: CloudstackPluginOptions
  }
}

export function useConfig(config: UserConfigExport = {}) {
  return defineConfig(async (env) => {
    config = await (typeof config === 'function' ? config(env) : config)
    return mergeConfig(
      defineConfig({ plugins: [plugin(config.cloudstack, env)] }),
      config,
    )
  })
}

export default useConfig()
