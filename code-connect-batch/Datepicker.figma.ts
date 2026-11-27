// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=16210-77001
// source=ui-angular/src/lib/components/bmb-datepicker/bmb-datepicker.component.ts
// component=BmbDatepickerComponent
import figma from 'figma'
import { escapeAttribute } from './escape-attribute'
import { getIcon } from './icon-image'

const instance = figma.selectedInstance
const disabled = instance.getPropertyValue('state') === 'disabled'
const isRequired = instance.getBoolean('isRequired')
const isClearable = instance.getBoolean('isClearable')
const showLabel = instance.getBoolean('showLabel')
const showHelperMessage = instance.getBoolean('showHelperMessage')

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleOnChange(event: Parameters<BmbDatepickerComponent['onChange']['emit']>[0]): void {
    console.info('onChange', event);
  }

  control = new FormControl('');
}
</script>

<bmb-datepicker
  (onChange)="handleOnChange($event)"
  [control]="control"
  icon="${getIcon('calendar_month')}"
  requiredFieldErrorMessage="Please enter the date"
  [isRequired]="${isRequired ?? false}"
  placeholder="${escapeAttribute(instance.getString("placeholder") ?? "dd/MM/yyyy")}"
  [disabled]="${disabled ?? false}"
  [isClearable]="${isClearable ?? false}"
  label="${escapeAttribute(showLabel === false ? '' : instance.getString("label") ?? "Date")}"
  dateFormat="dd/MM/yyyy"
  name="test_id"
  disableDatesBefore=""
  disableDatesAfter=""
  helperMessage="${escapeAttribute(showHelperMessage === false ? '' : instance.getString("helperMessage") ?? "dd/MM/yyyy")}"
  errorMessage=""
/>`,
  imports: [
    "import { FormControl } from '@angular/forms'",
    "import { BmbDatepickerComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-datepicker',
}
