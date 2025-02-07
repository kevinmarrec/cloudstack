import { globSync } from 'tinyglobby'
import type { ConfigEnv } from 'vite'

import { version } from '../package.json'
import type { CloudstackPluginOptions } from './options'

export function createContext(userOptions: CloudstackPluginOptions = {}, env?: ConfigEnv) {
  return {
    env,
    version,
    userOptions,
    found: (file: 'uno.config.ts') => globSync(file).length > 0,
  }
}

export type CloudstackPluginContext = ReturnType<typeof createContext>
