import { globSync } from 'tinyglobby'

import { version } from '../package.json'

import type { CloudstackPluginOptions } from './options'

export interface CloudstackPluginContext {
  version: string
  userOptions: CloudstackPluginOptions
  found: (feature: 'components' | 'layouts' | 'pages' | 'uno.config') => boolean
}

export function createContext(userOptions: CloudstackPluginOptions): CloudstackPluginContext {
  return {
    version,
    userOptions,
    found(feature) {
      switch (feature) {
        // TODO: Check if cwd works as expected
        case 'components':
          return globSync(['**/*.vue'], { cwd: 'src/components' }).length > 0
        case 'layouts':
          return globSync(['**/*.vue'], { cwd: 'src/layouts' }).length > 0
        case 'pages':
          return globSync(['**/*.vue'], { cwd: 'src/pages' }).length > 0
        case 'uno.config':
          return globSync(['uno.config.ts']).length > 0
      }
    },
  }
}
