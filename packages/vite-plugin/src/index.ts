import type { PluginOption } from 'vite'

import { createContext } from './context'
import integrations from './integrations'

import type { CloudstackPluginOptions } from './options'

export { type CloudstackPluginOptions }

export default function CloudstackPlugin(userOptions: CloudstackPluginOptions = {}): PluginOption[] {
  const ctx = createContext(userOptions)

  return integrations
    .map(integration => integration(ctx))
    .filter(Boolean)
}
