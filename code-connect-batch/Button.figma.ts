// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=6-4892
// source=ui-angular/src/lib/directives/bmb-button/button.directive.ts
// component=BmbButtonDirective
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const text = instance.getString('Text')
const appearance = instance.getEnum('appearance', { 'secondary-filled':'secondary-filled', primary: 'primary', 'secondary-outlined':'secondary-outlined', destructive: 'destructive', transparent: 'transparent' })

const state = instance.getEnum('State', {
  Enabled: 'enabled',
  Disabled: 'disabled',
  Hovered: 'hovered',
  Selected: 'selected',
})
const position = instance.getEnum('position', { None: '', left: 'left', right: 'right' })

const icon = position === '' ? '' : getIcon('')

export default {
  example: figma.code`<button
  bmbButton
  appearance="${appearance ?? 'primary'}"
  [disabled]="${state === 'disabled'}"
  icon="${icon}"
  size="${instance.getEnum('size', { small: 'small', large: 'large' }) ?? "small"}"
  position="${position || 'left'}"
  [case]="false"
  [isToggleActive]="${state === 'selected'}"
  [enableButtonToggle]="${state === 'selected'}"
  [isMobile]="false"
>${escapeAttribute(text ?? "Button text")}</button>`,
  imports: [
    "import { BmbButtonDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-button',
  metadata: { nestable: true },
}
