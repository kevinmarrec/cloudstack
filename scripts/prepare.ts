import { $ } from 'bun'

// Packages to pre-build on install because root ESLint and Stylelint configurations depends on them.
const packages = ['eslint-config', 'stylelint-config']

await Promise.all(
  packages.map(pkg =>
    $`bun --cwd packages/${pkg} build`.quiet(),
  ),
)
