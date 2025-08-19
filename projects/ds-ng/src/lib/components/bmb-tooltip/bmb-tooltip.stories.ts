import {
  componentWrapperDecorator,
  moduleMetadata,
  StoryFn,
  type Meta,
} from '@storybook/angular';
import { BmbTooltipComponent } from './bmb-tooltip.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  DBmbTooltipParamDesc,
  getDefaultValueControl,
  getPropertyParamDesc,
  SIMPLE_ICON_DESCRIPTION,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Status indicators/ToolTip',
  component: BmbTooltipComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent],
    }),
    componentWrapperDecorator((story: string) => {
      return `
        <div style="height: 500px; display: flex; justify-content: center; align-items: center;">
          ${story}
        </div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('tooltip')} to provide additional, brief information about the element's purpose.`, 'https://bamboo.tec.mx/latest/componentes/tooltip/descripcion-general-Y5OcIrFr')}
${getBasicExampleBlock('')}
        `,
      },
    },
  },
  argTypes: {
    title: getPropertyParamDesc('tooltip'),
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
    align: DBmbTooltipParamDesc.align,
    justify: DBmbTooltipParamDesc.justify,
  },
  args: {
    title: 'Titulo del tooltip',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nihil modi repellendus ad aspernatur corporis.',
    icon: 'help',
    size: 40,
    isFill: true,
    align: 'right',
    justify: 'centered',
  },
} as Meta<typeof BmbIconComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <bmb-tooltip
      ${attributes(args)}
    />
  `,
});

export const Default = customizable();
