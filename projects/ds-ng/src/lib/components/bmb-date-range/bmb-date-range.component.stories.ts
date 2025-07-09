import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { BmbDateRangeComponent } from './bmb-date-range.component';
import {
  getArchitectureTitle,
  getDescribeTypeTextBlock,
  getGeneralComponentDescription,
  getHTMLFormExampleTextBlock,
  getTypescriptFormExampleTextBlock,
} from '../../utils/doc/utils';
import {
  getControlDescription,
  InputParameterDescriptions,
} from '../../utils/doc/parameterDescriptions';

const inputName = 'date_range';
const bmbInputName = `<bmb-date-range
  inputId="date_range_id"
  name="${inputName}"
  labelStartDate="Date range start"
  labelEndDate="Date range end"
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
${getGeneralComponentDescription('bmb-date-range', 'select a span of dates, with a start and end date from a calendar view, within a dialog box.')}
${getArchitectureTitle()}
\`\`\`html
<section class="bmb_date-range" <!-- conditional class bmb_date-range-column -->>
  <bmb-datepicker/>
  <bmb-datepicker/>
</section>
\`\`\`
[bmb-datepicker - DOM Architecture](/docs/components-inputs-calendar-date-picker--documentation&globals=#dom-architecture)
${getTypescriptFormExampleTextBlock(
  'BmbDateRangeComponent',
  `${inputName}_start: new FormControl(),
  ${inputName}_end`,
)}
${getHTMLFormExampleTextBlock(bmbInputName)}
${getDescribeTypeTextBlock('HTML')}
        `,
      },
    },
  },
  argTypes: {
    label: InputParameterDescriptions.deprecated,
    labelStartDate: {
      ...InputParameterDescriptions.label,
      description: InputParameterDescriptions.label.description.replace(
        'field',
        'start date field',
      ),
    },
    labelEndDate: {
      ...InputParameterDescriptions.label,
      description: InputParameterDescriptions.label.description.replace(
        'field',
        'end date field',
      ),
    },
    placeholderStartDate: {
      ...InputParameterDescriptions.placeholder,
      description: InputParameterDescriptions.placeholder.description.replace(
        'field',
        'start date field',
      ),
      table: {
        ...InputParameterDescriptions.placeholder.table,
        defaultValue: { summary: 'value assigned to the dateFormat property' },
      },
    },
    placeholderEndDate: {
      ...InputParameterDescriptions.placeholder,
      description: InputParameterDescriptions.placeholder.description.replace(
        'field',
        'end date field',
      ),
      table: {
        ...InputParameterDescriptions.placeholder.table,
        defaultValue: { summary: 'value assigned to the dateFormat property' },
      },
    },
    icon: {
      ...InputParameterDescriptions.icon,
      table: {
        ...InputParameterDescriptions.icon.table,
        defaultValue: { summary: 'calendar_month' },
      },
    },
    invalidFormatErrorMessage:
      InputParameterDescriptions.invalidFormatErrorMessage,
    requiredFieldErrorMessage:
      InputParameterDescriptions.requiredFieldErrorMessage,
    appearance: InputParameterDescriptions.deprecated,
    disabled: InputParameterDescriptions.disabled,
    isRequired: InputParameterDescriptions.isRequired,
    isClearable: InputParameterDescriptions.isClearable,
    controlStart: {
      ...InputParameterDescriptions.control,
      description: `
${getControlDescription().replace('field', 'start date field')}

The name of the \`FormControl\` must consist of the name assigned in the \`name\` property and must end with the word ***start***

**Example:**

- Name property in HTML: \`name="date_range"\`
- FormControl instantiation in TypesScript: \`date_range_start: new FormControl()\`
      `,
      table: {
        ...InputParameterDescriptions.control.table,
        type: {
          ...InputParameterDescriptions.control.table.type,
          detail: getControlDescription(true),
        },
      },
    },
    controlEnd: {
      ...InputParameterDescriptions.control,
      description: `
${getControlDescription().replace('field', 'end date field')}

The name of the \`FormControl\` must consist of the name assigned in the \`name\` property and must end with the word ***end***

**Example:**

- Name property in HTML: \`name="date_range"\`
- FormControl instantiation in TypesScript: \`date_range_end: new FormControl()\`
      `,
      table: {
        ...InputParameterDescriptions.control.table,
        type: {
          ...InputParameterDescriptions.control.table.type,
          detail: getControlDescription(true),
        },
      },
    },
    dateFormat: InputParameterDescriptions.dateFormat,
    name: InputParameterDescriptions.name,
    multipleRow: {
      control: { type: 'boolean' },
      description: 'Sets the mobile version when true.',

      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    inputId: InputParameterDescriptions.inputId,
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
