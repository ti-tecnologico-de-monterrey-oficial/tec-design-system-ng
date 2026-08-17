// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=82-26226
// source=ui-angular/src/lib/components/old/bmb-list-group/bmb-list-group-item/bmb-list-group-item.component.ts
// component=BmbListGroupItemComponent
import figma from 'figma'

const instance = figma.selectedInstance
const headerLayer = instance.findText('Text')
const headerText =
  headerLayer && headerLayer.type === 'TEXT' ? headerLayer.textContent : ''
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
  id="list-group-item-1"
  appearanceContrast="${appearanceContrast}"
  headerText="${headerText}"
  [personalizedTemplate]="false"
  [isDisabled]="${isDisabled}"
  [isActive]="${isActive}"
/>`,
  imports: [
    "import { BmbListGroupItemComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-list-group-item',
  metadata: { nestable: true },
}
