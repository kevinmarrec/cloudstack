import { resolve } from 'node:path'

import { client } from '@backend/database/client'
import { migrate } from 'drizzle-orm/pglite/migrator'

console.log()

await migrate(client, {
  migrationsFolder: resolve(
    import.meta.dirname,
    '../src/database/migrations',
  ),
})
