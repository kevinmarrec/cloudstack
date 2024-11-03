/* eslint-disable no-console */

import path from 'node:path'
import process from 'node:process'
import { parseArgs } from 'node:util'

import { red } from 'picocolors'
import prompts from 'prompts'

import { canSkipEmptying } from './utils/dir'

function onCancel() {
  console.log(`${red('✖')} Operation cancelled`)
  process.exit(1)
}

export async function prompt() {
  const { values: argv, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      force: { type: 'boolean', short: 'f' },
    },
    strict: false,
  })

  let projectName = positionals[0]
  const forceOverwrite = argv.force

  // Project name
  if (!projectName) {
    const answers = await prompts([
      {
        name: 'projectName',
        type: 'text',
        message: 'Project name:',
        /* v8 ignore next */
        validate: value => String(value).trim() ? true : 'Project name cannot be empty',
      },
    ], { onCancel })

    projectName = answers.projectName.trim()
  }

  const targetDir = path.resolve(process.cwd(), projectName)

  // Overwrite check
  if (!((await canSkipEmptying(targetDir) || forceOverwrite))) {
    await prompts([
      {
        name: 'shouldOverwrite',
        type: () => 'toggle',
        message: () => `${targetDir === process.cwd() ? 'Current directory' : `Target directory "${targetDir}"`} is not empty. Remove existing files and continue?`,
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

  return { targetDir }
}
