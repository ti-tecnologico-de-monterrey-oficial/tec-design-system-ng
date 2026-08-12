// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=3816-131183
// source=projects/ds-ng/src/lib/components/bmb-icon-item/bmb-icon-item.component.ts
// component=BmbIconItemComponent
import figma from 'figma'

const instance = figma.selectedInstance
const labelLayer = instance.findText('label', { traverseInstances: true })
const valueLayer = instance.findText('text', { traverseInstances: true })
const label =
  labelLayer && labelLayer.type === 'TEXT' ? labelLayer.textContent : ''
const value =
  valueLayer && valueLayer.type === 'TEXT' ? valueLayer.textContent : ''

export default {
  example: figma.code`<bmb-icon-item label="${label}" value="${value}" />`,
  imports: [
    "import { BmbIconItemComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-icon-item',
  metadata: { nestable: true },
}
