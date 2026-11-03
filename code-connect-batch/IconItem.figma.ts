// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=3816-131183
// source=ui-angular/src/lib/components/bmb-icon-item/bmb-icon-item.component.ts
// component=BmbIconItemComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-icon-item
  icon="${getIcon('calendar_month')}"
  [iconSize]="24"
  label="Semestre"
  value="Additional Info"
  [showDivider]="showDivider"
/>`,
  imports: [
    "import { BmbIconItemComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-icon-item',
  metadata: { nestable: true },
}
