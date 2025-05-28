import { defineConfig } from 'astro/config'

import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    sessionKVBindingName: 'SESSION',
    routes: {
      extend: {
        include: [{ pattern: '/rpc/**' }],
      },
    },
    platformProxy: {
      enabled: true,
      persist: true,
      configPath: 'wrangler.yaml',
    },
  }),
})
