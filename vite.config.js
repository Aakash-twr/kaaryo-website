import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // scripts/build-static.mjs reads the manifest to find each route's chunk
    // and emit a matching <link rel="modulepreload"> in that route's HTML.
    manifest: true,
    rollupOptions: {
      output: {
        // Split the dependencies that never change on their own release cycle
        // into their own chunks. Shipping a copy tweak then only invalidates the
        // app chunk, leaving React and Framer Motion in the visitor's cache.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
