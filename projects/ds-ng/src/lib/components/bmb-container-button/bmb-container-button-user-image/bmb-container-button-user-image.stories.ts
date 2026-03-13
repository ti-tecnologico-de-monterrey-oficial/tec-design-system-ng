import { Meta, StoryObj } from '@storybook/angular';
import { getContainerButtonComponentDescription } from '../../../utils/doc/utils';
import {
  DBmbContainerButtonParamDesc,
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  DBmbImageParamDesc,
  getPropertyParamDesc,
} from '../../../utils/doc/parameterDescriptions';
import { BmbContainerButtonUserImageComponent } from './bmb-container-button-user-image.component';

export default {
  title: 'Components/Buttons/Container button user image',
  component: BmbContainerButtonUserImageComponent,
  parameters: {
    docs: {
      controls: {
        exclude: ['handleClick'],
      },
      description: {
        component: `
        ${getContainerButtonComponentDescription({
          selectorName: 'container-button-user-image',
          variantName: 'user image variant',
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
    rightIconName: {
      ...DBmbIconParamDesc.icon,
      description: DBmbIconParamDesc.icon.description.concat(
        '<br/>This icon will be show at the right of the container button.',
      ),
    },
    iconImageAlt: DBmbImageParamDesc.alt,
    isDisabled: DBmbGenericParamDesc.disabled,
    isError: getPropertyParamDesc('the error state of container button', {
      controlType: 'boolean',
      defaultSummary: false,
    }),
    getClickButton: DBmbContainerButtonParamDesc.getClickButton,
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
