// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4921-96752
// source=ui-angular/src/lib/components/bmb-invoice/bmb-invoice.component.ts
// component=BmbInvoiceComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  data: IBmbInvoice = {
    concept: [
      {
        concept: 'Fecha de solicitud',
        quantity: '$0,000 USD',
        badge: { label: 'Discount', appearance: 'success', container: true },
      },
      { concept: 'Tipo de cambio al día de hoy *', quantity: '-$0,000 USD' },
      {
        concept: 'Fecha de solicitud',
        quantity: '$0,000 USD',
        badge: { label: 'Discount', appearance: 'success', container: false },
      },
    ],
    total: {
      label: 'Total',
      value: '$0,000 USD',
      equivalence: ['3,828 créditos • 12 meses', '319 créditos • al mes'],
    },
  };
}
</script>

<bmb-invoice
  appearanceContrast="default"
  [data]="data"
/>`,
  imports: [
    "import type { IBmbInvoice } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbInvoiceComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-invoice',
  metadata: { nestable: true },
}
