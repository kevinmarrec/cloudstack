import { defu } from 'defu'

import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

type IntegrationFactory = <Plugin extends (...args: any) => PluginOption>
(plugin: Plugin,
  options?: {
    enabled?: (ctx: CloudstackPluginContext) => boolean
    options?: (ctx: CloudstackPluginContext) => Parameters<Plugin>[0] | boolean
    defaults?: (ctx: CloudstackPluginContext) => Parameters<Plugin>[0] | boolean
  }
) => (ctx: CloudstackPluginContext) => PluginOption

export const integrationFactory: IntegrationFactory = (plugin, { enabled, options, defaults } = {}) => (ctx) => {
  if (enabled === undefined || (typeof enabled === 'function' ? enabled(ctx) : enabled)) {
    return plugin(
      defu(
        options?.(ctx) || ctx,
        defaults?.(ctx),
      ),
    )
  }
}
