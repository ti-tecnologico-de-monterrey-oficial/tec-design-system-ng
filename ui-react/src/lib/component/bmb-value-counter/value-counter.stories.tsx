import type { Meta, StoryObj } from '@storybook/react-vite';
import { BmbValueCounter } from './index';

const meta: Meta<typeof BmbValueCounter> = {
  title: 'Components/Visual labels/Value counter',
  component: BmbValueCounter,
  args: {
    label: 'Progreso',
    progress: '4',
    value: '10',
  },
};

export default meta;
type Story = StoryObj<typeof BmbValueCounter>;

export const Default: Story = {};

export const WithoutProgress: Story = {
  args: { label: 'Disponible', progress: '', value: 'Disponible' },
};

export const CustomSeparator: Story = {
  args: {
    label: 'Calificación',
    progress: '85',
    value: '100',
    textFormatSeparator: ' de ',
  },
};
