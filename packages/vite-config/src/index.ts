import plugin, { type CloudstackPluginOptions } from '@kevinmarrec/cloudstack-vite-plugin'
import {
  defineConfig,
  mergeConfig,
  type UserConfig,
  type UserConfigExport,
  type UserConfigFn,
  type UserConfigFnObject,
  type UserConfigFnPromise,
} from 'vite'

declare module 'vite' {
  interface UserConfig {
    cloudstack?: CloudstackPluginOptions
  }
}

export function useConfig(config?: UserConfig): UserConfig
export function useConfig(config?: Promise<UserConfig>): Promise<UserConfig>
export function useConfig(config?: UserConfigFnObject): UserConfigFnObject
export function useConfig(config?: UserConfigFnPromise): UserConfigFnPromise
export function useConfig(config?: UserConfigFn): UserConfigFn
export function useConfig(config?: UserConfigExport): UserConfigExport
export function useConfig(config: UserConfigExport = {}): UserConfigExport {
  return defineConfig(async (env) => {
    config = await (typeof config === 'function' ? config(env) : config)
    return mergeConfig(
      defineConfig({ plugins: [plugin(config.cloudstack, env)] }),
      config,
    )
  })
}

export default useConfig()
