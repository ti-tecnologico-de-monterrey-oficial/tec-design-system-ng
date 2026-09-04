// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=12694-57309
// source=ui-angular/src/lib/components/bmb-balance-overview/bmb-balance-overview.component.ts
// component=BmbBalanceOverviewComponent
import figma from 'figma'

const instance = figma.selectedInstance
const status = instance.getEnum('Semantic status', {
  Default: 'default',
  Empty: 'empty',
  Error: 'error',
  Success: 'success',
})
const isFull = status === 'error' || status === 'success'
const fillPathStatus = status === 'error' ? 'error' : status === 'empty' ? 'gray' : 'success'
const indicatorAppearance = status === 'empty' ? 'empty' : status === 'error' ? 'error' : status === 'success' ? 'success' : 'normal'

export default {
  example: figma.code`<bmb-balance-overview [progressCirclePercent]="${status === 'default' ? 75 : 0}" progressCircleValue="${status === 'empty' ? '---' : status === 'error' ? 'N/A' : status === 'success' ? '$10,000' : '$10,000'}" [progressCircleTitle]="['${status === 'empty' ? 'Sin movimientos' : status === 'error' ? 'Error' : status === 'success' ? 'Pagado' : 'Total a pagar este mes'}']" labelPrimary="Cuota Mensual" valuePrimary="$2,500.00" labelSecondary="Penalidad" valueSecondary="$2,500.00" icon="${status === 'error' ? 'error' : status === 'success' ? 'success' : 'home'}" progressCircleFillPathStatus="${fillPathStatus}" [progressCircleFullFillPathStatus]="${isFull}" [showProgressCircleOperationState]="${isFull}" indicatorAppearance="${indicatorAppearance}" [emptyState]="${status === 'empty'}" />`,
  imports: [
    "import { BmbBalanceOverviewComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-balance-overview',
  metadata: { nestable: true },
}
