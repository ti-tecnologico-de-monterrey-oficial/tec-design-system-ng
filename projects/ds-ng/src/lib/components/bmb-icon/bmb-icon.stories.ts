import type { Meta, StoryObj } from '@storybook/angular';
import { BmbIconComponent } from './bmb-icon.component';

export default {
  title: 'Icon',
  component: BmbIconComponent,
  argTypes: {
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    icon: 'face',
  },
} as Meta<typeof BmbIconComponent>;

type Story = StoryObj<BmbIconComponent>;

export const Default: Story = {};
