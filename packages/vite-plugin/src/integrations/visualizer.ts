import { visualizer } from 'rollup-plugin-visualizer'

import { integrationFactory } from './_factory'

export default integrationFactory(visualizer, {
  enabled: ({ env }) => env?.mode === 'analyze',
  options: ({ userOptions }) => userOptions.visualizer,
  defaults: () => ({
    filename: 'node_modules/.cache/cloudstack/stats.html',
    brotliSize: true,
    gzipSize: true,
    open: true,
    sourcemap: true,
  } as const),
})
