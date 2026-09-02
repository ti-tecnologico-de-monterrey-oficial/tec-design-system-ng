// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=20-2782
// source=ui-angular/src/lib/components/bmb-box-icon/bmb-box-icon.component.ts
// component=BmbBoxIconComponent
import figma from 'figma'

const instance = figma.selectedInstance
const boxSize = instance.getEnum('Size', {
  'Normal (64px)': 'regular',
  'Small (48px)': 'small',
  'Min (32px)': 'small',
})

export default {
  example: figma.code`<bmb-box-icon iconName="send" boxSize="${boxSize}" />`,
  imports: [
    "import { BmbBoxIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-box-icon',
  metadata: { nestable: true },
}
