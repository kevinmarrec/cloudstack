import type { Ref } from 'vue'

export type Locale = string & {}

export interface LocaleMessage {
  [key: string]: string | LocaleMessage
}

export interface LocaleMessages {
  [locale: string]: LocaleMessage
}

export interface LazyLocaleMessages {
  [path: string]: () => Promise<unknown>
}

export interface VueI18nOptions {
  locale?: Locale
  fallbackLocale?: Locale
  messages?: LocaleMessages | LazyLocaleMessages
}

export interface VueI18nInstance {
  availableLocales: Locale[]
  locale: Ref<Locale>
  fallbackLocale: Ref<Locale>
  isReady: () => Promise<void>
  translate: (key: string) => string
  t: (key: string) => string
}
