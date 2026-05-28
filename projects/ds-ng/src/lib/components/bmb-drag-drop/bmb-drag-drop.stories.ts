import { Meta, StoryObj } from '@storybook/angular';

import { BmbDragDropComponent } from './bmb-drag-drop.component';

const meta: Meta<BmbDragDropComponent> = {
  title: 'Components/Drag Drop',
  component: BmbDragDropComponent,
  tags: ['!autodocs']
};

export default meta;

type Story = StoryObj<BmbDragDropComponent>;

export const Default: Story = {};