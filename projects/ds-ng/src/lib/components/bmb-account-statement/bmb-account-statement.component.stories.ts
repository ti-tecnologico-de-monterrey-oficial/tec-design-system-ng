import { Meta, StoryObj } from '@storybook/angular';
import { BmbAccountStatementComponent } from './bmb-account-statement.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';
import {
  getDefaultValueControl,
  getOnClickParam,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Organisms/Account statement',
  component: BmbAccountStatementComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'amountForm',
          'isEnableCustomAmount',
          'maxAmount',
          'newModal',
          'showErrors',
          'getFormattedAmount',
          'getFormattedDate',
          'getFormControl',
          'getProgressPercent',
          'handleActiveCustomAmount',
          'handleBack',
          'handleClose',
          'handlePay',
          'ngAfterViewInit',
          'ngOnInit',
          'onSubmit',
          'updateErrorState',
          'customAmount',
          'modalTemplate',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('account-statement', 'organism')} the display of student payment information within Tec de Monterrey.`, 'https://bamboo.tec.mx/latest/organismos/account-statement/descripcion-general-yMI2rj1D')}
${getBasicExampleBlock('BmbAccountStatementComponent')}
        `,
      },
    },
  },
  argTypes: {
    title: getPropertyParamDesc(
      'account statement',
      'text',
      'Estado de cuenta',
    ),
    labelPrimary: getPropertyParamDesc(
      'account statement',
      'text',
      'Cuota Mensual',
      '',
      '',
      'text of primary label',
    ),
    labelSecondary: getPropertyParamDesc(
      'account statement',
      'text',
      'Pendiente',
      '',
      '',
      'text of secondary label',
    ),
    totalCount: getPropertyParamDesc(
      'account statement',
      'text',
      0,
      '',
      '',
      'total amount',
    ),
    counter: getPropertyParamDesc(
      'account statement',
      'text',
      0,
      '',
      '',
      'partial amount',
    ),
    progressTitle: getPropertyParamDesc(
      'header',
      'text',
      'Total pagado',
      '',
      '',
      'progress title',
    ),
    formatDates: getPropertyParamDesc(
      '`cutOffDate` and `paymentDeadline`',
      'text',
      'yyyy-MM-dd',
      '',
      '',
      'format dates',
    ),
    paymentDeadline: getPropertyParamDesc(
      'payment deadline',
      'text',
      '',
      '',
      '',
      'date',
    ),
    cutOffDate: getPropertyParamDesc(
      'payment cutoff',
      'text',
      '',
      '',
      '',
      'date',
    ),
    paymentDeadlineLabel: {
      control: {
        type: 'text',
      },
      description: 'Sets the payment deadline label.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl('Fecha límite de pago:'),
      },
    },
    cutOffDateLabel: {
      control: {
        type: 'text',
      },
      description: 'Sets the cutoff date label.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl('Fecha de corte:'),
      },
    },
    payButtonLabel: getPropertyParamDesc('pay button', 'text', 'Pagar'),
    backButtonLabel: getPropertyParamDesc('back button', 'text', 'Regresar'),
    modalTitle: getPropertyParamDesc('modal'),
    modalSubtitle: getPropertyParamDesc(
      'modal',
      'text',
      '',
      '',
      '',
      'subtitle',
    ),
    modalRestLabel: getPropertyParamDesc(
      'modal',
      'text',
      'Pagar restante',
      '',
      '',
      'balance label',
    ),
    modalOtherAmountLabel: getPropertyParamDesc(
      'modal',
      'text',
      'Otra cantidad',
      '',
      '',
      'label for the custom amount',
    ),
    modalPrimaryButtonLabel: getPropertyParamDesc(
      'modal',
      'text',
      'Otra cantidad',
      '',
      '',
      'primary button label',
    ),
    errorMessage: getPropertyParamDesc(
      'custom amount',
      'text',
      'Error, Este campo es requerido y debe ser una cantidad entre 1 y',
      '',
      '',
      '*error message*',
    ),
    progressCircleTitle: getPropertyParamDesc(
      'progress circle',
      'object',
      "['Total a pagar', 'este mes']",
      '',
      '',
      'label',
    ),
    closeEvent: getOnClickParam(
      getOnEvent('close', 'closeEvent'),
      '. The close button is located in the statement header',
    ),
    backEvent: getOnClickParam(
      getOnEvent('back', 'backEvent'),
      ', this is a secondary button.',
    ),
    payEvent: getOnClickParam(
      getOnEvent('pay', 'payEvent', 'number'),
      ' this is a primary button',
    ),
  },
  args: {
    title: 'Estado de cuenta',
    labelPrimary: 'Cuota Mensual',
    labelSecondary: 'Pendiente',
    totalCount: 10000,
    counter: 1000,
    progressTitle: 'Total pagado',
    formatDates: 'yyyy-MM-dd',
    paymentDeadline: '2024-10-20',
    cutOffDate: '2024-10-01',
    paymentDeadlineLabel: 'Fecha límite de pago:',
    cutOffDateLabel: 'Fecha de corte:',
    payButtonLabel: 'Pagar',
    backButtonLabel: 'Regresar',
    modalTitle: 'Nombre de clase',
    modalSubtitle: 'TS-0001',
    modalRestLabel: 'Pagar restante',
    modalOtherAmountLabel: 'Otra cantidad',
    modalPrimaryButtonLabel: 'Pagar',
    errorMessage:
      'Error, Este campo es requerido y debe ser una cantidad entre 1 y 9000',
    progressCircleTitle: ['Total a pagar', 'este mes'],
    closeEvent: () => {
      console.log('closeEvent');
    },
    payEvent: (amount: number) => {
      console.log('payEvent', amount);
    },
  },
} as Meta<typeof BmbAccountStatementComponent>;

type Story = StoryObj<BmbAccountStatementComponent>;

export const Default: Story = {};
