// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=108-32808
// source=projects/ds-ng/src/lib/components/bmb-switch/bmb-switch.component.ts
// component=BmbSwitchComponent
import figma from 'figma'

const instance = figma.selectedInstance
const isChecked = instance.getEnum('Selected', {
  Active: true,
  Inactive: false,
})

export default {
  example: figma.code`<bmb-switch [isChecked]="${isChecked}" />`,
  imports: [
    "import { BmbSwitchComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-switch',
  metadata: { nestable: true },
}
