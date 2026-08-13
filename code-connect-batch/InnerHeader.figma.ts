// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=61-9239
// source=projects/ds-ng/src/lib/components/bmb-inner-header/bmb-inner-header.component.ts
// component=BmbInnerHeaderComponent
import figma from 'figma'

const instance = figma.selectedInstance
const titleLayer = instance.findText('Header', { traverseInstances: true })
const componentTitle =
  titleLayer && titleLayer.type === 'TEXT'
    ? titleLayer.textContent
    : 'Inner Header'

export default {
  example: figma.code`<bmb-inner-header componentTitle="${componentTitle}" [showClose]="true" />`,
  imports: [
    "import { BmbInnerHeaderComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-inner-header',
  metadata: { nestable: true },
}
