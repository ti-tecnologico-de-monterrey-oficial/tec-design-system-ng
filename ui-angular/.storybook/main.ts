import type { StorybookConfig } from '@storybook/angular';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  staticDirs: [
    { from: '../../shared/assets', to: '/assets' },
    {
      from: '../../node_modules/@material-symbols/svg-400/rounded',
      to: '/assets/icons/material-rounded',
    },
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  webpackFinal: async (config) => {
    config.resolve ||= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@docs': path.resolve(dirname, '../../docs'),
    };
    return config;
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
