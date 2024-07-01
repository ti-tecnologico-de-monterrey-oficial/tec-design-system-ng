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
        category: 'Properties',
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
        category: 'Properties',
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
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    type: {
      name: 'Type',
      control: {
        type: 'radio',
      },
      options: ['extended', 'normal'],
      description: 'The type of the fab component',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    onFabClick: {
      name: 'On Fab Click',
      control: {
        type: '',
      },
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
      description: 'Emits when the fab button is clicked.',
    },
  },
  args: {
    icon: 'add',
    text: 'FAB',
    size: 'small',
    type: 'extended',
    onFabClick: (params: any) => {
      window.alert(params.toString());
    },
  },
} as Meta<typeof BmbFabComponent>;

type Story = StoryObj<BmbFabComponent>;

export const Default: Story = {};
