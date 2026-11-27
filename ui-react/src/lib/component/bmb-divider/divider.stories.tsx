import type { Meta, StoryObj } from '@storybook/react-vite';
import { BmbDivider } from './index';
import { BMB_DIVIDER_LIST, BMB_DIVIDER_ORIENTATION_LIST } from '../../_shared/types';

const meta: Meta<typeof BmbDivider> = {
  title: 'Components/Containers/Divider',
  component: BmbDivider,
  argTypes: {
    type: {
      control: 'radio',
      options: BMB_DIVIDER_LIST,
    },
    orientation: {
      control: 'radio',
      options: BMB_DIVIDER_ORIENTATION_LIST,
    },
    removeMargin: {
      control: 'boolean',
    },
  },
  args: {
    type: 'simple',
    orientation: 'horizontal',
    removeMargin: false,
  },
};

export default meta;
type Story = StoryObj<typeof BmbDivider>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};
