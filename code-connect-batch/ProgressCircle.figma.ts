// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4694-85975
// source=projects/ds-ng/src/lib/components/bmb-progress-cirlce/bmb-progress-circle.component.ts
// component=BmbProgressCircleComponent
import figma from 'figma'

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
const titleLayer = instance.findText('Total a pagar este m', {
  traverseInstances: true,
})
const valueLayer = instance.findText('$10,000.00', { traverseInstances: true })
const componentTitle =
  titleLayer && titleLayer.type === 'TEXT' ? titleLayer.textContent : ''
const valueLabel =
  valueLayer && valueLayer.type === 'TEXT' ? valueLayer.textContent : ''
const operationStatus =
  operationState === 'error' || operationState === 'success'
    ? operationState
    : semanticStatus
const percent = progress === 'loading' ? 75 : progress === 'full' ? 100 : 0

export default {
  example: figma.code`<bmb-progress-circle componentTitle="${componentTitle}" valueLabel="${valueLabel}" [showTitle]="true" [showValueLabel]="${progress === 'loading'}" [percent]="${percent}" fillPathStatus="${operationStatus}" [showOperationState]="${operationState === 'error' || operationState === 'success'}" [fullFillPathStatus]="${operationState === 'error' || operationState === 'success'}" [emptyState]="${progress === 'empty' || operationState === 'empty'}" />`,
  imports: [
    "import { BmbProgressCircleComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-progress-circle',
  metadata: { nestable: true },
}
