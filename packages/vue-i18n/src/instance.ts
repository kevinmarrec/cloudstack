import { readonly, ref, type Ref, watch } from 'vue'

import type { LocaleMessageDictionary, LocaleMessages, LocaleMessageValue, ResolvedVueI18nOptions } from './types'

interface TranslateFn {
  (key: string): string
  (key: string, count: number, values?: Array<string | number>): string
  (key: string, count: number, values?: Record<string | number, string | number>): string
  (key: string, values: Array<string | number>): string
  (key: string, values: Record<string | number, string | number>): string
}

export interface VueI18nInstance {
  availableLocales: string[]
  locale: Ref<string>
  fallbackLocale: Ref<string>
  messages: Readonly<Ref<LocaleMessages>>
  init: () => Promise<void>
  t: TranslateFn
}

export function createInstance(options: ResolvedVueI18nOptions): VueI18nInstance {
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
    t: (key, ...params: any[]) => {
      let message = findLocaleMessage(locale.value, key) || findLocaleMessage(fallbackLocale.value, key)

      if (typeof message !== 'string')
        return key

      const values: { [key: string]: string | number } = {
        ...params[0],
        ...params[1],
      }

      if (typeof params[0] === 'number')
        Object.assign(values, { count: params[0], n: params[0] })

      if (message.includes('|')) {
        const count = [values.count, values.n].find(x => typeof x === 'number') ?? 1
        const clamped = Math.min(Math.abs(count), 2) // Clamp to 0, 1 or 2
        const parts = message.split(/\s*\|\s*/)
        const rules = parts.length > 2 ? [0, 1, 2] : [1, 0, 1] // (no apple | one apple | many apples) VS (0 cars | 1 car | 2 cars)
        message = parts[rules[clamped]]
      }

      return message.replace(/\{(\w+)\}/g, (_, p1) => String(values[p1] ?? ''))
    },
  }
}
