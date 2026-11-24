// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-51305
// source=ui-angular/src/lib/components/bmb-legend/bmb-legend.component.ts
// component=BmbLegendComponent
import figma from 'figma'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const label = instance.getString('Title')

export default {
  example: figma.code`<bmb-legend
  label="${escapeAttribute(String(label ?? "Title"))}"
  value="$0.00"
  indicatorAppearance="normal"
/>`,
  imports: [
    "import { BmbLegendComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-legend',
  metadata: { nestable: true },
}
