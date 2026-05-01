import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// GitHub Pages serves project sites at /<repo-name>/; assets must use that base in production builds.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/vrvo-luxury/' : '/',
  plugins: [react(), tailwindcss()],
}))
