import { Meta, StoryObj } from '@storybook/angular';
import { BmbFocusElementComponent } from './bmb-focus-element.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  RELEVANT_TITLE_LEVEL,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Status indicators/Focus element',
  component: BmbFocusElementComponent,
  parameters: {
    docs: {
      controls: {
        exclude: ['getBackgroundClass', 'getCircleClass', 'baseClass'],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('focus-element')} to highlight an element.`, 'https://bamboo.tec.mx/latest/componentes/focus-element/descripcion-general-kMjMy40y')}
${getBasicExampleBlock('BmbFocusElementComponent')}
        `,
      },
    },
  },
  argTypes: {
    title: getPropertyParamDesc('focus element'),
    number: {
      control: {
        type: 'text',
      },
      description: `Sets the number of the focus element.<br/><br/>
${RELEVANT_TITLE_LEVEL[1]}
The number is only considered if it does not have icon.`,
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    icon: {
      ...DBmbIconParamDesc.icon,
      description: DBmbIconParamDesc.icon.description.concat(
        `<br/><br/>${RELEVANT_TITLE_LEVEL[1]}Do not use the number property if you want to use an icon.`,
      ),
    },
    isNonFocused: {
      control: { type: 'boolean' },
      description: 'Removes focus state when true',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean (optional)' },
      },
    },
    isNormal: {
      control: { type: 'boolean' },
      description: 'Sets the normal border and color',
      table: {
        category: 'Internal',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean (optional)' },
      },
    },
    isInheritedBg: {
      control: { type: 'boolean' },
      description: 'Sets the inherited background color when true',
      table: {
        category: 'Internal',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean (optional)' },
      },
    },
  },
  args: {
    title: 'Title',
    icon: 'close',
    number: '',
    isNonFocused: false,
    isNormal: false,
    isInheritedBg: false,
  },
} as Meta<typeof BmbFocusElementComponent>;

type Story = StoryObj<BmbFocusElementComponent>;

export const Default: Story = {};
