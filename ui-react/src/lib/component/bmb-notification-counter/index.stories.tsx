import type { Meta, StoryObj } from '@storybook/react-vite';
import { BmbNotificationCounter } from './index';

const meta: Meta<typeof BmbNotificationCounter> = {
  title: 'Internals/Notification counter',
  component: BmbNotificationCounter,
  argTypes: {
    counter: {
      control: 'number',
    },
    appearance: {
      control: 'radio',
      options: ['notification', 'plain'],
    },
  },
  args: {
    counter: 7,
    appearance: 'notification',
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '2rem', display: 'inline-block' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BmbNotificationCounter>;

export const Default: Story = {};

export const OverIcon: Story = {
  args: { counter: 3 },
  render: (args) => (
    <BmbNotificationCounter {...args}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'var(--general-contrasts-15)',
        }}
      />
    </BmbNotificationCounter>
  ),
};

export const Capped: Story = {
  args: { counter: 125 },
};

export const Plain: Story = {
  args: { counter: 7, appearance: 'plain' },
};

export const Hidden: Story = {
  args: { counter: 0 },
};
