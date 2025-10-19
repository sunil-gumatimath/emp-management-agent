import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    port: 8080,
    // Enable faster HMR with Bun
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000
    },
    watch: {
      usePolling: true
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  // Optimize for Bun's module system
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      supported: { 
        bigint: true 
      },
    },
  },
  // Enable faster builds with Bun
  build: {
    target: 'es2020',
    minify: 'terser',
    sourcemap: true,
  },
})