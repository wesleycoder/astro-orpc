import { os } from '@orpc/server'
import { RPCHandler } from '@orpc/server/fetch'
import { CORSPlugin } from '@orpc/server/plugins'
import type { APIContext } from 'astro'

const router = {
  hello: os
    .route({
      method: 'GET',
      path: '/hello',
    })
    .handler(async () => {
      return 'Hello World'
    }),
  stream: os
    .route({
      method: 'GET',
      path: '/stream',
    })
    .handler(async function* ({ signal }) {
      let isAborted = false
      signal?.addEventListener('abort', () => {
        console.log('aborted')
        isAborted = true
      })

      let i = 0
      yield void 0

      try {
        while (!isAborted) {
          console.log(`yielding ${i}`)
          yield `Hello World ${i++}\n`
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      } finally {
        console.log('finally')
      }
    }),
}

export type RPC = typeof router

export const prerender = false

const rpcApp = new RPCHandler(router, { plugins: [new CORSPlugin()] })

export const rpcHandler = async (context: APIContext) => {
  const { matched, response } = await rpcApp.handle(context.request, { prefix: '/rpc' })
  if (matched) return response
  return new Response('Not Found', { status: 404 })
}

export const ALL = rpcHandler
