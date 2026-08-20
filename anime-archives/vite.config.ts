import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // FastAPI server (set to local environment but update later)
        changeOrigin: true,
        secure: false,
        // Rewrite /api/[endpoint] to /[endpoint] if your FastAPI paths do not include /api (ex. /api/users to /users)
        rewrite: (path) => path.replace(/^\/api/, ''), 
      }
    }
  }
})
