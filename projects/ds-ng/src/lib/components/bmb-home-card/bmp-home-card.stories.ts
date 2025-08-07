import { Meta, StoryFn } from '@storybook/angular';
import { BmbHomeCardComponent } from './bmb-home-card.component';
import {
  attributes,
  attributesText,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Containers/Home card',
  component: BmbHomeCardComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'handleBack',
          'handleClose',
          'handleExpand',
          'isExpanded',
          'useAutoExpand',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('home-card')} to display a card with customizable title, subtitle, icons, navigation data, and action headers.`, 'https://bamboo.tec.mx/latest/componentes/home-card/descripcion-general-SzSShX4e')}
${getSpecialSpecifications(` ### ‼︎Important:
***Home card*** component **is not a modal**, therefore it should not be used as such.
`)}
${getBasicExampleBlock(
  'BmbHomeCardComponent',
  '',
  `//This block of code is only necessary for cases where local navigation is required.
    dataLocalNav: IBmbDataTopBar[] = [
      { text: 'Breadcrumb 1', link: '/' },
      { text: 'Breadcrumb 2', link: '/emprendedor' },
      { text: 'Breadcrumb 3', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 4', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 5', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 6', link: '/emprendedor/vivencia' },
    ]`,
)}
        `,
      },
    },
  },
  argTypes: {
    leftIcon: {
      ...DBmbIconParamDesc.icon,
      description: DBmbIconParamDesc.icon.description.replace(
        'icon',
        'left header icon',
      ),
      table: {
        ...DBmbIconParamDesc.icon.table,
        type: {
          summary:
            DBmbIconParamDesc.icon.table.type.summary.concat(' (optional)'),
        },
      },
    },
    icon: {
      ...DBmbIconParamDesc.icon,
      table: {
        ...DBmbIconParamDesc.icon.table,
        type: {
          summary:
            DBmbIconParamDesc.icon.table.type.summary.concat(' (optional)'),
        },
      },
    },
    iconSize: DBmbIconParamDesc.iconSize,
    bgIconAppearance: {
      control: { type: 'text' },
      description: 'Sets icon background color.',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbColor (optional)',
          detail: `IBmbColor =
  | 'mariner-50'
  | 'mariner-100'
  | 'mariner-200'
  | 'mariner-300'
  | 'mariner-400'
  | 'mariner-500'
  | 'mariner-700'
  | 'mariner-800'
  | 'mariner-900'
  | 'mariner-950'
  | 'charade-50'
  | 'charade-100'
  | 'charade-200'
  | 'charade-300'
  | 'charade-500'
  | 'charade-600'
  | 'charade-700'
  | 'charade-800'
  | 'charade-900'
  | 'charade-950'
  | 'white-primary'
  | 'blue-tec'
  | 'mitec-blue'
  | 'mitec-green'
  | 'mitec-red'
  | 'mitec-orange'
  | 'black-primary'
  | 'black-light'
  | 'black-tint'
  | 'black-min'
  | 'white-light'
  | 'white-tint'
  | 'white-min'
  | 'neon-primary'
  | 'neon-light'
  | 'neon-tint'
  | 'blue-primary'
  | 'blue-light'
  | 'blue-tint'
  | 'green-primary'
  | 'green-light'
  | 'green-tint'
  | 'purple-primary'
  | 'purple-light'
  | 'purple-tint'
  | 'red-primary'
  | 'red-light'
  | 'red-tint'
  | 'yellow-primary'
  | 'yellow-light'
  | 'yellow-tint'
  | 'teal-primary'
  | 'teal-light'
  | 'teal-tint'
  | 'container-home'
  | 'container-secondary'
  | 'container-button'
  | 'background-main'
  | 'container-home-light'
  | 'container-secondary-light'
  | 'container-button-light'
  | 'background-main-light'
  | 'container-home-tec'
  | 'container-secondary-tec'
  | 'container-button-tec'
  | 'background-main-tec';
`,
        },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Sets he main title of the home card.',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Sets card subtitle',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    dataLocalNav: {
      control: { type: 'object' },
      description: 'Sets the array of breadcrumb data for Local Navigation.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: {
          summary: 'IBmbDataTopBar[] (optional)',
          detail: `IBmbDataTopBar {
  text: string;
  link?: string;
}`,
        },
      },
    },
    actionHeaders: {
      control: { type: 'object' },
      description: 'Sets an array of IBmbActionHeader objects.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: {
          summary: 'IBmbActionHeader[] (optional)',
          detail: `
IBmbActionHeader {
  icon: string;
  alt?: string;
  iconSize?: number;
  iconActiveToggle?: string;
  isToggleActive?: boolean;
  isAccentColor?: boolean;
  link?: string;
  target?: IBmbTargetLink;
  action: () => void;
}

IBmbTargetLink = '_blank' | '_parent' | '_self' | '_top';
          `,
        },
      },
    },
    showRightButton: {
      control: { type: 'boolean' },
      description:
        'Sets a flag to indicate whether the card should show the right button or buttons.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    isMobile: {
      control: { type: 'boolean' },
      description:
        'Sets a flag to indicate whether the card should adapt to mobile view.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    contentPadding: {
      control: { type: 'text' },
      description:
        "Sets the he padding size for the card's content. Uses predefined size names (e.g., 'xs','s','m','l','xl','none','auto')",
      table: {
        category: 'Properties',
        defaultValue: { summary: 'l' },
        type: {
          summary: 'SizeNames (optional)',
          detail: `SizeNames = 'xs' | 's' | 'm' | 'l' | 'xl' | 'none' | 'auto'`,
        },
      },
    },
    onClose: getOnClickParam(getOnEvent('close icon (x)', 'onClose')),
    onBack: getOnClickParam(getOnEvent('left icon (<)', 'onBack')),
    test_text: {
      name: 'Text',
      description: 'Header content example.',
      table: {
        category: 'Example',
        type: { summary: 'string' },
      },
    },
    onExpandClick: getOnClickParam(
      getOnEvent('expand or collapse icon', 'onExpandClick'),
      '. This should be used as a navigation action.',
    ),
  },
  args: {
    leftIcon: 'chevron_left',
    icon: 'account_balance_wallet',
    bgIconAppearance: 'green-light',
    title: 'Title',
    subtitle: 'Subtitle',
    dataLocalNav: [],
    actionHeaders: [],
    showRightButton: true,
    isMobile: false,
    test_text: 'hello world',
    onExpandClick: () => {
      console.log('Expand button clicked');
    },
    onClose: () => {
      console.log('Close button clicked');
    },
    onBack: () => {
      console.log('Back button clicked');
    },
  },
} as Meta<typeof BmbHomeCardComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <bmb-home-card
      ${attributes(args)}
    >
      <p>${attributesText(args)}</p>
    </bmb-home-card>
  `,
});

export const Default = customizable();
