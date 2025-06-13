import { Meta, StoryObj } from '@storybook/angular';
import { BmbLoginComponent } from './bmb-login.component';
import { storiesLayoutVertical } from '../../utils/bambooLayout';

export default {
  title: 'Macro Componentes/Login',
  component: BmbLoginComponent,
  decorators: [
    storiesLayoutVertical,
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbLoginComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbLoginComponent ],
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
    forgottenPasswordLabel: {
      name: 'Forgotten password label',
      control: 'text',
      description: 'Sets the label to be displayed for forgotten password.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '¿Olvidaste tu contraseña?' },
      },
    },
    forgottenPasswordLink: {
      name: 'Forgotten password link',
      control: 'text',
      description:
        'Sets the link for the option to log in with forgotten password.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    forgottenPasswordTarget: {
      name: 'Forgotten password target',
      control: {
        type: 'radio',
      },
      options: ['_blank', '_parent', '_self', '_top'],
      description:
        'Sets the target for the option to log in with forgotten password.',
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
    showRememberMeCheckbox: {
      name: 'Shows remember me checkbox',
      control: 'boolean',
      description: 'Shows remember me checkbox when true',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    rememberMeCheckboxLabel: {
      name: 'Remember me checkbox label',
      control: 'text',
      description: 'Sets the label to be displayed for remember me checkbox.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Recordarme' },
      },
    },
    showLoginAsGuest: {
      name: 'Show log in as a guest',
      control: 'boolean',
      description: 'Shows log in as a guest when true',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loginAsGuestLabel: {
      name: 'Log in as a guest label',
      control: 'text',
      description: 'Sets the label to be displayed for log in as a guest.',
      table: {
        category: 'Properties',
        type: { summary: 'string  (required)' },
        defaultValue: { summary: 'Entrar como invitado' },
      },
    },
    loginAsGuestLink: {
      name: 'Log in as a guest link',
      control: 'text',
      description: 'Sets the link for log in as a guest.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    loginAsGuestTarget: {
      name: 'Log in as a guest target',
      control: {
        type: 'radio',
      },
      options: ['_blank', '_parent', '_self', '_top'],
      description: 'Sets the target for log in as a guest.',
      table: {
        category: 'Events',
        type: { summary: 'IBmbTargetLink' },
        defaultValue: { summary: '_blank' },
      },
    },
    onRememberMeChecked: {
      name: 'Remember me checked',
      control: {
        type: '',
      },
      description:
        'Event that is emitted when the state of the checkbox changes, such as when it is checked or unchecked. This can be used to trigger functions or actions based on the checkbox’s state change.',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    headerLabel: '',
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
    onRememberMeChecked: () => {
      console.log('Remember me clicked');
    },
  },
} as Meta<typeof BmbLoginComponent>;

type Story = StoryObj<BmbLoginComponent>;

export const Default: Story = {};
