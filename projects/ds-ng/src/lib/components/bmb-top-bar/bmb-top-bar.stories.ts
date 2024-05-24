import type { Meta, StoryObj } from '@storybook/angular';
import { BmbTopBarComponent } from './bmb-top-bar.component';

export default {
  title: 'Macro Componentes/Top bar',
  component: BmbTopBarComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbTopBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbTopBarComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    positionButtonMenu: {
      name: 'Responsive menu button position',
      control: {
        type: 'radio',
      },
      options: ['left', 'right'],
      description: 'Set responsive menu button position.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    },
    userInformation: {
      value: null,
      control: false,
      table: {
        category: 'Properties',
        type: { summary: 'object' },
        defaultValue: { summary: 'null' },
      },
    },
    hasLogoutButton: {
      name: 'Has logout button',
      control: { type: 'boolean' },
      description:
        'Shows the end session button, only works if the user information is provided.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    image: {
      name: 'TEC logo image',
      control: {
        type: 'text',
      },
      description: 'Replace the default logo.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    mobileImage: {
      name: 'TEC logo image for low resolutions',
      control: {
        type: 'text',
      },
      description: 'Replace the default logo for low resolutions.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    appName: {
      name: 'App name',
      control: {
        type: 'text',
      },
      description: 'Set the App name.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    appSubTitle: {
      name: 'App sub-title',
      control: {
        type: 'text',
      },
      description: 'Set the App sub-title.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    showLang: {
      name: 'Lang selector',
      control: { type: 'boolean' },
      description: 'Shows the lang selector.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    lang: {
      name: 'Language',
      control: {
        type: 'text',
      },
      description: 'Set the default language.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'es' },
      },
    },
    logOut: {
      name: 'Logout event',
      control: false,
      description:
        'Function that is executed when the logout button is clicked.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    onValueChange: {
      name: 'Language change event',
      control: false,
      description: 'Function that is executed when the lang change.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    appName: 'TecTest',
    appSubTitle: 'Sub title',
    showLang: false,
    lang: 'es',
    onValueChange: () => {
      console.log('test');
    },
    logOut: () => {
      console.log('test');
    },
    positionButtonMenu: 'left',
    hasLogoutButton: false,
  },
} as Meta<typeof BmbTopBarComponent>;

type Story = StoryObj<BmbTopBarComponent>;

export const Default: Story = {};
