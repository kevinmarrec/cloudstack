import { readonly, ref, watch } from 'vue'

import type { LocaleMessages, Messages, ResolvedVueI18nOptions } from './types'

export function createInstance(options: ResolvedVueI18nOptions) {
  const availableLocales = Object.keys(options.messages)
  const locale = ref(options.locale)
  const fallbackLocale = ref(options.fallbackLocale)
  const messages = ref<Messages>({})

  async function loadMessages(locale: string) {
    messages.value[locale] = typeof options.messages[locale] === 'function'
      ? (await options.messages[locale]() as any).default
      : options.messages[locale]
  }

  function findLocaleMessage(locale: string, key: string) {
    return key.split('.').reduce((path, segment) => path?.[segment] as LocaleMessages, messages.value[locale])
  }

  const isReady = new Promise<void>((resolve) => {
    loadMessages(locale.value)
      .then(() => loadMessages(fallbackLocale.value))
      .then(() => resolve())
  })

  watch(locale, loadMessages)

  return {
    availableLocales,
    locale,
    fallbackLocale,
    messages: readonly(messages),
    isReady: () => isReady,
    t: (key: string) =>
      findLocaleMessage(locale.value, key)
      ?? findLocaleMessage(fallbackLocale.value, key)
      ?? key,
  }
}

export interface VueI18nInstance extends ReturnType<typeof createInstance> {}
