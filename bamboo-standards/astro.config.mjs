// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import angular from '@analogjs/astro-angular';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

// El plugin de Angular desactiva la transformación TS por defecto; los .ts de node_modules
// (p. ej. astro-expressive-code) llegarían sin compilar.
const nodeModulesTs = () => ({
  name: 'node-modules-ts',
  enforce: 'pre',
  async transform(code, id) {
    const file = id.split('?')[0];
    if (!file.endsWith('.ts') || !file.includes('/node_modules/')) return null;
    const viteEntry = createRequire(import.meta.url).resolve('vite', {
      paths: [createRequire(import.meta.url).resolve('astro')],
    });
    const { transformWithOxc } = await import(pathToFileURL(viteEntry).href);
    return transformWithOxc(code, file, { lang: 'ts' });
  },
});

// https://astro.build/config
export default defineConfig({
  outDir: '../dist/bamboo-standards',
  vite: {
    server: { fs: { allow: ['..'] } },
    plugins: [nodeModulesTs()],
  },
  integrations: [
    angular({ vite: { tsconfig: './tsconfig.angular.json' } }),
    starlight({
      title: 'My Docs',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/withastro/starlight',
        },
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
            { label: 'Flujo de ramas y PR', slug: 'guides/flujo-de-ramas' },
          ],
        },
        {
          label: 'Reference',
          items: [{ autogenerate: { directory: 'reference' } }],
        },
      ],
    }),
  ],
});
