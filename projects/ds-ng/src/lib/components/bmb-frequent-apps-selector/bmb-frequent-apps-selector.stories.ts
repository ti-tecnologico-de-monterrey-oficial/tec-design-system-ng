import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
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
  styleUrls: ['./component.scss'],
})
export class AppComponent {
  apps = [
    { icon: 'home', title: 'Home', link: '/home', target: '_blank', appearance: 'red' },
    { icon: 'settings', title: 'My Page', link: '/my-page', appearance: 'yellow' },
    { icon: 'settings', title: 'School Calendar', link: 'https://configuration.com', target: '_blank', appearance: 'yellow' },
    { icon: 'settings', title: 'Configuration', link: 'https://configuration.com', target: '_blank', appearance: 'yellow' },
    { icon: 'home', title: 'Home', link: '/home', target: '_blank', appearance: 'red' },
    { icon: 'settings', title: 'My Page', link: '/my-page', appearance: 'yellow' },
    { icon: 'settings', title: 'School Calendar', link: 'https://configuration.com', target: '_blank', appearance: 'yellow' },
    { icon: 'settings', title: 'Configuration', link: 'https://configuration.com', target: '_blank', appearance: 'yellow' },
  ];
}
\`\`\`

Below is an example of how to use this component in HTML:

\`\`\`html
<bmb-frequent-apps-selector
  [title]="'My Frequent Apps'"
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
      description:
        'List of applications to display, each with properties such as icon, title, link, target, and appearance.',
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
      description: 'Title to display above the list of applications.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    layout: {
      name: 'Layout',
      control: {
        type: 'select',
      },
      options: ['regular', 'button', 'app_drawer'],
      description: 'Set the layout behavior.',
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
        title: 'Home',
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
        title: 'School Calendar',
        link: 'https://configuration.com',
        target: '_blank',
        appearance: 'yellow',
      },
      {
        icon: 'settings',
        title: 'Configuration',
        link: 'https://configuration.com',
        target: '_blank',
        appearance: 'yellow',
      },
      {
        icon: 'home',
        title: 'Home',
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
        title: 'School Calendar',
        link: 'https://configuration.com',
        target: '_blank',
        appearance: 'yellow',
      },
      {
        icon: 'settings',
        title: 'Configuration',
        link: 'https://configuration.com',
        target: '_blank',
        appearance: 'yellow',
      },
    ],
    title: 'Services',
    layout: 'regular',
  },
} as Meta<typeof BmbFrequentAppsSelectorComponent>;

type Story = StoryObj<BmbFrequentAppsSelectorComponent>;

export const Default: Story = {};
