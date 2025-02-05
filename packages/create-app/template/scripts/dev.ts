import concurrently, { type ConcurrentlyCommandInput } from 'concurrently'

const commandInputs: ConcurrentlyCommandInput[] = [
  { command: `bun --cwd backend dev`, name: 'backend', prefixColor: 'blue' },
  { command: `bun --cwd frontend dev`, name: 'frontend', prefixColor: 'green' },
]

concurrently(commandInputs)
