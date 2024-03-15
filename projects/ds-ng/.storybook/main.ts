import type { StorybookConfig } from '@storybook/angular';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: true,
    docsMode: true,
    defaultName: 'Documentation',
  },
  webpackFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          { from: 'projects/ds-ng/src/assets/fonts', to: 'assets/fonts' },
        ],
      })
    );

    return config;
  },
};

export default config;
