import { Meta, StoryObj } from '@storybook/angular';
import { BmbThemeComponent } from './bmb-theme.component';
import {
  DESIGN_SYSTEM_TITLE,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import {
  getLabelDescription,
  InputParameterDescriptions,
} from '../../utils/doc/parameterDescriptions';

const labelDescription = getLabelDescription('left to', 'theme')
  .replace('the label', 'one of the labels')
  .replace('what the theme', 'what');
export default {
  title: 'Foundations/Theme',
  component: BmbThemeComponent,
  parameters: {
    controls: {
      exclude: [
        'applyTheme',
        'calculateTheme',
        'onThemeChange',
        'initialized',
        'selectedTheme',
        'service',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `
***Theme*** refers to a preset set of shapes, colors, and decorations that customize the appearance of visual elements.<br/><br/>
${getGeneralComponentDescription('theme', 'element')} the selection of a dark or light ${DESIGN_SYSTEM_TITLE} theme.`,
  'https://bamboo.tec.mx/latest/foundations/temas/descripcion-general-SdKD7j96',
)}
${getSpecialSpecifications('The selected theme is saved in local storage. If you select a theme other than the initial one and refresh the page, the theme from local storage will be used.<br/><br/>The ***light*** theme is the default option')}
<br/>
${getBasicExampleBlock('BmbThemeComponent')}
        `,
      },
    },
  },
  argTypes: {
    leftText: {
      ...InputParameterDescriptions.label,
      description: labelDescription,
    },
    rightText: {
      ...InputParameterDescriptions.label,
      description: labelDescription.replace('left', 'right'),
    },
    initialTheme: {
      control: {
        type: 'radio',
      },
      options: ['light', 'dark'],
      description: 'Sets the initial theme for the component.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'light' },
        type: { summary: 'string' },
      },
    },
    showControls: {
      control: { type: 'boolean' },
      description: 'Shows the theme control',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    leftIcon: InputParameterDescriptions.deprecated,
    rightIcon: InputParameterDescriptions.deprecated,
  },
  args: {
    initialTheme: 'light',
    leftText: '',
    rightText: '',
    showControls: false,
  },
} as Meta<typeof BmbThemeComponent>;

type Story = StoryObj<BmbThemeComponent>;

export const Default: Story = {};
