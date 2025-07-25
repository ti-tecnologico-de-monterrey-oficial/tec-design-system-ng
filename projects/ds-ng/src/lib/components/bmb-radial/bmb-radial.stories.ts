import { Meta, StoryObj } from '@storybook/angular';
import { BmbRadialComponent } from './bmb-radial.component';
import {
  getCheckboxOrRadialArchitecture,
  getDescribeTypeTextBlock,
  getFieldDescription,
  getFormExampleBlock,
} from '../../utils/doc/utils';
import { InputParameterDescriptions } from '../../utils/doc/parameterDescriptions';

const inputName = 'radial_group';
const additionalBlock = `handleRadial(element: HTMLInputElement): void {
    console.log('Radio value:', element.value);
    console.log('Radio name:', element.name);
    //Add your code
  }`;
const inputExample = `<bmb-radial
  inputId="radial_id1"
  name="${inputName}"
  label="Radial A"
  value="A"
  [control]="getFormControl('${inputName}')"
  (change)="handleRadial($event)"
  />
  <bmb-radial
  inputId="radial_id2"
  name="${inputName}"
  label="Radial B"
  value="B"
  [control]="getFormControl('${inputName}')"
  (change)="handleRadial($event)"
  />`;

export default {
  title: 'Components/Inputs/Radial',
  component: BmbRadialComponent,
  tags: ['!autodocs'],
  parameters: {
    controls: {
      exclude: ['handleKeyPress', 'handleRadioChange', 'handleRadioKeyDown'],
    },
    docs: {
      description: {
        component: `
${getFieldDescription(
  'radial',
  'select an option from a collection or group of radio buttons; it is recommended to implement it as a collection.',
  'https://bamboo.tec.mx/latest/componentes/radial/descripcion-general-rxLTXDDQ',
)}
${getCheckboxOrRadialArchitecture('radial')}
${getFormExampleBlock('BmbRadialComponent', inputName, additionalBlock, inputExample)}
${getDescribeTypeTextBlock('HTML')}
        `,
      },
    },
  },
  argTypes: {
    inputId: InputParameterDescriptions.inputId,
    id: InputParameterDescriptions.id,
    checked: {
      control: { type: 'boolean' },
      description: `
Sets the value given to the radial when true.
${InputParameterDescriptions.value.description}
`,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: InputParameterDescriptions.disabledFormControl,
    required: InputParameterDescriptions.isRequired,
    value: {
      control: { type: 'text' },
      description: 'Sets the value of the control when the radial is true.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    name: {
      ...InputParameterDescriptions.value,
      description: `
${InputParameterDescriptions.value.description}

Multiple radials can share the same name to create a group where one item can be selected.
      `,
    },
    label: InputParameterDescriptions.radialLabel,
    ariaDescribedby: InputParameterDescriptions.ariaDescribedBy,
    ariaLabel: InputParameterDescriptions.ariaLabel,
    ariaLabelledby: InputParameterDescriptions.ariaDescribedBy,
    labelPosition: InputParameterDescriptions.radialLabelPosition,
    control: InputParameterDescriptions.control,
    errorMessage: InputParameterDescriptions.errorMessage,
    helperMessage: InputParameterDescriptions.helperMessage,
    showError: InputParameterDescriptions.showError,
    change: {
      control: {
        type: '',
      },
      description: `
Emits an event when the state of the the radial changes.
      `,
      table: {
        category: 'Events',
        type: { summary: '(change)="handleRadial($event)"' },
      },
    },
    onKeyDown: InputParameterDescriptions.onKeyDown,
  },
  args: {
    inputId: 'radio1',
    name: '',
    value: '',
    checked: false,
    disabled: false,
    required: false,
    label: 'Contract for teacher CCM.pdf',
    labelPosition: 'after',
    ariaDescribedby: '',
    ariaLabel: '',
    ariaLabelledby: '',
    change: () => {
      console.log('Radial clicked');
    },
  },
} as Meta<typeof BmbRadialComponent>;

type Story = StoryObj<BmbRadialComponent>;

export const Default: Story = {};
