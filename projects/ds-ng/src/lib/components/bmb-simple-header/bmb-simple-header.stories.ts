import { Meta, StoryObj } from '@storybook/angular';
import { BmbSimpleHeaderComponent } from './bmb-simple-header.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  IBmbOnEvent,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  getOnClickParam,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

const onIconClickEvent: IBmbOnEvent = getOnEvent(
  'icon',
  'onIconClick',
  'unknown',
);
export default {
  title: 'Components/Visual labels/Simple header',
  component: BmbSimpleHeaderComponent,
  parameters: {
    docs: {
      controls: { exclude: ['handleClick', ''] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('simple-header')} to create a simple header with concise main information.`, 'https://bamboo.tec.mx/latest/componentes/simple-header/descripcion-general-1lYtBgiQ')}
${getBasicExampleBlock('BmbSimpleHeaderComponent', '', onIconClickEvent.handleExample)}
        `,
      },
    },
  },
  argTypes: {
    title: getPropertyParamDesc('header'),
    icon: {
      ...DBmbIconParamDesc.icon,
      description: DBmbIconParamDesc.icon.description.concat(
        'The icon is shown at right',
      ),
    },
    iconAlternativeColor: {
      control: 'boolean',
      description: 'Sets the icon color to the primary color if true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
      },
    },
    onIconClick: getOnClickParam(onIconClickEvent),
  },
  args: {
    title: 'Mis apps',
    icon: 'apps',
    iconAlternativeColor: false,
    onIconClick: () => {
      alert('On icon click');
    },
  },
} as Meta<typeof BmbSimpleHeaderComponent>;

type Story = StoryObj<BmbSimpleHeaderComponent>;

export const Default: Story = {};
