// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=8-7401
// source=ui-angular/src/lib/components/bmb-button-icon/bmb-button-icon.component.ts
// component=BmbButtonIconComponent
import figma from 'figma'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', {
  'Microphone - Do not use': 'default',
  Default: 'default',
  Outline: 'outline',
  Solid: 'solid',
})
const active = instance.getEnum('State', {
  Enabled: false,
  Hovered: false,
  Pressed: false,
  Selected: true,
})
const showContainer = instance.getEnum('Container', {
  Active: true,
  inactive: false,
})
const contrast = instance.getEnum('Container color', {
  Default: 'default',
  Primary: 'primary',
  Alternative: 'alternative',
})
const appearanceContrast = type === 'solid' ? 'solid' : contrast

export default {
  example: figma.code`<bmb-button-icon icon="send" appearanceContrast="${appearanceContrast}" [showContainer]="${showContainer}" [active]="${active}" [isOutline]="${type === 'outline'}" />`,
  imports: [
    "import { BmbButtonIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-button-icon',
  metadata: { nestable: true },
}
