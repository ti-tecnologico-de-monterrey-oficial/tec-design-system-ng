// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=20-13644
// source=ui-angular/src/lib/directives/old/bmb-button-group/bmb-button-group.directive.ts
// component=BmbButtonGroupDirective
import figma from 'figma'

const instance = figma.selectedInstance
const baseItem = instance.findInstance('BB_1_4_2', {
  traverseInstances: true,
})
const simpleItem = instance.findInstance('BB_1_4_3', {
  traverseInstances: true,
})
const chevronItem = instance.findInstance('BB_1_4', {
  traverseInstances: true,
})
let itemCode
if (baseItem && baseItem.type === 'INSTANCE') {
  itemCode = baseItem.executeTemplate().example
} else if (simpleItem && simpleItem.type === 'INSTANCE') {
  itemCode = simpleItem.executeTemplate().example
} else if (chevronItem && chevronItem.type === 'INSTANCE') {
  itemCode = chevronItem.executeTemplate().example
}

export default {
  example: figma.code`<section bmbButtonGroup>${itemCode}</section>`,
  imports: [
    "import { BmbButtonGroupDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-button-group',
  metadata: { nestable: true },
}
