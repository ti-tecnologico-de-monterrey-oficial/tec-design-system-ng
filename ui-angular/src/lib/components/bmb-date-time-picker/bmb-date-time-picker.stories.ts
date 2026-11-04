import { Meta, StoryObj } from '@storybook/angular';
import { FormControl } from '@angular/forms';
import { BmbDateTimePickerComponent } from './bmb-date-time-picker.component';

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
    timeFormat: { control: 'radio', options: ['12h', '24h'] },
    minuteStep: { control: 'number' },
    labelDate: { control: 'text' },
    labelTime: { control: 'text' },
    isRequired: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    name: 'date_time',
    labelDate: 'Fecha',
    labelTime: 'Hora',
    timeFormat: '12h',
    minuteStep: 15,
    isRequired: false,
    disabled: false,
    control: new FormControl('03/11/2026 - 09:30 AM'),
  },
} as Meta<typeof BmbDateTimePickerComponent>;

type Story = StoryObj<BmbDateTimePickerComponent>;

export const Default: Story = {};
export const Format24h: Story = { args: { timeFormat: '24h' } };
