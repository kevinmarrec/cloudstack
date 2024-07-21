import type { ResolvedConfig } from 'vite'

import { version } from '../package.json'

import { type ResolvedViteCloudstackOptions, type ViteCloudstackOptions, resolveOptions } from './options'

export interface CloudstackPluginContext {
  version: string
  userOptions: ViteCloudstackOptions
  options: ResolvedViteCloudstackOptions
}

export function createContext(userOptions: ViteCloudstackOptions): CloudstackPluginContext {
  return {
    version,
    userOptions,
    options: resolveOptions(userOptions),
  }
}
