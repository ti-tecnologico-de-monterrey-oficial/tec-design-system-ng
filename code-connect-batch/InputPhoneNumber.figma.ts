// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-37834
// source=ui-angular/src/lib/components/bmb-input-phone-number/bmb-input-phone-number.component.ts
// component=BmbInputPhoneNumberComponent
import figma from 'figma'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const disabled = instance.getEnum('State', {
  Enabled: false,
  Hovered: false,
  Focused: false,
  Error: false,
  Disabled: true,
})
const hasLabel = instance.getBoolean('showLabel')
const helperMessage = instance.getBoolean('show helperMessage', {
  true: 'Helper message',
  false: '',
})
const labelLayer = instance.findText('Label', { traverseInstances: true })
const inputLayer = instance.findText('INPUT', { traverseInstances: true })
const label =
  hasLabel && labelLayer && labelLayer.type === 'TEXT'
    ? labelLayer.textContent
    : ''
const value =
  inputLayer && inputLayer.type === 'TEXT' ? inputLayer.textContent : ''

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  control = new FormControl('');
}
</script>

<bmb-input-phone-number
  [control]="control"
  [disabled]="${disabled ?? false}"
  errorMessage=""
  [isRequired]="${instance.getBoolean('isRequired') ?? false}"
  [preferredCountries]="['mx']"
  [onlyCountries]="['mx', 'us', 'ca']"
  label="${escapeAttribute(hasLabel === false ? '' : instance.getString('label') ?? label)}"
  tooltip=""
  name="phone"
  value="${escapeAttribute(instance.getString('value') ?? value)}"
  helperMessage="${escapeAttribute(helperMessage ? instance.getString('helperMessage') ?? helperMessage : '')}"
  placeholder="${escapeAttribute(instance.getString('placeholder') ?? "")}"
  defaultCountryCode="mx"
/>`,
  imports: [
    "import { FormControl } from '@angular/forms'",
    "import { BmbInputPhoneNumberComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-input-phone-number',
  metadata: { nestable: true },
}
