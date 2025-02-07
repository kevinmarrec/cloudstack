import { type CheckOptions, defineConfig } from 'taze'

export function useConfig(config: Partial<CheckOptions> = {}) {
  return defineConfig({
    install: true,
    interactive: true,
    recursive: true,
    write: true,
    ...config,
  })
}

export default useConfig()
