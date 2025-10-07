import { Meta, StoryObj } from '@storybook/angular';
import { BmbInvoiceComponent } from './bmb-invoice.component';
import {
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import { getAppearanceParam } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Visual labels/Invoice',
  component: BmbInvoiceComponent,
  parameters: {
    docs: {
      controls: { exclude: ['getInvoiceClasses', 'isNegative', 'ngOnInit'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'invoice' })} to generate electronic invoices.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/invoice/descripcion-general-cAzfIad4' })}
${getSpecialSpecifications(getEmptyStateMessage())}
${getBasicExampleBlock(
  'BmbInvoiceComponent',
  '',
  `//Data example
  data: {
      concept: [
        {
          concept: 'Fecha de solicitud',
          quantity: '$0,000 USD',
          badge: { label: 'Discount', appearance: 'success', container: true },
        },
        {
          concept: 'Tipo de cambio al día de hoy *',
          quantity: '-$0,000 USD',
        },
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
    };`,
)}
        `,
      },
    },
  },
  argTypes: {
    appearanceContrast: getAppearanceParam('invoice', [
      'default',
      'primary',
      'alternative',
    ]),
    data: {
      control: { type: 'object' },
      description: 'Sets the invoice data.',
      table: {
        category: 'Properties',
        defaultValue: false,
        type: {
          summary: 'IBmbInvoice',
          detail: `
IBmbInvoice {
  concept: IBmbConcept[];
  total: {
    label: string;
    value: string;
    equivalence: string[];
  };
}

IBmbConcept {
  concept: string;
  quantity: string;
  price?: number;
  badge?: { label: string; appearance: IBbmBgAppearance; container: boolean };
}

IBbmBgAppearance =
  | 'normal'
  | 'strong'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'brand'
  | 'alert'
  | 'background'
  | 'disabled'
  | 'mitec_blue'
  | 'mitec_red'
  | 'mitec_green'
  | 'mitec_orange'
  | 'mitec_light_green'
  | 'mitec_purple'
  | 'creative_violet'
  | 'creative_indigo'
  | 'creative_emerald'
  | 'creative_licorice'
  | 'creative_darkteal'
  | 'creative_peach'
  | 'creative_sepia'
  | 'creative_softred'
  | 'creative_wattle'
  | 'creative_shipcove'
  | 'creative_plantation'
  | 'creative_rum'
  | 'creative_hibiscus'
  | 'creative_ripelemon';
          `,
        },
      },
    },
  },
  args: {
    appearanceContrast: 'default',
    data: {
      concept: [
        {
          concept: 'Fecha de solicitud',
          quantity: '$0,000 USD',
          badge: { label: 'Discount', appearance: 'success', container: true },
        },
        {
          concept: 'Tipo de cambio al día de hoy *',
          quantity: '-$0,000 USD',
        },
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
    },
  },
} as Meta<typeof BmbInvoiceComponent>;

type Story = StoryObj<BmbInvoiceComponent>;

export const Default: Story = {};
