import defu from 'defu'
import { fdir as DirectoryCrawler } from 'fdir'
import type { Options } from 'unplugin-vue-router/types'
import VueRouter from 'unplugin-vue-router/vite'
import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

function hasPages(): boolean {
  return new DirectoryCrawler()
    .withBasePath()
    .glob('**/*.vue')
    .crawl('src/pages')
    .sync()
    .length > 0
}

export function VueRouterPlugin({ options }: CloudstackPluginContext): PluginOption {
  if (!options.router) {
    return
  }

  console.log('hasPages', hasPages())

  const defaults: Options = {
    dts: 'src/types/router.d.ts',
  }

  return VueRouter(defu(options.router, defaults))
}
