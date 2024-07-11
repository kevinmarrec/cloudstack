import { antfu } from '@antfu/eslint-config'
import defu from 'defu'

type Options = Parameters<typeof antfu>[0]
type UserConfig = Parameters<typeof antfu>[1]

export function defineConfig(options: Options = {}, ...userConfigs: UserConfig[]) {
  return antfu(defu<NonNullable<Options>, Options[]>(options, {
    formatters: true,
    typescript: {
      overrides: {
        'ts/consistent-type-imports': [
          'error',
          { fixStyle: 'inline-type-imports' },
        ],
      },
    },
    vue: {
      overrides: {
        'vue/no-unused-properties': 'error',
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          'alphabetize': { order: 'asc' },
          'distinctGroup': true,
          'newlines-between': 'always',
          'pathGroups': [
            {
              pattern: '~/**',
              group: 'external',
              position: 'after',
            },
          ],
        },
      ],
    },
  }), options.ignores ? { ignores: options.ignores } : {}, ...userConfigs)
}
