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
  }[][] = [
    [
      { id: 1, icon: 'assignment_add', title: 'Elegir documentos', link: '#' },
      { id: 2, icon: 'task', title: 'Agregar firmantes', link: '#' },
      { id: 3, icon: 'note_alt', title: 'Crear envelope', link: '#' },
      { id: 4, icon: 'checklist_rtl', title: 'Estado de archivos', link: '#' },
    ],
    [{ id: 5, icon: 'account_box', title: 'Admin. usuarios', link: '/' }],
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
        type: {
          summary:
            'Array<{ id: number; icon: string; title: string; link: string }[]>',
        },
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
          link: '#',
        },
        { id: 2, icon: 'task', title: 'Agregar firmantes', link: '#' },
        { id: 3, icon: 'note_alt', title: 'Crear envelope', link: '#' },
        {
          id: 4,
          icon: 'checklist_rtl',
          title: 'Estado de archivos',
          link: '#',
        },
      ],
      [{ id: 5, icon: 'account_box', title: 'Admin. usuarios', link: '/' }],
    ],
  },
} as Meta<typeof BmbSidebarComponent>;

type Story = StoryObj<BmbSidebarComponent>;

export const Default: Story = {};
