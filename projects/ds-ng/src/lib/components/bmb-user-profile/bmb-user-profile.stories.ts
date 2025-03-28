import { Meta, StoryObj } from '@storybook/angular';
import { BmbUserProfileComponent } from './bmb-user-profile.component';

export default {
  title: 'Macro Componentes/User profile',
  component: BmbUserProfileComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbUserProfileComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbUserProfileComponent ],
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
    headerLabel: {
      name: 'Header label',
      control: 'text',
      description: 'Sets the label to be displayed in the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'ESTUDIANTES' },
      },
    },
    anotherAccountLabel: {
      name: 'Another account label',
      control: 'text',
      description:
        'Sets the label for the option to log in with another account.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Ingresar con otra cuenta' },
      },
    },
    anotherAccountLink: {
      name: 'Another account link',
      control: 'text',
      description:
        'Sets the link for the option to log in with another account.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    anotherAccountTarget: {
      name: 'Another account target',
      control: {
        type: 'radio',
      },
      options: ['_blank', '_parent', '_self', '_top'],
      description:
        'Sets the target for the option to log in with another account.',
      table: {
        category: 'Events',
        type: { summary: 'IBmbTargetLink' },
        defaultValue: { summary: '_blank' },
      },
    },
    buttonLabel: {
      name: 'Button label',
      control: 'text',
      description: 'Sets the label for the continue button.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Ingresar' },
      },
    },
    userInfo: {
      name: 'User info',
      control: 'object',
      description: `Sets an object containing user information, such as profile picture, full name, and user ID. This input is required.
      IBmbUserInfo = {
        id: string;
        fullName: string;
        profilePicture: string;
      }
      `,
      table: {
        type: { summary: 'IBmbUserInfo (required)' },
        category: 'Properties',
      },
    },
    actionHeaderLinks: {
      name: 'Action header Links',
      control: { type: 'object' },
      description: `
Sets an object of IBmbActionHeaderLinks type.

    export interface IBmbActionHeaderLinks {
      apple: IBmbLinkInfo,
      android: IBmbLinkInfo,
      twitter: IBmbLinkInfo,
      facebook: IBmbLinkInfo,
      instagram: IBmbLinkInfo,
      youtube: IBmbLinkInfo,
    }

Template:

    actionHeaderLinks:IBmbActionHeaderLinks = {
      apple: {
        link: '',
        target: '',
      },
      android: {
        link: '',
        target: '',
      },
      twitter: {
        link: '',
        target: '',
      },
      facebook: {
        link: '',
        target: '',
      },
      instagram: {
        link: '',
        target: '',
      },
      youtube: {
        link: '',
        target: '',
      },
    },
      `,
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbActionHeaderLinks',
        },
      },
    },
    actionHeaders: {
      name: 'Action header',
      control: { type: 'object' },
      description: '',
      table: {
        category: 'Deprecated',
        type: {
          summary: 'IBmbActionHeader[]',
        },
      },
    },
    onRequest: {
      name: 'On Request',
      control: {
        type: '',
      },
      description:
        'Emits an event when a request is made, typically when the continue button is clicked.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    onContinue: {
      name: 'On Continue',
      control: {
        type: '',
      },
      description:
        'Emits an event when the continue action is completed successfully.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    headerLabel: '',
    userInfo: {
      id: '',
      fullName: '',
      profilePicture: '',
    },
    actionHeaderLinks: {
      apple: {
        link: '',
        target: '',
      },
      android: {
        link: '',
        target: '',
      },
      twitter: {
        link: '',
        target: '',
      },
      facebook: {
        link: '',
        target: '',
      },
      instagram: {
        link: '',
        target: '',
      },
      youtube: {
        link: '',
        target: '',
      },
    },
    onRequest: () => {
      console.log('On request');
    },
    onContinue: () => {
      console.log('On continue');
    },
  },
} as Meta<typeof BmbUserProfileComponent>;

type Story = StoryObj<BmbUserProfileComponent>;

export const Default: Story = {};
