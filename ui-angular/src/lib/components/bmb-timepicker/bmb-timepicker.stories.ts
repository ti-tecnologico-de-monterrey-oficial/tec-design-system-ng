import { Meta, StoryObj } from '@storybook/angular';
import { FormControl } from '@angular/forms';
import { BmbTimepickerComponent } from './bmb-timepicker.component';
import { getArchitectureSection, getBasicExampleBlock, getFieldDescription, getFormatName, getFormExampleBlock, getOnEvent, IBmbOnEvent } from '@docs/utils/utils';
import { DBmbInputParamDesc, getOnEventParam } from '@docs/utils/parameterDescriptions';

const inputName = 'time_picker';
const formatName: string = getFormatName(inputName, '_');
const handleChange: IBmbOnEvent = getOnEvent(
  '',
  `${formatName}Change`,
  'string',
  true,
);
const inputExample = `  <bmb-timepicker
  inputId="${inputName}_id"
  name="${inputName}"
  label="Time"
  [control]="getFormControl('${inputName}')"
  (onChange)="${handleChange.propertyValue}"
/>`;
const getChange: IBmbOnEvent = getOnEvent(
  'field',
  'getChange',
  handleChange.type,
);
const getFocus: IBmbOnEvent = getOnEvent(
  'field',
  'getFocus',
  'boolean',
);

export default {
  title: 'Components/Inputs/Time picker',
  component: BmbTimepickerComponent,
  parameters: {
    docs: {
      description: {
        component:`
${getFieldDescription(
  'timepicker',
  'select a time from a time picker interface.',
  'https://bamboo.tec.mx/latest/components/time-picker/descripcion-general-NLVjT8sT',
)}
${getArchitectureSection(
  `
<div class="bmb_timepicker">
  <section class="bmb-timepicker-container">
    <bmb-input>

      <!-- if window is open -->
      <ng-template #customInputContent>
        <bmb-timepicker-modal class="bmb_timepicker-modal" />
      </ng-template>

    </bmb-input>
  </section>
</div>
`,
  'input',
  'components-inputs-text-input',
)}
${getFormExampleBlock(
  'BmbTimepickerComponent',
  inputName,
  `${handleChange.handleExample}
  `,
  inputExample,
)}
${getBasicExampleBlock('BmbTimepickerComponent', '', handleChange.handleExample)}
        `
      },
    },
  },
  argTypes: {
    format: {
      control: 'radio',
      options: ['12h', '24h'],
      description: 'Select the time format (12h or 24h).',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '12h' },
      },
   },
    minuteStep: {
      control: 'select',
      options: [1, 2, 5, 10, 15, 30],
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: 15 },
      },
    },
    label: DBmbInputParamDesc.label,
    placeholder: DBmbInputParamDesc.placeholder,
    isRequired: DBmbInputParamDesc.isRequired,
    isClearable: DBmbInputParamDesc.isClearable,
    disabled: DBmbInputParamDesc.disabled,
    name: DBmbInputParamDesc.name,
    inputId: DBmbInputParamDesc.inputId,
    helperMessage: DBmbInputParamDesc.helperMessage,
    customValidation: DBmbInputParamDesc.customValidation,
    errorMessage: DBmbInputParamDesc.errorMessage,
    tooltip: DBmbInputParamDesc.tooltip,
    control: DBmbInputParamDesc.control,
    getChange: getOnEventParam(getChange),
    getFocus: getOnEventParam(getFocus),
  },
  args: {
    format: '12h',
    minuteStep: 15,
    placeholder: 'Select time',
    disabled: false,
    isRequired: false,
    isClearable: false,
    name: 'time_picker',
    inputId: 'time_picker_id',
    helperMessage: 'This is a helper message',
    customValidation: null,
    errorMessage: 'Select a valid time',
    tooltip: 'Tooltip message',
    label: 'Hora inicio',
  },
} as Meta<typeof BmbTimepickerComponent>;

type Story = StoryObj<BmbTimepickerComponent>;

export const Default: Story = {};
export const Format24h: Story = { args: { format: '24h' } };
export const WithValue: Story = {
  args: { control: new FormControl('09:30 AM') },
};
