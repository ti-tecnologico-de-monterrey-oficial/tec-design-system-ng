import type { Meta, StoryObj } from '@storybook/react-vite';
import { BmbSkeleton } from './index';

const meta: Meta<typeof BmbSkeleton> = {
  title: 'Dev tools/Skeleton',
  component: BmbSkeleton,
  argTypes: {
    type: {
      control: 'select',
      options: ['header', 'input', 'stray', 'generic1', 'generic2', 'generic3'],
    },
  },
  args: {
    type: 'header',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BmbSkeleton>;

export const Header: Story = {};

export const Input: Story = {
  args: { type: 'input' },
};

export const Stray: Story = {
  args: { type: 'stray' },
};

export const Generic1: Story = {
  args: { type: 'generic1' },
};

export const Generic2: Story = {
  args: { type: 'generic2' },
};

export const Generic3: Story = {
  args: { type: 'generic3' },
};
