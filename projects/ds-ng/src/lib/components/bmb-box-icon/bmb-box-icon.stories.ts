import { Meta, StoryObj } from '@storybook/angular';

import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  getAppearanceParam,
  ON_BUTTON_CLICK,
} from '../../utils/doc/parameterDescriptions';
import {
  BmbBoxIconComponent,
  IBmbBoxIconAppearance,
} from './bmb-box-icon.component';

const boxColorOptions: IBmbBoxIconAppearance[] = [
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
  title: 'Dev tools/Box icon',
  component: BmbBoxIconComponent,
  parameters: {
    docs: {
      controls: { exclude: ['handleClick', 'getClasses'] },
      description: {
        component: `
${getGeneralDescription(
  getGeneralComponentDescription({
    name: 'box-icon',
    type: 'element',
    alternativeDescription:
      'to implement an icon contained in a box with different background colors.',
  }),
)}
${getBasicExampleBlock('BmbBoxIconComponent', ON_BUTTON_CLICK.handleExample)}
        `,
      },
    },
  },
  argTypes: {
    iconName: DBmbIconParamDesc.icon,
    iconImageAlt: DBmbIconParamDesc.alt,
    isIconFilled: DBmbIconParamDesc.isIconFill,
    boxColor: getAppearanceParam('the box icon', boxColorOptions),
  },
  args: {
    iconName: 'face',
    boxColor: 'creative_sepia',
  },
} as Meta<typeof BmbBoxIconComponent>;

type Story = StoryObj<BmbBoxIconComponent>;

export const Default: Story = {};
