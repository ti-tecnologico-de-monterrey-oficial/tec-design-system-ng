// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4918-96725
// source=ui-angular/src/lib/components/bmb-interactive-icon/bmb-interactive-icon.component.ts
// component=BmbInteractiveIconComponent
import figma from 'figma'

const instance = figma.selectedInstance
const appearanceContrast = instance.getEnum('Container color', {
  Default: 'default',
  Primary: 'primary',
  Alternative: 'alternative',
})
const layout = instance.getEnum('Variante', {
  Extended: 'regular',
  'Container Button': 'button',
  Simple: 'regular',
  'app Drawer': 'app_drawer',
  'Simple (Small)': 'regular',
  'Simple (Min)': 'regular',
})
const componentTitle = instance.getString('Text')

export default {
  example: figma.code`<bmb-interactive-icon componentTitle="${componentTitle}" appearanceContrast="${appearanceContrast}" layout="${layout}" />`,
  imports: [
    "import { BmbInteractiveIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-interactive-icon',
  metadata: { nestable: true },
}
