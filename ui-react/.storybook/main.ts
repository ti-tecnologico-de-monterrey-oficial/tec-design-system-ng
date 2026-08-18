import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import fs from 'node:fs';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(import.meta.dirname, '../../.env') });

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    docsMode: process.env.STORYBOOK_DOCS_MODE === 'true',
    defaultName: 'Documentation',
  },
  viteFinal: async (config) => {
    config.plugins ||= [];

    // Plugin para copiar assets antes del build
    config.plugins.push({
      name: 'copy-storybook-assets',
      closeBundle() {
        const assets = [
          { from: '../../shared/assets', to: 'assets' },
          {
            from: '../node_modules/@material-symbols/svg-400/rounded',
            to: 'assets/icons/material-rounded',
          },
        ];

        assets.forEach(({ from, to }) => {
          const source = path.resolve(import.meta.dirname, from);
          const target = path.resolve(
            import.meta.dirname,
            `../../dist/storybook/${to}`,
          );

          if (!fs.existsSync(source)) {
            console.warn(`⚠️ Source not found: ${source}`);
            return;
          }

          fs.mkdirSync(path.dirname(target), { recursive: true });
          fs.cpSync(source, target, { recursive: true });
        });
      },
    });

    return config;
  },
  staticDirs: [
    { from: '../../shared/assets', to: '/assets' },
    {
      from: '../node_modules/@material-symbols/svg-400/rounded',
      to: '/assets/icons/material-rounded',
    },
  ],
};
export default config;
