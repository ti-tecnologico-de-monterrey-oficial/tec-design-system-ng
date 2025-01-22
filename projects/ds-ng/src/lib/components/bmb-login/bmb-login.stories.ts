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
    buttonLabel: 'Ingresar',
  },
} as Meta<typeof BmbLoginComponent>;

type Story = StoryObj<BmbLoginComponent>;

export const Default: Story = {};
