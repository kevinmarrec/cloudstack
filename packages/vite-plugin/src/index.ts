import type { ConfigEnv, PluginOption } from 'vite'

import { createContext } from './context'
import integrations from './integrations'
import type { CloudstackPluginOptions } from './options'

export { type CloudstackPluginOptions }

export default function CloudstackPlugin(userOptions: CloudstackPluginOptions = {}, env?: ConfigEnv): PluginOption[] {
  const ctx = createContext(userOptions, env)
  return integrations.map(integration => integration(ctx))
}
