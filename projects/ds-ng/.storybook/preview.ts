import { componentWrapperDecorator, type Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../../../documentation.json";
import { themes } from 'storybook/internal/theming';
import { withThemeByClassName } from '@storybook/addon-themes';

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
      // withThemeByClassName({
      //   themes: {
      //     light: 'storybook-light-theme',
      //     dark: 'storybook-dark-theme',
      //   },
      //   defaultTheme: 'light',
      //   parentSelector: 'body',
      // }),
      componentWrapperDecorator((story) => `<div style="margin: 3em">${story}</div>`),
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
