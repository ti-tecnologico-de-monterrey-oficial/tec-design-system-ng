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
      description: 'Deprecated',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
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
    onRequest: {
      name: 'On Request',
      control: null,
      description:
        'Emits an event when a request is made, typically when the continue button is clicked.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    onContinue: {
      name: 'On Continue',
      control: null,
      description:
        'Emits an event when the continue action is completed successfully.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    headerLabel: 'ESTUDIANTES',
    anotherAccountLabel: 'Ingresar con otra cuenta',
    buttonLabel: 'Ingresar',
    userInfo: {
      id: 'A00123456',
      fullName: 'Borrego Perez',
      profilePicture:
        'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/assets/images/placeholders/user-icon-test.svg',
    },
  },
} as Meta<typeof BmbUserProfileComponent>;

type Story = StoryObj<BmbUserProfileComponent>;

export const Default: Story = {};
