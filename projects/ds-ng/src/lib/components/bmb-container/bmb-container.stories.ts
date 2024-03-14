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
      options: [
        'primary-container',
        'primary-home',
        'primary-header',
        'secondary-container',
        'contrast-box-container',
        'button-container',
      ],
      table: {
        type: { summary: 'string' },
      },
      description:
        'The appearance of the container, affecting its visual style.',
    },
  },
  args: {
    appearance: 'primary-container',
  },
} as Meta<typeof BmbContainerComponent>;

type Story = StoryObj<BmbContainerComponent>;

export const Default: Story = {};
