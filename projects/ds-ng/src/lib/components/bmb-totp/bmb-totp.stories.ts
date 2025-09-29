import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { BmbTotpComponent } from './bmb-totp.component';
import {
  DBmbGenericParamDesc,
  DBmbInputParamDesc,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';

const additionalBlock: string = `
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
    }`;

export default {
  title: 'Components/Containers/ToTP prompt',
  component: BmbTotpComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'buildForm',
          'getFormControl',
          'handleKeyDown',
          'handleKeyUp',
          'handlePaste',
          'handlePaste',
          'onSubmit',
          'ngOnInit',
          'ngOnChanges',
          'ngOnDestroy',
          'codeForm',
          'codesArray',
          'destroy$',
          '_maxCode',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'totp' })} to be used in two-factor authentication flows.`, 'https://bamboo.tec.mx/latest/componentes/to-tp-prompt/descripcion-general-ldU6LSaF')}
${getBasicExampleBlock('BmbTotpComponent', '', additionalBlock)}
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
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Sets the title of the TOTP prompt',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'TOTP' },
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Sets the subtitle of the TOTP prompt',
      table: {
        category: 'Properties',
        defaultValue: { summary: '(Time-based One-time Password)' },
        type: { summary: 'string' },
      },
    },
    instanceId: {
      control: { type: 'text' },
      description: 'Sets the instance ID of the TOTP prompt',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'UUID' },
        type: { summary: 'string' },
      },
    },
    codeError: {
      control: { type: 'boolean' },
      description: 'Indicates if there is a code error',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Sets the error message of the TOTP prompt',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    helperText: DBmbInputParamDesc.helperMessage,
    showButton: {
      control: { type: 'boolean' },
      description: 'Indicates if the submit button should be shown',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    buttonText: {
      control: { type: 'text' },
      description: 'Sets the text of the submit button',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    disableButton: {
      control: { type: 'boolean' },
      description: 'Indicates if the submit button should be disabled',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    maxCode: DBmbGenericParamDesc.deprecated,
    handleSubmit: getOnClickParam(
      getOnEvent('', 'handleSubmit'),
      `.<br/><br/> The button is displayed when \`showButton\` is true`,
    ),
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
    disableButton: false,
    handleSubmit: () => {
      window.alert('button submitted');
    },
  },
} as Meta<typeof BmbTotpComponent>;

type Story = StoryObj<BmbTotpComponent>;

export const Default: Story = {};
