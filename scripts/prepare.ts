import { $ } from 'bun'

// Packages to pre-build on install because root ESLint and Stylelint configurations depends on them.
const packages = ['eslint', 'stylelint']

await Promise.all(
  packages.map(pkg =>
    $`bun --silent --cwd packages/${pkg} build --silent`,
  ),
)
