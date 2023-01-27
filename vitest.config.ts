import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// ts-prune-ignore-next
export default defineConfig({
  plugins: [tsconfigPaths()]
})
