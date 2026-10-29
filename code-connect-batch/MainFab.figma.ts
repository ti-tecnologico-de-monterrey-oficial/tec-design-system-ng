// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=1481-108540
// source=ui-angular/src/lib/components/bmb-fab/bmb-fab.component.ts
// component=BmbFabComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-fab
  icon="${getIcon('')}"
  text=""
  size="large"
  type="normal"
  [mitec]="false"
/>`,
  imports: [
    "import { BmbFabComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-fab',
  metadata: { nestable: true },
}
