import { StoryObj, type Meta } from '@storybook/angular';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  DBmbTooltipParamDesc,
  getDefaultValueControl,
  getPropertyParamDesc,
  SIMPLE_ICON_DESCRIPTION,
} from '../../utils/doc/parameterDescriptions';
import { BmbTooltipComponent } from './bmb-tooltip.component';

export default {
  title: 'Components/Status indicators/ToolTip',
  component: BmbTooltipComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'tooltip' })} to provide additional, brief information about the element's purpose.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/tooltip/descripcion-general-Y5OcIrFr' })}
${getBasicExampleBlock('BmbTooltipComponent')}
        `,
      },
    },
  },
  argTypes: {
    componentTitle: getPropertyParamDesc('tooltip'),
    text: DBmbTooltipParamDesc.text,
    icon: {
      control: {
        type: 'text',
      },
      description: SIMPLE_ICON_DESCRIPTION,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl('help'),
      },
    },
    size: DBmbIconParamDesc.iconSize,
    isFill: DBmbIconParamDesc.isIconFill,
    align: DBmbGenericParamDesc.deprecated,
    justify: DBmbGenericParamDesc.deprecated,
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
    componentTitle: 'Tooltip title',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nihil modi repellendus ad aspernatur corporis.',
    icon: 'help',
    size: 40,
    isFill: true,
  },
} as Meta<typeof BmbTooltipComponent>;

type Story = StoryObj<BmbTooltipComponent>;

export const Default: Story = {};
