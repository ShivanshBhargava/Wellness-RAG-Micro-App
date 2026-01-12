import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Capacitor requires the build output to be in a specific directory
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  // Set base path for Capacitor (empty string for root)
  base: '',
  // Server configuration for Capacitor dev server
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
