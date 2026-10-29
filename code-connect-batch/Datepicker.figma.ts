// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-33585
// source=ui-angular/src/lib/components/bmb-datepicker/bmb-datepicker.component.ts
// component=BmbDatepickerComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-datepicker
  [control]="control"
  icon="${getIcon('calendar_month')}"
  requiredFieldErrorMessage="Please enter the date"
  [isRequired]="false"
  placeholder="dd/MM/yyyy"
  [disabled]="false"
  label="Date"
  dateFormat="dd/MM/yyyy"
  name="test_id"
  disableDatesBefore=""
  disableDatesAfter=""
  helperMessage="dd/MM/yyyy"
  errorMessage=""
/>`,
  imports: [
    "import { BmbDatepickerComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-datepicker',
}
