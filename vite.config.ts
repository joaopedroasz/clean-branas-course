import { resolve } from 'path'
import { defineConfig, UserConfig } from 'vitest/config'

export const baseConfig: UserConfig = {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/tests': resolve(__dirname, 'tests')
    }
  },
  test: {
    root: resolve(__dirname, 'tests'),
    globals: true,
    include: ['**/*.{spec,test}.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'html']
    },
    clearMocks: true,
    mockReset: true,
    reporters: 'verbose'
  }
}

export default defineConfig(baseConfig)
