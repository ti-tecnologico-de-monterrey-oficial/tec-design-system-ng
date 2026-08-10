import { Meta, StoryObj } from '@storybook/angular';
import { BmbIconComponent } from './bmb-icon.component';

export default {
  title: 'Components/Icon',
  component: BmbIconComponent,
  args: {
    icon: 'bmb_android',
    size: 16,
    isFill: true,
  },
} as Meta<typeof BmbIconComponent>;

type Story = StoryObj<BmbIconComponent>;

export const Default: Story = {};
