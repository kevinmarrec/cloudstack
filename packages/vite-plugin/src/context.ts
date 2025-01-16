import { version } from '../package.json'

import type { CloudstackPluginOptions } from './options'

export interface CloudstackPluginContext {
  version: string
  userOptions: CloudstackPluginOptions
}

export function createContext(userOptions: CloudstackPluginOptions): CloudstackPluginContext {
  return {
    version,
    userOptions,
  }
}
