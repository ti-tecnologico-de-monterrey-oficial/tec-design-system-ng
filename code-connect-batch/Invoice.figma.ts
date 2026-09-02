// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4921-96752
// source=ui-angular/src/lib/components/bmb-invoice/bmb-invoice.component.ts
// component=BmbInvoiceComponent
import figma from 'figma'

const instance = figma.selectedInstance
const appearanceContrast = instance.getEnum('Container color', {
  Default: 'default',
  Primary: 'primary',
  Alternative: 'alternative',
})

export default {
  example: figma.code`<bmb-invoice appearanceContrast="${appearanceContrast}" [data]="{ concept: [], total: { label: 'Total', value: '$0.00', equivalence: [] } }" />`,
  imports: [
    "import { BmbInvoiceComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-invoice',
  metadata: { nestable: true },
}
