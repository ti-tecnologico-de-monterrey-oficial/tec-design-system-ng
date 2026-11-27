import type { Meta, StoryObj } from '@storybook/react-vite';
import { BmbBadge } from './index';

const appearanceOptions = [
  'normal',
  'strong',
  'success',
  'info',
  'warning',
  'error',
  'brand',
  'alert',
  'background',
  'disabled',
];

const meta: Meta<typeof BmbBadge> = {
  title: 'Components/Visual labels/Badge',
  component: BmbBadge,
  argTypes: {
    appearance: {
      control: 'select',
      options: appearanceOptions,
    },
    container: {
      control: 'boolean',
    },
  },
  args: {
    text: 'Badge text',
    appearance: 'normal',
    container: true,
  },
};

export default meta;
type Story = StoryObj<typeof BmbBadge>;

export const Default: Story = {};

export const Bullet: Story = {
  args: { container: false },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {appearanceOptions.map((appearance) => (
        <BmbBadge key={appearance} appearance={appearance} text={appearance} />
      ))}
    </div>
  ),
};

export const AllColorsBullet: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {appearanceOptions.map((appearance) => (
        <BmbBadge
          key={appearance}
          appearance={appearance}
          text={appearance}
          container={false}
        />
      ))}
    </div>
  ),
};
