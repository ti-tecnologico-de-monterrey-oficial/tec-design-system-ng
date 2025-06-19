import type { Preview } from '@storybook/angular';
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
      controls: {
        exclude: [
          'handleChange',
          'handleKeyPress',
          'ngOnInit',
          'ngOnChanges',
          'onBlur',
          'onFocus',
        ],
      },
      source: {
        excludeDecorators: true,
      },
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        title: 'Table of Contents',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Foundations',
          'Components',
          [
            'Buttons',
            'Containers',
            [
              '*',
              'Cards',
              'Helpers',
              ['Grid generator', 'Layout', 'Layout item'],
            ],
            'Inputs',
          ],
          '*',
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
