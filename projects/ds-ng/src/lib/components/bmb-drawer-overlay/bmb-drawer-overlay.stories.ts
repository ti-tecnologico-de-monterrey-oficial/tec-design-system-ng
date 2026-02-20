import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { BmbDrawerOverlayComponent } from './bmb-drawer-overlay.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  getTECParticularitiesMessage,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  getOnClickParam,
  getOnEventParam,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Particularities/mitec app/FAB Overlay drawer',
  component: BmbDrawerOverlayComponent,
  tags: ['tec'],
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `
        <div style="height: 35rem">
          ${story}
        </div>`;
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'activeNavItemIndex',
          'isFull',
          'isOpen',
          'handleValueChange',
          'selectNavItem',
          'toggleDrawer',
          'toggleFullDrawer',
          'closeDrawer',
          'onEsc',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'drawer-overlay', type: 'element' })} to implement an interactive overlay in addition to an application menu and header.`, { generalDocLink: 'https://bamboo.tec.mx/latest/particularities/mitec-app/fab-overlay-drawer-11JEvoAR' })}
${getSpecialSpecifications(getTECParticularitiesMessage(), {
  showAdditionalBlockquote: true,
})}
${getBasicExampleBlock('BmbDrawerOverlayComponent')}
`,
      },
    },
  },
  argTypes: {
    menu: {
      control: { type: 'object' },
      description: 'Sets the data of the menu items.',
      table: {
        category: 'Properties',
        defaultValue: {
          summary: '[]',
          detail: `
${RELEVANT_TITLE.example}
[
  {
    appearance: 'red',
    title: 'App 1',
    icon: 'https://img.freepik.com/premium-vector/approved-icon-with-thumb-up-approved-label-quality-control_349999-1321.jpg?w=2000',
    target: '_blank',
    link: 'https://www.example.com/',
  },
  {
    appearance: 'blue',
    title: 'App 2',
    icon: 'face',
    target: '_blank',
    link: 'https://www.example.com/',
  },
  {
    appearance: 'green',
    title: 'App 3',
    icon: 'face',
    target: '_blank',
    link: 'https://www.example.com/',
  },
  {
    appearance: 'blue',
    title: 'Menú de servicios',
    icon: 'lists',
    buttonClick: () => {
      console.log('Button clicked!');
    },
  },
]
        `,
        },
        type: { summary: 'any - []' },
      },
    },
    componentTitle: getPropertyParamDesc(
      'inner header. This will be shown on whether of the menu item (`menu` property)',
    ),
    dataSearch: {
      control: { type: 'array' },
      description: 'Sets the value list for search data in the inner header.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: { summary: 'string[]' },
      },
    },
    tabs: {
      control: { type: 'object' },
      description: 'Sets the data of the tabs.',
      table: {
        category: 'Properties',
        defaultValue: {
          summary: '[]',
          detail: `
${RELEVANT_TITLE.example}
[
  { title: 'Tab 1', id: 0 },
  { title: 'Tab 2', id: 1 },
  { title: 'Tab 3', id: 2 },
],
        `,
        },
        type: {
          summary: 'IBmbTab[]',
          detail: `
IBmbTab {
  id: number;
  title: string;
  isActive?: boolean;
  badge?: number;
  isMobile?: boolean;
  isDesktop?: boolean;
}
          `,
        },
      },
    },
    appServices: {
      control: { type: 'object' },
      description: 'Sets the data of apps, must be organized by index.',
      table: {
        category: 'Properties',
        defaultValue: {
          summary: '{}',
          detail: `
${RELEVANT_TITLE.example}
{
  '0': [
    {
      appearance: 'red',
      title: 'App 1',
      icon: 'face',
      target: '_blank',
      link: 'https://www.example.com/',
    },
    {
      appearance: 'blue',
      title: 'App 2',
      icon: 'face',
      target: '_blank',
      link: 'https://www.example.com/',
    },
  ],
  '1': [
    {
      appearance: 'green',
      title: 'App 3',
      icon: 'face',
      target: '_blank',
      link: 'https://www.example.com/',
    },
    {
      appearance: 'yellow',
      title: 'App 4',
      icon: 'face',
      target: '_blank',
      link: 'https://www.example.com/',
    },
  ],
  '2': [
    {
      appearance: 'green',
      title: 'App 5',
      icon: 'face',
      target: '_blank',
      link: 'https://www.example.com/',
    },
    {
      appearance: 'yellow',
      title: 'App 6',
      icon: 'face',
      target: '_blank',
      link: 'https://www.example.com/',
    },
  ],
}
          `,
        },
        type: {
          summary: '{ index: IBmbApp[] }',
          detail: `
{ [key: number]: IBmbApp[] }

IBmbApp {
  icon: string;
  title: string;
  link?: string;
  target?: IBmbTargetLink;
  appearance: IBmbInteractiveIconAppearance;
  callbackParam?: any;
}

IBmbTargetLink = '_blank' | '_parent' | '_self' | '_top';

IBmbInteractiveIconAppearance =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'none'
  | 'mitec_blue'
  | 'mitec_red'
  | 'mitec_green'
  | 'mitec_orange'
  | 'mitec_light_green'
  | 'mitec_purple'
  | 'creative_violet'
  | 'creative_indigo'
  | 'creative_emerald'
  | 'creative_licorice'
  | 'creative_darkteal'
  | 'creative_peach'
  | 'creative_sepia'
  | 'creative_softred'
  | 'creative_wattle'
  | 'creative_shipcove'
  | 'creative_plantation'
  | 'creative_rum'
  | 'creative_hibiscus'
  | 'creative_ripelemon'
  | 'buttons-primary-normal'
  | 'purple-primary'
  | 'general_contrasts-main-selection'
  | 'general_contrasts-main-selection-alternative';
        `,
        },
      },
    },
    buttonClick: getOnClickParam(
      getOnEvent('***interactive menu icon***', 'buttonClick'),
    ),
    onValueChange: getOnEventParam(
      getOnEvent('the value of the search field', 'onValueChange', 'string'),
    ),
    title: {
      control: null,
      description:
        'Please use `componentTitle` instead of `title` to set the component title.',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
        defaultValue: '',
      },
    },
  },
  args: {
    menu: [
      {
        appearance: 'red',
        title: 'App 1',
        icon: 'https://img.freepik.com/premium-vector/approved-icon-with-thumb-up-approved-label-quality-control_349999-1321.jpg?w=2000',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'App 2',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'green',
        title: 'App 3',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'Menú de servicios',
        icon: 'lists',
        buttonClick: () => {
          console.log('Button clicked!');
        },
      },
    ],
    componentTitle: 'Inner Header',
    dataSearch: ['Search Item 1', 'Search Item 2', 'Search Item 3'],
    tabs: [
      { title: 'Tab 1', id: 0 },
      { title: 'Tab 2', id: 1 },
      { title: 'Tab 3', id: 2 },
    ],
    appServices: {
      '0': [
        {
          appearance: 'red',
          title: 'App 1',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'blue',
          title: 'App 2',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
      ],
      '1': [
        {
          appearance: 'green',
          title: 'App 3',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'yellow',
          title: 'App 4',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
      ],
      '2': [
        {
          appearance: 'green',
          title: 'App 5',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'yellow',
          title: 'App 6',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
      ],
    },
  },
} as Meta<typeof BmbDrawerOverlayComponent>;

type Story = StoryObj<BmbDrawerOverlayComponent>;

export const Default: Story = {};
