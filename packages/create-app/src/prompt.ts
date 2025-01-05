/* eslint-disable no-console */

import path from 'node:path'
import process from 'node:process'
import { parseArgs } from 'node:util'

import { red } from 'picocolors'
import prompts from 'prompts'

import { version } from '../package.json'
import { canSkipEmptying } from './utils/dir'

function onCancel() {
  console.log(`${red('✖')} Operation cancelled`)
  process.exit(1)
}

export async function prompt() {
  const cwd = process.cwd()

  const { values: options, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      force: { type: 'boolean', short: 'f' },
      help: { type: 'boolean', short: 'h' },
      install: { type: 'boolean', short: 'i' },
      silent: { type: 'boolean', short: 's' },
      version: { type: 'boolean' },
    },
    strict: true,
    allowPositionals: true,
  })

  // Help
  if (options.help) {
    console.log(`\
Usage: create-app [OPTIONS...] [DIRECTORY]

Options:
  -f, --force     Create the project even if the directory is not empty.
  -h, --help      Display this help message.
  -i, --install   Automatically install dependencies after creating the project.
  -s, --silent    Run the CLI in silent mode.
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
    console.log(`create-app v${version}`)
    process.exit(0)
  }

  // Silent mode
  if (options.silent) {
    console.log = () => {}
  }

  // Project name
  const { projectName = positionals[0] } = await prompts([
    {
      name: 'projectName',
      type: positionals[0] ? false : 'text',
      message: 'Project name:',
      /* v8 ignore next */
      validate: value => String(value).trim() ? true : 'Project name cannot be empty',
      format: value => value.trim(),

    },
  ], { onCancel })

  const targetDir = path.resolve(cwd, projectName)

  // Overwrite check
  if (!((await canSkipEmptying(targetDir) || options.force))) {
    await prompts([
      {
        name: 'shouldOverwrite',
        type: 'toggle',
        message: `${targetDir === cwd ? 'Current directory' : `Target directory "${targetDir}"`} is not empty. Remove existing files and continue?`,
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

  return { cwd, targetDir, ...options }
}
