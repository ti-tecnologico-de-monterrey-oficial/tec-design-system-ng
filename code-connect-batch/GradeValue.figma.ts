// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-47844
// source=ui-angular/src/lib/components/bmb-grade-value/bmb-grade-value.component.ts
// component=BmbGradeValueComponent
import figma from 'figma'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', {
  Partial: 'partial-grade',
  Score: 'main-grade',
})
const appearanceContrast = instance.getEnum('Container color', {
  Default: 'default',
  Primary: 'primary',
  Alternative: 'alternative',
})
const scoreLayer = instance.findText('Score_Label', { traverseInstances: true })
const score = scoreLayer && scoreLayer.type === 'TEXT' ? scoreLayer.textContent : ''

export default {
  example: figma.code`<bmb-grade-value
  type="${type}"
  appearanceContrast="${appearanceContrast}"
  score="${score}"
/>`,
  imports: [
    "import { BmbGradeValueComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-grade-value',
  metadata: { nestable: true },
}
