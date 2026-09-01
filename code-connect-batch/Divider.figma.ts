// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=61-5520
// source=ui-angular/src/lib/components/bmb-divider/bmb-divider.component.ts
// component=BmbDividerComponent
import figma from 'figma'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', {
  Default: 'simple',
  Dotted: 'dotted',
  Dash: 'dashed',
  Vertical_S: 'simple',
})

export default {
  example: figma.code`<bmb-divider type="${type}" />`,
  imports: [
    "import { BmbDividerComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-divider',
  metadata: { nestable: true },
}
