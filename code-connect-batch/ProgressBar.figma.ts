// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=6661-110420
// source=ui-angular/src/lib/components/old/bmb-progress-bar/bmb-progress-bar.component.ts
// component=BmbProgressBarComponent
import figma from 'figma'

const instance = figma.selectedInstance
const type = instance.getBoolean('Show ValueCounter_Numbers', {
  true: 'counter',
  false: 'simple',
})

export default {
  example: figma.code`<bmb-progress-bar type="${type}" />`,
  imports: [
    "import { BmbProgressBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-progress-bar',
  metadata: { nestable: true },
}
