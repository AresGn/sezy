import path from 'path'

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    // Default environment for service/utility tests
    environment: 'node',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    // Per-file environment override: component test files use jsdom
    // (Vitest 1.x: environmentMatchGlobs; Vitest 2-4.x: use @vitest-environment directive in file or a workspace)
    // We use jsdom as default here because we have component tests too
    // Override to node in specific test files via: // @vitest-environment node
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      thresholds: { lines: 75 },
      exclude: [
        'node_modules/**',
        'src/components/ui/**',
        'src/app/**/*.tsx',
        'prisma/**',
        'src/test/**',
        '**/*.config.*',
        '**/*.d.ts',
      ],
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
