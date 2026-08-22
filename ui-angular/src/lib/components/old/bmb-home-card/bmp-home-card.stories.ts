import { Meta, StoryObj } from '@storybook/angular';
import { BmbHomeCardComponent } from './bmb-home-card.component';
import {
  attributes,
  attributesText,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '@docs/utils/utils';
import {
  DBmbGenericParamDesc,
  DBmbHomeCardHeaderParamDesc,
} from '@docs/utils/parameterDescriptions';

export default {
  title: 'Components/Containers/Home card',
  component: BmbHomeCardComponent,
  parameters: {
    docs: {
      controls: {
        exclude: ['handleBack', 'handleClose', 'handleExpand'],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'home-card' })} to display a card with customizable title, subtitle, icons, navigation data, and action headers.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/home-card/descripcion-general-SzSShX4e' })}
${getSpecialSpecifications(` ### ${RELEVANT_TITLE.important}
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
    leftIcon: DBmbHomeCardHeaderParamDesc.leftIcon,
    icon: DBmbHomeCardHeaderParamDesc.icon,
    iconSize: DBmbHomeCardHeaderParamDesc.iconSize,
    bgIconAppearance: DBmbHomeCardHeaderParamDesc.bgIconAppearance,
    title: DBmbHomeCardHeaderParamDesc.title,
    subtitle: DBmbHomeCardHeaderParamDesc.subtitle,
    dataLocalNav: DBmbHomeCardHeaderParamDesc.dataLocalNav,
    actionHeaders: DBmbGenericParamDesc.actionHeaders,
    showRightButton: DBmbHomeCardHeaderParamDesc.showRightButton,
    isMobile: DBmbHomeCardHeaderParamDesc.isMobile,
    contentPadding: DBmbHomeCardHeaderParamDesc.contentPadding,
    onClose: DBmbHomeCardHeaderParamDesc.onClose,
    onBack: DBmbHomeCardHeaderParamDesc.onBack,
    test_text: {
      name: 'Text',
      description: 'Header content example.',
      table: {
        category: 'Example',
        type: { summary: 'string' },
      },
    },
    isExpanded: DBmbHomeCardHeaderParamDesc.isExpanded,
    onExpandClick: DBmbHomeCardHeaderParamDesc.onExpandClick,
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
    isExpanded: false,
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

type Story = StoryObj<BmbHomeCardComponent>;

export const Default: Story = {
  render: (args) => ({
    template: `
    <bmb-home-card
      ${attributes(args)}
    >
      <p>${attributesText(args)}</p>
    </bmb-home-card>
    `,
  }),
};
