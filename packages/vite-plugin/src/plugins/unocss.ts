import Unocss from '@unocss/vite'
import { fdir as DirectoryCrawler } from 'fdir'
import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

function hasConfig() {
  return new DirectoryCrawler()
    .exclude((_, path) => path.startsWith('node_modules'))
    .withFullPaths()
    // .glob('uno(css)?.config.{js,ts,mjs,mts}')
    .crawl('.')
    .sync()
}

export function UnoCSSPlugin({ options }: CloudstackPluginContext): PluginOption {
  if (!options.unocss) {
    return
  }

  console.log('hasUnoCSSConfig', hasConfig())

  return Unocss(options.unocss)
}
