import { componentWrapperDecorator, type Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../../../documentation.json";

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
      componentWrapperDecorator((story) => `<div style="margin: 3em">${story}</div>`)
    ]
  },
  tags: ['autodocs']
};

export default preview;
