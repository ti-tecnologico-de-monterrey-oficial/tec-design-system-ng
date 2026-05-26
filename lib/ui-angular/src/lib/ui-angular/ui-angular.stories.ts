import type { Meta, StoryObj } from '@storybook/angular';
import { UiAngular } from './ui-angular';

const meta: Meta<UiAngular> = {
  component: UiAngular,
  title: 'UiAngular',
};
export default meta;

type Story = StoryObj<UiAngular>;

export const Primary: Story = {
  args: {
  },
};
