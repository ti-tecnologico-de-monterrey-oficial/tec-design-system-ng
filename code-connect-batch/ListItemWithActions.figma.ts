// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=1643-64262
// source=ui-angular/src/lib/components/old/bmb-list-group/bmb-list-group-item/bmb-list-group-item.component.ts
// component=BmbListGroupItemComponent
import figma from 'figma'

const instance = figma.selectedInstance
const headerLayer = instance.findText('Text')
const headerText =
  headerLayer && headerLayer.type === 'TEXT' ? headerLayer.textContent : ''
const isDisabled = instance.getEnum('State', {
  Selected: false,
  Disabled: true,
  Enabled: false,
  Hover: false,
})
const isActive = instance.getEnum('State', {
  Selected: true,
  Disabled: false,
  Enabled: false,
  Hover: false,
})

export default {
  example: figma.code`<bmb-list-group-item
  id="list-group-item-1"
  headerText="${headerText}"
  [personalizedTemplate]="false"
  [isDisabled]="${isDisabled}"
  [isActive]="${isActive}"
/>`,
  imports: [
    "import { BmbListGroupItemComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-list-item-with-actions',
  metadata: { nestable: true },
}
