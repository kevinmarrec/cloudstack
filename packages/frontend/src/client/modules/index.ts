import type { ViteSSGContext } from 'vite-ssg'

import { install as installPWA } from './pwa'

export function installModules(ctx: ViteSSGContext) {
  installPWA(ctx)
}
