import fs from 'node:fs/promises'

import c from 'ansis'
import { join } from 'pathe'
import { x } from 'tinyexec'
import { glob } from 'tinyglobby'

interface BuildEntry {
  name: string
  path: string
  dependencies: Record<string, string>
  needs: BuildEntry[]
}

async function buildPackage(entry: BuildEntry) {
  const time = performance.now()
  await Promise.all(entry.needs.map(buildPackage))
  const { stderr, exitCode } = await x('bun', ['--cwd', entry.path, 'build', '--silent'])
  if (exitCode) {
    console.error(`Failed to build ${entry.name} :`)
    return console.error(stderr)
  }
  console.log(`${entry.name} built in ${c.bold(Math.ceil(performance.now() - time))} ms`)
}

const pkgPaths = await glob('packages/*', { onlyDirectories: true })

const buildMap = new Map<string, BuildEntry>()

await Promise.all(pkgPaths.map(async (pkgPath: string) => {
  const pkgJson = await fs.readFile(join(pkgPath, 'package.json'), 'utf-8').catch(() => '{}')

  const {
    name,
    scripts = {},
    dependencies = {},
  } = JSON.parse(pkgJson)

  if (scripts.build) {
    buildMap.set(name, {
      name,
      path: pkgPath,
      dependencies,
      needs: [],
    })
  }
}))

for (const buildEntry of buildMap.values()) {
  for (const depName of Object.keys(buildEntry.dependencies)) {
    if (buildMap.has(depName)) {
      buildEntry.needs.push(buildMap.get(depName)!)
      buildMap.delete(depName)
    }
  }
}

await Promise.all(buildMap.values().map(buildPackage))
