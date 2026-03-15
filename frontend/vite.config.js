import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: "https://flight-booking-system-2-0qtd.onrender.com",
    proxy: {
      '/api': {
        target: 'https://flight-booking-system-1-gbwt.onrender.com',
        changeOrigin: true,
      }
    }
  }
})
