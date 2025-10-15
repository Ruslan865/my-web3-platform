import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/my-web3-platform/',  // GitHub Pages üçün
  plugins: [react()],
})
