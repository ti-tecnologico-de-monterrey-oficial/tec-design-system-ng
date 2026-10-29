// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-37834
// source=ui-angular/src/lib/components/bmb-input-phone-number/bmb-input-phone-number.component.ts
// component=BmbInputPhoneNumberComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-input-phone-number
  [control]="control"
  [disabled]="false"
  errorMessage=""
  [isRequired]="false"
  [preferredCountries]="['mx']"
  [onlyCountries]="['mx', 'us', 'ca']"
  label="Phone"
  tooltip=""
  name="phone"
  value=""
  helperMessage=""
  placeholder=""
  defaultCountryCode="mx"
/>`,
  imports: [
    "import { BmbInputPhoneNumberComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-input-phone-number',
  metadata: { nestable: true },
}
