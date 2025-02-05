import fs from 'node:fs/promises'

import { glob } from 'tinyglobby'

import { version } from '../package.json'

const pkgPaths = await glob('packages/*', { onlyDirectories: true })

await Promise.all(pkgPaths.map(async (pkgPath) => {
  const pkgJson = await fs.readFile(`${pkgPath}/package.json`, 'utf-8')
  await fs.writeFile(`${pkgPath}/package.json`, pkgJson.replaceAll('workspace:*', `^${version}`))
  await fs.cp('LICENSE', `${pkgPath}/LICENSE`)
}))
