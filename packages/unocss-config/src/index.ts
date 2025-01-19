import preset, { type PresetOptions, type Theme } from '@kevinmarrec/cloudstack-unocss-preset'
import { defineConfig, type UserConfig } from 'unocss'

export function useConfig(userConfig: UserConfig<Theme> & Omit<PresetOptions, 'cwd'> = {}) {
  const { fonts, icons, ...config } = userConfig

  return defineConfig({
    presets: [preset({ fonts, icons })],
    ...config,
  })
}

export default useConfig()
