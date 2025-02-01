import { globSync } from 'tinyglobby'

import { version } from '../package.json'

import type { CloudstackPluginOptions } from './options'

export function createContext(userOptions: CloudstackPluginOptions = {}) {
  return {
    version,
    userOptions,
    found: (file: 'uno.config.ts') => globSync(file).length > 0,
  }
}

export type CloudstackPluginContext = ReturnType<typeof createContext>
