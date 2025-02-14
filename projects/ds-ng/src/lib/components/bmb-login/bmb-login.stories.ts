import { Meta, StoryObj } from '@storybook/angular';
import { BmbLoginComponent } from './bmb-login.component';

export default {
  title: 'Macro Componentes/Login',
  component: BmbLoginComponent,
  decorators: [],
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
      description: 'Deprecated',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
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
    actionHeaders: {
      name: 'Action header',
      control: { type: 'object' },
      description: 'Sets an array of IBmbActionHeader objects.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'Action header example' },
        type: {
          summary:
            'IBmbActionHeader[], {icon: string; iconSize?: number; iconActiveToggle?: string; isToggleActive?: boolean; isAccentColor?: boolean; link?: string; target?: IBmbTargetLink; action: () => void;}',
        },
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
    forgottenPasswordLabel: '¿Olvidaste tu contraseña?',
    forgottenPasswordLink: '',
    forgottenPasswordTarget: '_blank',
    buttonLabel: 'Ingresar',
    actionHeaders: [
      {
        icon: '../assets/images/social-icons/icon_Apple.svg',
        link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-user-profile--documentation',
        action: () => {},
      },
      {
        icon: '../assets/images/social-icons/icon_Android.svg',
        link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-user-profile--documentation',
        action: () => {},
      },
      {
        icon: '../assets/images/social-icons/icon_Twitter.svg',
        link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-user-profile--documentation',
        action: () => {},
      },
      {
        icon: '../assets/images/social-icons/icon_Facebook.svg',
        link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-user-profile--documentation',
        action: () => {},
      },
      {
        icon: '../assets/images/social-icons/icon_Instagram.svg',
        link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-user-profile--documentation',
        action: () => {},
      },
      {
        icon: '../assets/images/social-icons/icon_Youtube.svg',
        link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-user-profile--documentation',
        action: () => {},
      },
    ],
  },
} as Meta<typeof BmbLoginComponent>;

type Story = StoryObj<BmbLoginComponent>;

export const Default: Story = {};
