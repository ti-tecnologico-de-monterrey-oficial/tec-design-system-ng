import type { Meta, StoryObj } from '@storybook/angular';
import { BmbContainerComponent } from './bmb-container.component';

export default {
  title: 'Container',
  component: BmbContainerComponent,
  argTypes: {
    appearance: {
      name: 'Appearance',
      control: {
        type: 'radio',
      },
      options: ['section', 'button', 'contrast', 'primary', 'secondary'],
      table: {
        type: { summary: 'string' },
      },
      description:
        'The appearance of the container, affecting its visual style.',
    },
  },
  args: {
    appearance: 'button',
  },
} as Meta<typeof BmbContainerComponent>;

type Story = StoryObj<BmbContainerComponent>;

export const Default: Story = {};
