export type LocaleMessageValue = LocaleMessageDictionary | string

export interface LocaleMessageDictionary {
  [key: string]: LocaleMessageValue
}

export interface LocaleMessages {
  [locale: string]: LocaleMessageDictionary
}

interface LazyLocaleMessages {
  [localePath: string]: () => Promise<unknown>
}

export interface VueI18nOptions {
  locale?: string
  fallbackLocale?: string
  messages?: LocaleMessages | LazyLocaleMessages
}

export interface ResolvedVueI18nOptions extends Required<VueI18nOptions> {}
