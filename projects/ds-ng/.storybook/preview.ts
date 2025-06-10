import { componentWrapperDecorator, type Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../../../documentation.json';
import { themes } from 'storybook/internal/theming';
import { withThemeByClassName } from '@storybook/addon-themes';
import { withCustomLayout } from './addon/bambooLayout';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      source: { language: 'html' },
      canvas: {
        sourceState: 'shown',
      },
      // themes: [
      //   themes.light,
      //   themes.dark,
      // ]
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Foundations',
          'Micro Componentes',
          'Macro Componentes',
          'Internal',
        ],
        locales: 'en-US',
      },
    },
    decorators: [
      // componentWrapperDecorator((story) => {
      //   return `<div class="storybook-dark-theme">${story}</div><div class="storybook-light-theme">${story}</div>`;
      // }),
      componentWrapperDecorator((parent) => {
        console.log('Decorator called with parent:', parent);
        debugger;

        return `<div class="zeeck">${parent}</div>`;
      }),
    ],
  },
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light Theme' },
          { value: 'dark', icon: 'circle', title: 'Dark Theme' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
