import { Meta, StoryObj } from '@storybook/angular';
import { BmbContainerButtonBaseComponent } from './bmb-container-button-base.component';
import {
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '@docs/utils/utils';
import {
  DBmbGenericParamDesc,
  getDefaultValueControl,
  getOnClickParam,
  getPropertyParamDesc,
  ON_CLICK_DESCRIPTION,
} from '@docs/utils/parameterDescriptions';

export default {
  title: 'Components/Buttons/Container button/Custom',
  component: BmbContainerButtonBaseComponent,
  tags: ['!autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'bmb-container-button-base' })} to provide the shared button states behavior and layout used by Container button variants.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/container-button/descripcion-general-dzTxNX36' })}
${getSpecialSpecifications(
  `${getAlertBlockquote(
    `The component accepts projected content for the left, main, and right areas.
\`\`\`html
<bmb-container-button-base>
>
  <!-- bmbContainerLeft is optional -->
  <ng-template #bmbContainerLeft>
    <!-- Please add your content -->
  </ng-template>
>
  <ng-template #bmbContainerMain>
    <!-- Please add your content -->
  </ng-template>
>
  <!-- bmbContainerRight is optional -->
  <ng-template #bmbContainerRight>
    <!-- Please add your content -->
  </ng-template>
>
</bmb-container-button-base>
\`\`\`
Sets \`isSquare\` to use the square variant main content.
`,
    {
      title: RELEVANT_TITLE.example,
      blockquoteType: BlockquoteType.note,
      isHeader: true,
    },
  )}
`,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock('BmbContainerButtonBaseComponent')}
        `,
      },
    },
  },
  argTypes: {
    isDisabled: DBmbGenericParamDesc.disabled,
    isError: getPropertyParamDesc('the error state of the container button', {
      controlType: 'boolean',
      defaultSummary: false,
    }),
    isSquare: {
      control: { type: 'boolean' },
      description:
        'Changes square variant when true. It renders the top and main content.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    getClickButton: getOnClickParam(
      getOnEvent('', 'getClickButton'),
      ON_CLICK_DESCRIPTION,
    ),
  },
  args: {
    isDisabled: false,
    isError: false,
    isSquare: false,
    getClickButton: () => {
      console.log('Container button clicked');
    },
  },
} as Meta<typeof BmbContainerButtonBaseComponent>;

type Story = StoryObj<BmbContainerButtonBaseComponent>;

export const Default: Story = {};
