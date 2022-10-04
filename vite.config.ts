import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/tests': resolve(__dirname, 'tests')
    }
  },
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html']
    }
  }
})
