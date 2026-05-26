import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  preview: {
    allowedHosts: ['trener.tunn.dev'],
    port: 8000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  server: {
    port: 5173,          // ← Vite port (different from .NET)
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: ['all'],
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // ← .NET backend port
        changeOrigin: true,
        secure: false,
      }
    },
  },
})