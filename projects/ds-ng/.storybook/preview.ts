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
import docJson from '../../../documentation.json';
import { allModes } from './modes';
import {
  PREVIEW_TITLE,
  STORIES_TITLE,
  TITLE_OF_CONTROLS,
  TOC_OBJ,
} from '../src/lib/utils/doc/utils';
import { useEffect, useGlobals } from 'storybook/internal/preview-api';
import { themes } from 'storybook/theming';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    viewport: {
      options: {
        small: { name: 'Small', styles: { width: '375px', height: '568px' } },
        large: { name: 'Large', styles: { width: '1001px', height: '1024px' } },
      },
    },
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
      theme: themes.dark,
      toc: TOC_OBJ,
      page: () => {
        return [
          Title({}),
          Description({}),
          Heading({ children: PREVIEW_TITLE }),
          Primary({}),
          Heading({ children: TITLE_OF_CONTROLS }),
          Controls({}),
          Stories({ title: STORIES_TITLE, includePrimary: false }),
        ];
      },
      controls: {
        exclude: [
          'ngOnInit',
          'ngAfterContentInit',
          'ngAfterViewInit',
          'ngOnChanges',
          'ngOnDestroy',
          'isControlNull',
          'clickOutside',
          'getClasses',
          'baseClass',
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
    brandingThemes: {
      name: 'Bamboo brands',
      description: 'Bamboo brands',
      toolbar: {
        title: 'Brand',
        icon: 'grow',
        items: [
          { value: 'tec', title: 'TEC' },
          { value: 'ged', title: 'GED' },
          { value: 'tecmi', title: 'TECMI' },
        ],
        showName: true,
        dynamicTitle: true,
      },
      defaultValue: 'tec',
    },
    modes: {
      name: 'Bamboo themes',
      description: 'Bamboo themes',
      toolbar: {
        icon: 'edit',
        items: [
          { value: 'light', title: '☼ Light' },
          { value: 'dark', title: '☾ Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
      defaultValue: 'dark',
    },
  },
  initialGlobals: {
    layout: 'vertical',
    viewport: { value: 'tablet', isRotated: false },
  },
  decorators: [
    (StoryFn: any) => {
      const [{ brandingThemes, modes }] = useGlobals();

      useEffect(() => {
        document
          .querySelector('.docs-story')
          ?.setAttribute('data-brand', brandingThemes);
      }, [brandingThemes]);

      useEffect(() => {
        document.querySelector('.docs-story')?.setAttribute('data-mode', modes);
      }, [modes]);

      return StoryFn();
    },
  ],
};

export default preview;
