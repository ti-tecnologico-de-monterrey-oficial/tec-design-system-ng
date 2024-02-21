import type { Meta, StoryObj } from '@storybook/angular';
import { BmbContainerComponent } from './bmb-container.component';

export default {
  title: 'Container',
  component: BmbContainerComponent,
  argTypes: {
    type: {
      name: 'Type',
      control: {
        type: 'radio',
      },
      options: ['section', 'button', 'contrast', 'primary', 'secondary'],
      table: {
        type: { summary: 'string' },
      },
      description: 'The type of the container, visual changes.',
    },
  },
  args: {
    type: 'button',
  },
} as Meta<typeof BmbContainerComponent>;

type Story = StoryObj<BmbContainerComponent>;

export const Default: Story = {};
