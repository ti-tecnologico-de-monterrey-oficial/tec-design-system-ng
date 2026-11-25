import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import {
  getArchitectureSection,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
} from '@docs/utils/utils';
import {
  DBmbTooltipParamDesc,
  getPropertyParamDesc,
} from '@docs/utils/parameterDescriptions';
import { BmbTooltipBaseComponent } from './bmb-tooltip-base.component';

export default {
  title: 'Internals/Tooltip base',
  component: BmbTooltipBaseComponent,
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `<div style="height: 100px;">
        ${story}
      </div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'tooltip-base' })} to render tooltip content for a projected element.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/tooltip/descripcion-general-Y5OcIrFr',
  },
)}
${getArchitectureSection(
  `
<span class="bmb_tooltip-container">
  <ng-content />
</span>
`,
)}
${getSpecialSpecifications(
  'This is a low-level building block. Use `bmb-tooltip` for standard tooltip implementations. In manual mode, the component hides its projected content and its consumer is responsible for showing and hiding the tooltip.',
)}
        `,
      },
    },
  },
  argTypes: {
    componentTitle: getPropertyParamDesc('tooltip'),
    text: DBmbTooltipParamDesc.text,
    manual: {
      control: { type: 'boolean' },
      description:
        'Disables automatic pointer and focus handling. The consumer must call `showTooltip()` and `hideTooltip()`.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    anchor: {
      control: false,
      description:
        'Optional external element used as the tooltip positioning anchor.',
      table: {
        category: 'Properties',
        type: { summary: 'HTMLElement' },
      },
    },
  },
  args: {
    componentTitle: 'Tooltip title',
    text: 'Additional information appears when the trigger receives focus or pointer interaction.',
    manual: false,
  },
} as Meta<typeof BmbTooltipBaseComponent>;

type Story = StoryObj<BmbTooltipBaseComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
<bmb-tooltip-base
  [componentTitle]="componentTitle"
  [text]="text"
  [manual]="manual"
  [anchor]="anchor"
>
    Hover or focus to show the tooltip
</bmb-tooltip-base>
    `,
  }),
};
