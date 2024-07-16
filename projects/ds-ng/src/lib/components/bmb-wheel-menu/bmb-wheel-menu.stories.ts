import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbWheelMenuComponent } from './bmb-wheel-menu.component';
import { CommonModule } from '@angular/common';
import { BmbFabComponent } from '../bmb-fab/bmb-fab.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbInnerHeaderComponent } from '../bmb-inner-header/bmb-inner-header.component';
import { BmbTabsComponent } from '../bmb-tabs/bmb-tabs.component';
import { BmbInteractiveIconComponent } from '../bmb-interactive-icon/bmb-interactive-icon.component';

export default {
  title: 'Macro Componentes/Wheel Menu',
  component: BmbWheelMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BmbFabComponent,
        BmbIconComponent,
        BmbInnerHeaderComponent,
        BmbTabsComponent,
        BmbInteractiveIconComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbWheelMenuComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbWheelMenuComponent ],
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
interface App {
  appearance: string;
  title: string;
  icon: string;
  target: string;
  link: string;
}
export class AppComponent {
  navItems = [
    { title: 'Mas usados', id: 0, isActive: true },
    { title: 'Recomendados', id: 1, isActive: false },
    { title: 'Contextuales', id: 2, isActive: false },
  ];
  data = [
    'Carlee Bengochea',
    'Reynard Howgate',
    'Pearce Jore',
    'Giacopo Mellings',
    'Clyve Nerval',
    'Pauletta Pavelka',
    'Midge Girardot',
  ];
  isLoading = false;
  apps: { [key: number]: App[] } = {
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
      {
        appearance: 'purple',
        title: 'App 5',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'orange',
        title: 'App 6',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'pink',
        title: 'App 7',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
    1: [
      {
        appearance: 'red',
        title: 'App 8',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'App 9',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'green',
        title: 'App 10',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 11',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 12',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'orange',
        title: 'App 13',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'pink',
        title: 'App 14',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
    2: [
      {
        appearance: 'red',
        title: 'App 15',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'blue',
        title: 'App 16',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'green',
        title: 'App 17',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'yellow',
        title: 'App 18',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'purple',
        title: 'App 19',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'orange',
        title: 'App 20',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
      {
        appearance: 'pink',
        title: 'App 21',
        icon: 'face',
        target: '_blank',
        link: 'https://www.example.com/',
      },
    ],
  };
  
}
\`\`\`

Below is an example of how to use this component in HTML:

\`\`\`html
<bmb-wheel-menu
  [navItems]="navItems"
  [apps]="apps"
  [isLoading]="isLoading"
  [data]="data"
  (onValueChange)="handleValueChange($event)"
></bmb-wheel-menu>
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    onValueChange: {
      name: 'On Value Change',
      table: {
        category: 'Events',
        type: { summary: '(onValueChange)="handleValueChange($event)"' },
      },
      description: 'Event emitted when the value changes.',
    },
    navItems: {
      name: 'Nav Items',
      control: {
        type: 'object',
      },
      description: 'List of navigation items.',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
      },
    },
    isLoading: {
      name: 'Is Loading',
      control: {
        type: 'boolean',
      },
      description: 'Loading state of the component.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
      },
    },
    data: {
      name: 'Data',
      control: {
        type: 'array',
      },
      description: 'Array of data items.',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
      },
    },
    apps: {
      name: 'Apps',
      control: {
        type: 'object',
      },
      description: 'Object containing arrays of apps for each nav item.',
      table: {
        category: 'Properties',
        type: { summary: '{ [key: number]: App[] }' },
      },
    },
  },
  args: {
    navItems: [
      { title: 'Mas usados', id: 0, isActive: true },
      { title: 'Recomendados', id: 1, isActive: false },
      { title: 'Contextuales', id: 2, isActive: false },
    ],
    isLoading: false,
    data: [
      'Carlee Bengochea',
      'Reynard Howgate',
      'Pearce Jore',
      'Giacopo Mellings',
      'Clyve Nerval',
      'Pauletta Pavelka',
      'Midge Girardot',
    ],
    apps: {
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
        {
          appearance: 'purple',
          title: 'App 5',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'orange',
          title: 'App 6',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'pink',
          title: 'App 7',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
      ],
      1: [
        {
          appearance: 'red',
          title: 'App 8',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'blue',
          title: 'App 9',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'green',
          title: 'App 10',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'yellow',
          title: 'App 11',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'purple',
          title: 'App 12',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'orange',
          title: 'App 13',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'pink',
          title: 'App 14',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
      ],
      2: [
        {
          appearance: 'red',
          title: 'App 15',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'blue',
          title: 'App 16',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'green',
          title: 'App 17',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'yellow',
          title: 'App 18',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'purple',
          title: 'App 19',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'orange',
          title: 'App 20',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
        {
          appearance: 'pink',
          title: 'App 21',
          icon: 'face',
          target: '_blank',
          link: 'https://www.example.com/',
        },
      ],
    },
  },
} as Meta<typeof BmbWheelMenuComponent>;

type Story = StoryObj<BmbWheelMenuComponent>;

export const Default: Story = {};
