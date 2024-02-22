import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbInteractiveIconComponent } from './bmb-interactive-icon.component';

export default {
  title: 'Interactive Icon',
  component: BmbInteractiveIconComponent,
  decorators: [
    moduleMetadata({
      declarations: [BmbIconComponent],
    }),
  ],
  argTypes: {
    text: {
      name: 'Text',
      control: {
        type: 'text',
      },
      description: 'The text of the interactive icon.',
      table: {
        type: { summary: 'string' },
      },
    },
    grouped: {
      name: 'Grouped',
      control: { type: 'boolean' },
      description:
        'When set to true, it groups multiple interactive icons into a parent element. By default, it is false, and you do not need to explicitly set it. The badge should always have a parent element.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
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
        'The source of the image to display. Do not use the icon attribute if you want to use an image.',
      table: {
        type: { summary: 'string' },
      },
    },
    appearance: {
      name: 'Appearance',
      control: {
        type: 'radio',
      },
      options: ['red', 'blue', 'green', 'yellow', 'purple'],
      description:
        'The appearance of the interactive icon, affecting its visual style.',
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
    text: 'Canvas',
    appearance: 'red',
    icon: 'face',
    image: '',
    grouped: false,
    altImage: 'Alt image description',
  },
} as Meta<typeof BmbInteractiveIconComponent>;

type Story = StoryObj<BmbInteractiveIconComponent>;

export const Default: Story = {};
