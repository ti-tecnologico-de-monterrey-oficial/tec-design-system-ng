import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTotpComponent } from './bmb-totp.component';

export default {
  title: 'Macro Componentes/ToTP',
  component: BmbTotpComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbTotpComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbTotpComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class Component {
  correctCodes: { [key: string]: string } = {
    first: 'Hj93h9',
    second: 'A1B2',
  };

  errors: { [key: string]: { codeError: boolean; errorMessage: string } } = {};

  verifyCode(receivedCode: string, instanceId: string) {
    if (receivedCode === '') {
      this.errors[instanceId] = {
        codeError: true,
        errorMessage: 'Please fill all fields correctly',
      };
      console.log('Entered for empty code');
      return;
    }

    const correctCode = this.correctCodes[instanceId];
    if (!correctCode) {
      this.errors[instanceId] = { codeError: false, errorMessage: '' };
      return;
    }

    this.errors[instanceId] = this.errors[instanceId] || {
      codeError: false,
      errorMessage: '',
    };

    if (receivedCode !== correctCode) {
      this.errors[instanceId].codeError = true;
      this.errors[instanceId].errorMessage = 'Invalid Code. Please try again.';
      console.log('Entered for invalid code');
    } else {
      this.errors[instanceId].codeError = false;
      this.errors[instanceId].errorMessage = '';
      console.log('Entered for correct code');
      alert('The code is correct, proceed with the action');
    }
  }
}
\`\`\`

Below is an example of how you can use this component in HTML:

\`\`\`html
<bmb-totp
  instanceId="first"
  [maxCode]="6"
  (handleSubmit)="verifyCode($event, 'first')"
  [codeError]="errors['first'] ? errors['first'].codeError : false"
  [errorMessage]="errors['first'] ? errors['first'].errorMessage : ''"
  [showButton]="true"
  buttonText="Verify"
  helperText="Helper text"
/>

<bmb-totp
  instanceId="second"
  [maxCode]="4"
  (handleSubmit)="verifyCode($event, 'second')"
  [codeError]="errors['second'] ? errors['second'].codeError : false"
  [errorMessage]="errors['second'] ? errors['second'].errorMessage : ''"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: {
      name: 'Title',
      control: { type: 'text' },
      description: '',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    subtitle: {
      name: 'Subtitle',
      control: { type: 'text' },
      description: '',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    instanceId: {
      name: 'Instance Id',
      control: { type: 'text' },
      description: '',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    codeError: {
      name: 'Code Error',
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    errorMessage: {
      name: 'Error Message',
      control: { type: 'text' },
      description: '',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    helperText: {
      name: 'Helper Text',
      control: { type: 'text' },
      description: '',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    showButton: {
      name: 'Show Button',
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    buttonText: {
      name: 'Button Text',
      control: { type: 'text' },
      description: '',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    maxCode: {
      name: 'Max Code',
      control: { type: 'number' },
      description: '',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    handleSubmit: {
      name: 'Handle Submit',
      control: {
        type: '',
      },
      description: '',
      table: {
        category: 'Events',
        type: { summary: '(handleSubmit)="verifyCode($event, "first")"' },
      },
    },
  },
  args: {
    title: 'TOTP',
    subtitle: '(Time-based One-time Password)',
    instanceId: 'first',
    codeError: false,
    errorMessage: 'Invalid Code. Please try again.',
    helperText: 'Helper text',
    showButton: false,
    buttonText: 'Verify',
    maxCode: 6,
    handleSubmit: () => {
      window.alert('button submitted');
    },
  },
} as Meta<typeof BmbTotpComponent>;

type Story = StoryObj<BmbTotpComponent>;

export const Default: Story = {};
