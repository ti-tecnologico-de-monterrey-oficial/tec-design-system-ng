// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=474-95724
// source=ui-angular/src/lib/components/bmb-home-card/bmb-home-card.component.ts
// component=BmbHomeCardComponent
import figma from 'figma'

const instance = figma.selectedInstance
const componentTitle = instance.findText('Mi día de hoy', {
  traverseInstances: true,
  path: ['Gcard_Header'],
}).textContent

export default {
  example: figma.code`<bmb-home-card componentTitle="${componentTitle}" />`,
  imports: [
    "import { BmbHomeCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-home-card',
}
