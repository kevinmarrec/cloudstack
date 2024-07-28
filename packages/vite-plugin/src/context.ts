import { version } from '../package.json'

import {
  type CloudstackPluginOptions,
  type ResolvedCloudstackPluginOptions,
  resolveOptions,
} from './options'

export interface CloudstackPluginContext {
  version: string
  userOptions: CloudstackPluginOptions
  options: ResolvedCloudstackPluginOptions
}

export function createContext(userOptions: CloudstackPluginOptions): CloudstackPluginContext {
  return {
    version,
    userOptions,
    options: resolveOptions(userOptions),
  }
}
