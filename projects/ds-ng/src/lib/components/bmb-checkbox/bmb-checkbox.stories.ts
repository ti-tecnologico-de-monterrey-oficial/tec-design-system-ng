import { Meta, StoryObj } from '@storybook/angular';
import { BmbCheckboxComponent } from './bmb-checkbox.component';
import {
  getCheckboxOrRadialArchitecture,
  getDescribeTypeTextBlock,
  getGeneralComponentDescription,
  getHTMLFormExampleTextBlock,
  getTypescriptFormExampleTextBlock,
} from '../../utils/doc/utils';
import { InputParameterDescriptions } from '../../utils/doc/parameterDescriptions';

const inputName = 'checkbox';
const additionalBlock = `handleCheckboxChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    console.log('Checkbox checked state:', element.checked);
    console.log('Checkbox name:', element.name);
  }`;
const bmbInputName = `<bmb-checkbox
  inputId="checkbox_id"
  name="${inputName}"
  label="Checkbox"
  [control]="getFormControl('${inputName}')"
  (change)="handleCheckboxChange($event)"
  />`;
export default {
  title: 'Components/Inputs/Checkbox',
  component: BmbCheckboxComponent,
  tags: ['!autodocs'],
  parameters: {
    controls: {
      exclude: ['handleChange', 'handleKeyDown'],
    },
    docs: {
      description: {
        component: `
${getGeneralComponentDescription('bmb-checkbox', 'select one or more options.')}
${getCheckboxOrRadialArchitecture('checkbox')}
${getTypescriptFormExampleTextBlock('BmbCheckboxComponent', inputName, additionalBlock)}
${getHTMLFormExampleTextBlock(bmbInputName)}
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
Determines whether the checkbox is checked or unchecked.

If this property is set to **true**, the checkbox is selected; if set to **false**, it is unchecked.
      `,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: InputParameterDescriptions.disabled,
    required: InputParameterDescriptions.isRequired,
    indeterminate: {
      control: { type: 'boolean' },
      description: `
Sets the checkbox to an indeterminate state, which is typically used to represent a mixed state in complex forms like tree views or nested lists.

**Note:**

This does not affect the checked property and is purely visual.
      `,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    value: {
      ...InputParameterDescriptions.value,
      description: `
${InputParameterDescriptions.value.description}

**Important:**
For cases where this field is part of a checkbox list, this will be the value that will be sent with the form if the checkbox is checked.
      `,
    },
    name: {
      ...InputParameterDescriptions.value,
      description: `
${InputParameterDescriptions.value.description}

Multiple checkboxes can share the same name to create a group where multiple items can be selected.
      `,
    },
    label: InputParameterDescriptions.checkboxLabel,
    ariaDescribedby: InputParameterDescriptions.ariaDescribedBy,
    ariaLabel: InputParameterDescriptions.ariaLabel,
    ariaLabelledby: InputParameterDescriptions.ariaLabelledBy,
    labelPosition: InputParameterDescriptions.checkboxLabelPosition,
    control: InputParameterDescriptions.control,
    errorMessage: InputParameterDescriptions.errorMessage,
    helperMessage: InputParameterDescriptions.helperMessage,
    showError: InputParameterDescriptions.showError,
    change: {
      control: {
        type: '',
      },
      description: `
Emits an event when the state of the checkbox changes, such as when it is checked or unchecked.

This can be used to trigger functions or actions based on the checkbox’s state change.
      `,
      table: {
        category: 'Events',
        type: { summary: '(change)="handleCheckboxChange($event)"' },
      },
    },
  },
  args: {
    inputId: 'checkbox1',
    name: '',
    indeterminate: false,
    value: '',
    checked: false,
    label: 'Contrato profesor cátedra Biología marina CCM.pdf',
    labelPosition: 'after',
    disabled: false,
    required: false,
    ariaDescribedby: '',
    ariaLabel: '',
    ariaLabelledby: '',
    change: () => {
      console.info('Checkbox clicked');
    },
  },
} as Meta<typeof BmbCheckboxComponent>;

type Story = StoryObj<BmbCheckboxComponent>;

export const Default: Story = {};
