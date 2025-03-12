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
        category: 'Deprecated',
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    },
    userInformation: {
      name: 'User information',
      value: null,
      control: false,
      table: {
        category: 'Properties',
        type: { summary: 'IUserInformation' },
        defaultValue: { summary: 'null' },
      },
    },
    hasLogoutButton: {
      name: 'Has logout button',
      control: { type: 'boolean' },
      description:
        'Shows the end session button, only works if the user information is provided.',
      table: {
        category: 'Deprecated',
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
      description: 'Deprecated',
      table: {
        category: 'Deprecated',
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
        type: 'object',
      },
      description:
        'Set the notifications for the  top bar in the assignment icon',
      table: {
        type: { summary: 'string[]' },
        category: 'Deprecated',
      },
    },
    alertNotification: {
      name: 'Alert Notification',
      control: {
        type: 'object',
      },
      description: 'Set the notifications for the top bar in the alert icon',
      table: {
        type: { summary: 'IBmbDataAlert[]' },
        category: 'Properties',
      },
    },
    helpButtonClick: {
      name: 'Handle Help button click',
      control: false,
      description: 'Function that is executed when the help button is clicked.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    userProfileClick: {
      name: 'Handle user profile click',
      control: false,
      description:
        'Function that is executed when the user profile is clicked.',
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
    userInformation: {
      name: 'Santiago Hernández',
      image: 'https://picsum.photos/id/64/200/300',
      role: 'Alumno',
    },
    onLangChange: () => {
      console.log('test');
    },
    logOut: () => {
      console.log('test');
    },
    userProfileClick: () => {
      alert('User profile clicked');
    },
    positionButtonMenu: 'left',
    hasLogoutButton: false,
    alertNotification: [
      {
        id: 10,
        title: 'Alerta 10',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
          {
            text: 'Descripción de la alerta 10',
            type: 'button',
            variant: 'primary',
          },
        ],
        date: '19/11/2024',
        isRead: false,
        time: '12:00',
        tags: [
          { text: 'tag1', color: 'info' },
          { text: 'tag2', color: 'brand' },
        ],
        type: 'tipo 1',
        isFavorite: true,
        isArchived: false,
      },
      {
        id: 1,
        title: 'Alerta 1',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'link',
            href: 'https://www.google.com',
          },
          {
            text: 'Descripción de la alerta 10',
            type: 'button',
            variant: 'secondary-filled',
          },
        ],
        date: '01/11/2024',
        isRead: false,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: true,
        isArchived: false,
      },
      {
        id: 2,
        title: 'Alerta 2',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'image',
            href: 'https://picsum.photos/id/25/200',
          },
        ],
        date: '19/11/2024',
        isRead: true,
        time: '15:00',
        type: 'tipo 2',
        isFavorite: false,
        isArchived: true,
      },
      {
        id: 3,
        title: 'Alerta 3',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'paragraph',
            style: 'bold',
          },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
        ],
        date: '18/11/2024',
        isRead: false,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: false,
        isArchived: false,
      },
      {
        id: 4,
        title: 'Alerta 4',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'paragraph',
            style: 'bold',
          },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
        ],
        date: '02/11/2024',
        isRead: true,
        time: '12:00',
        type: 'tipo 3',
        isFavorite: false,
        isArchived: false,
      },
      {
        id: 4,
        title: 'Alerta 40',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'image',
            href: 'https://picsum.photos/id/26/200',
          },
        ],
        date: '02/01/2024',
        isRead: true,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: false,
        isArchived: false,
      },
    ],
  },
} as Meta<typeof BmbTopBarComponent>;

type Story = StoryObj<BmbTopBarComponent>;

export const Default: Story = {};
