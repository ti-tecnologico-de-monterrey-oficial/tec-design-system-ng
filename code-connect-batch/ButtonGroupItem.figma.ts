// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=20-13358
// source=projects/ds-ng/src/lib/directives/bmb-button/button.directive.ts
// component=BmbButtonDirective
import figma from 'figma'

const instance = figma.selectedInstance
const label = instance.findText('Label').textContent
const showLabel = instance.getBoolean('Label')
const disabled = instance.getEnum('States', {
  Disabled: true,
  Enabled: false,
  Focused: false,
  Hovered: false,
})
const position = instance.getEnum('Type', {
  center: '',
  simple: '',
  left: 'left',
  right: 'right',
})
const showLeadingIcon = instance.getBoolean('Icon')
const showTrailingIcon = instance.getBoolean('Icon Right')
const leadingIcon = showLeadingIcon
  ? instance.getInstanceSwap('Change Icon - Left')
  : null
const trailingIcon = showTrailingIcon
  ? instance.getInstanceSwap('Change Icon - Right')
  : null
let leadingIconCode
let trailingIconCode
if (leadingIcon && leadingIcon.type === 'INSTANCE') {
  leadingIconCode = leadingIcon.executeTemplate().example
}
if (trailingIcon && trailingIcon.type === 'INSTANCE') {
  trailingIconCode = trailingIcon.executeTemplate().example
}

export default {
  example: figma.code`<button bmbButton ${position ? `position="${position}"` : ''} ${disabled ? 'disabled' : ''}>${leadingIconCode}${showLabel ? label : ''}${trailingIconCode}</button>`,
  imports: [
    "import { BmbButtonDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-button-group-item',
  metadata: { nestable: true },
}
