import process from 'node:process'

if (process.env.CI) {
  console.log('CI environment detected, skipping build')
  process.exit(0)
}

await import('./build')
