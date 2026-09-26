import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';

// Flat Config (ESLint 10): js.recommended + typescript-eslint.recommended, nicht
// typgeprüft (schnell, dependency-arm). src-tauri ist Rust/Config, kein Lint-Ziel.
export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'coverage', 'src-tauri']),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['scripts/**/*.{js,mjs,mts}', 'vite.config.ts', 'eslint.config.js'],
    languageOptions: { globals: globals.node },
  },
]);
