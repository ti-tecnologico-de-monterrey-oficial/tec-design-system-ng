import type { StorybookConfig } from '@storybook/angular';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    docsMode: true,
    defaultName: 'Documentation',
  },
  webpackFinal: async (config) => {
    config.plugins ||= [];
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'projects/ds-ng/src/assets/fonts',
            to: 'assets/fonts',
          },
          {
            from: 'projects/ds-ng/src/assets/images',
            to: 'assets/images',
          },
          {
            from: 'projects/ds-ng/src/assets/svg',
            to: 'assets/svg',
          },
        ],
      }),
    );

    return config;
  },
  staticDirs: ['../src/assets'],
};
export default config;
