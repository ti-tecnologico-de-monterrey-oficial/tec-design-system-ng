import type { Meta, StoryObj } from '@storybook/angular';
import { BmbTitleSectionComponent } from './bmb-title-section.component';

export default {
  title: 'Title Section',
  component: BmbTitleSectionComponent,
  argTypes: {
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'The title of the section.',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the image attribute if you want to use an icon.',
      table: {
        type: { summary: 'string' },
      },
    },
    image: {
      name: 'Image Source',
      control: {
        type: 'text',
      },
      description:
        'The source of the image you want to display, either from your application or a URL. Do not use the icon attribute if you want to use an image.',
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
  },
  args: {
    title: 'Title Section',
    icon: 'search',
    image:
      'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    altImage: 'Alt image description',
  },
} as Meta<typeof BmbTitleSectionComponent>;

type Story = StoryObj<BmbTitleSectionComponent>;

export const Default: Story = {};
