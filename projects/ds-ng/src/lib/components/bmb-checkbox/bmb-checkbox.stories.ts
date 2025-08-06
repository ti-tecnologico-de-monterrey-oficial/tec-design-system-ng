import { Meta, StoryObj } from '@storybook/angular';
import { BmbCheckboxComponent } from './bmb-checkbox.component';
import {
  generateLabel,
  getBasicExampleBlock,
  getCheckboxOrRadialArchitecture,
  getFieldDescription,
  getFormatName,
  getFormExampleBlock,
  getOnEvent,
  IBmbOnEvent,
} from '../../utils/doc/utils';
import {
  DBmbInputParamDesc,
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';

const inputName = 'checkbox';
const formatName: string = getFormatName(inputName, '_');
const additionalBlock: string = `
    const element = event.target as HTMLInputElement;
    console.log('${formatName} checked state:', element.checked);
    console.log('${formatName} name:', element.name); `;
const handleChange: IBmbOnEvent = getOnEvent(
  '',
  `${formatName}Change`,
  'Event',
  true,
  additionalBlock,
);
const inputExample = `<bmb-${inputName}
  inputId="${inputName}_id"
  name="${inputName}"
  label="${generateLabel(inputName)}"
  [control]="getFormControl('${inputName}')"
  (change)="${handleChange.propertyValue}"
  />`;
const onChange: IBmbOnEvent = getOnEvent(
  'state of the checkbox',
  'change',
  handleChange.type,
  false,
  additionalBlock,
);

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
${getFieldDescription(
  'checkbox',
  'select one or more options.',
  'https://bamboo.tec.mx/latest/componentes/checkbox/descripcion-general-nl6Z6U1M',
)}
${getCheckboxOrRadialArchitecture('checkbox')}
${getFormExampleBlock('BmbCheckboxComponent', inputName, handleChange.handleExample, inputExample)}
${getBasicExampleBlock('BmbCheckboxComponent', '', onChange.handleExample)}
        `,
      },
    },
  },
  argTypes: {
    inputId: DBmbInputParamDesc.inputId,
    id: DBmbInputParamDesc.id,
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
    disabled: DBmbInputParamDesc.disabled,
    required: DBmbInputParamDesc.isRequired,
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
      ...DBmbInputParamDesc.value,
      description: `
${DBmbInputParamDesc.value.description}

**Important:**
For cases where this field is part of a checkbox list, this will be the value that will be sent with the form if the checkbox is checked.
      `,
    },
    name: {
      ...DBmbInputParamDesc.value,
      description: `
${DBmbInputParamDesc.value.description}

Multiple checkboxes can share the same name to create a group where multiple items can be selected.
      `,
    },
    label: DBmbInputParamDesc.checkboxLabel,
    ariaDescribedby: DBmbInputParamDesc.ariaDescribedBy,
    ariaLabel: DBmbInputParamDesc.ariaLabel,
    ariaLabelledby: DBmbInputParamDesc.ariaLabelledBy,
    labelPosition: DBmbInputParamDesc.checkboxLabelPosition,
    control: DBmbInputParamDesc.control,
    errorMessage: DBmbInputParamDesc.errorMessage,
    helperMessage: DBmbInputParamDesc.helperMessage,
    showError: DBmbInputParamDesc.showError,
    change: getOnEventParam(
      onChange,
      `, such as when it is checked or unchecked.

This can be used to trigger functions or actions based on the checkbox’s state change.`,
    ),
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
