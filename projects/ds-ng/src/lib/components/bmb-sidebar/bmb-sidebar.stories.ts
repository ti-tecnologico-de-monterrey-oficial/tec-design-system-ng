import type { Meta, StoryObj } from '@storybook/angular';
import { BmbSidebarComponent } from './bmb-sidebar.component';

export default {
  title: 'Micro Componentes/Sidebar',
  component: BmbSidebarComponent,
  argTypes: {
    elements: {
      name: 'Elements',
      control: {
        type: '',
      },
      description: 'Array of elements to show in the sidebar, every element must contain the icon, the title and the link',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    elements: [
        {
            icon: 'apps',
            title: 'Titulo 1',
            link: '#'
        },
        {
            icon: 'apps',
            title: 'Titulo 2',
            link: '#'
        },
    ],
  },
} as Meta<typeof BmbSidebarComponent>;

type Story = StoryObj<BmbSidebarComponent>;

export const Default: Story = {};