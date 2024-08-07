// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/midterm-quotation-app/', // Base URL for GitHub Pages subpath
  plugins: [react()]
});
