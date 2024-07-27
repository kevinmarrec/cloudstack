import process from 'node:process'

import { version } from '../package.json'

import {
  type ResolvedViteCloudstackOptions,
  type ViteCloudstackOptions,
  resolveOptions,
} from './options'

export interface CloudstackPluginContext {
  version: string
  userOptions: ViteCloudstackOptions
  options: ResolvedViteCloudstackOptions
  abortWithMessage: (message: string) => void
}

export function createContext(userOptions: ViteCloudstackOptions): CloudstackPluginContext {
  return {
    version,
    userOptions,
    options: resolveOptions(userOptions),
    abortWithMessage(message) {
      console.error(`[@kevinmarrec/cloudstack-vite-plugin] ${message}`)
      process.exit(1)
    },
  }
}
