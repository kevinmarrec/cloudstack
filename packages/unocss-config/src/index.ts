import preset, { type PresetOptions, type Theme } from '@kevinmarrec/cloudstack-unocss-preset'
import { defineConfig, type UserConfig } from 'unocss'

export function useConfig(userConfig: UserConfig<Theme> & PresetOptions = {}) {
  const { fonts, icons, ...config } = userConfig

  return defineConfig({
    presets: [preset({ fonts, icons })],
    ...config,
  })
}

export default useConfig()
