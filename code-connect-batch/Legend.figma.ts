// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-51305
// source=projects/ds-ng/src/lib/components/bmb-legend/bmb-legend.component.ts
// component=BmbLegendComponent
import figma from 'figma'

const instance = figma.selectedInstance
const label = instance.getString('Title')
const value = instance.getString('Value')

export default {
  example: figma.code`<bmb-legend label="${label}" value="${value}" />`,
  imports: [
    "import { BmbLegendComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-legend',
  metadata: { nestable: true },
}
