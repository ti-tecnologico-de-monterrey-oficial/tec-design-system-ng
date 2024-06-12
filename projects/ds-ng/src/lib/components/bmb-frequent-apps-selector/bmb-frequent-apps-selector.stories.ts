import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BmbFrequentAppsSelectorComponent } from './bmb-frequent-apps-selector.component';

export default {
  title: 'Macro Componentes/Frequent Apps Selector',
  component: BmbFrequentAppsSelectorComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterTestingModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbFrequentAppsSelectorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbFrequentAppsSelectorComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {
  apps = [
    { icon: 'home', title: 'Inicio',  link: '/home', target: '_blank', appearance: 'red'},
    { icon: 'settings', title: 'My Page', link: '/my-page', appearance: 'yellow' },
    { icon: 'settings', title: 'Calendario escolar', link: 'https://configuración.com', target: '_blank', appearance: 'yellow' },
    { icon: 'settings', title: 'Configuración', link: 'https://configuración.com', target: '_blank', appearance: 'yellow' },
    { icon: 'home', title: 'Inicio',  link: '/home', target: '_blank', appearance: 'red'},
    { icon: 'settings', title: 'My Page', link: '/my-page', appearance: 'yellow' },
    { icon: 'settings', title: 'Calendario escolar', link: 'https://configuración.com', target: '_blank', appearance: 'yellow' },
    { icon: 'settings', title: 'Configuración', link: 'https://configuración.com', target: '_blank', appearance: 'yellow' },
  ];
}
\`\`\`

Below is an example of how to use this component in HTML:

\`\`\`html
<bmb-frequent-apps-selector
  [title]="'Mis Aplicaciones Frecuentes'"
  [apps]="apps"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    apps: {
      name: 'Apps',
      control: {
        type: 'object',
      },
      description: '',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
      },
    },
    title: {
      name: 'Title',
      control: {
        type: 'string',
      },
      description: '',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    apps: [
      {
        icon: 'home',
        title: 'Inicio',
        link: '/home',
        target: '_blank',
        appearance: 'red',
      },
      {
        icon: 'settings',
        title: 'My Page',
        link: '/my-page',
        appearance: 'yellow',
      },
      {
        icon: 'settings',
        title: 'Calendario escolar',
        link: 'https://configuración.com',
        target: '_blank',
        appearance: 'yellow',
      },
      {
        icon: 'settings',
        title: 'Configuración',
        link: 'https://configuración.com',
        target: '_blank',
        appearance: 'yellow',
      },
      {
        icon: 'home',
        title: 'Inicio',
        link: '/home',
        target: '_blank',
        appearance: 'red',
      },
      {
        icon: 'settings',
        title: 'My Page',
        link: '/my-page',
        appearance: 'yellow',
      },
      {
        icon: 'settings',
        title: 'Calendario escolar',
        link: 'https://configuración.com',
        target: '_blank',
        appearance: 'yellow',
      },
      {
        icon: 'settings',
        title: 'Configuración',
        link: 'https://configuración.com',
        target: '_blank',
        appearance: 'yellow',
      },
    ],
    title: 'Servicios',
  },
} as Meta<typeof BmbFrequentAppsSelectorComponent>;

type Story = StoryObj<BmbFrequentAppsSelectorComponent>;

export const Default: Story = {};
