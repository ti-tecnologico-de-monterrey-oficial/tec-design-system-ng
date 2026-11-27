// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=523-158681
// source=ui-angular/src/lib/components/bmb-account-statement/bmb-account-statement.component.ts
// component=BmbAccountStatementComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleCloseEvent(event: Parameters<BmbAccountStatementComponent['closeEvent']['emit']>[0]): void {
    console.info('closeEvent', event);
  }

  handleBackEvent(event: Parameters<BmbAccountStatementComponent['backEvent']['emit']>[0]): void {
    console.info('backEvent', event);
  }

  handlePayEvent(event: Parameters<BmbAccountStatementComponent['payEvent']['emit']>[0]): void {
    console.info('payEvent', event);
  }
}
</script>

<bmb-account-statement
  (closeEvent)="handleCloseEvent($event)"
  (backEvent)="handleBackEvent($event)"
  (payEvent)="handlePayEvent($event)"
  componentTitle="Estado de cuenta"
  labelPrimary="Cuota Mensual"
  labelSecondary="Pendiente"
  [totalCount]="10000"
  [counter]="1000"
  progressTitle="Total pagado"
  formatDates="yyyy-MM-dd"
  paymentDeadline="2024-10-20"
  cutOffDate="2024-10-01"
  paymentDeadlineLabel="Fecha límite de pago:"
  cutOffDateLabel="Fecha de corte:"
  payButtonLabel="Pagar"
  backButtonLabel="Regresar"
  modalTitle="Nombre de clase"
  modalSubtitle="TS-0001"
  modalRestLabel="Pagar restante"
  modalOtherAmountLabel="Otra cantidad"
  modalPrimaryButtonLabel="Pagar"
  errorMessage="Error, Este campo es requerido y debe ser una cantidad entre 1 y 9000"
  [progressCircleTitle]="['Total a pagar', 'este mes']"
/>`,
  imports: [
    "import { BmbAccountStatementComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-account-statement',
}
