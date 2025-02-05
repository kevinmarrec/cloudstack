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
  await fs.cp(path.join(import.meta.dirname, '../template'), root, { recursive: true })
  await fs.rename(path.join(root, 'gitignore'), path.join(root, '.gitignore'))

  // Set @kevinmarrec/cloudstack-* packages version to current version
  const pkgJsonPaths = await glob('**/package.json', { cwd: root, absolute: true })

  for (const pkgJsonPath of pkgJsonPaths) {
    const pkgJson = await fs.readFile(pkgJsonPath, 'utf-8')
    await fs.writeFile(pkgJsonPath, pkgJson.replaceAll('workspace:*', `^${version}`))
  }
}
