import { Meta, StoryObj } from '@storybook/angular';
import { BmbExternalLinkComponent } from './bmb-external-link.component';
import {
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  IBmbOnEvent,
} from '../../utils/doc/utils';
import {
  getDefaultValueControl,
  getOnClickParam,
  getOnEventParam,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Organisms/Access to external link',
  component: BmbExternalLinkComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'getMenuItems',
          'getSubtitleIcon',
          'handleClose',
          'handleCloseMenu',
          'handleOpenMenu',
          'onFooterOptionClick',
          'onMenuOptionClick',
          'showMenu',
          '',
        ],
      },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'external-link', type: 'organism' })} to integrate links that lead to resources or pages outside of the main website or application.`,
  'https://bamboo.tec.mx/latest/organismos/access-to-external-link/descripcion-general-JFCWgYI5',
)}
${getSpecialSpecifications(getEmptyStateMessage())}
${getBasicExampleBlock('BmbExternalLinkComponent')}
        `,
      },
    },
  },
  argTypes: {
    title: getPropertyParamDesc('header'),
    subtitle: getPropertyParamDesc('header', 'text', '', '', '', 'subtitle'),
    navigationBarIcons: {
      control: {
        type: 'object',
      },
      description: 'Sets the configuration for the navigation bar icons.',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbNavigationBarIcons (optional)',
          detail: `
IBmbNavigationBarIcons = {
  one: IBmbNavigationBarIcon;
  two: IBmbNavigationBarIcon;
  three: IBmbNavigationBarIcon;
  four: IBmbNavigationBarIcon;
}

IBmbNavigationBarIcon = {
  name: string;
  label: string;
  eventName?: IBmbFooterEvent;
  dotNotification?: number;
}

IBmbFooterEvent = 'back' | 'forward' | 'share' | 'reload'

        `,
        },
        defaultValue: getDefaultValueControl(`
{
one: { name: 'arrow_back_ios', label: '' },
two: { name: 'arrow_forward_ios', label: '' },
three: { name: 'share', label: '' },
four: { name: 'refresh', label: '' },
}
        `),
      },
    },
    onClose: getOnClickParam(getOnEvent('close icon', 'onClose'), ``),
    menuEvent: getOnEventParam(
      getOnEvent('', 'menuEvent', 'IBmbNavigationBarIcon'),
      'when one of the menu option is selected',
      'other',
    ),
    footerEvent: getOnClickParam(
      getOnEvent('one of the footer icon', 'footerEvent', 'IBmbFooterEvent'),
      ``,
    ),
  },
  args: {
    title: 'CONECTA',
    subtitle: 'https://www.CONECTA.tec.mx',
    navigationBarIcons: {
      one: { name: 'arrow_back_ios', label: '' },
      two: { name: 'arrow_forward_ios', label: '' },
      three: { name: 'share', label: '' },
      four: { name: 'refresh', label: '' },
    },
    onClose: () => {
      console.log('Close button clicked in Storybook');
    },
    menuEvent: (event: unknown) => {
      console.log('Menu selection: ' + event + ' in Storybook');
    },
    footerEvent: (event: unknown) => {
      console.log('Footer selection: ' + event + ' in Storybook');
    },
  },
} as Meta<typeof BmbExternalLinkComponent>;

type Story = StoryObj<BmbExternalLinkComponent>;

export const Default: Story = {};
