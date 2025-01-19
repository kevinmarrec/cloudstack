/* eslint-disable no-console */

import { x } from 'tinyexec'
import colors from 'tinyrainbow'

import { prompt } from './prompt'
import { scaffold } from './scaffold'

export async function run() {
  const { targetDir, install } = await prompt()

  const time = Date.now()

  await scaffold(targetDir)

  if (install) {
    console.log('\n📦 Installing dependencies...')
    await x('bun', ['install', '--cwd', targetDir])
  }

  console.log('\n✅ Done in', colors.bold(colors.blue(`${((Date.now() - time) / 1000).toFixed(2)}s`)))
}
