import { fdir as DirectoryCrawler } from 'fdir'
import type { PluginOption } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

import type { CloudstackPluginContext } from '../context'

function hasLayouts(): boolean {
  return new DirectoryCrawler()
    .withBasePath()
    .glob('**/*.vue')
    .crawl('src/layouts')
    .sync()
    .length > 0
}

export function LayoutsPlugin({ options }: CloudstackPluginContext): PluginOption {
  if (!options.layouts) {
    return
  }

  console.log('hasLayouts', hasLayouts())

  return Layouts(options.layouts)
}
