import { Meta, StoryObj } from '@storybook/angular';
import { BmbBalanceOverviewComponent } from './bmb-balance-overview.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  RELEVANT_TITLE,
} from '../../../../../../doc/utils/utils';
import {
  DBmbInputParamDesc,
  getAppearanceParam,
  getDefaultValueControl,
  getPropertyParamDesc,
} from '../../../../../../doc/utils/parameterDescriptions';

const IMPORTANT_DESCRIPTION = `<br/><br/>${RELEVANT_TITLE.important} The gray fill path (progressCircleFillPathStatus) does not work for the full state (progressCircleFullFillPathStatus).`;

export default {
  title: 'Components/Containers/Balance overview',
  component: BmbBalanceOverviewComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'balance-overview' })} to display a balance overview with progress circle and labels.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/balance-overview/descripcion-general-x52Nsnq2' })}
${getBasicExampleBlock('BmbBalanceOverviewComponent')}
        `,
      },
    },
  },
  argTypes: {
    progressCirclePercent: {
      control: {
        type: 'number',
      },
      description:
        'Sets the percentage that the Progress Circle component show.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    progressCircleValue: {
      control: {
        type: 'text',
      },
      description:
        'Sets the total value that the Progress Circle component show.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    showProgressCircleValue: {
      control: {
        type: 'boolean',
      },
      description: 'Enables and displays the progress circle value when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    progressCircleTitle: {
      control: {
        type: 'object',
      },
      description:
        'Sets the text of the progress circle, to show the text in one line use a simple array, if you want to show the title in more than one line, use an array string',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
        defaultValue: { summary: 'Title' },
      },
    },
    showprogressCircleTitle: {
      control: {
        type: 'boolean',
      },
      description: 'Enables the title of the progress circle when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    showProgressCircleBackground: {
      control: {
        type: 'boolean',
      },
      description: 'Enables the background of the progress circle when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    labelPrimary: {
      control: 'text',
      description: 'Sets the label section of the left content.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'Text' },
      },
    },
    valuePrimary: {
      control: {
        type: 'text',
      },
      description: 'Sets the value section of the left content.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '$0' },
      },
    },
    labelSecondary: {
      control: 'text',
      description: 'Sets the label section of the right content.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'Text' },
      },
    },
    valueSecondary: {
      control: {
        type: 'text',
      },
      description: 'Sets the value section of the right content.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '$0' },
      },
    },
    showProgressCircleTitle: {
      control: {
        type: 'boolean',
      },
      description: 'Enables and displays the progress circle title when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    icon: DBmbInputParamDesc.icon,
    progressCircleFillPathStatus: {
      control: {
        type: 'select',
      },
      options: ['gray', 'success', 'error', 'warning'],
      description: `Sets the color of the path that fills the circle. ${IMPORTANT_DESCRIPTION}`,
      table: {
        category: 'Properties',
        type: { summary: 'BmbProgressCirclePathStatus' },
        defaultValue: getDefaultValueControl('success'),
      },
    },
    progressCircleFullFillPathStatus: getPropertyParamDesc('full state', {
      controlType: 'boolean',
      defaultSummary: false,
      additionalDescription: `<br/><br/>The progress circle will display in a full state and the percentage path and value content will be hidden. ${IMPORTANT_DESCRIPTION}`,
    }),
    showProgressCircleOperationState: {
      control: {
        type: 'boolean',
      },
      description:
        'Displays an operation state indicator for success or error statuses when the progress circle is fully filled.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },
    indicatorAppearance: getAppearanceParam(
      'legend',
      [
        'normal',
        'strong',
        'success',
        'info',
        'warning',
        'error',
        'brand',
        'empty',
      ],
      'normal',
    ),
    emptyState: {
      control: {
        type: 'boolean',
      },
      description:
        'Displays the empty state variant of the progress circle, hiding the progress indicator and showing the empty-state content.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },
  },
  args: {},
} as Meta<typeof BmbBalanceOverviewComponent>;

type Story = StoryObj<BmbBalanceOverviewComponent>;

export const Default: Story = {};

export const DefaultProgress = {
  args: {
    progressCirclePercent: 75,
    progressCircleValue: '$10,000',
    progressCircleTitle: ['Total a pagar este mes'],
    labelPrimary: 'Cuota Mensual',
    valuePrimary: '$2,500.00',
    labelSecondary: 'Penalidad',
    valueSecondary: '$2,500.00',
    icon: 'home',
    progressCircleFillPathStatus: 'success',
  },
};

export const OperationStateError = {
  args: {
    progressCircleValue: 'N/A',
    progressCircleTitle: ['Error'],
    labelPrimary: 'Cuota Mensual',
    valuePrimary: '$2,500.00',
    labelSecondary: 'Penalidad',
    valueSecondary: '$2,500.00',
    icon: 'error',
    progressCircleFillPathStatus: 'error',
    progressCircleFullFillPathStatus: true,
    showProgressCircleOperationState: true,
    indicatorAppearance: 'error',
  },
};

export const OperationStateSuccess = {
  args: {
    progressCircleValue: '$10000',
    progressCircleTitle: ['Pagado'],
    labelPrimary: 'Cuota Mensual',
    valuePrimary: '$2,500.00',
    labelSecondary: 'Penalidad',
    valueSecondary: '$2,500.00',
    icon: 'success',
    progressCircleFillPathStatus: 'success',
    progressCircleFullFillPathStatus: true,
    showProgressCircleOperationState: true,
    indicatorAppearance: 'success',
  },
};

export const EmptyState = {
  args: {
    progressCircleValue: '---',
    progressCircleTitle: ['Sin movimientos'],
    labelPrimary: 'Legend',
    valuePrimary: '---',
    labelSecondary: 'Legend',
    valueSecondary: '---',
    icon: 'home',
    progressCircleFillPathStatus: 'gray',
    indicatorAppearance: 'empty',
    emptyState: true,
  },
};
