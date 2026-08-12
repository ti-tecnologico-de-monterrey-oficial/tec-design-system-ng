// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=108-32761
// source=projects/ds-ng/src/lib/components/bmb-checkbox/bmb-checkbox.component.ts
// component=BmbCheckboxComponent
import figma from 'figma'

const instance = figma.selectedInstance
const mode = instance.getEnum('Mode', {
  Active: 'active',
  Inactive: 'inactive',
  Indeterminate: 'indeterminate',
})
const disabled = instance.getEnum('State', {
  Hovered: false,
  Enabled: false,
  Focused: false,
  Disabled: true,
})

export default {
  example: figma.code`<bmb-checkbox [checked]="${mode === 'active'}" [indeterminate]="${mode === 'indeterminate'}" [disabled]="${disabled}" />`,
  imports: [
    "import { BmbCheckboxComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-checkbox',
  metadata: { nestable: true },
}
