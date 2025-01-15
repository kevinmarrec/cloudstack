import defu from 'defu'

import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

interface IntegrationFactoryOptions<Plugin extends (...args: any) => PluginOption, Defaults = Parameters<Plugin>[0]> {
  key?: keyof CloudstackPluginContext['options']
  plugin: Plugin
  defaults?: (ctx: CloudstackPluginContext) => Defaults
}

export function integrationFactory<Plugin extends (...args: any) => PluginOption>({ key, plugin, defaults }: IntegrationFactoryOptions<Plugin>) {
  return (ctx: CloudstackPluginContext) => {
    if (!key) {
      return plugin(ctx)
    }

    if (ctx.options[key]) {
      return plugin(defu(ctx.options[key], defaults?.(ctx)))
    }
  }
}
