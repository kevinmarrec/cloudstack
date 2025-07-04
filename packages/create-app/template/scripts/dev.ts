import concurrently, { type ConcurrentlyCommandInput } from 'concurrently'

const commandInputs: ConcurrentlyCommandInput[] = [
  {
    name: 'backend',
    prefixColor: 'blue',
    command: `bun --cwd backend dev`,
  },
  {
    name: 'frontend',
    prefixColor: 'green',
    command: `bun --cwd frontend dev`,
  },
]

concurrently(commandInputs)
