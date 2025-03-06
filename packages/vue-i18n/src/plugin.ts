import type { FunctionPlugin } from 'vue'

import { injectionKey } from './constants'
import { createInstance } from './instance'
import type { ResolvedVueI18nOptions, VueI18nOptions } from './types'

type VueI18nPlugin = FunctionPlugin

export async function createI18n(options: VueI18nOptions): Promise<VueI18nPlugin> {
  const resolvedOptions: ResolvedVueI18nOptions = {
    locale: options.locale ?? 'en',
    fallbackLocale: options.fallbackLocale ?? options.locale ?? 'en',
    messages: (options.messages ?? {}) as ResolvedVueI18nOptions['messages'],
  }

  for (const key in resolvedOptions.messages) {
    const localePath = key.match(/(\w*)\.yml$/)?.[1]
    if (localePath) {
      resolvedOptions.messages[localePath] = resolvedOptions.messages[key]
      delete resolvedOptions.messages[key]
    }
  }

  if (!import.meta.env.SSR) {
    const navigatorLocale = navigator.language.slice(0, 2)
    resolvedOptions.locale = resolvedOptions.messages?.[navigatorLocale] ? navigatorLocale : resolvedOptions.locale
  }

  const instance = createInstance(resolvedOptions)

  if (import.meta.env.SSR) {
    await instance.isReady()
  }

  return app => app.provide(injectionKey, instance)
}
