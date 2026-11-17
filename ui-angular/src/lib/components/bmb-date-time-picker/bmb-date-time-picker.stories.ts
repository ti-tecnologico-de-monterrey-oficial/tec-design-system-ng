import { Meta, StoryObj } from '@storybook/angular';
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
    timeFormat: {
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
    isRequired: DBmbInputParamDesc.isRequired,
    disabled: DBmbInputParamDesc.disabled,
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
    control: DBmbInputParamDesc.control,
  },
  args: {
    name: 'date_time',
    labelDate: 'Fecha',
    labelTime: 'Hora',
    inputId: 'date_time_id',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '12h',
    minuteStep: 15,
    disabled: false,
    isRequired: false,
    disableDatesBefore: '',
    disableDatesAfter: '',
  },
} as Meta<typeof BmbDateTimePickerComponent>;

type Story = StoryObj<BmbDateTimePickerComponent>;

export const Default: Story = {};
export const Format24h: Story = { args: { timeFormat: '24h' } };
