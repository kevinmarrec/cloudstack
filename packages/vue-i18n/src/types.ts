export type Locale = string & {}

export interface LocaleMessage {
  [key: string]: string | LocaleMessage
}

export interface LocaleMessages {
  [locale: string]: LocaleMessage
}

interface LazyLocaleMessages {
  [path: string]: () => Promise<unknown>
}

export interface VueI18nOptions {
  locale?: Locale
  fallbackLocale?: Locale
  messages?: LocaleMessages | LazyLocaleMessages
}
