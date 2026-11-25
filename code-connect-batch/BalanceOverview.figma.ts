// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=12694-57309
// source=ui-angular/src/lib/components/bmb-balance-overview/bmb-balance-overview.component.ts
// component=BmbBalanceOverviewComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const status = instance.getEnum('Semantic status', {
  Default: 'default',
  Empty: 'empty',
  Error: 'error',
  Success: 'success',
})
const isFull = status === 'error' || status === 'success'
const fillPathStatus = status === 'error' ? 'error' : status === 'empty' ? 'gray' : 'success'

export default {
  example: figma.code`<bmb-balance-overview
  [progressCirclePercent]="75"
  [progressCircleValue]="progressCircleValue"
  [showProgressCircleValue]="showProgressCircleValue"
  [progressCircleTitle]="progressCircleTitle"
  [showProgressCircleBackground]="showProgressCircleBackground"
  [labelPrimary]="labelPrimary"
  [valuePrimary]="valuePrimary"
  [labelSecondary]="labelSecondary"
  [valueSecondary]="valueSecondary"
  [showProgressCircleTitle]="showProgressCircleTitle"
  icon="${getIcon('')}"
  progressCircleFillPathStatus="${escapeAttribute(String(fillPathStatus ?? "success"))}"
  [progressCircleFullFillPathStatus]="true"
  [showProgressCircleOperationState]="${isFull ?? false}"
  [indicatorAppearance]="indicatorAppearance"
  [emptyState]="${status === 'empty'}"
/>`,
  imports: [
    "import { BmbBalanceOverviewComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-balance-overview',
  metadata: { nestable: true },
}
