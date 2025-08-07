import { Meta, StoryObj } from '@storybook/angular';
import { BmbBalanceOverviewComponent } from './bmb-balance-overview.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';

export default {
  title: 'Components/Containers/Balance overview',
  component: BmbBalanceOverviewComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('balance-overview')} to display a balance overview with progress circle and labels.`, 'https://bamboo.tec.mx/latest/componentes/balance-overview/descripcion-general-x52Nsnq2')}
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
        type: 'string[]',
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
  },
  args: {
    progressCirclePercent: 75,
    progressCircleValue: '$10,000',
    showProgressCircleValue: true,
    progressCircleTitle: ['Total a pagar', 'este mes'],
    labelPrimary: 'Cuota Mensual',
    valuePrimary: '$7,500.00',
    labelSecondary: 'Pendiente',
    valueSecondary: '$2,500.00',
  },
} as Meta<typeof BmbBalanceOverviewComponent>;

type Story = StoryObj<BmbBalanceOverviewComponent>;

export const Default: Story = {};

export const WithProgressCircle = {
  args: {
    showProgressCircleValue: false,
  },
};
