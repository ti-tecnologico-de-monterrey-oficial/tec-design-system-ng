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
const hasSlot = instance.getEnum('Style', {
  Default: false,
  Primary: false,
  Secondary: false,
  'Home Card': false,
  Contrast: false,
  'Container Button': false,
  'Container Button (Alternative)': false,
  'Home Card (Alternative)': false,
  'Home Card (Inner Slot)': true,
  'Default (Inner Slot)': true,
  'Mobile (Inner Slot)': true,
  'Primary Inner Slot': true,
  'Container button (Inner slot)': true,
  'Container Button (Alternative) - Inner slot': true,
  'Secondary (Inner slot)': true,
  'Contrast (Inner slot)': true,
})
const content = hasSlot ? instance.getSlot('Slot') : undefined

const example =
  hasSlot
    ? figma.code`<bmb-card type="${type}">${content}</bmb-card>`
    : figma.code`<bmb-card type="${type}"></bmb-card>`

export default {
  example,
  imports: [
    "import { BmbCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-generic-card',
}
