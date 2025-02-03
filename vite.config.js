import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      events: 'events',
      'readable-stream': 'vite-compatible-readable-stream',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      _stream_duplex: 'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
      _stream_passthrough: 'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
      _stream_readable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
      _stream_transform: 'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
      _stream_writable: 'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
    }
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  }
})
