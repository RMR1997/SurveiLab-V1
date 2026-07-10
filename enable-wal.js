const { createClient } = require('@libsql/client')

async function enableWAL() {
  const db = createClient({ url: 'file:prisma/dev.db' })
  const result = await db.execute('PRAGMA journal_mode=WAL;')
  console.log('Journal mode set to:', result.rows[0])
  db.close()
  console.log('Done! dev.db is now ready for Turso upload.')
}

enableWAL().catch(console.error)
