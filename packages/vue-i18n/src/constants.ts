import type { InjectionKey } from 'vue'

import type { VueI18nInstance } from './instance'

export const injectionKey: InjectionKey<VueI18nInstance> = Symbol('vue-i18n')
