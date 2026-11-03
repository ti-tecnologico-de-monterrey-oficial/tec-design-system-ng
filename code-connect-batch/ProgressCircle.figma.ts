// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4694-85975
// source=ui-angular/src/lib/components/bmb-progress-cirlce/bmb-progress-circle.component.ts
// component=BmbProgressCircleComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-progress-circle
  [valueLabel]="valueLabel"
  [fullFillPathStatus]="fullFillPathStatus"
  [showValueLabel]="false"
  [percent]="0"
  [componentTitle]="componentTitle"
  [showTitle]="false"
  fillPathStatus="gray"
  icon="${getIcon('')}"
  size="default"
  [showOperationState]="false"
  [emptyState]="false"
/>`,
  imports: [
    "import { BmbProgressCircleComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-progress-circle',
  metadata: { nestable: true },
}
