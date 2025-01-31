import concurrently, { type ConcurrentlyCommandInput } from 'concurrently'

const templatePath = 'packages/create-app/template'

const commandInputs: ConcurrentlyCommandInput[] = [
  { command: `bun --cwd ${templatePath}/backend dev`, name: 'backend', prefixColor: 'blue' },
  { command: `bun --cwd ${templatePath}/frontend dev`, name: 'frontend', prefixColor: 'green' },
]

concurrently(commandInputs)
