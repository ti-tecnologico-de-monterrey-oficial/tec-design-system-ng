// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=16231-169020
// source=ui-angular/src/lib/components/bmb-date-range/bmb-date-range.component.ts
// component=BmbDateRangeComponent
import figma from 'figma'
import { escapeAttribute } from './escape-attribute'
import { getIcon } from './icon-image'

const instance = figma.selectedInstance
const disabled = instance.getPropertyValue('State') === 'disabled'
const isRequired = instance.getBoolean('isRequired')
const isClearable = instance.getBoolean('isClearable')
const multipleRow = instance.getBoolean('multipleRow')

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  controlStart = new FormControl('');
  controlEnd = new FormControl('');
}
</script>

<bmb-date-range
  labelStartDate="${escapeAttribute(instance.getString("labelStartDate") ?? "Start date")}"
  labelEndDate="${escapeAttribute(instance.getString("labelEndDate") ?? "End date")}"
  placeholderStartDate="${escapeAttribute(instance.getString("placeholderStartDate") ?? "dd/MM/yyyy")}"
  placeholderEndDate="${escapeAttribute(instance.getString("placeholderEndDate") ?? "dd/MM/yyyy")}"
  icon="${getIcon('calendar_month')}"
  invalidFormatErrorMessage="${escapeAttribute(instance.getString("invalidFormatErrorMessage") ?? "Please enter a date in a valid format")}"
  requiredFieldErrorMessage="${escapeAttribute(instance.getString("requiredFieldErrorMessage") ?? "Please enter the date")}"
  [disabled]="${disabled ?? false}"
  [isRequired]="${isRequired ?? false}"
  [isClearable]="${isClearable ?? false}"
  [controlStart]="controlStart"
  [controlEnd]="controlEnd"
  dateFormat="dd/MM/yyyy"
  name="custom_date_picker"
  errorMessage=""
  [multipleRow]="${multipleRow ?? false}"
  disableDatesBefore=""
  disableDatesAfter=""
/>`,
  imports: [
    "import { FormControl } from '@angular/forms'",
    "import { BmbDateRangeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-date-range',
}
