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
    t: (key: string) => {
      return findLocaleMessage(locale.value, key)
        ?? findLocaleMessage(fallbackLocale.value, key)
        ?? key
    },
  }
}

export interface VueI18nInstance extends ReturnType<typeof createInstance> {}
