import { cp } from 'node:fs/promises'

import { glob } from 'tinyglobby'

const packages = await glob('packages/*', { onlyDirectories: true })

await Promise.all(packages.map(async (packagePath) => {
  return cp('LICENSE', `${packagePath}/LICENSE`)
}))
