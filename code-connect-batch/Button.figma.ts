// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=6-4892
// source=ui-angular/src/lib/directives/old/bmb-button/button.directive.ts
// component=BmbButtonDirective
import figma from 'figma'

const instance = figma.selectedInstance
const text = instance.getString('Text')
const appearance = instance.getEnum('Type', {
  Alternative: 'secondary-filled',
  Primary: 'primary',
  Secondary: 'secondary-outlined',
  Destructive: 'destructive',
  Transparent: 'transparent',
  TransparentMenu: 'transparent',
})
const state = instance.getEnum('State', {
  Enabled: 'enabled',
  Disabled: 'disabled',
  Hovered: 'hovered',
  Selected: 'selected',
})

export default {
  example: figma.code`<button
  bmbButton
  appearance="${appearance}"
  ${state === 'disabled' ? 'disabled' : ''}
  ${state === 'selected' ? 'enableButtonToggle isToggleActive' : ''}
>${text}</button>`,
  imports: [
    "import { BmbButtonDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-button',
  metadata: { nestable: true },
}
