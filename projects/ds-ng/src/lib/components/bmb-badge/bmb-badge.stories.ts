import type { Meta, StoryObj } from '@storybook/angular';
import { BmbBadgeComponent } from './bmb-badge.component';

interface BmbBadgeProps {
  text: string;
  grouped: boolean;
  type: string;
}

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
        'The text of the badge. Width will increase depending of the text.',
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
      table: {
        type: { summary: 'string' },
      },
      description: 'The type of the badge, visual changes.',
    },
  },
  args: {
    text: 'Badge text',
    type: 'normal',
    grouped: false,
  },
} as Meta<typeof BmbBadgeComponent>;

type Story = StoryObj<BmbBadgeProps>;

export const Default: Story = {};
