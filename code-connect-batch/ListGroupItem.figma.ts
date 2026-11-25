// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=82-26226
// source=ui-angular/src/lib/components/bmb-list-group/bmb-list-group-item/bmb-list-group-item.component.ts
// component=BmbListGroupItemComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const appearanceContrast = instance.getEnum('Container color', {
  None: 'default',
  Default: 'default',
  Primary: 'primary',
  Alternative: 'alternative',
})
const isDisabled = instance.getEnum('List group state:', {
  Disabled: true,
  Enabled: false,
  Hovered: false,
  Selected: false,
})
const isActive = instance.getEnum('List group state:', {
  Disabled: false,
  Enabled: false,
  Hovered: false,
  Selected: true,
})

export default {
  example: figma.code`<bmb-list-group-item
  appearanceContrast="${escapeAttribute(String(appearanceContrast ?? "default"))}"
  id="list-group-item-1"
  [personalizedTemplate]="false"
  headerText="Header text"
  descriptionText="Description text"
  infoText="Info text"
  icon="${getIcon('add_box')}"
  [imgSrc]="imgSrc"
  tooltipTitle="Tooltip title"
  [badgeAppearance]="badgeAppearance"
  badgeText="Badge Text"
  [isDisabled]="${isDisabled ?? false}"
  [isActive]="${isActive ?? false}"
/>`,
  imports: [
    "import { BmbListGroupItemComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-list-group-item',
  metadata: { nestable: true },
}
