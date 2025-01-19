/* eslint-disable no-console */

import path from 'node:path'

import { glob } from 'tinyglobby'
import colors from 'tinyrainbow'

import { version } from '../package.json'
import fs from './utils/fs'

export async function scaffold(root: string) {
  await fs.exists(root)
    ? await fs.empty(root)
    : await fs.mkdir(root)

  console.log(`\n🧬 Scaffolding project in ${colors.blue(root)}...`)

  // Copy template
  await fs.cp(path.join(__dirname, '../template'), root, { recursive: true })
  await fs.rename(path.join(root, 'gitignore'), path.join(root, '.gitignore'))

  // Set @kevinmarrec-cloudstack-* packages version to current version
  const pkgPaths = await glob('**/package.json', { cwd: root, absolute: true })

  for (const pkgPath of pkgPaths) {
    const contents = await fs.readFile(pkgPath, 'utf-8')
    const pkg: { devDependencies: Record<string, string> } = JSON.parse(contents)

    for (const key in pkg.devDependencies) {
      if (!pkg.devDependencies[key]) {
        pkg.devDependencies[key] = `^${version}`
      }
    }

    await fs.writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
  }
}
