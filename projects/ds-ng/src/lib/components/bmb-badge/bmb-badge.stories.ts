import type { Meta, StoryObj } from '@storybook/angular';
import { BmbBadgeComponent } from './bmb-badge.component';

export default {
  title: 'Badge',
  component: BmbBadgeComponent,
  argTypes: {
    text: {
      name: 'Text',
      control: {
        type: 'text',
      },
    },
    grouped: {
      name: 'Grouped',
      control: { type: 'boolean' },
    },
    type: {
      name: 'Type',
      control: {
        type: 'radio',
      },
      options: [
        'normal',
        'strong',
        'success',
        'info',
        'warning',
        'error',
        'brand',
      ],
    },
  },
} as Meta<typeof BmbBadgeComponent>;

type Story = StoryObj<typeof BmbBadgeComponent>;

export const Default: Story = {
  args: {},
};
