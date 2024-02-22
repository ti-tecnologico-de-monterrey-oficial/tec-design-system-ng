import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbToastComponent } from './bmb-toast.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export default {
  title: 'Toast',
  component: BmbToastComponent,
  decorators: [
    moduleMetadata({
      declarations: [BmbIconComponent],
    }),
  ],
  argTypes: {
    message: {
      name: 'Message',
      control: {
        type: 'text',
      },
      description: 'The message content of the toast.',
      table: {
        type: { summary: 'string' },
      },
    },
    appearance: {
      name: 'Appearance',
      control: {
        type: 'radio',
      },
      options: [
        'neutral',
        'primary',
        'successful',
        'warning',
        'error',
        'event',
      ],
      description: 'The visual appearance style of the toast.',
      table: {
        type: { summary: 'string' },
      },
    },
    duration: {
      name: 'Duration (ms)',
      control: {
        type: 'number',
      },
      description: 'The duration of the toast in milliseconds.',
      table: {
        type: { summary: 'string' },
      },
    },
    position: {
      name: 'Position',
      control: {
        type: 'radio',
      },
      options: ['top', 'bottom', 'middle'],
      description: 'The position on the screen where the toast will appear.',
      table: {
        type: { summary: 'string' },
      },
    },
    isOpen$: {
      name: 'Is Open',
      control: { type: 'boolean' },
      description: 'Controls the visibility state of the toast.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    message: 'Your toast text here',
    appearance: 'neutral',
    duration: 5000,
    position: 'top',
    isOpen$: false,
  },
} as Meta<typeof BmbToastComponent>;

type Story = StoryObj<BmbToastComponent>;

export const Default: Story = {};
