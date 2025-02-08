import { visualizer } from 'rollup-plugin-visualizer'

import { integrationFactory } from './_factory'

export default integrationFactory(visualizer, {
  enabled: ctx => ctx.env?.command === 'build' && ctx.env?.mode === 'analyze',
  options: ctx => ctx.userOptions.visualizer,
  defaults: () => ({
    filename: 'node_modules/.cache/cloudstack/stats.html',
    brotliSize: true,
    gzipSize: true,
    open: true,
  } as const),
})
