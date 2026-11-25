// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4694-85975
// source=ui-angular/src/lib/components/bmb-progress-cirlce/bmb-progress-circle.component.ts
// component=BmbProgressCircleComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const progress = instance.getEnum('Progress', {
  'Loading Value': 'loading',
  'Fully Load': 'full',
  'No Load': 'none',
  Empty: 'empty',
  'Semantic status': 'semantic',
})
const semanticStatus = instance.getEnum('Semantic Status', {
  'Medium risk': 'warning',
  'N/A': 'gray',
  'Low risk': 'success',
  'High risk': 'error',
})
const operationState = instance.getEnum('Operation state', {
  Error: 'error',
  Success: 'success',
  Empty: 'empty',
  'N/A': 'none',
})
const operationStatus =
  operationState === 'error' || operationState === 'success'
    ? operationState
    : semanticStatus
const percent = progress === 'loading' ? 75 : progress === 'full' ? 100 : 0

export default {
  example: figma.code`<bmb-progress-circle
  [valueLabel]="valueLabel"
  [fullFillPathStatus]="true"
  [showValueLabel]="${progress === 'loading'}"
  [percent]="${percent ?? 0}"
  [componentTitle]="componentTitle"
  [showTitle]="false"
  fillPathStatus="${escapeAttribute(String(operationStatus ?? "gray"))}"
  icon="${getIcon('')}"
  size="default"
  [showOperationState]="${operationState === 'error' || operationState === 'success'}"
  [emptyState]="${progress === 'empty' || operationState === 'empty'}"
/>`,
  imports: [
    "import { BmbProgressCircleComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-progress-circle',
  metadata: { nestable: true },
}
