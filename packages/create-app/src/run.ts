/* eslint-disable no-console */

import path from 'node:path'
import process from 'node:process'

import { bold, green } from 'picocolors'
import { x } from 'tinyexec'

import { prompt } from './prompt'
import { scaffold } from './scaffold'

export async function run() {
  const { targetDir, install } = await prompt()

  await scaffold(targetDir)

  if (install) {
    console.log('\n📦 Installing dependencies...')
    await x('bun', ['install', '--cwd', targetDir, '--save-text-lockfile'])
    console.log('\n✅ Done')
  }
  else {
    console.log('\n✅ Done')
    console.log(`\n👉 Next steps:\n`)

    if (targetDir !== process.cwd()) {
      console.log(bold(green(`    cd ${path.relative(process.cwd(), targetDir)}`)))
    }

    console.log(bold(green('    bun install --save-text-lockfile')))
  }
}
