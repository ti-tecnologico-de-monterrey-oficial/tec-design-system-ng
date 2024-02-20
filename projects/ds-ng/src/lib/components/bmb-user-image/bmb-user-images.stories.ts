import type { Meta, StoryObj } from '@storybook/angular';
import { BmbUserImageComponent } from './bmb-user-image.component';

interface BmbUserImageProps {
  image: string;
  altImage: string;
  size: string;
}

export default {
  title: 'User Image',
  component: BmbUserImageComponent,
  argTypes: {
    image: {
      name: 'Image source',
      control: {
        type: 'text',
      },
      description:
        'The source of the image you want to display can be in your application or in a URL.',
      table: {
        type: { summary: 'string' },
      },
    },
    altImage: {
      name: 'Image alt text',
      control: {
        type: 'text',
      },
      description:
        'The alternative text of image. For more information yoy can take a look at this page: https://www.w3.org/WAI/alt/.',
      table: {
        type: { summary: 'string' },
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
      table: {
        type: { summary: 'string' },
      },
      description: 'The size of the user image, visual changes.',
    },
  },
  args: {
    image:
      'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    altImage: 'Alt image description',
    size: 'desktop-small',
  },
} as Meta<typeof BmbUserImageComponent>;

type Story = StoryObj<BmbUserImageProps>;

export const Default: Story = {};
