import type { Meta, StoryObj } from '@storybook/angular';
import { BmbUserImageComponent } from './bmb-user-image.component';

export default {
  title: 'User Image',
  component: BmbUserImageComponent,
  argTypes: {
    image: {
      name: 'Image Source',
      control: {
        type: 'text',
      },
      description:
        'The source of the image to display, either from your application or a URL.',
      table: {
        type: { summary: 'string' },
      },
    },
    altImage: {
      name: 'Image Alt Text',
      control: {
        type: 'text',
      },
      description:
        'The alternative text for the image. Refer to https://www.w3.org/WAI/alt/ for more information.',
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
      description: 'The size of the user image, affecting its visual size.',
    },
    link: {
      name: 'Link',
      control: {
        type: 'text',
      },
      description: 'The link for redirection to another page.',
      table: {
        type: { summary: 'string' },
      },
    },
    target: {
      name: 'Target',
      control: {
        type: 'radio',
      },
      options: ['_blank', '_self', '_parent', '_top'],
      description:
        'The target attribute for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    image:
      'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    altImage: 'Alt image description',
    size: 'desktop-small',
    target: '_blank',
    link: 'https://www.youtube.com/',
  },
} as Meta<typeof BmbUserImageComponent>;

type Story = StoryObj<BmbUserImageComponent>;

export const Default: Story = {};
