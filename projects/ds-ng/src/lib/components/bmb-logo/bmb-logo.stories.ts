import type { Meta, StoryObj } from '@storybook/angular';
import { BmbLogoComponent } from './bmb-logo.component';

export default {
  title: 'Logotipos',
  component: BmbLogoComponent,
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
      options: ['small', 'medium', 'large'],
      table: {
        type: { summary: 'string' },
      },
      description: 'The size of the logo, visual changes.',
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
