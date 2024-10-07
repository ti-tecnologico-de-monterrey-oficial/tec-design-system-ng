import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbInvoiceComponent } from './bmb-invoice.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'Macro Componentes/Invoice',
  component: BmbInvoiceComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbBadgeComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbInvoiceComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbInvoiceComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    data: {
      name: 'Data',
      control: { type: 'object' },
      description: 'Data object containing invoice information',
      table: {
        category: 'Properties',
        type: {
          summary: `
            {
              concept: Concept[],
              total: {
                label: string,
                value: string,
                equivalence: string[]
              }
            }
          `,
        },
      },
    },
  },
  args: {
    data: {
      concept: [
        {
          concept: 'Fecha de solicitud',
          quantity: '$0,000 USD',
          badge: { label: 'Discount', appearance: 'success' },
        },
        {
          concept: 'Tipo de cambio al día de hoy *',
          quantity: '-$0,000 USD',
        },
        {
          concept: 'Fecha de solicitud',
          quantity: '$0,000 USD',
          badge: { label: 'Discount', appearance: 'success' },
        },
      ],
      total: {
        label: 'Total',
        value: '$0,000 USD',
        equivalence: ['3,828 créditos • 12 meses', '319 créditos • al mes'],
      },
    },
  },
} as Meta<typeof BmbInvoiceComponent>;

type Story = StoryObj<BmbInvoiceComponent>;

export const Default: Story = {};
