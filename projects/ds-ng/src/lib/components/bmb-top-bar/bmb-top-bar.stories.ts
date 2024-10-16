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
    mitec: {
      name: 'Mitec',
      control: {
        type: 'boolean',
      },
      description: 'Top Bar changes to the mitec version',
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: { summary: false },
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
    onLangChange: {
      name: 'Language change event',
      control: false,
      description: 'Function that is executed when the lang change.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    assignmentNotification: {
      name: 'Assigment Notification',
      control: {
        type: 'text',
      },
      description:
        'Set the notifications for the  top bar in the assignment icon',
      table: {
        type: { summary: 'string[]' },
        category: 'Properties',
      },
    },
    alertNotification: {
      name: 'Alert Notification',
      control: {
        type: 'text',
      },
      description: 'Set the notifications for the top bar in the alert icon',
      table: {
        type: { summary: 'IBmbNotificationCardData' },
        category: 'Properties',
      },
    },
  },
  args: {
    appName: 'TecTest',
    appSubTitle: 'Sub title',
    showLang: false,
    lang: 'es',
    userInformation: { name: 'Name', image: 'ima.pgn', role: 'alumno' },
    onLangChange: () => {
      console.log('test');
    },
    logOut: () => {
      console.log('test');
    },
    positionButtonMenu: 'left',
    hasLogoutButton: false,
    alertNotification: {
      new: [
        {
          description: 'Descripcion Corta ',
          time: '4d 12h',
        },
        {
          description: 'Descripcion Corta Larga asdasd adasdaw',
          time: '4d 12h',
        },
      ],
      all: [
        {
          description: 'Descripcion Corta All',
          time: '4d 12h',
        },
        {
          description: 'Descripcion Corta all 1',
          time: '4d 12h',
        },
      ],
      seen: [
        {
          description: 'Descripcion Corta seen 1',
          time: '4d 12h',
        },
        {
          description: 'Descripcion Corta seen 2',
          time: '4d 12h',
        },
        {
          description: 'Descripcion Corta seen 3',
          time: '4d 12h',
        },
      ],
    },
    assignmentNotification: 9,
  },
} as Meta<typeof BmbTopBarComponent>;

type Story = StoryObj<BmbTopBarComponent>;

export const Default: Story = {};
