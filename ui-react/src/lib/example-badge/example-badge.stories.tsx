import type { Meta, StoryObj } from '@storybook/react';
import { ExampleBadge } from './example-badge';

const meta: Meta<typeof ExampleBadge> = {
  title: 'Components/Example Badge',
  component: ExampleBadge,
  args: {
    text: 'Badge text',
    appearance: 'normal',
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['normal', 'success', 'warning', 'error'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ExampleBadge>;

export const Default: Story = {};

export const Success: Story = {
  args: { appearance: 'success' },
};

export const Warning: Story = {
  args: { appearance: 'warning' },
};

export const Error: Story = {
  args: { appearance: 'error' },
};
