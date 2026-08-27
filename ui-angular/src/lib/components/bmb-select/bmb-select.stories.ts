import type { Meta, StoryObj } from '@storybook/angular';
import { BmbSelectComponent } from './bmb-select.component';
import { BmbSelectItemComponent } from './bmb-select-item/bmb-select-item.component';

const meta: Meta<BmbSelectComponent> = {
  title: 'Components/Inputs/Select',
  component: BmbSelectComponent,
  subcomponents: { BmbSelectItemComponent },
  render: (args) => ({
    props: args,
    template: `
      <bmb-select [value]="value" (onValueChange)="onValueChange($event)">
        <span selectTemplate>Selecciona una opción</span>
        <bmb-select-item value="first">Primera opción</bmb-select-item>
        <bmb-select-item value="second">Segunda opción</bmb-select-item>
        <bmb-select-item value="third">Tercera opción</bmb-select-item>
      </bmb-select>
    `,
  }),
  args: {
    value: 'first',
  },
  argTypes: {
    onValueChange: { action: 'onValueChange' },
  },
};

export default meta;
type Story = StoryObj<BmbSelectComponent>;

export const Default: Story = {};
