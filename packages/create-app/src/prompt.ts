/* eslint-disable no-console */

import process from 'node:process'
import { parseArgs } from 'node:util'

import c from 'ansis'
import { resolve } from 'pathe'
import prompts from 'prompts'

import { version } from '../package.json'
import fs from './utils/fs'

function onCancel(): never {
  console.log(`${c.red('✖')} Operation cancelled`)
  process.exit(1)
}

export async function prompt() {
  const { values: options, positionals } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      force: { type: 'boolean', short: 'f' },
      help: { type: 'boolean', short: 'h' },
      install: { type: 'boolean', short: 'i' },
      version: { type: 'boolean', short: 'v' },
    },
  })

  // Help
  if (options.help) {
    console.log(`\
Usage: create-app [OPTIONS...] [DIRECTORY]

Options:
  -f, --force     Create the project even if the directory is not empty.
  -h, --help      Display this help message.
  -i, --install   Automatically install dependencies after creating the project.
  --version       Display the version number of this CLI.

Examples:
  create-app my-app
  create-app --force my-app
  create-app -i my-app
`)
    process.exit(0)
  }

  // Version
  if (options.version) {
    console.log(version)
    process.exit(0)
  }

  // Project name
  let projectName: string = positionals[0]

  if (!projectName) {
    ({ projectName } = await prompts({
      name: 'projectName',
      type: 'text',
      message: 'Project name:',
      /* v8 ignore next 2 */
      validate: value => String(value).trim() ? true : 'Project name cannot be empty',
      format: value => value.trim(),
    }, { onCancel }))
  }

  // Target directory
  const cwd = process.cwd()
  const targetDir = resolve(cwd, projectName)

  // Overwrite check
  if (!((await fs.emptyCheck(targetDir) || options.force))) {
    const { shouldOverwrite } = await prompts({
      name: 'shouldOverwrite',
      type: 'toggle',
      message: `${targetDir === cwd ? 'Current directory' : `Target directory "${targetDir}"`} is not empty. Remove existing files and continue?`,
      initial: true,
      active: 'Yes',
      inactive: 'No',
    })

    if (!shouldOverwrite) {
      onCancel()
    }
  }

  if (!options.install) {
    const { shouldInstall } = await prompts({
      name: 'shouldInstall',
      type: 'toggle',
      message: 'Automatically install dependencies after scaffolding project?',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    })

    options.install = shouldInstall
  }

  return { cwd, targetDir, ...options }
}
