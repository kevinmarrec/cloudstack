import { $ } from 'bun'

// Packages to pre-build on install
const packages = [
  'eslint-config',
  'stylelint-config',
  'frontend',
]

await Promise.all(
  packages.map(pkg =>
    $`bun --cwd packages/${pkg} build`.quiet(),
  ),
)
