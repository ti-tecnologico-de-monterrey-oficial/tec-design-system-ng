import { Meta, StoryObj } from '@storybook/angular';
import { BmbRadialComponent } from './bmb-radial.component';
import {
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
  getDefaultValueControl,
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';

const inputName = 'radial_group';
const formatName: string = getFormatName(inputName, '_');
const additionalBlock: string = `
    console.log('${formatName} checked state:', event.checked);
    console.log('${formatName} name:', event.name); `;
const handleChange: IBmbOnEvent = getOnEvent(
  '',
  `${formatName}Change`,
  'HTMLInputElement',
  true,
  additionalBlock,
);
const inputExample = `<bmb-radial
  inputId="radial_id1"
  name="${inputName}"
  label="Radial A"
  value="A"
  [control]="getFormControl('${inputName}')"
  (change)="${handleChange.propertyValue}"
  />
  <bmb-radial
  inputId="radial_id2"
  name="${inputName}"
  label="Radial B"
  value="B"
  [control]="getFormControl('${inputName}')"
  (change)="${handleChange.propertyValue}"
  />`;
const onChange: IBmbOnEvent = getOnEvent(
  'state of the radial',
  'change',
  handleChange.type,
  false,
  additionalBlock,
);

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
${getFormExampleBlock('BmbRadialComponent', inputName, handleChange.propertyValue, inputExample)}
${getBasicExampleBlock('BmbRadialComponent', '', onChange.handleExample)}
        `,
      },
    },
  },
  argTypes: {
    inputId: DBmbInputParamDesc.inputId,
    checked: {
      control: { type: 'boolean' },
      description: `
Sets the value given to the radial when true.
${DBmbInputParamDesc.value.description}
`,
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    disabled: DBmbInputParamDesc.disabled,
    required: DBmbInputParamDesc.isRequired,
    value: {
      control: { type: 'text' },
      description: 'Sets the value of the control when the radial is true.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    name: {
      ...DBmbInputParamDesc.value,
      description: `
${DBmbInputParamDesc.value.description}

Multiple radials can share the same name to create a group where one item can be selected.
      `,
    },
    label: DBmbInputParamDesc.radialLabel,
    ariaDescribedby: DBmbInputParamDesc.ariaDescribedBy,
    ariaLabel: DBmbInputParamDesc.ariaLabel,
    ariaLabelledby: DBmbInputParamDesc.ariaDescribedBy,
    labelPosition: DBmbInputParamDesc.radialLabelPosition,
    control: DBmbInputParamDesc.control,
    errorMessage: DBmbInputParamDesc.errorMessage,
    helperMessage: DBmbInputParamDesc.helperMessage,
    showError: DBmbInputParamDesc.showError,
    change: getOnEventParam(onChange),
    onKeyDown: DBmbInputParamDesc.onKeyDown,
  },
  args: {
    inputId: 'radio1',
    name: 'radio1',
    value: 'radio1',
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
    onKeyDown: () => {
      console.log('Radial onKeyDown');
    },
  },
} as Meta<typeof BmbRadialComponent>;

type Story = StoryObj<BmbRadialComponent>;

export const Default: Story = {};
