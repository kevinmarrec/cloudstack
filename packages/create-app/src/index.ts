/* eslint-disable no-console */

import path from 'node:path'
import process from 'node:process'

import { bold, green } from 'picocolors'

import { prompt } from './prompt'
import { scaffold } from './scaffold'

async function run() {
  const { targetDir } = await prompt()

  const cwd = process.cwd()
  const root = path.resolve(cwd, targetDir)

  await scaffold(root)

  console.log('\nDone. Now run:\n')

  if (root !== cwd) {
    console.log(bold(green(`  cd ${path.relative(cwd, root)}`)))
  }

  console.log(bold(green('  bun install')))
  console.log(bold(green('  bun dev')))
}

run().catch((error) => {
  console.error(error)
})
