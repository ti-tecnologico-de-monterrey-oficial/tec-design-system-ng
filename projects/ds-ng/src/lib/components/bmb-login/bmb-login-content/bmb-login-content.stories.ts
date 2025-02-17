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
    onContinue: () => {
      alert('onContinue');
    },
  },
} as Meta<typeof BmbLoginContentComponent>;

type Story = StoryObj<BmbLoginContentComponent>;

export const Default: Story = {};
