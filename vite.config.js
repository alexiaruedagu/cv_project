import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/cv_project/', // Cambia esto al nombre de tu carpeta de despliegue
});
