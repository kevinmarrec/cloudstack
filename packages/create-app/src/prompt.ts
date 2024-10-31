/* eslint-disable no-console */

import process from 'node:process'
import { parseArgs } from 'node:util'

import { red } from 'picocolors'
import prompts from 'prompts'

import { canSkipEmptying } from './utils/dir'

export async function prompt() {
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

  // Project name
  if (!targetDir) {
    const { projectName } = await prompts([
      {
        name: 'projectName',
        type: 'text',
        message: 'Project name:',
        validate: value => String(value).trim() ? true : 'Project name cannot be empty',
      },
    ], { onCancel })

    targetDir = projectName.trim()
  }

  // Overwrite check
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

  return { targetDir }
}
