import { cp, readdir } from 'node:fs/promises'

const packages = await readdir('packages')

await Promise.all(packages.map(async (pkg) => {
  return cp('LICENSE', `packages/${pkg}/LICENSE`)
}))
