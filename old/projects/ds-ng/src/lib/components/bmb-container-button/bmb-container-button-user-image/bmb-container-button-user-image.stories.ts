import { Meta, StoryObj } from '@storybook/angular';
import { getContainerButtonComponentDescription } from '../../../utils/doc/utils';
import {
  DBmbContainerButton,
  DBmbGenericParamDesc,
  DBmbImageParamDesc,
  getPropertyParamDesc,
} from '../../../utils/doc/parameterDescriptions';
import { BmbContainerButtonUserImageComponent } from './bmb-container-button-user-image.component';

export default {
  title: 'Components/Buttons/Container button/User',
  component: BmbContainerButtonUserImageComponent,
  tags: ['!autodocs'],
  parameters: {
    docs: {
      controls: {
        exclude: ['handleClick'],
      },
      description: {
        component: `
        ${getContainerButtonComponentDescription({
          selectorName: 'user-image',
          variantName: 'user image',
          componentName: 'BmbContainerButtonUserImageComponent',
        })}
        `,
      },
    },
  },
  argTypes: {
    avatarURL: DBmbImageParamDesc.image,
    avatarAlt: DBmbImageParamDesc.alt,
    fullName: getPropertyParamDesc('the container button', {
      alternativePropName: 'user full name',
    }),
    email: getPropertyParamDesc('the container button', {
      alternativePropName: 'user email',
    }),
    rightIconName: DBmbContainerButton.rightIconName,
    iconImageAlt: DBmbImageParamDesc.alt,
    isDisabled: DBmbGenericParamDesc.disabled,
    isError: DBmbContainerButton.isError,
    getClickButton: DBmbContainerButton.getClickButton,
  },
  args: {
    avatarURL: 'https://picsum.photos/id/64/200/300',
    avatarAlt: 'Alt image description',
    fullName: 'Ana María Gutiérrez Pineda',
    email: 'email@email.com',
    rightIconName: '',
    iconImageAlt: '',
    isDisabled: false,
    isError: false,
    getClickButton: () => {
      console.log('Container button clicked');
    },
  },
} as Meta<typeof BmbContainerButtonUserImageComponent>;

type Story = StoryObj<BmbContainerButtonUserImageComponent>;

export const Default: Story = {};
