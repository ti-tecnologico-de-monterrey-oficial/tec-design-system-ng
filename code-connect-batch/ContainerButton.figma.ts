// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=16-4087
// source=ui-angular/src/lib/components/bmb-container-button/bmb-container-button.component.ts
// component=BmbContainerButtonComponent
import figma from 'figma'

const instance = figma.selectedInstance
const componentTitle = instance.getString('Title')
const subtitle = instance.getString('Subtitle')
const state = instance.getEnum('State', {
  Enabled: '',
  Hovered: '',
  Focused: '',
  Disabled: 'disabled',
  Error: 'error',
})
const alternative = instance.getEnum('Variant', {
  Default: false,
  Alternative: true,
})
const small = instance.getEnum('Type', {
  Main: false,
  Grade: false,
  Small: true,
  Vertical: false,
  Badge: false,
  Complex: false,
  'Vertical Small': true,
  'User Profile': false,
})

export default {
  example: figma.code`<bmb-container-button
  componentTitle="${componentTitle}"
  subtitle="${subtitle}"
  [small]="${small}"
  [alternative]="${alternative}"
  ${state ? figma.code`state="${state}"` : ''}
/>`,
  imports: [
    "import { BmbContainerButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-container-button',
}
