import { Meta, StoryObj } from '@storybook/angular';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { BmbDateTimePickerComponent } from './bmb-date-time-picker.component';
import { DBmbInputParamDesc, getDefaultValueControl } from '@docs/utils/parameterDescriptions';

export default {
  title: 'Components/Inputs/Date time picker',
  component: BmbDateTimePickerComponent,
  parameters: {
    docs: {
      description: {
        component:
          'A single FormControl stores the selected value as date - time, for example 03/11/2026 - 09:30 AM.',
      },
    },
  },
  argTypes: {
    name: DBmbInputParamDesc.name,
    inputId: DBmbInputParamDesc.inputId,
    labelDate: DBmbInputParamDesc.label,
    labelTime: DBmbInputParamDesc.label,
    dateFormat: DBmbInputParamDesc.dateFormat,
    timeFormat: DBmbInputParamDesc.timeFormat,
    minuteStep: DBmbInputParamDesc.minuteStep,
    isRequired: DBmbInputParamDesc.isRequired,
    disabled: DBmbInputParamDesc.disabled,
    isClearable: DBmbInputParamDesc.isClearable,
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
    dateHelperMessage: DBmbInputParamDesc.helperMessage,
    timeHelperMessage: DBmbInputParamDesc.helperMessage,
    customValidation: DBmbInputParamDesc.customValidation,
    errorMessage: DBmbInputParamDesc.errorMessage,
    control: DBmbInputParamDesc.control,
  },
  args: {
    name: 'date_time',
    labelDate: 'Date',
    labelTime: 'Time',
    inputId: 'date_time_id',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '12h',
    minuteStep: 15,
    disabled: false,
    isRequired: false,
    isClearable: false,
    disableDatesBefore: '',
    disableDatesAfter: '',
    customValidation: null,
    dateHelperMessage: 'This is a helper message',
    timeHelperMessage: 'This is a helper message',
    errorMessage: 'Select a valid date and time',
  },
} as Meta<typeof BmbDateTimePickerComponent>;

type Story = StoryObj<BmbDateTimePickerComponent>;

export const Default: Story = {};
export const Format24h: Story = { args: { timeFormat: '24h' } };
export const Required: Story = { args: { isRequired: true } };
export const WithCustomValidation: Story = {
  args: {
    control: new FormControl('03/11/2026 - 09:30 AM'),
    customValidation: (control: AbstractControl): ValidationErrors | null =>
      typeof control.value === 'string' && control.value.endsWith('PM')
        ? null
        : { customValidation: true },
    errorMessage: { customValidation: 'Select an afternoon time' },
  },
};
