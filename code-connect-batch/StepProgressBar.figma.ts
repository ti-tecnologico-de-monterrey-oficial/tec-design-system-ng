// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-46103
// source=ui-angular/src/lib/components/bmb-step-progress-bar/bmb-step-progress-bar.component.ts
// component=BmbStepProgressBarComponent
import figma from 'figma'

import { escapeAttribute } from './escape-attribute'

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
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleOnStepPress(event: Parameters<BmbStepProgressBarComponent['onStepPress']['emit']>[0]): void {
    console.info('onStepPress', event);
  }

  handleOnStepPanelPress(event: Parameters<BmbStepProgressBarComponent['onStepPanelPress']['emit']>[0]): void {
    console.info('onStepPanelPress', event);
  }
}
</script>

<bmb-step-progress-bar
  (onStepPress)="handleOnStepPress($event)"
  (onStepPanelPress)="handleOnStepPanelPress($event)"
  [activeStep]="3"
  [totalSteps]="5"
  size="${escapeAttribute(String(size ?? "default"))}"
  [freeze]="false"
  type="${escapeAttribute(String(type ?? "vertical"))}"
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
