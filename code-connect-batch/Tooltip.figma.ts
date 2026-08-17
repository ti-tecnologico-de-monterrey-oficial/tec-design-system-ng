// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-47279
// source=ui-angular/src/lib/components/old/bmb-tooltip/bmb-tooltip.component.ts
// component=BmbTooltipComponent
import figma from 'figma'

const instance = figma.selectedInstance
const showTitle = instance.getBoolean('Show Title')
const titleLayer = instance.findText('Title', { traverseInstances: true })
const textLayer = instance.findText('Description', { traverseInstances: true })
const title = titleLayer && titleLayer.type === 'TEXT' ? titleLayer.textContent : ''
const text = textLayer && textLayer.type === 'TEXT' ? textLayer.textContent : ''

export default {
  example: figma.code`<bmb-tooltip text="${text}" componentTitle="${showTitle ? title : ''}" />`,
  imports: [
    "import { BmbTooltipComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-tooltip',
  metadata: { nestable: true },
}
