import fs from 'node:fs/promises'

import { glob } from 'tinyglobby'

const pkgPaths = await glob('packages/*', { onlyDirectories: true })

await Promise.all(pkgPaths.map(async (pkgPath) => {
  await fs.cp('LICENSE', `${pkgPath}/LICENSE`)
}))
