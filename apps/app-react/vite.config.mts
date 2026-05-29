/// <reference types='vitest' />
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function materialSymbolsCopyPlugin() {
  return {
    name: 'material-symbols-copy',
    configureServer() {
      copyMaterialSymbols();
    },
    buildStart() {
      copyMaterialSymbols();
    },
  };
}

function copyMaterialSymbols() {
  const sourceDir = resolve(import.meta.dirname, '../../node_modules/@material-symbols/svg-400/rounded');
  const targetDir = resolve(import.meta.dirname, 'public/assets/icons/material-rounded');

  if (!existsSync(sourceDir)) {
    return;
  }

  mkdirSync(targetDir, { recursive: true });
  cpSync(sourceDir, targetDir, { recursive: true });
}

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/app-react',
  server:{
    port: 4200,
    host: 'localhost',
  },
  preview:{
    port: 4200,
    host: 'localhost',
  },
  plugins: [react(), materialSymbolsCopyPlugin()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
