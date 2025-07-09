import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { BmbDatepickerComponent } from './bmb-datepicker.component';
import { InputParameterDescriptions } from '../../utils/doc/parameterDescriptions';
import {
  getDescribeTypeTextBlock,
  getGeneralComponentDescription,
  getHTMLFormExampleTextBlock,
  getInputArchitecture,
  getTypescriptFormExampleTextBlock,
} from '../../utils/doc/utils';

const inputName = 'datepicker1';
const bmbInputName = `<bmb-datepicker
  inputId="datepicker_id1"
  name="${inputName}"
  label="Date"
  [control]="getFormControl('${inputName}')"
  />`;

export default {
  title: 'Components/Inputs/Calendar date picker',
  component: BmbDatepickerComponent,
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
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralComponentDescription('bmb-datepicker', 'enter date data.')}
${getInputArchitecture()}
${getTypescriptFormExampleTextBlock('BmbDatepickerComponent', inputName)}
${getHTMLFormExampleTextBlock(bmbInputName)}
${getDescribeTypeTextBlock('HTML')}
        `,
      },
    },
  },
  argTypes: {
    control: InputParameterDescriptions.control,
    icon: InputParameterDescriptions.icon,
    invalidFormatErrorMessage: {
      control: {
        type: 'text',
      },
      description: 'Sets an error message for format field validation',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: {
          summary: 'Por favor ingresa la fecha con formato [dateFormat]}',
        },
      },
    },
    requiredFieldErrorMessage: {
      control: {
        type: 'text',
      },
      description: 'Sets an error message for required field validation',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Por favor ingresa la fecha de [label]' },
      },
    },
    isRequired: InputParameterDescriptions.isRequired,
    placeholder: InputParameterDescriptions.placeholder,
    disabled: InputParameterDescriptions.disabled,
    label: InputParameterDescriptions.label,
    appearance: InputParameterDescriptions.deprecated,
    isClearable: InputParameterDescriptions.isClearable,
    dateFormat: {
      control: {
        type: 'text',
      },
      description:
        'Sets the date format allowed for validation of entered data.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'dd/MM/yyyy' },
      },
    },
    name: InputParameterDescriptions.name,
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
        defaultValue: { summary: '' },
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
        defaultValue: { summary: '' },
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
        defaultValue: { summary: 'es-MX' },
      },
    },
    helperMessage: InputParameterDescriptions.helperMessage,
    value: InputParameterDescriptions.value,
    inputId: InputParameterDescriptions.inputId,
    onChange: {
      control: { type: 'string' },
      description: 'Emits change event.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
      },
    },
  },

  args: {
    inputId: '',
    name: '',
    value: '',
    label: 'Date',
    icon: 'calendar_month',
    placeholder: '',
    dateFormat: 'dd/MM/yyyy',
    disabled: false,
    isClearable: false,
    isRequired: false,
    helperMessage: '',
    invalidFormatErrorMessage: 'Please enter a date in a valid format.',
    requiredFieldErrorMessage: 'Please enter the date',
    disableDatesBefore: '',
    disableDatesAfter: '',
    lang: 'es-MX',
  },
} as Meta<typeof BmbDatepickerComponent>;

type Story = StoryObj<BmbDatepickerComponent>;

export const Default: Story = {};
