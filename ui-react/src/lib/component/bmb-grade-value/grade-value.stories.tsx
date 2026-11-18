import type { Meta, StoryObj } from '@storybook/react-vite';
import { BmbGradeValue } from './index';

const meta: Meta<typeof BmbGradeValue> = {
  title: 'Components/Visual labels/Grade value',
  component: BmbGradeValue,
  argTypes: {
    appearanceContrast: {
      control: 'radio',
      options: ['default', 'primary', 'alternative'],
    },
    type: {
      control: 'radio',
      options: ['main-grade', 'partial-grade'],
    },
    score: {
      control: 'text',
    },
  },
  args: {
    appearanceContrast: 'default',
    type: 'main-grade',
    score: '89',
  },
};

export default meta;
type Story = StoryObj<typeof BmbGradeValue>;

export const Default: Story = {};

export const Partial: Story = {
  args: { type: 'partial-grade', score: '9' },
};
