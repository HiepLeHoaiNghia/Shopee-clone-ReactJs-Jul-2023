// eslint-disable-next-line import/no-unresolved
import { UserConfig, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()] as UserConfig['plugins'],
  test: {
    environment: 'jsdom'
  },
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
