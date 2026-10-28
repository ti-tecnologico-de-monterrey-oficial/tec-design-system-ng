// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=1643-64262
// source=ui-angular/src/lib/components/bmb-list-group/bmb-list-group-item/bmb-list-group-item.component.ts
// component=BmbListGroupItemComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-list-group-item
  appearanceContrast="default"
  id="list-group-item-1"
  [personalizedTemplate]="false"
  [headerText]="headerText"
  [descriptionText]="descriptionText"
  [infoText]="infoText"
  icon="${getIcon('add_box')}"
  [imgSrc]="imgSrc"
  [tooltipTitle]="tooltipTitle"
  [badgeAppearance]="badgeAppearance"
  [badgeText]="badgeText"
  [isDisabled]="false"
  [isActive]="false"
/>`,
  imports: [
    "import { BmbListGroupItemComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-list-item-with-actions',
  metadata: { nestable: true },
}
