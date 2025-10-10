import { Meta, StoryObj } from '@storybook/angular';
import {
  BmbInteractiveIconComponent,
  IBmbInteractiveIconAppearance,
} from './bmb-interactive-icon.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  getAppearanceParam,
  getDefaultValueControl,
  ON_BUTTON_CLICK,
} from '../../utils/doc/parameterDescriptions';

const interactiveIconAppearanceOptions: IBmbInteractiveIconAppearance[] = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'mitec_blue',
  'mitec_red',
  'mitec_green',
  'mitec_orange',
  'mitec_light_green',
  'mitec_purple',
  'creative_violet',
  'creative_indigo',
  'creative_emerald',
  'creative_licorice',
  'creative_darkteal',
  'creative_peach',
  'creative_sepia',
  'creative_softred',
  'creative_wattle',
  'creative_shipcove',
  'creative_plantation',
  'creative_rum',
  'creative_hibiscus',
  'creative_ripelemon',
  'buttons-primary-normal',
  'purple-primary',
  'general_contrasts-main-selection',
  'general_contrasts-main-selection-alternative',
];

export default {
  title: 'Components/Buttons/Interactive icon',
  component: BmbInteractiveIconComponent,
  parameters: {
    docs: {
      controls: { exclude: ['handleClick', 'getClasses'] },
      description: {
        component: `
${getGeneralDescription(
  getGeneralComponentDescription({
    name: 'interactive-icon',
    type: 'component',
    alternativeDescription:
      'that provides the functionality to be used as a shortcut to other applications in an orderly and intuitive manner.',
  }),
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/interactive-icon/descripcion-general-wYrX6Nhj',
  },
)}
${getBasicExampleBlock('BmbInteractiveIconComponent', ON_BUTTON_CLICK.handleExample)}
        `,
      },
    },
  },
  argTypes: {
    appearanceContrast: getAppearanceParam(
      'contrast to be applied to the interactive icon',
      ['default', 'primary', 'alternative'],
      'default',
    ),
    dotNotification: DBmbIconParamDesc.iconDotNotification,
    title: {
      control: {
        type: 'text',
      },
      description: 'Sets the title of the interactive icon.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Sets the description of the interactive icon.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    icon: {
      ...DBmbIconParamDesc.icon,
      table: {
        ...DBmbIconParamDesc.icon.table,
        defaultValue: getDefaultValueControl('face'),
      },
    },
    appearance: getAppearanceParam(
      'the interactive icon',
      interactiveIconAppearanceOptions,
      'red',
    ),
    link: DBmbGenericParamDesc.linkOrButton,
    target: DBmbGenericParamDesc.target,
    horizontal: {
      control: { type: 'boolean' },
      description:
        'Sets the horizontal orientation when true. This property is effective when you want to include a description with a horizontal orientation.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    layout: {
      control: {
        type: 'select',
      },
      options: ['regular', 'button', 'app_drawer'],
      description: 'Sets the layout behavior.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    setButtonTemplate: DBmbGenericParamDesc.deprecated,
    buttonClick: DBmbGenericParamDesc.onButtonClick,
  },
  args: {
    appearanceContrast: 'default',
    title: 'Canvas',
    description: 'Short Description',
    appearance: 'red',
    icon: 'face',
    target: '_blank',
    link: 'https://www.youtube.com/',
    horizontal: false,
    layout: 'regular',
    setButtonTemplate: false,
    buttonClick: () => {
      console.info('buttonClick');
    },
  },
} as Meta<typeof BmbInteractiveIconComponent>;

type Story = StoryObj<BmbInteractiveIconComponent>;

export const Default: Story = {};
