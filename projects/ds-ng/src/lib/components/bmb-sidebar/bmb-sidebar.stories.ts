import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbSidebarComponent } from './bmb-sidebar.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'Macro Componentes/Sidebar',
  component: BmbSidebarComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbIconComponent, RouterTestingModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
The \`BmbSidebarComponent\` is a versatile sidebar component that can be used to display a list of navigation items. Below is an example of how to use this component in TypeScript:

\`\`\`typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'emprendedor',
    loadComponent: () => import('./emprendedor.component'),
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'vivencia',
        loadComponent: () => import('./pages/story/story.component'),
      },
    ],
  },
];


import { BmbSidebarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [ BmbSidebarComponent ],
  templateUrl: './app-component.html',
  styleUrls: ['./app-component.scss'],
})
export class AppComponent {
  elements: {
    id: number;
    icon: string;
    title: string;
    link: string;
    target?: string;
    children?: SidebarElement[];
    isOpen?: boolean;
  }[][] = [
    [
      {
        id: 1,
        icon: 'assignment_add',
        title: 'Elegir documentos',
        link: '/home',
      },
      {
        id: 2,
        icon: 'task',
        title: 'Agregar firmantes',
        link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
      },
      {
        id: 3,
        icon: 'note_alt',
        title: 'Crear envelope',
        link: '#contact',
        target: '_self',
      },
      {
        id: 4,
        icon: 'checklist_rtl',
        title: 'Estado de archivos anonimos',
        link: 'inicio',
        children: [
          {
            id: 4.1,
            icon: 'file_copy',
            title: 'Sub-item 1',
            link: '/emprendedor',
          },
          {
            id: 4.2,
            icon: 'file_copy',
            title: 'Sub-item 2',
            link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
          },
        ],
      },
      {
        id: 5,
        icon: 'account_box',
        title: 'Admin.usuariosusuariosusuarios',
        link: 'vivencia',
        children: [
          {
            id: 5.1,
            icon: 'file_copy',
            title: 'Sub-item 3',
            link: '/home',
          },
          {
            id: 5.2,
            icon: 'file_copy',
            title: 'Sub-item 4',
            link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
          },
        ],
      },
    ],
    [
      {
        id: 7,
        icon: 'account_box',
        title: 'Admin. usuarios',
        link: 'vivencia1',
      },
      {
        id: 8,
        icon: 'account_box',
        title: 'Admin. usuarios',
        link: 'vivencia2',
      },
      {
        id: 9,
        icon: 'account_box',
        title: 'Admin. usuarios',
        link: 'vivencia3',
      },
      {
        id: 10,
        icon: 'account_box',
        title: 'Hi',
        link: 'vivencia4',
      },
      {
        id: 11,
        icon: 'account_box',
        title: 'Hi',
        link: 'vivencia5',
      },
    ],
  ];
}
\`\`\`

Below is an example of how to use this component in HTML:

\`\`\`html
<bmb-sidebar [elements]="elements"></bmb-sidebar>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    elements: {
      name: 'Elements',
      control: {
        type: 'object',
      },
      description:
        'An array of sidebar elements, each containing a list of child elements.',
      table: {
        type: { summary: 'SidebarElement[][]' },
        category: 'Properties',
        defaultValue: { summary: '[]' },
      },
    },
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'The title of the navigation sidebar for mobile.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    elements: [
      [
        {
          id: 1,
          icon: 'assignment_add',
          title: 'Elegir documentos',
          link: '/home',
        },
        {
          id: 2,
          icon: 'task',
          title: 'Agregar firmantes',
          link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
        },
        {
          id: 3,
          icon: 'note_alt',
          title: 'Crear envelope',
          link: '#contact',
          target: '_self',
        },
        {
          id: 4,
          icon: 'checklist_rtl',
          title: 'Estado de archivos anonimos',
          link: 'inicio',
          children: [
            {
              id: 4.1,
              icon: 'file_copy',
              title: 'Sub-item 1',
              link: '/emprendedor',
            },
            {
              id: 4.2,
              icon: 'file_copy',
              title: 'Sub-item 2',
              link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
            },
          ],
        },
        {
          id: 5,
          icon: 'account_box',
          title: 'Admin.usuariosusuariosusuarios',
          link: 'vivencia',
          children: [
            {
              id: 5.1,
              icon: 'file_copy',
              title: 'Sub-item 3',
              link: '/home',
            },
            {
              id: 5.2,
              icon: 'file_copy',
              title: 'Sub-item 4',
              link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
            },
          ],
        },
      ],
      [
        {
          id: 7,
          icon: 'account_box',
          title: 'Admin. usuarios',
          link: 'vivencia1',
        },
        {
          id: 8,
          icon: 'account_box',
          title: 'Admin. usuarios',
          link: 'vivencia2',
        },
        {
          id: 9,
          icon: 'account_box',
          title: 'Admin. usuarios',
          link: 'vivencia3',
        },
        {
          id: 10,
          icon: 'account_box',
          title: 'Hi',
          link: 'vivencia4',
        },
        {
          id: 11,
          icon: 'account_box',
          title: 'Hi',
          link: 'vivencia5',
        },
      ],
    ],
    title: 'Navegacion para mobiles',
  },
} as Meta<typeof BmbSidebarComponent>;

type Story = StoryObj<BmbSidebarComponent>;

export const Default: Story = {};
