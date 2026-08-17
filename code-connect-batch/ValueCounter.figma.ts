// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=153-47541
// source=ui-angular/src/lib/components/old/bmb-value-counter/bmb-value-counter.component.ts
// component=BmbValueCounterComponent
import figma from 'figma'

const instance = figma.selectedInstance
const label = instance.getString('Title')
const progress = instance.getString('Current')
const value = instance.getString('Maxium')

export default {
  example: figma.code`<bmb-value-counter label="${label}" progress="${progress}" value="${value}" />`,
  imports: [
    "import { BmbValueCounterComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-value-counter',
  metadata: { nestable: true },
}
