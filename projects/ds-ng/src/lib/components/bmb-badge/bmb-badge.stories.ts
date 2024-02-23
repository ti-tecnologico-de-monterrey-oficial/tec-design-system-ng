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
      description:
        'The text of the badge. The width will increase depending on the length of the text.',
      table: {
        type: { summary: 'string' },
      },
    },
    grouped: {
      name: 'Grouped',
      control: { type: 'boolean' },
      description:
        'When set to true, it groups multiple badges into a parent element. By default, it is false, and you do not need to explicitly set it. The badge should always have a parent element.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    appearance: {
      name: 'Appearance',
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
      table: {
        type: { summary: 'string' },
      },
      description: 'The appearance of the badge, affecting its visual style.',
    },
  },
  args: {
    text: 'Badge text',
    appearance: 'normal',
    grouped: false,
  },
} as Meta<typeof BmbBadgeComponent>;

type Story = StoryObj<BmbBadgeComponent>;

export const Default: Story = {};
