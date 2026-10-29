// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=8-7959
// source=ui-angular/src/lib/directives/bmb-button/button.directive.ts
// component=BmbButtonDirective
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<button
  bmbButton
  appearance="primary"
  icon="${getIcon('')}"
  [iconSize]="iconSize"
  size="small"
  position="left"
  [case]="false"
  [isToggleActive]="false"
  [enableButtonToggle]="false"
  [isMobile]="false"
>Button text</button>`,
  imports: [
    "import { BmbButtonDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-button-group-chevron-item',
  metadata: { nestable: true },
}
