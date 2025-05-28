import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { RouterClient } from '@orpc/server'
import type { RPC } from './rpc/[...path]'

const link = new RPCLink({
  url: 'http://localhost:4321/rpc',
  headers: () => ({
    'x-api-key': 'my-api-key',
  }),
})

const client: RouterClient<RPC> = createORPCClient(link)

const hello = await client.hello()
console.log(hello)

const stream = await client.stream()
for await (const chunk of stream) {
  console.log(chunk)
}
