import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { BmbDatepickerComponent } from './bmb-datepicker.component';
import { InputParameterDescriptions } from '../../utils/doc/parameterDescriptions';
import {
  getArchitectureSection,
  getBasicExampleBlock,
  getFieldDescription,
  getFormExampleBlock,
} from '../../utils/doc/utils';

const inputName = 'date_picker';
const inputExample = `<bmb-datepicker
  inputId="date_picker_id"
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
${getFieldDescription(
  'bmb-datepicker',
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
  'input',
  'components-inputs-text-input',
)}
${getFormExampleBlock('BmbDatepickerComponent', inputName, '', inputExample)}
${getBasicExampleBlock('BmbDatepickerComponent')}
        `,
      },
    },
  },
  argTypes: {
    control: InputParameterDescriptions.control,
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
    isRequired: InputParameterDescriptions.isRequired,
    placeholder: {
      ...InputParameterDescriptions.placeholder,
      table: {
        ...InputParameterDescriptions.placeholder.table,
        defaultValue: { summary: 'value assigned to the dateFormat property' },
      },
    },
    disabled: InputParameterDescriptions.disabledFormControl,
    label: InputParameterDescriptions.label,
    appearance: InputParameterDescriptions.deprecated,
    isClearable: InputParameterDescriptions.isClearable,
    dateFormat: InputParameterDescriptions.dateFormat,
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
    helperMessage: {
      ...InputParameterDescriptions.helperMessage,
      table: {
        ...InputParameterDescriptions.helperMessage.table,
        defaultValue: { summary: 'value assigned to the dateFormat property' },
      },
    },
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
  },
} as Meta<typeof BmbDatepickerComponent>;

type Story = StoryObj<BmbDatepickerComponent>;

export const Default: Story = {};
