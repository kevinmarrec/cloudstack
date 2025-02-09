import { globSync } from 'tinyglobby'
import type { ConfigEnv } from 'vite'

import { version } from '../package.json'
import type { CloudstackPluginOptions } from './options'

export function createContext(userOptions: CloudstackPluginOptions = {}, env?: ConfigEnv) {
  return {
    env,
    version,
    userOptions,
    found: (feature: 'routes' | 'uno.config.ts') => {
      switch (feature) {
        case 'routes':
          return globSync('src/pages/**/*.vue').length > 0
        case 'uno.config.ts':
          return globSync('uno.config.ts').length > 0
      }
    },
  }
}

export type CloudstackPluginContext = ReturnType<typeof createContext>
