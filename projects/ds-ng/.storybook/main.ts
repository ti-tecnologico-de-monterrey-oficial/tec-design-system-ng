import type { StorybookConfig } from '@storybook/angular';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    docsMode: process.env.STORYBOOK_DOCS_MODE === 'true',
    // docsMode: true,
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
          {
            from: 'node_modules/@material-symbols/svg-400/rounded',
            to: 'assets/icons/material-rounded',
          },
        ],
      }),
    );

    return config;
  },
  staticDirs: ['../src/assets'],
};
export default config;
