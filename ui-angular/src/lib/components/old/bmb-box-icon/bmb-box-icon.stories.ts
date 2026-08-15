import { Meta, StoryObj } from '@storybook/angular';

import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '@docs/utils/utils';
import {
  DBmbBoxIcon,
  DBmbIconParamDesc,
  ON_BUTTON_CLICK,
} from '@docs/utils/parameterDescriptions';
import { BmbBoxIconComponent } from './bmb-box-icon.component';

export default {
  title: 'Dev tools/Box icon',
  component: BmbBoxIconComponent,
  parameters: {
    docs: {
      controls: {
        exclude: ['handleClick', 'getClasses', 'handleImageNotFoundError'],
      },
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
    boxColor: DBmbBoxIcon.boxColor,
    boxShape: DBmbBoxIcon.boxShape,
    boxSize: DBmbBoxIcon.boxSize,
    imageNotFoundError: DBmbIconParamDesc.imageNotFoundError,
  },
  args: {
    iconName: 'face',
    boxColor: 'semantic-success',
    boxShape: 'square',
    boxSize: 'small',
  },
} as Meta<typeof BmbBoxIconComponent>;

type Story = StoryObj<BmbBoxIconComponent>;

export const Default: Story = {};

export const Circle: Story = {
  args: {
    boxShape: 'circle',
    boxColor: 'black-primary',
  },
};

/*

export const AllColors = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: row; gap: 12px; flex-wrap: wrap;">
        @for (appearance of appearances; track $index) {
          <bmb-box-icon
            [boxColor]="appearance"
            [iconName]="'home'"
            [title]="appearance"
          />
        }
      </div>
    `,
    props: {
      appearances: colorList,
      iconList: ['face', 'apps', 'chevron_right', 'chevron_left', 'home'],
    },
  }),
  parameters: {
    docs: {
      canvas: {
        sourceState: 'none',
      },
    },
  },
};

*/
