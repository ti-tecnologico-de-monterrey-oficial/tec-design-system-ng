// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-37834
// source=projects/ds-ng/src/lib/components/bmb-input-phone-number/bmb-input-phone-number.component.ts
// component=BmbInputPhoneNumberComponent
import figma from 'figma'

const instance = figma.selectedInstance
const disabled = instance.getEnum('State', {
  Enabled: false,
  Hovered: false,
  Focused: false,
  Error: false,
  Disabled: true,
})
const hasLabel = instance.getBoolean('Show Label')
const helperMessage = instance.getBoolean('Show HelperText', {
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
  example: figma.code`<bmb-input-phone-number label="${label}" value="${value}" helperMessage="${helperMessage}" [onlyCountries]="['mx', 'us', 'ca']" defaultCountryCode="mx" [disabled]="${disabled}" />`,
  imports: [
    "import { BmbInputPhoneNumberComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-input-phone-number',
  metadata: { nestable: true },
}
