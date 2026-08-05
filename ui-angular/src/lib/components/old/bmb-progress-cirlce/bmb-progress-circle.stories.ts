import { Meta, StoryObj } from '@storybook/angular';
import { BmbProgressCircleComponent } from './bmb-progress-circle.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbInputParamDesc,
  getDefaultValueControl,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

const IMPORTANT_DESCRIPTION = `<br/><br/>${RELEVANT_TITLE.important} The gray fill path (fillPathStatus) does not work for the full state (fullFillPathStatus).`;

export default {
  title: 'Components/Status indicators/Progress circle',
  component: BmbProgressCircleComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'applyOptions',
          'draw',
          'getFillPathStatus',
          'getRelativeY',
          'isFullColored',
          'polarToCartesian',
          'render',
          'shouldShowProgressPath',
          'shouldShowValueLabel',
          'ngOnChanges',
          'ngOnInit',
          '_lastPercent',
          'options',
          'responsive',
          'svg',
          'showRestBackground',
          'isTitleString',
          'validTitle',
          'displayIcon',
          'getContainerClasses',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'progress-circle' })} visually indicates the status of a definite amount of work completed.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/progress-circle/descripcion-general-M5Xm37iL' })}
${getBasicExampleBlock('BmbProgressCircleComponent')}
        `,
      },
    },
  },
  argTypes: {
    valueLabel: getPropertyParamDesc('value label', {
      defaultSummary: '""',
      additionalDescription:
        '<br/><br/>The value label will be displayed in the center of the progress circle.',
    }),
    fullFillPathStatus: getPropertyParamDesc('full state', {
      controlType: 'boolean',
      defaultSummary: false,
      additionalDescription: `<br/><br/>The progress circle will display in a full state and the percentage path and value content will be hidden.
${IMPORTANT_DESCRIPTION}`,
    }),
    showValueLabel: {
      control: {
        type: 'boolean',
      },
      description: 'Displays the value label when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },
    percent: {
      control: {
        type: 'number',
      },
      description: 'Sets the percentage of progress to be displayed.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: getDefaultValueControl(0),
      },
    },
    componentTitle: getPropertyParamDesc('progress circle', {
      additionalDescription: `
<br/><br/>Considerations for displaying text on one or more lines:
- Use a string to display the title on a single line.
- Use a string array to display the title on more than one line.
`,
    }),
    showTitle: {
      control: {
        type: 'boolean',
      },
      description: 'Displays the title when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },
    fillPathStatus: {
      control: {
        type: 'select',
      },
      options: ['gray', 'success', 'error', 'warning'],
      description: `
Sets the color of the path that fills the circle.
${IMPORTANT_DESCRIPTION}
      `,
      table: {
        category: 'Properties',
        type: { summary: 'BmbProgressCirclePathStatus' },
        defaultValue: getDefaultValueControl('success'),
      },
    },
    title: {
      control: null,
      description:
        'Please use `componentTitle` instead of `title` to set the component title.',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
        defaultValue: '',
      },
    },
    showBackground: DBmbGenericParamDesc.deprecated,
    icon: DBmbInputParamDesc.icon,
    size: {
      control: {
        type: 'select',
      },
      options: ['default', 'small'],
      description:
        'Defines the size variant of the progress circle. Use "default" for the standard size or "small" for a more compact version.',
      table: {
        category: 'Properties',
        type: { summary: "'default' | 'small'" },
        defaultValue: getDefaultValueControl('default'),
      },
    },
    showOperationState: {
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
  args: {
    fillPathStatus: 'gray',
  },
} as Meta<typeof BmbProgressCircleComponent>;

type Story = StoryObj<BmbProgressCircleComponent>;

export const Default = {};

export const WithLabelAndTitle: Story = {
  args: {
    showTitle: true,
    showValueLabel: true,
    componentTitle: ['Título'],
    valueLabel: '75%',
    percent: 75,
  },
};

export const WithLabel: Story = {
  args: {
    showValueLabel: true,
    valueLabel: '75%',
    percent: 75,
  },
};

export const WithLabelTitleAndIcon: Story = {
  args: {
    showTitle: true,
    showValueLabel: true,
    componentTitle: ['Título'],
    valueLabel: '75%',
    percent: 75,
    icon: 'home',
  },
};

export const SemanticStatusError: Story = {
  args: {
    fillPathStatus: 'error',
    showTitle: true,
    componentTitle: ['Alto'],
  },
};

export const SemanticStatusWarning: Story = {
  args: {
    fillPathStatus: 'warning',
    showTitle: true,
    componentTitle: ['Medio'],
  },
};

export const SemanticStatusSuccess: Story = {
  args: {
    fillPathStatus: 'success',
    showTitle: true,
    componentTitle: ['Bajo'],
  },
};

export const OperationStateSuccessWithLabelIconTitle: Story = {
  args: {
    showTitle: true,
    showValueLabel: true,
    componentTitle: ['Completado'],
    showOperationState: true,
    fullFillPathStatus: true,
    fillPathStatus: 'success',
    valueLabel: '100%',
    icon: 'check_circle',
  },
};

export const OperationStateSuccessWithLabelIcon: Story = {
  args: {
    showValueLabel: true,
    showOperationState: true,
    fullFillPathStatus: true,
    fillPathStatus: 'success',
    valueLabel: '100%',
    icon: 'check_circle',
  },
};

export const OperationStateSuccessWithTitleIcon: Story = {
  args: {
    showTitle: true,
    componentTitle: ['Completado'],
    showOperationState: true,
    fullFillPathStatus: true,
    fillPathStatus: 'success',
    icon: 'check_circle',
  },
};

export const OperationStateErrorWithLabelIconTitle: Story = {
  args: {
    showTitle: true,
    showValueLabel: true,
    componentTitle: ['Error'],
    showOperationState: true,
    fullFillPathStatus: true,
    fillPathStatus: 'error',
    valueLabel: 'N/A',
    icon: 'error',
  },
};

export const OperationStateErrorWithLabelIcon: Story = {
  args: {
    showValueLabel: true,
    showOperationState: true,
    fullFillPathStatus: true,
    fillPathStatus: 'error',
    valueLabel: 'N/A',
    icon: 'error',
  },
};

export const OperationStateErrorWithTitleIcon: Story = {
  args: {
    showTitle: true,
    componentTitle: ['Error'],
    showOperationState: true,
    fullFillPathStatus: true,
    fillPathStatus: 'error',
    icon: 'error',
  },
};

export const EmptyStateWithTitleAndIcon: Story = {
  args: {
    emptyState: true,
    showTitle: true,
    icon: 'home',
    componentTitle: ['Sin movimientos'],
  },
};

export const EmptyStateWithTitleIconAndValue: Story = {
  args: {
    emptyState: true,
    showTitle: true,
    componentTitle: ['Sin movimientos'],
    icon: 'home',
    showValueLabel: true,
    valueLabel: '---',
  },
};

export const Size: Story = {
  args: {
    showValueLabel: true,
    valueLabel: '000',
    size: 'small',
    percent: 75,
  },
};
