import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // استيراد path من Node.js

export default defineConfig({
  base: '/supabase_project1/',  // مهم للنشر على GitHub Pages بنفس اسم المستودع
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // هذا يجعل '@' تشير إلى مجلد 'src'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-slot', '@radix-ui/react-toast']
        }
      }
    }
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    port: 3001
  }
})
