import type { ObjectPlugin } from 'vue'

import { injectionKey } from './constants'
import { createInstance } from './instance'
import type { VueI18nOptions } from './types'

interface VueI18nPlugin extends ObjectPlugin {}

export async function createI18n(options: VueI18nOptions = {}): Promise<VueI18nPlugin> {
  for (const key in options.messages) {
    const localePath = key.match(/(\w*)\.yml$/)?.[1]
    if (localePath) {
      options.messages[localePath] = options.messages[key]
      delete options.messages[key]
    }
  }

  const instance = createInstance(options)

  if (import.meta.env.SSR) {
    await instance.isReady()
  }

  return {
    install: app => app.provide(injectionKey, instance),
  }
}
