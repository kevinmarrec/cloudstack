import fs from 'node:fs/promises'

import { glob } from 'tinyglobby'

interface CoverageSummary {
  [key: string]: {
    statements: {
      covered: number
      total: number
    }
  }
}

const coverageSummaryJson = await fs.readFile('./coverage/coverage-summary.json', 'utf-8')
const coverageSummary: CoverageSummary = JSON.parse(coverageSummaryJson)

const pkgPaths = await glob('packages/*', { onlyDirectories: true })

const groupedCoverage = pkgPaths.toSorted().reduce<Record<string, number>>((coverage, pkgPath) => {
  const pkgCoverage = Object.keys(coverageSummary)
    .filter(key => key.includes(pkgPath))
    .reduce((acc, key) => {
      acc.covered += coverageSummary[key].statements.covered
      acc.total += coverageSummary[key].statements.total
      return acc
    }, { covered: 0, total: 0 })
  coverage[pkgPath.slice(0, -1)] = Math.floor((pkgCoverage.covered / pkgCoverage.total) * 100)
  return coverage
}, {})

groupedCoverage.total = Math.floor((coverageSummary.total.statements.covered / coverageSummary.total.statements.total) * 100)

await fs.writeFile('./coverage/coverage-summary.grouped.json', `${JSON.stringify(groupedCoverage, null, 2)}\n`)
