import type { FunctionPlugin } from 'vue'

import { injectionKey } from './constants'
import { createInstance } from './instance'
import type { VueI18nOptions } from './types'

type VueI18nPlugin = FunctionPlugin

export async function createI18n(options: VueI18nOptions = {}): Promise<VueI18nPlugin> {
  for (const key in options.messages) {
    const localePath = key.match(/(\w*)\.yml$/)?.[1]
    if (localePath) {
      options.messages[localePath] = options.messages[key]
      delete options.messages[key]
    }
  }

  if (!import.meta.env.SSR) {
    const navigatorLocale = navigator.language.slice(0, 2)
    options.locale = options.messages?.[navigatorLocale] ? navigatorLocale : options.locale
  }

  const instance = createInstance({
    locale: options.locale ?? 'en',
    fallbackLocale: options.fallbackLocale ?? 'en',
    messages: options.messages ?? {},
  })

  if (import.meta.env.SSR) {
    await instance.isReady()
  }

  return app => app.provide(injectionKey, instance)
}
