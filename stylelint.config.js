import { useConfig } from '@kevinmarrec/cloudstack-stylelint-config'

export default useConfig({
  ignoreFiles: [
    '**/coverage/**',
    '**/fixtures/**',
  ],
})
