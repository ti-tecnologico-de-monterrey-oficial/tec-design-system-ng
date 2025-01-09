import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbAccountStatementComponent } from './bmb-account-statement.component';
import { InputSignal } from '@angular/core';
import { BmbPortalComponent } from '../bmb-portal/bmb-portal.component';

const meta: Meta<BmbAccountStatementComponent> = {
  title: 'Macro Componentes/Account statement',
  component: BmbAccountStatementComponent,
  subcomponents: { BmbPortalComponent },
  decorators: [
    moduleMetadata({
      imports: [BmbAccountStatementComponent, BmbPortalComponent],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbAccountStatementComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbAccountStatementComponent ],
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
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'Set the title on the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Estado de cuenta' },
      },
    },
    labelPrimary: {
      name: 'Label primary',
      control: {
        type: 'text',
      },
      description: 'Set the text for primary text.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Cuota Mensual' },
      },
    },
    labelSecondary: {
      name: 'Label secondary',
      control: {
        type: 'text',
      },
      description: 'Set the text for secondary text.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Pendiente' },
      },
    },
    totalCount: {
      name: 'Total count',
      control: {
        type: 'number',
      },
      description: 'Set the total amount.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    counter: {
      name: 'Counter',
      control: {
        type: 'number',
      },
      description: 'Set the partial amount.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    progressTitle: {
      name: 'Progress title',
      control: {
        type: 'text',
      },
      description: 'Set the progress title on the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Total pagado' },
      },
    },
    formatDates: {
      name: 'Format dates',
      control: {
        type: 'text',
      },
      description:
        'Set the format dates for `cutOffDate` and `paymentDeadline`.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'yyyy-MM-dd' },
      },
    },
    paymentDeadline: {
      name: 'Payment deadline',
      control: {
        type: 'text',
      },
      description: 'Set the label for payment deadline.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    cutOffDate: {
      name: 'Cutoff date',
      control: {
        type: 'text',
      },
      description: 'Set the label for payment cutoff.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    paymentDeadlineLabel: {
      name: 'Payment deadline label',
      control: {
        type: 'text',
      },
      description: 'Set the payment deadline label.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Fecha límite de pago:' },
      },
    },
    cutOffDateLabel: {
      name: 'Cutoff date label',
      control: {
        type: 'text',
      },
      description: 'Set the cutoff date label.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Fecha de corte:' },
      },
    },
    payButtonLabel: {
      name: 'Pay button label',
      control: {
        type: 'text',
      },
      description: 'Set the text for pay button.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Pagar' },
      },
    },
    backButtonLabel: {
      name: 'Back button label',
      control: {
        type: 'text',
      },
      description: 'Set the text for back button.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Regresar' },
      },
    },
    modalTitle: {
      name: 'Modal title',
      control: {
        type: 'text',
      },
      description: 'Set the title for the modal.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    modalSubtitle: {
      name: 'Modal subtitle',
      control: {
        type: 'text',
      },
      description: 'Set the subtitle for the modal.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    modalRestLabel: {
      name: 'Modal rest label',
      control: {
        type: 'text',
      },
      description: 'Set the rest text for the modal.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Pagar restante' },
      },
    },
    modalOtherAmountLabel: {
      name: 'Modal other amount label',
      control: {
        type: 'text',
      },
      description: 'Set the label for the custom amount for the modal.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Otra cantidad' },
      },
    },
    modalPrimaryButtonLabel: {
      name: 'Modal primary button label',
      control: {
        type: 'text',
      },
      description: 'Set the text for the primary button of the modal.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Pagar' },
      },
    },
    errorMessage: {
      name: 'Error message',
      control: {
        type: 'text',
      },
      description: 'Set the error message for the custom amount field.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: {
          summary:
            'Error, Este campo es requerido y debe ser una cantidad entre 1 y ',
        },
      },
    },
    progressCircleTitle: {
      name: 'Progress circle title',
      control: {
        type: 'object',
      },
      description:
        'Set the labels for the progress circle, this input it is an array of two positions.',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
        defaultValue: { summary: ['Total a pagar', 'este mes'] },
      },
    },
    closeEvent: {
      name: 'Close event',
      control: false,
      description: 'Header event click.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    backEvent: {
      name: 'Back event',
      control: false,
      description: 'Secondary button event.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    payEvent: {
      name: 'Pay event',
      control: false,
      description: 'Primary button event.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    title: 'Estado de cuenta' as unknown as InputSignal<string>,
    labelPrimary: 'Cuota Mensual' as unknown as InputSignal<string>,
    labelSecondary: 'Pendiente' as unknown as InputSignal<string>,
    totalCount: 10000 as unknown as InputSignal<number>,
    counter: 1000 as unknown as InputSignal<number>,
    progressTitle: 'Total pagado' as unknown as InputSignal<string>,
    formatDates: 'yyyy-MM-dd' as unknown as InputSignal<string>,
    paymentDeadline: '2024-10-20' as unknown as InputSignal<string | undefined>,
    cutOffDate: '2024-10-01' as unknown as InputSignal<string | undefined>,
    paymentDeadlineLabel:
      'Fecha límite de pago:' as unknown as InputSignal<string>,
    cutOffDateLabel: 'Fecha de corte:' as unknown as InputSignal<string>,
    payButtonLabel: 'Pagar' as unknown as InputSignal<string>,
    backButtonLabel: 'Regresar' as unknown as InputSignal<string>,
    modalTitle: 'Nombre de clase' as unknown as InputSignal<string>,
    modalSubtitle: 'TS-0001' as unknown as InputSignal<string>,
    modalRestLabel: 'Pagar restante' as unknown as InputSignal<string>,
    modalOtherAmountLabel: 'Otra cantidad' as unknown as InputSignal<string>,
    modalPrimaryButtonLabel: 'Pagar' as unknown as InputSignal<string>,
    errorMessage:
      'Error, Este campo es requerido y debe ser una cantidad entre 1 y 9000' as unknown as InputSignal<string>,
    progressCircleTitle: [
      'Total a pagar',
      'este mes',
    ] as unknown as InputSignal<string[]>,
  },
};

export default meta;

type Story = StoryObj<BmbAccountStatementComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <bmb-account-statement
        [title]="title"
        [progressCircleTitle]="progressCircleTitle"
        [labelPrimary]="labelPrimary"
        [labelSecondary]="labelSecondary"
        [totalCount]="totalCount"
        [counter]="counter"
        [progressTitle]="progressTitle"
        [formatDates]="formatDates"
        [paymentDeadline]="paymentDeadline"
        [cutOffDate]="cutOffDate"
        [paymentDeadlineLabel]="paymentDeadlineLabel"
        [cutOffDateLabel]="cutOffDateLabel"
        [payButtonLabel]="payButtonLabel"
        [backButtonLabel]="backButtonLabel"
        [modalTitle]="modalTitle"
        [modalSubtitle]="modalSubtitle"
        [modalRestLabel]="modalRestLabel"
        [modalOtherAmountLabel]="modalOtherAmountLabel"
        [modalPrimaryButtonLabel]="modalPrimaryButtonLabel"
        [errorMessage]="errorMessage"
      />
      <!-- The portal component should be added at the end of the app.component.html -->
      <bmb-portal />
    `,
  }),
};
