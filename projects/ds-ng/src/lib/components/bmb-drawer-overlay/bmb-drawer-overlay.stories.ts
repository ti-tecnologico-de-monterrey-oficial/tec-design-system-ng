import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbDrawerOverlayComponent } from './bmb-drawer-overlay.component';
import { CommonModule } from '@angular/common';
import { BmbFabComponent } from '../bmb-fab/bmb-fab.component';
import { BmbInteractiveIconComponent } from '../bmb-interactive-icon/bmb-interactive-icon.component';
import { BmbInnerHeaderComponent } from '../bmb-inner-header/bmb-inner-header.component';
import { BmbTabsComponent } from '../bmb-tabs/bmb-tabs.component';

export default {
  title: 'Micro Componentes/Drawer Overlay',
  component: BmbDrawerOverlayComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BmbFabComponent,
        BmbInteractiveIconComponent,
        BmbInnerHeaderComponent,
        BmbTabsComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The \`BmbDrawerOverlayComponent\` is an interactive overlay that includes an app menu and a header. Here is an example of how to use it in TypeScript:

\`\`\`typescript
import { BmbDrawerOverlayComponent } from '@your-library';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbDrawerOverlayComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`
`,
      },
    },
  },
  argTypes: {
    menu: {
      name: 'Menu Items',
      control: { type: 'object' },
      description: 'Array of objects representing the menu items.',
      table: {
        category: 'Properties',
        type: { summary: 'Array' },
      },
    },
    title: {
      name: 'Title',
      control: { type: 'text' },
      description: 'Title displayed in the inner header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    dataSearch: {
      name: 'Data Search',
      control: { type: 'array' },
      description: 'Array of strings for search data in the inner header.',
      table: {
        category: 'Properties',
        type: { summary: 'Array' },
      },
    },
    tabs: {
      name: 'Tabs',
      control: { type: 'array' },
      description: 'Array of objects representing the tabs.',
      table: {
        category: 'Properties',
        type: { summary: 'Array' },
      },
    },
    appServices: {
      name: 'App Services',
      control: { type: 'object' },
      description: 'Map of arrays of apps organized by index.',
      table: {
        category: 'Properties',
        type: { summary: 'Object' },
      },
    },
  },
} as Meta<BmbDrawerOverlayComponent>;

type Story = StoryObj<BmbDrawerOverlayComponent>;

export const Default: Story = {
  args: {
    menu: [
      {
        appearance: 'red',
        title: 'App 1',
        icon: 'https://img.freepik.com/premium-vector/approved-icon-with-thumb-up-approved-label-quality-control_349999-1321.jpg?w=2000',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'App 2',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'green',
        title: 'App 3',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'Menú de servicios',
        icon: 'lists',
        setButtonTemplate: true,
        buttonClick: () => {
          console.log('Button clicked!');
        },
      },
    ],
    title: 'Inner Header',
    dataSearch: ['Search Item 1', 'Search Item 2', 'Search Item 3'],
    tabs: [
      { title: 'Tab 1', id: 0 },
      { title: 'Tab 2', id: 1 },
      { title: 'Tab 3', id: 2 },
    ],
    appServices: {
      0: [
        {
          appearance: 'red',
          title: 'App 1',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'blue',
          title: 'App 2',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
      ],
      1: [
        {
          appearance: 'green',
          title: 'App 3',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'yellow',
          title: 'App 4',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
      ],
      2: [
        {
          appearance: 'green',
          title: 'App 5',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'yellow',
          title: 'App 6',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
      ],
    },
  },
};
