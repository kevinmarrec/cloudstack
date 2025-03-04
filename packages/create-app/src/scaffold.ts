import { join } from 'pathe'
import { glob } from 'tinyglobby'

import { version } from '../package.json'
import fs from './utils/fs'

export async function scaffold(root: string) {
  await fs.exists(root)
    ? await fs.empty(root)
    : await fs.mkdir(root)

  // Copy template
  await fs.cp(join(import.meta.dirname, '../template'), root, { recursive: true })
  await fs.rename(join(root, 'gitignore'), join(root, '.gitignore'))

  // Set alias and versions for @kevinmarrec/cloudstack-* packages
  const files = await glob('**/*.{json,ts,vue}', { cwd: root, absolute: true })

  await Promise.all(files.map(async (file) => {
    const content = await fs.readFile(file, 'utf-8')

    if (!content.includes('@kevinmarrec/cloudstack-')) {
      return
    }

    await fs.writeFile(
      file,
      file.includes('package.json')
        ? content.replace(/"(@kevinmarrec\/cloudstack-(.*))": "workspace:\*"/g, `"@cloudstack/$2": "npm:$1@^${version}"`)
        : content.replace(/@kevinmarrec\/cloudstack-(.*)/g, '@cloudstack/$1'),
    )
  }))
}
