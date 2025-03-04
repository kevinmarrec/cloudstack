import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
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

async function getPackageHash(pkgPath: string) {
  const files = await glob(['package.json', 'src/**/*', 'dist/**/*'], { cwd: pkgPath, absolute: true })
  const filesHashes = await Promise.all(files.toSorted().map(file => new Promise<string>((resolve, reject) => {
    const hash = createHash('sha256')
    const rs = createReadStream(file)
    rs.on('error', reject)
    rs.on('data', chunk => hash.update(chunk))
    rs.on('end', () => resolve(hash.digest('hex')))
  })))
  return createHash('sha256').update(filesHashes.join()).digest('hex')
}

async function createBuildMap(pkgPaths: string[]) {
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

  return buildMap
}

async function buildPackage(entry: BuildEntry, cache: Record<string, string>) {
  await Promise.all(entry.needs.map(need => buildPackage(need, cache)))

  const time = performance.now()

  if (cache[entry.name] === await getPackageHash(entry.path)) {
    return console.log(`${entry.name} is up to date`)
  }

  const { stderr, exitCode } = await x('bun', ['--cwd', entry.path, 'build', '--silent'])

  if (exitCode) {
    return console.error(`Failed to build ${entry.name}:\n${stderr}`)
  }

  cache[entry.name] = await getPackageHash(entry.path)

  console.log(`${entry.name} built in ${Math.ceil(performance.now() - time)} ms`)
}

async function build() {
  const cacheDir = join(import.meta.dir, '../node_modules/.cache/cloudstack')
  const cachePath = join(cacheDir, 'build.json')
  const cache = JSON.parse(await fs.readFile(cachePath, 'utf-8').catch(() => '{}'))
  const buildMap = await createBuildMap(await glob('packages/*', { onlyDirectories: true }))

  await Promise.all(buildMap.values().map(entry => buildPackage(entry, cache)))

  await fs.mkdir(cacheDir, { recursive: true })
  await fs.writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`)
}

await build()
