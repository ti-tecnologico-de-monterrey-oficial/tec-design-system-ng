import { Meta, StoryObj } from '@storybook/angular';
import { BmbDatepickerComponent } from './bmb-datepicker.component';
import {
  DBmbInputParamDesc,
  getDefaultValueControl,
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';
import {
  getArchitectureSection,
  getBasicExampleBlock,
  getFieldDescription,
  getFormatName,
  getFormExampleBlock,
  getOnEvent,
  IBmbOnEvent,
} from '../../utils/doc/utils';

const inputName = 'date_picker';
const formatName: string = getFormatName(inputName, '_');
const handleChange: IBmbOnEvent = getOnEvent(
  '',
  `${formatName}Change`,
  'string',
  true,
);
const inputExample = `  <bmb-datepicker
    inputId="${inputName}_id"
    name="${inputName}"
    label="Date"
    [control]="getFormControl('${inputName}')"
    (onChange)="${handleChange.propertyValue}"
  />`;
const onChange: IBmbOnEvent = getOnEvent('date', 'onChange', handleChange.type);

export default {
  title: 'Components/Inputs/Calendar date picker',
  component: BmbDatepickerComponent,
  tags: ['!autodocs'],
  parameters: {
    controls: {
      exclude: [
        'defaultDate',
        'isWindowOpen',
        'now',
        'stepYearPicker',
        'clickOutside',
        'convertToDate',
        'customValidatorDate',
        'handleFocusedEvent',
        'handleValueChange',
        'handleWindowOpen',
        'customValidationMessage',
        '',
        '',
        '',
        '',
      ],
    },
    docs: {
      description: {
        component: `
${getFieldDescription(
  'datepicker',
  'select a date from a calendar view, within a dialog box.',
  'https://bamboo.tec.mx/latest/componentes/calendar-date-picker/descripcion-general-JXYISTju',
)}
${getArchitectureSection(
  `
<div class="bmb_datepicker">
  <section class="bmb-datepicker-container">
    <bmb-input>

      <!-- if window is open -->
      <ng-template #customInputContent>
        <bmb-datepicker-modal class="bmb_datepicker-modal" />
      </ng-template>

    </bmb-input>
  </section>
</div>
`,
  false,
  'input',
  'components-inputs-text-input',
)}
${getFormExampleBlock(
  'BmbDatepickerComponent',
  inputName,
  `${handleChange.handleExample}
  `,
  inputExample,
)}
${getBasicExampleBlock('BmbDatepickerComponent', '', onChange.handleExample)}
        `,
      },
    },
  },
  argTypes: {
    control: DBmbInputParamDesc.control,
    icon: {
      ...DBmbInputParamDesc.icon,
      table: {
        ...DBmbInputParamDesc.icon.table,
        defaultValue: getDefaultValueControl('calendar_month'),
      },
    },
    invalidFormatErrorMessage: DBmbInputParamDesc.invalidFormatErrorMessage,
    requiredFieldErrorMessage: DBmbInputParamDesc.requiredFieldErrorMessage,
    isRequired: DBmbInputParamDesc.isRequired,
    placeholder: {
      ...DBmbInputParamDesc.placeholder,
      table: {
        ...DBmbInputParamDesc.placeholder.table,
        defaultValue: getDefaultValueControl(
          'value assigned to the dateFormat property',
        ),
      },
    },
    disabled: DBmbInputParamDesc.disabled,
    label: DBmbInputParamDesc.label,
    isClearable: DBmbInputParamDesc.isClearable,
    dateFormat: DBmbInputParamDesc.dateFormat,
    name: DBmbInputParamDesc.name,
    disableDatesBefore: {
      control: {
        type: 'text',
      },
      description: `
Sets the date that indicates previous dates as disabled.

This date must have the same format as \`dateFormat\`.
      `,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    disableDatesAfter: {
      control: {
        type: 'text',
      },
      description: `
Sets the date that indicates later dates as disabled.

This date must have the same format as \`dateFormat\`.
      `,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    lang: {
      control: {
        type: 'text',
      },
      description: 'Sets the language to be used in the component.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl('es-MX'),
      },
    },

    helperMessage: {
      ...DBmbInputParamDesc.helperMessage,
      table: {
        ...DBmbInputParamDesc.helperMessage.table,
        defaultValue: getDefaultValueControl(),
      },
    },
    value: DBmbInputParamDesc.value,
    inputId: DBmbInputParamDesc.inputId,
    onChange: getOnEventParam(onChange),
    errorMessage: DBmbInputParamDesc.errorMessage,
    customValidation: DBmbInputParamDesc.customValidation,
  },
  args: {
    inputId: 'test_id',
    name: 'test_id',
    value: '',
    label: 'Date',
    icon: 'calendar_month',
    placeholder: 'dd/MM/yyyy',
    dateFormat: 'dd/MM/yyyy',
    disabled: false,
    isClearable: false,
    isRequired: false,
    helperMessage: 'dd/MM/yyyy',
    invalidFormatErrorMessage: 'Please enter a date in a valid format',
    requiredFieldErrorMessage: 'Please enter the date',
    disableDatesBefore: '',
    disableDatesAfter: '',
    lang: 'es-MX',
    onChange: () => {
      console.info('onChange');
    },
  },
} as Meta<typeof BmbDatepickerComponent>;

type Story = StoryObj<BmbDatepickerComponent>;

export const Default: Story = {};
