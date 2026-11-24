// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=99-28392
// source=ui-angular/src/lib/components/bmb-card/bmb-card.component.ts
// component=BmbCardComponent
import figma from 'figma'

const instance = figma.selectedInstance
const type = instance.getEnum('Style', {
  Default: 'normal',
  Primary: 'primary',
  Secondary: 'secondary',
  'Home Card': 'normal',
  Contrast: 'normal',
  'Container Button': 'normal',
  'Container Button (Alternative)': 'normal',
  'Home Card (Alternative)': 'normal',
  'Home Card (Inner Slot)': 'normal',
  'Default (Inner Slot)': 'normal',
  'Mobile (Inner Slot)': 'normal',
  'Primary Inner Slot': 'primary',
  'Container button (Inner slot)': 'normal',
  'Container Button (Alternative) - Inner slot': 'normal',
  'Secondary (Inner slot)': 'secondary',
  'Contrast (Inner slot)': 'normal',
})

export default {
  example: figma.code`<bmb-card
  borderRadius="m"
  margin="m"
  type="${type ?? 'normal'}"
  boxShadowStyle="none"
  borderColor="default"
/>`,
  imports: [
    "import { BmbCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-generic-card',
}
