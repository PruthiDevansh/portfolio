import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',      
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
