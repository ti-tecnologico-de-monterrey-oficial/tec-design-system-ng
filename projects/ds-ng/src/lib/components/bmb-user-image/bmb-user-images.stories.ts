import type { Meta, StoryObj } from '@storybook/angular';
import { BmbUserImageComponent } from './bmb-user-image.component';

export default {
  title: 'User Image',
  component: BmbUserImageComponent,
  argTypes: {
    image: {
      name: 'Image source',
      control: {
        type: 'text',
      },
    },
    altImage: {
      name: 'Image alt text',
      control: {
        type: 'text',
      },
    },
    size: {
      name: 'Size',
      control: {
        type: 'radio',
      },
      options: [
        'desktop-small',
        'desktop-large',
        'mobile-small',
        'mobile-medium',
        'mobile-large',
        'mobile-xlarge',
      ],
    },
  },
} as Meta<typeof BmbUserImageComponent>;

type Story = StoryObj<typeof BmbUserImageComponent>;

export const Default: Story = {
  args: {},
};
