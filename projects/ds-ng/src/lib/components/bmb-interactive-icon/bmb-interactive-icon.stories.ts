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
        "This attribute is used to group all badges into a parent element. By default it is false and you don't need to add it. But if you need it you always have to add it inside a div element.",
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use the Material icons: https://fonts.google.com/icons. You should not use image prop if you are using icon.',
      table: {
        type: { summary: 'string' },
      },
    },
    image: {
      name: 'Image source',
      control: {
        type: 'text',
      },
      description:
        'The source of the image you want to display can be in your application or in a URL. You should not use icon if you are using image.',
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
      description: 'The appearance of the button, visual changes.',
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
  },
} as Meta<typeof BmbInteractiveIconComponent>;

type Story = StoryObj<BmbInteractiveIconComponent>;

export const Default: Story = {};
