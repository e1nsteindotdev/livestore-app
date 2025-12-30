import { makeAdapter } from '@livestore/adapter-node'
import { createStorePromise } from '@livestore/livestore'
import { makeCfSync } from '@livestore/sync-cf'

import { events, schema, tables } from '../src/livestore/schema'

const adapter = makeAdapter({
  storage: { type: 'fs', baseDirectory: 'tmp' },
  sync: { backend: makeCfSync({ url: 'ws://websocket-server.ahmed-hassaine432.workers.dev' }), onSyncError: 'shutdown' },
})

const storePromise = createStorePromise({
  adapter,
  schema,
  storeId: '91ca65b1-ffff-4b79-8ca7-c24f1425ff15',
  syncPayload: { authToken: 'insecure-token-change-me' },
})

export default async function handler(_req: any, res: any) {
  const store = await storePromise
  const todos = store.query(tables.todos.where({}))
  res.json(todos)
}
