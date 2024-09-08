import Unocss from '@unocss/vite'

import type { PluginOption } from 'vite'

import type { CloudstackPluginContext } from '../context'

export function UnoCSSPlugin({ options }: CloudstackPluginContext): PluginOption {
  if (!options.unocss) {
    return
  }

  return Unocss(options.unocss)
}
