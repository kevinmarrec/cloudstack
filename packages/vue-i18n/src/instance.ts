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
    t: (key: string) => {
      const message = findLocaleMessage(locale.value, key) || findLocaleMessage(fallbackLocale.value, key)
      return typeof message === 'string' ? message : key
    },
  }
}

export interface VueI18nInstance extends ReturnType<typeof createInstance> {}
