// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-37668
// source=ui-angular/src/lib/components/old/bmb-input/bmb-input.component.ts
// component=BmbInputComponent
import figma from 'figma'

const instance = figma.selectedInstance
const appearance = instance.getEnum('Variation', {
  Simple: 'simple',
  Full: 'normal',
  'Text Area': 'normal',
})
const type = instance.getEnum('Variation', {
  Simple: 'text',
  Full: 'text',
  'Text Area': 'text-area',
})
const disabled = instance.getEnum('State', {
  Enabled: false,
  Hovered: false,
  Focused: false,
  Error: false,
  Disabled: true,
})
const value = instance.getString('Text')

export default {
  example: figma.code`<bmb-input type="${type}" appearance="${appearance}" value="${value}" [disabled]="${disabled}" />`,
  imports: [
    "import { BmbInputComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-input',
  metadata: { nestable: true },
}
