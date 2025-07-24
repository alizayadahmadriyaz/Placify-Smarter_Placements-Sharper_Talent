import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Optional: use './' if deploying to subpath, '/' is fine for Netlify root
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // Only affects dev server
  },
});
