import type { Meta, StoryObj } from '@storybook/angular';
import { BmbFabComponent } from './bmb-fab.component';

export default {
  title: 'Micro Componentes/Fab',
  component: BmbFabComponent,
  argTypes: {
    icon: {
      name: 'Icon',
      control: {
        type: 'text',
      },
      description: 'The name of the icon. See Material Icons.',
      table: {
        type: { summary: 'string' },
      },
    },
    text: {
      name: 'Text',
      control: {
        type: 'text',
      },
      description:
        'The text of the Extended Fab. The width will increase depending on the length of the text.',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      name: 'Size',
      control: {
        type: 'radio',
      },
      options: ['small', 'large'],
      description: 'The size of the fab component',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      name: 'Size',
      control: {
        type: 'radio',
      },
      options: ['extended', 'normal'],
      description: 'The type of the fab component',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    icon: 'add',
    text: 'FAB',
    size: 'small',
    type: 'extended',
  },
} as Meta<typeof BmbFabComponent>;

type Story = StoryObj<BmbFabComponent>;

export const Default: Story = {};
