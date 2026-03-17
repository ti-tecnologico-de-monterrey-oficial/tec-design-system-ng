import { Meta, StoryObj } from '@storybook/angular';

import {
  colorList,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  getAppearanceParam,
  ON_BUTTON_CLICK,
} from '../../utils/doc/parameterDescriptions';
import { BmbBoxIconComponent } from './bmb-box-icon.component';

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
    boxColor: getAppearanceParam('the box icon', colorList),
  },
  args: {
    iconName: 'face',
    boxColor: 'semantic-success',
  },
} as Meta<typeof BmbBoxIconComponent>;

type Story = StoryObj<BmbBoxIconComponent>;

export const Default: Story = {};
