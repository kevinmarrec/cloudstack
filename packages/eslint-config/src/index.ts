import { antfu } from '@antfu/eslint-config'
import defu from 'defu'
import pluginImport from 'eslint-plugin-import-x'
import { globSync } from 'tinyglobby'

type Options = Parameters<typeof antfu>[0]
type UserConfig = Parameters<typeof antfu>[1]

export function useConfig(options: Options = {}, ...userConfigs: UserConfig[]) {
  const [unoConfig] = globSync('**/uno.config.ts', { absolute: true })

  if (options.unocss !== false && unoConfig) {
    options.unocss = true
  }

  if (options.unocss) {
    options.unocss = defu(options.unocss, {
      attributify: false,
      strict: true,
    })
  }

  return antfu(defu<NonNullable<Options>, Options[]>(options, {
    formatters: true,
    ignores: options.ignores,
    plugins: {
      import: pluginImport,
    },
    vue: {
      a11y: true,
      overrides: {
        'vue/no-unused-properties': 'error',
      },
    },
    rules: {
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'perfectionist/sort-imports': ['error', {
        groups: [
          ['builtin', 'builtin-type'],
          ['external', 'external-type'],
          ['internal', 'internal-type'],
          ['parent', 'parent-type', 'sibling', 'sibling-type', 'index', 'index-type'],
          'side-effect',
          'object',
          'unknown',
        ],
        newlinesBetween: 'always',
        order: 'asc',
        type: 'natural',
      }],
    },
    settings: {
      unocss: {
        configPath: unoConfig,
      },
    },
  }), ...userConfigs)
}

export default useConfig()
