// .storybook/preview.ts

import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/angular';

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
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Foundations', 'Micro Componentes', 'Macro Componentes'],
        locales: 'en-US',
      },
    }
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'storybook-light-theme',
        dark: 'storybook-dark-theme',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
