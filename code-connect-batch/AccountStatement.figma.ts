// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=523-158681
// source=ui-angular/src/lib/components/old/bmb-account-statement/bmb-account-statement.component.ts
// component=BmbAccountStatementComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-account-statement componentTitle="Estado de cuenta" labelPrimary="Cuota Mensual" labelSecondary="Pendiente" [totalCount]="10000" [counter]="1000" progressTitle="Total pagado" formatDates="yyyy-MM-dd" paymentDeadline="2024-10-20" cutOffDate="2024-10-01" paymentDeadlineLabel="Fecha límite de pago:" cutOffDateLabel="Fecha de corte:" payButtonLabel="Pagar" backButtonLabel="Regresar" modalTitle="Nombre de clase" modalSubtitle="TS-0001" modalRestLabel="Pagar restante" modalOtherAmountLabel="Otra cantidad" modalPrimaryButtonLabel="Pagar" errorMessage="Error, Este campo es requerido y debe ser una cantidad entre 1 y 9000" />`,
  imports: [
    "import { BmbAccountStatementComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-account-statement',
}
