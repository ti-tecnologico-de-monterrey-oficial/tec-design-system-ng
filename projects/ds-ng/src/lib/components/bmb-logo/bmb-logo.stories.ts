import type { Meta, StoryObj } from '@storybook/angular';
import { BmbLogoComponent } from './bmb-logo.component';

export default {
  title: 'Logotipos',
  component: BmbLogoComponent,
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
      options: ['small', 'medium', 'large'],
      description: 'The size of the logo, affecting its visual size.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    image:
      'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    altImage: 'Alt image description',
    size: 'small',
  },
} as Meta<typeof BmbLogoComponent>;

type Story = StoryObj<BmbLogoComponent>;

export const Default: Story = {};
