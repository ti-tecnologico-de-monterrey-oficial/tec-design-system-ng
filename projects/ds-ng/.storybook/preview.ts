import { componentWrapperDecorator, type Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../../../documentation.json';
import { withThemeByClassName } from '@storybook/addon-themes';
import { allModes } from './modes';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    ally: {
      context: 'body',
      config: {},
      options: {},
    },
    chromatic: {
      modes: {
        light: allModes['light'],
        dark: allModes['dark'],
      },
    },
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
  },
  tags: ['autodocs'],
  globalTypes: {
    a11y: {
      manual: true,
    },
    // layout: {
    //   description: 'Set the layout orientation of the story',
    //   toolbar: {
    //     title: 'Layout orientation',
    //     icon: 'paintbrush',
    //     items: [
    //       { value: 'vertical', icon: 'stacked', title: 'Vertical' },
    //       { value: 'horizontal', icon: 'sidebyside', title: 'Horizontal' },
    //     ],
    //   },
    // },
  },
  initialGlobals: {
    layout: 'vertical',
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'storybook-light-theme',
        dark: 'storybook-dark-theme',
        // both: 'storybook-both-theme',
      },
      defaultTheme: 'dark',
    }),
    // TODO: Remove this when the Storybook don't have issues with the duplicated component
//      componentWrapperDecorator((story: string) => `
// <section id="storybook-theme-selector" [class]="theme">
//   <div class="storybook-light-theme">
//     ${story}
//   </div>
//   <div class="storybook-dark-theme">
//     ${story}
//   </div>
// </section>`,
//       ({ globals }) => { theme: globals['theme'] }),
  ],
};

export default preview;
