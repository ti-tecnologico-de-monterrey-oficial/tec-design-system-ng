import type { Meta, StoryObj } from '@storybook/react-vite';
import { BmbLegend } from './index';

const appearanceOptions = [
  'normal',
  'strong',
  'success',
  'info',
  'warning',
  'error',
  'brand',
  'empty',
];

const meta: Meta<typeof BmbLegend> = {
  title: 'Components/Visual labels/Legend',
  component: BmbLegend,
  argTypes: {
    indicatorAppearance: {
      control: 'select',
      options: appearanceOptions,
    },
  },
  args: {
    label: 'Title',
    value: '$0.00',
    indicatorAppearance: 'normal',
  },
};

export default meta;
type Story = StoryObj<typeof BmbLegend>;

export const Default: Story = {};

export const Success: Story = {
  args: { indicatorAppearance: 'success', value: '$120.00' },
};

export const Error: Story = {
  args: { indicatorAppearance: 'error', value: '-$10.00' },
};

export const AllAppearances: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {appearanceOptions.map((appearance) => (
        <BmbLegend
          key={appearance}
          label={appearance}
          value="$0.00"
          indicatorAppearance={appearance}
        />
      ))}
    </div>
  ),
};
