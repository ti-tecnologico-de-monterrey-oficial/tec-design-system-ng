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
      options: ['s', 'l'],
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
      options: ['ext', 'fab'],
      description: 'The type of the fab component',
      table: {
        type: { summary: 'string' },
      },
    },
    device: {
      name: 'Size',
      control: {
        type: 'radio',
      },
      options: ['mobile', 'desktop'],
      description: 'The style of the fab',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    icon: 'add',
    text: 'FAB',
    size: 's',
    type: 'ext',
    device: 'mobile',
  },
} as Meta<typeof BmbFabComponent>;

type Story = StoryObj<BmbFabComponent>;

export const Default: Story = {};
