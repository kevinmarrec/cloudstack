import { type Defu, defu } from 'defu'

import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

export function integrationFactory<Plugin extends (...args: any) => PluginOption, Options = Parameters<Plugin>[0]>(plugin: Plugin, userOptions?: (ctx: CloudstackPluginContext) => Options, defaults?: (ctx: CloudstackPluginContext) => Options) {
  // @ts-expect-error
  return (ctx: CloudstackPluginContext) => plugin(defu(userOptions?.(ctx), defaults?.(ctx)))
}
