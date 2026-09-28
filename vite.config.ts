/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import sirv from 'sirv';

/**
 * Podcasts im Browser (dev und preview) unter `/podcasts/` aus dem Ordner `podcasts/`,
 * mit Range-Anfragen (sonst lässt sich im Audio nicht springen). Absichtlich NICHT über
 * `public/`: alles dort ginge in `dist/` und damit in die .exe; die App bekommt die
 * Dateien als Tauri-Ressourcen neben die .exe (`bundle.resources`).
 */
function podcasts(): Plugin {
  const dienst = () => sirv(fileURLToPath(new URL('./podcasts', import.meta.url)), { dev: true, etag: true });
  return {
    name: 'podcasts',
    configureServer(server) {
      server.middlewares.use('/podcasts', dienst());
    },
    configurePreviewServer(server) {
      server.middlewares.use('/podcasts', dienst());
    },
  };
}

// Reine statische App: kein Server, keine Rewrites (Hash-Router). Der Build läuft
// identisch für den Web-Preview und als Tauri-Frontend (frontendDist ../dist).
export default defineConfig({
  plugins: [react(), podcasts()],
  clearScreen: false,
  server: { port: 5173, strictPort: true },
  build: { target: 'es2022' },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
