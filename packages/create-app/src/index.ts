#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { parseArgs } from 'node:util'

import { red } from 'picocolors'
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
    // eslint-disable-next-line no-console
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

  const root = path.resolve(process.cwd(), targetDir)
  const _ = await fs.exists(root) ? await emptyDir(root) : await fs.mkdir(root)
}

init().catch((error) => {
  console.error(error)
})
