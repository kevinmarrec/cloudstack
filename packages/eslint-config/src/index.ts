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
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
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
      'perfectionist/sort-imports': ['error', {
        groups: [
          'builtin',
          'external',
          'type',
          ['internal', 'internal-type'],
          ['parent', 'sibling', 'index'],
          ['parent-type', 'sibling-type', 'index-type'],
          'side-effect',
          'object',
          'unknown',
        ],
        newlinesBetween: 'always',
        order: 'asc',
        type: 'natural',
      }],
    },
  }), ...userConfigs)
}
