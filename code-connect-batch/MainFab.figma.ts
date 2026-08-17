// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=1481-108540
// source=ui-angular/src/lib/components/old/bmb-fab/bmb-fab.component.ts
// component=BmbFabComponent
import figma from 'figma'

const instance = figma.selectedInstance
const mitec = instance.getEnum('Type', {
  'Return Button': true,
  Main: false,
})
const textLayer = instance.findText('App name', { traverseInstances: true })
const text = textLayer && textLayer.type === 'TEXT' ? textLayer.textContent : ''

export default {
  example: figma.code`<bmb-fab [mitec]="${mitec}" text="${text}" />`,
  imports: [
    "import { BmbFabComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-fab',
  metadata: { nestable: true },
}
