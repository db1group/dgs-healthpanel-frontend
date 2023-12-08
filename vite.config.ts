import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5385,
    proxy: {
      '/api': {
        target:
          process.env.VITE_PROXY_REMOTE_URL ||
          'https://api-healthpanel.db1.com.br',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
