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
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'simple-header' })} to create a simple header with concise main information.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/simple-header/descripcion-general-1lYtBgiQ' })}
${getBasicExampleBlock('BmbSimpleHeaderComponent', '', onIconClickEvent.handleExample)}
        `,
      },
    },
  },
  argTypes: {
    componentTitle: getPropertyParamDesc('header'),
    icon: {
      ...DBmbIconParamDesc.icon,
      description: DBmbIconParamDesc.icon.description.concat(
        'The icon is shown at right',
      ),
    },
    iconAlternativeColor: getPropertyParamDesc(
      'primary color on the icon',
      'boolean',
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
    onIconClick: getOnClickParam(onIconClickEvent),
  },
  args: {
    componentTitle: 'Mis apps',
    icon: 'apps',
    iconAlternativeColor: false,
    onIconClick: () => {
      console.log('On icon click');
    },
  },
} as Meta<typeof BmbSimpleHeaderComponent>;

type Story = StoryObj<BmbSimpleHeaderComponent>;

export const Default: Story = {};
