import type { Meta, StoryObj } from '@storybook/react-vite';
import { BmbBadge } from './bmb-badge';

const meta = {
  component: BmbBadge,
  title: 'Components/BmbBadge',
  args: {
    text: 'Nuevo',
    appearance: 'normal',
    container: true,
  },
  argTypes: {
    appearance: {
      control: 'text',
    },
    container: {
      control: 'boolean',
    },
    text: {
      control: 'text',
    },
  },
} satisfies Meta<typeof BmbBadge>;

export default meta;

type Story = StoryObj<typeof BmbBadge>;

export const Container: Story = {};

export const BulletOnly: Story = {
  args: {
    container: false,
    appearance: 'info',
    text: 'Info',
  },
};

export const WithChildren: Story = {
  args: {
    text: '',
  },
  render: (args) => <BmbBadge {...args}>En progreso</BmbBadge>,
};
