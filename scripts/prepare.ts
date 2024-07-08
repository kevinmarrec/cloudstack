import { $ } from 'bun'

// Packages to pre-build on install
const packages = [
  'eslint-config',
  'stylelint-config',
  'frontend',
]

const start = performance.now()

await Promise.all(
  packages.map(pkg =>
    $`bun --cwd packages/${pkg} build`.quiet(),
  ),
)

console.log('Pre-build took', (performance.now() - start).toFixed(2), 'ms')
