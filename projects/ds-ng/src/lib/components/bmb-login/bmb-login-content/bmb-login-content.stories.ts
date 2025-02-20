import { Meta, StoryObj } from '@storybook/angular';
import { BmbLoginContentComponent } from './bmb-login-content.component';

export default {
  title: 'Internal/Login content',
  component: BmbLoginContentComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbLoginContentComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbLoginContentComponent ],
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
    forgottenPasswordLabel: {
      name: 'Forgotten password label',
      control: 'text',
      description: 'Sets the label to be displayed for forgotten password.',
      table: {
        category: 'Properties',
        type: { summary: 'string  (required)' },
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
    showLoginAsGuest:{
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
      description:
        'Sets the link for log in as a guest.',
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
      description:
        'Sets the target for log in as a guest.',
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
    forgottenPasswordLabel: '¿Olvidaste tu contraseña?',
    forgottenPasswordLink: '',
    forgottenPasswordTarget: '_blank',
    showRememberMeCheckbox: false,
    rememberMeCheckboxLabel: 'Recordarme',
    showLoginAsGuest: false,
    loginAsGuestLabel: 'Entrar como invitado',
    loginAsGuestLink: '',
    loginAsGuestTarget: '_blank',
    onRememberMeChecked: () => {
      alert('Remember me clicked');
    },
  },
} as Meta<typeof BmbLoginContentComponent>;

type Story = StoryObj<BmbLoginContentComponent>;

export const Default: Story = {};
