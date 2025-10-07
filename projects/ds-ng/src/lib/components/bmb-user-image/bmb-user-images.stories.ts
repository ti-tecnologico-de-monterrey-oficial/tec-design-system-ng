import type { Meta, StoryObj } from '@storybook/angular';
import { BmbUserImageComponent } from './bmb-user-image.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbImageParamDesc,
  getDefaultValueControl,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Images/User Image',
  component: BmbUserImageComponent,
  parameters: {
    docs: {
      controls: {
        exclude: ['getClasses', 'handleClick', 'handleKeyPress', 'handlePress'],
      },
      description: {
        component: `
${getGeneralDescription({ content: `${getGeneralComponentDescription({ name: 'user-image' })} an online identity to be established.`, generalDocLink: 'https://bamboo.tec.mx/latest/componentes/user-image/descripcion-general-nwfVZScf' })}
${getBasicExampleBlock('BmbUserImageComponent')}
        `,
      },
    },
  },
  argTypes: {
    image: DBmbImageParamDesc.image,
    altImage: DBmbImageParamDesc.alt,
    size: {
      control: {
        type: 'select',
      },
      options: [
        'desktop-small',
        'desktop-large',
        'mobile-small',
        'mobile-medium',
        'mobile-large',
        'mobile-xlarge',
      ],
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description:
        'Sets the size of the user image, affecting its visual size.',
    },
    link: DBmbGenericParamDesc.linkOrButton,
    target: DBmbGenericParamDesc.target,
    bordered: {
      control: {
        type: 'boolean',
      },
      description:
        'Sets the bordered attribute draw a color border around the image when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },
    buttonClick: DBmbGenericParamDesc.onButtonClick,
    buttonPress: DBmbGenericParamDesc.onButtonPress,
    onButtonKeyPress: DBmbGenericParamDesc.onButtonKeyPress,
  },
  args: {
    image: 'https://picsum.photos/id/64/200/300',
    altImage: 'Alt image description',
    size: 'desktop-small',
    target: '_blank',
    link: 'https://www.youtube.com/',
    bordered: false,
  },
} as Meta<typeof BmbUserImageComponent>;

type Story = StoryObj<BmbUserImageComponent>;

export const Default: Story = {};
