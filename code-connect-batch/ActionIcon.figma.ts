// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=3112-81086
// source=projects/ds-ng/src/lib/components/bmb-action-icon/bmb-action-icon.component.ts
// component=BmbActionIconComponent
import figma from 'figma'

const instance = figma.selectedInstance
const icon = instance.getString('Name')
const state = instance.getEnum('State', {
  Enabled: 'enabled',
  Disabled: 'disabled',
})

export default {
  example: figma.code`<bmb-action-icon
  icon="${icon}"
  ${state === 'disabled' ? 'disabled' : ''}
/>`,
  imports: [
    "import { BmbActionIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-action-icon',
  metadata: { nestable: true },
}
