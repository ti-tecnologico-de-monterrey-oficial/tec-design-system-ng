// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=12694-57309
// source=ui-angular/src/lib/components/bmb-balance-overview/bmb-balance-overview.component.ts
// component=BmbBalanceOverviewComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-balance-overview
  [progressCirclePercent]="progressCirclePercent"
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
  progressCircleFillPathStatus="success"
  [progressCircleFullFillPathStatus]="progressCircleFullFillPathStatus"
  [showProgressCircleOperationState]="false"
  [indicatorAppearance]="indicatorAppearance"
  [emptyState]="false"
/>`,
  imports: [
    "import { BmbBalanceOverviewComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-balance-overview',
  metadata: { nestable: true },
}
