import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // listen on all network interfaces (0.0.0.0)
    port: 5173, // explicit port
    strictPort: true, // fail if port is already in use
    proxy: {
      // proxy API requests to backend container
      "/chatbot-api": {
        target: "http://backend:8000", // use the Docker Compose service name
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
