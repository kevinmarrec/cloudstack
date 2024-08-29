import { antfu } from '@antfu/eslint-config'
import defu from 'defu'
import { isPackageExists } from 'local-pkg'

type Options = Parameters<typeof antfu>[0]
type UserConfig = Parameters<typeof antfu>[1]

export function defineConfig(options: Options = {}, ...userConfigs: UserConfig[]) {
  if (options.unocss !== false && isPackageExists('unocss')) {
    options.unocss = true
  }

  if (options.unocss) {
    options.unocss = defu(options.unocss, {
      attributify: false,
      strict: true,
    })
  }

  if (options.ignores) {
    userConfigs.unshift({ ignores: options.ignores })
  }

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
      'import/no-duplicates': [
        'error',
        { 'prefer-inline': true },
      ],
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
  }), ...userConfigs)
}
