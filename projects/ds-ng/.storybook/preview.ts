import { componentWrapperDecorator, type Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../../../documentation.json';

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
      source: {
        language: 'html',
        excludeDecorators: true,
      },
      canvas: {
        sourceState: 'shown',
      },
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
      // TODO: Check if later we can use this decorator to apply a global theme
      // componentWrapperDecorator((story) => {
      //   return `<div class="storybook-dark-theme">${story}</div><div class="storybook-light-theme">${story}</div>`;
      // }),
    ],
  },
  tags: ['autodocs'],
  // TODO: Check if later we can use this decorator to apply a global theme
  // globalTypes: {
  //   theme: {
  //     name: 'Theme',
  //     description: 'Global theme for components',
  //     defaultValue: 'light',
  //     toolbar: {
  //       icon: 'mirror',
  //       items: [
  //         { value: 'light', icon: 'circlehollow', title: 'Light Theme' },
  //         { value: 'dark', icon: 'circle', title: 'Dark Theme' },
  //       ],
  //       dynamicTitle: true,
  //     },
  //   },
  // },
};

export default preview;
