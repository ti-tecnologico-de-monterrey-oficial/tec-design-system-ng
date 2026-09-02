// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=20-16372
// source=ui-angular/src/lib/directives/old/bmb-button/button.directive.ts
// component=BmbButtonDirective
import figma from 'figma'

const instance = figma.selectedInstance
const item = instance.findInstance('BB_1_4_2', { traverseInstances: true })
let itemCode
if (item && item.type === 'INSTANCE') {
  itemCode = item.executeTemplate().example
}

export default {
  example: figma.code`${itemCode}`,
  imports: [
    "import { BmbButtonDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-button-group-simple-item',
  metadata: { nestable: true },
}
