import type { Config } from 'stylelint'

export function useConfig(userConfig: Config = {}): Config {
  return {
    extends: [
      'stylelint-config-recommended-scss',
      'stylelint-config-html',
      'stylelint-config-recess-order',
    ],
    plugins: ['stylelint-plugin-use-baseline'],
    rules: {
      'plugin/use-baseline': true,
      'declaration-block-no-duplicate-properties': true,
      'length-zero-no-unit': true,
      ...userConfig.rules,
    },
    ignoreFiles: userConfig.ignoreFiles,
  }
}

export default useConfig()
