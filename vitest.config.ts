import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src', // para permitir importações absolutas
    },
  },
  optimizeDeps: {
    include: [
      // adicione aqui quaisquer pacotes que precisam ser otimizados
      'vuetify/lib',
      'vuetify/lib/framework',
    ],
  },
});
