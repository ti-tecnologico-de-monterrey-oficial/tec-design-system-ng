// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-46103
// source=ui-angular/src/lib/components/bmb-step-progress-bar/bmb-step-progress-bar.component.ts
// component=BmbStepProgressBarComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-step-progress-bar
  [activeStep]="3"
  [totalSteps]="5"
  size="default"
  [freeze]="false"
  type="vertical"
  [labelSteps]="['¡Orden de compra aprobada!', '¡Orden de compra aprobada!', '¡Orden de compra aprobada!', '¡Orden de compra aprobada!', '¡Orden de compra aprobada!']"
  labelComplete="Completo"
  labelIncomplete="Pendiente"
/>`,
  imports: [
    "import { BmbStepProgressBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-step-progress-bar',
  metadata: { nestable: true },
}
