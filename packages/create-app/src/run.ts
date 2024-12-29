/* eslint-disable no-console */

import path from 'node:path'
import process from 'node:process'

import { bold, green } from 'picocolors'

import { prompt } from './prompt'
import { scaffold } from './scaffold'

function printUsage(targetDir: string) {
  console.log('\nDone. Now run:\n')

  if (targetDir !== process.cwd()) {
    console.log(bold(green(`  cd ${path.relative(process.cwd(), targetDir)}`)))
  }

  console.log(bold(green('  bun install --save-text-lockfile')))
  console.log(bold(green('  bun --cwd backend dev')))
  console.log(bold(green('  bun --cwd frontend dev')))
}

export async function run() {
  const { targetDir } = await prompt()

  await scaffold(targetDir)

  printUsage(targetDir)
}
