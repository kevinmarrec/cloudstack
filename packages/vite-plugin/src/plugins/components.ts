import defu from 'defu'
import { fdir as DirectoryCrawler } from 'fdir'
import type { Options } from 'unplugin-vue-components/types'
import Components from 'unplugin-vue-components/vite'
import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

function hasComponents(): boolean {
  return new DirectoryCrawler()
    .withBasePath()
    .glob('**/*.vue')
    .crawl('src/components')
    .sync()
    .length > 0
}

export function ComponentsPlugin({ options }: CloudstackPluginContext): PluginOption {
  if (!options.components) {
    return
  }

  console.log('hasComponents', hasComponents())

  const defaults: Options = {
    dts: 'src/types/components.d.ts',
  }

  return Components(defu(options.components, defaults))
}
