// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-46103
// source=ui-angular/src/lib/components/bmb-step-progress-bar/bmb-step-progress-bar.component.ts
// component=BmbStepProgressBarComponent
import figma from 'figma'

const instance = figma.selectedInstance
const type = instance.getEnum('Variante', {
  Horizontal: 'horizontal',
  'Vertical Small': 'vertical',
  Wizard: 'step-panel',
})
const size = instance.getEnum('Variante', {
  Horizontal: 'normal',
  'Vertical Small': 'small',
  Wizard: 'normal',
})

export default {
  example: figma.code`<bmb-step-progress-bar type="${type}" size="${size}" [totalSteps]="3" [activeStep]="0" [labelSteps]="['Paso 1', 'Paso 2', 'Paso 3']" />`,
  imports: [
    "import { BmbStepProgressBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-step-progress-bar',
  metadata: { nestable: true },
}
