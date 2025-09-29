import { Meta, StoryObj } from '@storybook/angular';
import { BmbSwitchComponent } from './bmb-switch.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  IBmbOnEvent,
  RELEVANT_TITLE_LEVEL,
} from '../../utils/doc/utils';
import {
  GOOGLE_FONTS_LINK,
  DBmbInputParamDesc,
  getOnEventParam,
  getDefaultValueControl,
} from '../../utils/doc/parameterDescriptions';

const getIndex = (isRightPosition: boolean): number =>
  isRightPosition ? 0 : 1;

const getLabelIconDescription = (
  isRightPosition: boolean,
  isLabel: boolean,
): string => {
  const type: string[] = ['label', 'icon'];
  const position: string[] = ['right', 'left'];
  const switchDescription: string[] = ['of', 'on'];
  return `Sets the ${type[getIndex(isLabel)]} displayed on the ${position[getIndex(isRightPosition)]} side of the switch.<br/><br/>
  Useful to indicate the action or state associated with the ***${switchDescription[getIndex(isRightPosition)]}*** position.<br/><br/>
  ${RELEVANT_TITLE_LEVEL[1]}
  Do not use the \`${position[getIndex(!isRightPosition)]}Icon\` property if you want to use \`${position[getIndex(isRightPosition)]}Text.\``;
};
const onChange: IBmbOnEvent = getOnEvent('switch', 'change', 'boolean');

export default {
  title: 'Components/Inputs/Switch',
  component: BmbSwitchComponent,
  parameters: {
    controls: {
      exclude: [
        'getSwitchIcon',
        'handleChange',
        'handleKeyDown',
        'showSwitchLabel',
        'nextId',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'switch' })} to represent in a simple way whether a configuration is active or not.`, 'https://bamboo.tec.mx/latest/componentes/switch/descripcion-general-6aOUHs0C')}
${getBasicExampleBlock('BmbSwitchComponent', '', onChange.handleExample)}
        `,
      },
    },
  },
  argTypes: {
    leftText: {
      control: {
        type: 'text',
      },
      description: getLabelIconDescription(false, true),
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    leftIcon: {
      control: { type: 'text' },
      description: `${getLabelIconDescription(false, false)}<br/><br/>${GOOGLE_FONTS_LINK}`,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    rightText: {
      control: {
        type: 'text',
      },
      description: getLabelIconDescription(true, true),
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    rightIcon: {
      control: { type: 'text' },
      description: `${getLabelIconDescription(true, false)}<br/><br/>${GOOGLE_FONTS_LINK}`,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    inputId: DBmbInputParamDesc.inputId,
    id: DBmbInputParamDesc.id,
    isChecked: {
      control: { type: 'boolean' },
      description:
        'Determines whether the switch is in the "on" (true) or "off" (false) position.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    disabled: DBmbInputParamDesc.disabled,
    change: getOnEventParam(
      onChange,
      ` This can be used to react to changes in the switch's position.`,
    ),
    ariaLabel: DBmbInputParamDesc.ariaLabel,
    name: DBmbInputParamDesc.name,
    control: DBmbInputParamDesc.control,
  },
  args: {
    inputId: 'testId',
    name: 'testName',
    leftText: 'Light',
    rightText: 'Dark',
    leftIcon: '',
    rightIcon: '',
    isChecked: false,
    disabled: false,
    ariaLabel: 'Describe the button function here',
    change: () => {
      console.info('Checkbox clicked');
    },
  },
} as Meta<typeof BmbSwitchComponent>;

type Story = StoryObj<BmbSwitchComponent>;

export const TextExample: Story = {};

export const IconExample = {
  args: {
    leftText: '',
    rightText: '',
    leftIcon: 'light_mode',
    rightIcon: 'dark_mode',
  },
};

export const CheckedExample = {
  args: {
    isChecked: true,
  },
};

export const DisabledExample = {
  args: {
    disabled: true,
  },
};
