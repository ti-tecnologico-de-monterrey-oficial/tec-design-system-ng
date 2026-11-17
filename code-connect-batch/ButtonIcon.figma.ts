// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=8-7401
// source=ui-angular/src/lib/components/bmb-button-icon/bmb-button-icon.component.ts
// component=BmbButtonIconComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-button-icon
  [appearanceContrast]="appearanceContrast"
  icon="${getIcon('send')}"
  [showContainer]="true"
  [isOutline]="true"
  [disabled]="false"
  [active]="false"
/>`,
  imports: [
    "import { BmbButtonIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-button-icon',
  metadata: { nestable: true },
}
