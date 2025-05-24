import { readonly, ref, watch } from 'vue'

import type { LocaleMessageDictionary, LocaleMessages, LocaleMessageValue, ResolvedVueI18nOptions } from './types'

export function createInstance(options: ResolvedVueI18nOptions) {
  const availableLocales = Object.keys(options.messages)
  const locale = ref(options.locale)
  const fallbackLocale = ref(options.fallbackLocale)
  const messages = ref<LocaleMessages>({})

  const loadMessages = async (locale: string) => {
    messages.value[locale] = typeof options.messages[locale] === 'function'
      ? (await options.messages[locale]() as any).default
      : options.messages[locale]
  }

  const findLocaleMessage = (locale: string, key: string) =>
    key.split('.').reduce<LocaleMessageValue | undefined>((path, segment) =>
      (path as LocaleMessageDictionary | undefined)?.[segment], messages.value[locale])

  watch(locale, loadMessages)

  return {
    availableLocales,
    locale,
    fallbackLocale,
    messages: readonly(messages),
    init: async () => {
      await loadMessages(locale.value)
      loadMessages(fallbackLocale.value)
    },
    t: (key: string, params?: { [key: string | number]: unknown } | number) => {
      let message = findLocaleMessage(locale.value, key) || findLocaleMessage(fallbackLocale.value, key)

      if (typeof message !== 'string') {
        return key
      }

      if (params === undefined) {
        return message
      }

      // Handle pluralization
      if (typeof params === 'number') {
        message = message.split('|')[Math.max(0, Math.min(2, params))]
        params = { n: params, count: params }
      }

      // Handle named and list interpolation
      return message.replace(/\{(\w+)\}/g, (match, p1) => String(params?.[p1] ?? match))
    },
  }
}

export interface VueI18nInstance extends ReturnType<typeof createInstance> {}
