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
      canvas: {
        sourceState: 'shown',
      },
      docs: {
        controls: {
          exclude: ['argTypes'],
        },
      },
    },
  },
};

export default preview;
