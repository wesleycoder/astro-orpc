import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { RouterClient } from '@orpc/server'
import type { RPC } from './rpc/[...path]'

if (typeof window !== 'undefined') {
  const link = new RPCLink({ url: `${window.location.origin}/rpc` })

  const client: RouterClient<RPC> = createORPCClient(link)

  const stream = await client.stream()
  for await (const chunk of stream) {
    if (!chunk) continue
    console.log(chunk)
  }
}
