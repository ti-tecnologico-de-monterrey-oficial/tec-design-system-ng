/* eslint-disable @typescript-eslint/no-non-null-assertion*/
import { Meta, StoryObj } from '@storybook/angular';
import { BmbHomeCardHeaderComponent } from './bmb-home-card-header.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  getTechnicalDocReferences,
} from '@docs/utils/utils';
import {
  DBmbGenericParamDesc,
  DBmbHomeCardHeaderParamDesc,
} from '@docs/utils/parameterDescriptions';
import * as actionHeader from '../../bmb-navigation-bar/bmp-navigation-bar.stories';
import * as actionIcon from '../../bmb-action-icon/bmp-action-icon.stories';

export default {
  title: 'Dev tools/Home card header',
  component: BmbHomeCardHeaderComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          // 'handleBack',
        ],
      },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({
    name: 'home-card header',
  })} Header section, showing title, subtitle, local navigation and action headers.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/home-card/descripcion-general-SzSShX4e',
  },
)}
${getSpecialSpecifications(
  `
${getTechnicalDocReferences({
  references: [
    { title: actionHeader.default.title! },
    { title: actionIcon.default.title! },
  ],
})}
  `,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock('BmbHomeCardHeaderComponent')}
        `,
      },
    },
  },
  argTypes: {
    leftIcon: DBmbHomeCardHeaderParamDesc.leftIcon,
    icon: DBmbHomeCardHeaderParamDesc.icon,
    iconSize: DBmbHomeCardHeaderParamDesc.iconSize,
    bgIconAppearance: DBmbHomeCardHeaderParamDesc.bgIconAppearance,
    componentTitle: {
      ...DBmbHomeCardHeaderParamDesc.title,
      name: 'componentTitle',
    },
    title: DBmbGenericParamDesc.deprecated,
    subtitle: DBmbHomeCardHeaderParamDesc.subtitle,
    dataLocalNav: DBmbHomeCardHeaderParamDesc.dataLocalNav,
    actionHeaders: DBmbGenericParamDesc.actionHeaders,
    showRightButton: DBmbHomeCardHeaderParamDesc.showRightButton,
    isMobile: DBmbHomeCardHeaderParamDesc.isMobile,
    isExpanded: DBmbHomeCardHeaderParamDesc.isExpanded,
    onClose: DBmbHomeCardHeaderParamDesc.onClose,
    onBack: DBmbHomeCardHeaderParamDesc.onBack,
    onExpandClick: DBmbHomeCardHeaderParamDesc.onExpandClick,
    showExpandAndCollapseButton: {
      title: 'Show expand and collapse button',
      description:
        'If true, the expand and collapse button will be shown. If false, it will be hidden.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
      control: { type: 'boolean' },
    },
  },
  args: {
    leftIcon: 'chevron_left',
    icon: 'account_balance_wallet',
    bgIconAppearance: 'green-light',
    componentTitle: 'Header title',
    subtitle: 'Subtitle',
    dataLocalNav: [],
    actionHeaders: [
      {
        icon: 'edit',
        alt: 'Edit',
      },
      {
        icon: 'delete',
        alt: 'Delete',
      },
      {
        icon: 'info',
        alt: 'Info',
      },
    ],
    showRightButton: true,
    isMobile: false,
    isExpanded: false,
    showExpandAndCollapseButton: true,
    onExpandClick: () => console.log('Expand clicked'),
    onClose: () => console.log('Close clicked'),
    onBack: () => console.log('Back clicked'),
  },
} as Meta<typeof BmbHomeCardHeaderComponent>;

type Story = StoryObj<BmbHomeCardHeaderComponent>;

export const Default: Story = {};
