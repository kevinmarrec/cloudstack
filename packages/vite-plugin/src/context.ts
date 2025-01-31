import { globSync } from 'tinyglobby'

import { version } from '../package.json'

import type { CloudstackPluginOptions } from './options'

export function createContext(userOptions: CloudstackPluginOptions = {}) {
  return {
    version,
    userOptions,
    found(feature: 'uno.config') {
      switch (feature) {
        case 'uno.config':
          return globSync(['uno.config.ts']).length > 0
      }
    },
  }
}

export type CloudstackPluginContext = ReturnType<typeof createContext>
