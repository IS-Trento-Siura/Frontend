import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://backend-qevl.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  },
  preview: {
    port: 8080, 
    proxy: {
      '/api': {
        target: 'https://backend-qevl.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  },
  // Assicurati che le variabili d'ambiente siano caricate correttamente
  define: {
    __VITE_API_URL__: JSON.stringify(process.env.VITE_API_URL)
  }
})
