/// <reference types="vite-plugin-pwa/client" />

import type { UserModule } from '../types'

export const install: UserModule = async ({ isClient, router }) => {
  if (!isClient)
    return

  try {
    await router.isReady()
    const { registerSW } = await import('virtual:pwa-register')
    registerSW({ immediate: true })
  }
  catch {}
}
