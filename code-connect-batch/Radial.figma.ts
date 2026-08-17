// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=108-32755
// source=ui-angular/src/lib/components/old/bmb-radial/bmb-radial.component.ts
// component=BmbRadialComponent
import figma from 'figma'

const instance = figma.selectedInstance
const checked = instance.getEnum('Mode', {
  Inactive: false,
  Active: true,
})
const disabled = instance.getEnum('State', {
  Enabled: false,
  Hovered: false,
  Focused: false,
  Disabled: true,
})

export default {
  example: figma.code`<bmb-radial [checked]="${checked}" [disabled]="${disabled}" />`,
  imports: [
    "import { BmbRadialComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-radial',
  metadata: { nestable: true },
}
