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

function poppinsFontsCopyPlugin() {
  return {
    name: 'poppins-fonts-copy',
    configureServer() {
      copyPoppinsFonts();
    },
    buildStart() {
      copyPoppinsFonts();
    },
  };
}

function copyPoppinsFonts() {
  const sourceDir = resolve(import.meta.dirname, '../../lib/ui-react/src/assets/fonts/Poppins');
  const targetDir = resolve(import.meta.dirname, 'public/assets/fonts/Poppins');

  if (!existsSync(sourceDir)) {
    return;
  }

  mkdirSync(targetDir, { recursive: true });
  cpSync(sourceDir, targetDir, { recursive: true });
}

function sharedI18nCopyPlugin() {
  return {
    name: 'shared-i18n-copy',
    configureServer() {
      copySharedI18n();
    },
    buildStart() {
      copySharedI18n();
    },
  };
}

function copySharedI18n() {
  const sourceDir = resolve(import.meta.dirname, '../../packages/shared-assets/i18n');
  const targetDir = resolve(import.meta.dirname, 'public/assets/i18n');

  if (!existsSync(sourceDir)) {
    return;
  }

  mkdirSync(targetDir, { recursive: true });
  cpSync(sourceDir, targetDir, { recursive: true });
}

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/app-react',
  resolve: {
    alias: {
      '@ti-tecnologico-de-monterrey-oficial/ui-react': resolve(import.meta.dirname, '../../lib/ui-react/src/index.ts'),
      '@ti-tecnologico-de-monterrey-oficial/core/component/badge': resolve(import.meta.dirname, '../../lib/core/src/component/badge.ts'),
      '@ti-tecnologico-de-monterrey-oficial/core': resolve(import.meta.dirname, '../../lib/core/src/index.ts'),
    },
  },
  server:{
    port: 4200,
    host: 'localhost',
  },
  preview:{
    port: 4200,
    host: 'localhost',
  },
  plugins: [react(), materialSymbolsCopyPlugin(), poppinsFontsCopyPlugin(), sharedI18nCopyPlugin()],
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
