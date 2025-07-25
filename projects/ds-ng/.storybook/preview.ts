import type { Preview } from '@storybook/angular';
import {
  Controls,
  Description,
  Heading,
  Primary,
  Title,
  Stories,
} from '@storybook/addon-docs/blocks';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { withThemeByClassName } from '@storybook/addon-themes';
import docJson from '../../../documentation.json';
import { allModes } from './modes';
import {
  STORIES_TITLE,
  TITLE_OF_CONTROLS,
  TOC_OBJ,
} from '../src/lib/utils/doc/utils';

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
      name: 'Properties',
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: TOC_OBJ,
      page: () => {
        return [
          Title({}),
          Description({}),
          Primary({}),
          Heading({ children: TITLE_OF_CONTROLS }),
          Controls({}),
          Stories({ title: STORIES_TITLE, includePrimary: false }),
        ];
      },
      controls: {
        exclude: [
          'ngOnInit',
          'ngOnChanges',
          'ngAfterViewInit',
          'isControlNull',
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
          ['*', 'Layouts', 'System elements'],
          'Components',
          ['*', 'Dev tools'],
          '*',
          'Particularities',
          ['*', 'mitec web', ['*', 'Landings']],
          'Templates',
          'Dev tools',
          'Internals',
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
