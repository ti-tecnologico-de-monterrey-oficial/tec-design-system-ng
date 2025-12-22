import { Meta, StoryObj } from '@storybook/angular';
import { BmbFocusElementComponent } from './bmb-focus-element.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  getDefaultValueControl,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Status indicators/Focus element',
  component: BmbFocusElementComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'getBackgroundClass',
          'getCircleClass',
          'baseClass',
          'isCurrentColor',
          'isFocused',
          'isContainerSize',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'focus-element' })} to highlight an element.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/focus-element/descripcion-general-kMjMy40y' })}
${getBasicExampleBlock('BmbFocusElementComponent')}
        `,
      },
    },
  },
  argTypes: {
    title: getPropertyParamDesc('focus element'),
    number: getPropertyParamDesc(
      'focus element',
      'number',
      0,
      `<br/><br/>
 ${RELEVANT_TITLE.important}
 The number is only considered if it does not have icon.`,
      '',
      'number',
    ),
    icon: {
      ...DBmbIconParamDesc.icon,
      description: DBmbIconParamDesc.icon.description.concat(
        `<br/><br/>${RELEVANT_TITLE.important}Do not use the number property if you want to use an icon.`,
      ),
    },
    isNonFocused: {
      control: { type: 'boolean' },
      description: 'Removes focus state when true',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    isNormal: {
      control: { type: 'boolean' },
      description: 'Sets the normal border and color',
      table: {
        category: 'Internal',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    isInheritedBg: {
      control: { type: 'boolean' },
      description: 'Sets the inherited background color when true',
      table: {
        category: 'Internal',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
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
