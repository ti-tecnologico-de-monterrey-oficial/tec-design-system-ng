import { Meta, StoryObj } from '@storybook/angular';
import { BmbPullWedgeComponent } from './bmb-pull-wedge.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  getDefaultValueControl,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Visual labels/Header pull wedge',
  component: BmbPullWedgeComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'contentHeight',
          'initialDragHeight',
          'isVisible',
          'maxDragHeight',
          'onDragEnded',
          'onDragMoved',
          'onDragStarted',
          'toggleWedge',
          'ngAfterViewInit',
          'ngOnChanges',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'pull-wedge' })} to enhance the experience of a collapsible menu or panel.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/header-pull-wedge/descripcion-general-rOxNlcIw' })}
${getBasicExampleBlock('BmbPullWedgeComponent')}
\`\`\`html
<bmb-pull-wedge initialHeight="200">
  <bmb-skeleton type="generic3" collapsible style="width: 100%;" />
  <bmb-skeleton type="generic1" collapsible style="width: 100%;" />
</bmb-pull-wedge>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    initialHeight: {
      control: { type: 'number' },
      description: `Sets the full height of the pull wedge for the content to be shown.`,
      table: {
        category: 'Properties',
        type: { summary: 'number (px)' },
        defaultValue: getDefaultValueControl(300),
      },
    },
    minContentHeight: {
      control: { type: 'number' },
      description: `Sets the initial height of the pull wedge.<br/><br/>
${RELEVANT_TITLE.note} Minimum height: 50px.`,
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: getDefaultValueControl(100),
      },
    },
    isOpen: getPropertyParamDesc(
      'open pull wedge',
      'boolean',
      false,
      ' Otherwise it sets it as closed.',
    ),
  },
  args: {
    initialHeight: 300,
    minContentHeight: 100,
  },
} as Meta<typeof BmbPullWedgeComponent>;

type Story = StoryObj<BmbPullWedgeComponent>;

export const Default: Story = {};
