import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { BmbDateRangeComponent } from './bmb-date-range.component';
import {
  generateLabel,
  getArchitectureSection,
  getBasicExampleBlock,
  getFieldDescription,
  getFormExampleBlock,
} from '../../utils/doc/utils';
import {
  getControlDescription,
  DBmbInputParamDesc,
  DBmbGenericParamDesc,
  getDefaultValueControl,
} from '../../utils/doc/parameterDescriptions';

const inputName = 'date_range';
const label = generateLabel(inputName);
const inputExample = `<bmb-date-range
  inputId="${inputName}_id"
  name="${inputName}"
  labelStartDate="${label} start"
  labelEndDate="${label} end"
  [controlStart]="getFormControl('${inputName}_start')"
  [controlEnd]="getFormControl('${inputName}_end')"
  />`;

export default {
  title: 'Components/Inputs/Date picker range',
  component: BmbDateRangeComponent,
  tags: ['!autodocs'],
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `
        <div style="height: 35rem">
          ${story}
        </div>`;
    }),
  ],
  parameters: {
    controls: {
      exclude: [
        'disableDatesAfter',
        'disableDatesBefore',
        'isControlEndNull',
        'isControlStartNull',
        'stepYearPicker',
        'getClassList',
      ],
    },
    docs: {
      description: {
        component: `
${getFieldDescription(
  'date-range',
  'select a span of dates, with a start and end date from a calendar view, within a dialog box.',
  'https://bamboo.tec.mx/latest/componentes/date-picker-range/descripcion-general-DhZ4ML3S',
)}
${getArchitectureSection(
  `
<section class="bmb_date-range" <!-- conditional class bmb_date-range-column -->>
  <bmb-datepicker/>
  <bmb-datepicker/>
</section>
`,
  false,
  'datepicker',
  'components-inputs-calendar-date-picker',
)}
${getFormExampleBlock(
  'BmbDateRangeComponent',
  `${inputName}_start: new FormControl(),
      ${inputName}_end`,
  '',
  inputExample,
)}
${getBasicExampleBlock('BmbDateRangeComponent')}
        `,
      },
    },
  },
  argTypes: {
    label: DBmbGenericParamDesc.deprecated,
    labelStartDate: {
      ...DBmbInputParamDesc.label,
      description: DBmbInputParamDesc.label.description.replace(
        'field',
        'start date field',
      ),
    },
    labelEndDate: {
      ...DBmbInputParamDesc.label,
      description: DBmbInputParamDesc.label.description.replace(
        'field',
        'end date field',
      ),
    },
    placeholderStartDate: {
      ...DBmbInputParamDesc.placeholder,
      description: DBmbInputParamDesc.placeholder.description.replace(
        'field',
        'start date field',
      ),
      table: {
        ...DBmbInputParamDesc.placeholder.table,
        defaultValue: getDefaultValueControl(
          'value assigned to the dateFormat property',
        ),
      },
    },
    placeholderEndDate: {
      ...DBmbInputParamDesc.placeholder,
      description: DBmbInputParamDesc.placeholder.description.replace(
        'field',
        'end date field',
      ),
      table: {
        ...DBmbInputParamDesc.placeholder.table,
        defaultValue: getDefaultValueControl(
          'value assigned to the dateFormat property',
        ),
      },
    },
    icon: {
      ...DBmbInputParamDesc.icon,
      table: {
        ...DBmbInputParamDesc.icon.table,
        defaultValue: getDefaultValueControl('calendar_month'),
      },
    },
    invalidFormatErrorMessage: DBmbInputParamDesc.invalidFormatErrorMessage,
    requiredFieldErrorMessage: DBmbInputParamDesc.requiredFieldErrorMessage,
    appearance: DBmbGenericParamDesc.deprecated,
    disabled: DBmbInputParamDesc.disabled,
    isRequired: DBmbInputParamDesc.isRequired,
    isClearable: DBmbInputParamDesc.isClearable,
    controlStart: {
      ...DBmbInputParamDesc.control,
      description: `
${getControlDescription().replace('field', 'start date field')}

The name of the \`FormControl\` must consist of the name assigned in the \`name\` property and must end with the word ***start***

**Example:**

- Name property in HTML: \`name="date_range"\`
- FormControl instantiation in TypesScript: \`date_range_start: new FormControl()\`
      `,
      table: {
        ...DBmbInputParamDesc.control.table,
        type: {
          ...DBmbInputParamDesc.control.table.type,
          detail: getControlDescription(true)
            .replaceAll('*', '')
            .replaceAll(
              '<br/>',
              `
            `,
            ),
        },
      },
    },
    controlEnd: {
      ...DBmbInputParamDesc.control,
      description: `
${getControlDescription().replace('field', 'end date field')}

The name of the \`FormControl\` must consist of the name assigned in the \`name\` property and must end with the word ***end***

**Example:**

- Name property in HTML: \`name="date_range"\`
- FormControl instantiation in TypesScript: \`date_range_end: new FormControl()\`
      `,
      table: {
        ...DBmbInputParamDesc.control.table,
        type: {
          ...DBmbInputParamDesc.control.table.type,
          detail: getControlDescription(true),
        },
      },
    },
    dateFormat: DBmbInputParamDesc.dateFormat,
    name: DBmbInputParamDesc.name,
    errorMessage: DBmbInputParamDesc.errorMessage,
    customValidation: DBmbInputParamDesc.customValidation,
    multipleRow: {
      control: { type: 'boolean' },
      description: 'Sets the mobile version when true.',

      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    inputId: DBmbInputParamDesc.inputId,
  },
  args: {
    inputId: '',
    name: 'custom_date_picker',
    labelStartDate: 'Start date',
    labelEndDate: 'End date',
    icon: 'calendar_month',
    placeholderStartDate: 'dd/MM/yyyy',
    placeholderEndDate: 'dd/MM/yyyy',
    dateFormat: 'dd/MM/yyyy',
    disabled: false,
    isRequired: false,
    isClearable: false,
    multipleRow: false,
    invalidFormatErrorMessage: 'Please enter a date in a valid format',
    requiredFieldErrorMessage: 'Please enter the date',
    controlStart: null,
    controlEnd: null,
  },
} as Meta<typeof BmbDateRangeComponent>;

type Story = StoryObj<BmbDateRangeComponent>;

export const Default: Story = {};
