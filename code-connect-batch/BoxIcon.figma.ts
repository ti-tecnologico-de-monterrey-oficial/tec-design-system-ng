// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=20-2782
// source=ui-angular/src/lib/components/bmb-box-icon/bmb-box-icon.component.ts
// component=BmbBoxIconComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-box-icon
  iconName="${getIcon('face')}"
  boxColor="semantic-success"
  boxShape="square"
  boxSize="small"
/>`,
  imports: [
    "import { BmbBoxIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-box-icon',
  metadata: { nestable: true },
}
