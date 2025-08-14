import { Meta, StoryObj } from '@storybook/angular';
import { BmbBottomNavigationBarComponent } from './bmb-bottom-navigation-bar.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';
import { getOnClickParam } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Menus/Bottom navigation bar',
  component: BmbBottomNavigationBarComponent,
  parameters: {
    controls: {
      exclude: ['actionHeaders', 'buildElement', 'onNavigationBarOptionClick'],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('bottom-navigation-bar')} for a bottom navigation bar with four customizable icons.`, 'https://bamboo.tec.mx/latest/componentes/bottom-navigation-bar/descripcion-general-eeQGlgdA')}
${getBasicExampleBlock('BmbBottomNavigationBarComponent')}
        `,
      },
    },
  },
  argTypes: {
    navigationBarIcons: {
      control: {
        type: 'IBmbNavigationBarIcons',
      },
      description: 'Navigation icons.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'Icons: back, forward, share, reload.' },
        type: {
          summary: 'IBmbNavigationBarIcons',
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
      },
    },
    navigationBarEvents: getOnClickParam(
      getOnEvent(
        'back, forward, share, and reload',
        'navigationBarEvents',
        'IBmbFooterEvent',
      ),
      ``,
    ),
  },
  args: {
    navigationBarIcons: {
      one: { name: 'home', label: '' },
      two: { name: 'share', label: '' },
      three: { name: 'inventory_2', label: '' },
      four: { name: 'send', label: '' },
    },
    navigationBarEvents: (event: unknown) => {
      alert('Selection: ' + event);
    },
  },
} as Meta<typeof BmbBottomNavigationBarComponent>;

type Story = StoryObj<BmbBottomNavigationBarComponent>;

export const Default: Story = {};
