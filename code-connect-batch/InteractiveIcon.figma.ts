// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4918-96725
// source=ui-angular/src/lib/components/bmb-interactive-icon/bmb-interactive-icon.component.ts
// component=BmbInteractiveIconComponent
import figma from 'figma'
import { getIcon } from './icon-image'
import { getBoxIconColor } from './box-icon-color'

export default {
  example: figma.code`<bmb-interactive-icon
  appearanceContrast="default"
  componentTitle="Canvas"
  description=""
  icon="${getIcon('face')}"
  appearance="${getBoxIconColor('red', 'Box Icon')}"
  [horizontal]="false"
  layout="regular"
/>`,
  imports: [
    "import { BmbInteractiveIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-interactive-icon',
  metadata: { nestable: true },
}
