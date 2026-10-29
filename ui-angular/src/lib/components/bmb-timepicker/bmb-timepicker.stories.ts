import { Meta, StoryObj } from '@storybook/angular';
import { FormControl } from '@angular/forms';
import { BmbTimepickerComponent } from './bmb-timepicker.component';

export default {
  title: 'Components/Inputs/Time picker',
  component: BmbTimepickerComponent,
  argTypes: {
    format: { control: 'radio', options: ['12h', '24h'] },
    minuteStep: { control: 'number' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    isRequired: { control: 'boolean' },
    isClearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Hora inicio',
    name: 'time_picker',
    format: '12h',
    minuteStep: 15,
    isRequired: true,
    isClearable: false,
    disabled: false,
    control: new FormControl(''),
  },
} as Meta<typeof BmbTimepickerComponent>;

type Story = StoryObj<BmbTimepickerComponent>;

export const Default: Story = {};
export const Format24h: Story = { args: { format: '24h' } };
export const WithValue: Story = { args: { control: new FormControl('09:30 AM') } };
