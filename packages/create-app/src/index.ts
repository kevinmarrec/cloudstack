#!/usr/bin/env node

/* eslint-disable no-console */

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { parseArgs } from 'node:util'

import { bold, green, red } from 'picocolors'
import prompts from 'prompts'

import { canSkipEmptying, emptyDir } from './utils/dir'

async function init() {
  const { values: argv, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      force: { type: 'boolean', short: 'f' },
    },
    strict: false,
  })

  let targetDir = positionals[0]
  const forceOverwrite = argv.force

  function onCancel() {
    console.log(`${red('✖')} Operation cancelled`)
    process.exit(1)
  }

  if (!targetDir) {
    await prompts([
      {
        name: 'projectName',
        type: 'text',
        message: 'Project name:',
        validate: value => String(value).trim() ? true : 'Project name cannot be empty',
        onState: (state) => {
          targetDir = String(state.value).trim()
        },
      },
    ], { onCancel })
  }

  if (!((await canSkipEmptying(targetDir) || forceOverwrite))) {
    await prompts([
      {
        name: 'shouldOverwrite',
        type: () => 'toggle',
        message: () => `${targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`} is not empty. Remove existing files and continue?`,
        initial: true,
        active: 'Yes',
        inactive: 'No',
      },
      {
        name: 'overwriteChecker',
        type: (_prev, values) => {
          if (values.shouldOverwrite === false) {
            onCancel()
          }
          return false
        },
      },
    ], { onCancel })
  }

  const cwd = process.cwd()
  const root = path.resolve(cwd, targetDir)
  const _ = await fs.exists(root) ? await emptyDir(root) : await fs.mkdir(root)

  console.log(`\nScaffolding project in ${root}...`)

  await fs.cp(path.join(__dirname, '../template'), root, { recursive: true })

  console.log('\nDone. Now run:\n')

  if (root !== cwd) {
    const cdProjectName = path.relative(cwd, root)
    console.log(bold(green(`  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`)))
  }

  console.log(bold(green('  bun install')))
  console.log(bold(green('  bun dev')))
}

init().catch((error) => {
  console.error(error)
})
