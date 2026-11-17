// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4474-86349
// source=ui-angular/src/lib/components/bmb-date-range/bmb-date-range.component.ts
// component=BmbDateRangeComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-date-range
  labelStartDate="Start date"
  labelEndDate="End date"
  placeholderStartDate="dd/MM/yyyy"
  placeholderEndDate="dd/MM/yyyy"
  icon="${getIcon('calendar_month')}"
  invalidFormatErrorMessage="Please enter a date in a valid format"
  requiredFieldErrorMessage="Please enter the date"
  [disabled]="false"
  [isRequired]="false"
  [isClearable]="false"
  [controlStart]="controlStart"
  [controlEnd]="controlEnd"
  dateFormat="dd/MM/yyyy"
  name="custom_date_picker"
  errorMessage=""
  [multipleRow]="false"
  disableDatesBefore=""
  disableDatesAfter=""
/>`,
  imports: [
    "import { BmbDateRangeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-date-range',
}
