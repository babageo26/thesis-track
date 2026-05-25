import { defineConfig } from 'vite';

export default defineConfig({
  // Sesuaikan base dengan nama repo GitHub kamu
  // Contoh: repo bernama "thesis-track" → base: '/thesis-track/'
  // Jika custom domain → base: '/'
  base: '/thesis-track/',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
