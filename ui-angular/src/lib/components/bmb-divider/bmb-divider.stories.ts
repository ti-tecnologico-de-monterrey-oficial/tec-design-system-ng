import { Meta, StoryObj } from '@storybook/angular';
import { BmbDividerComponent } from './bmb-divider.component';
import {
  BlockquoteType,
  getAlertBlockquote,
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  RELEVANT_TITLE,
} from '@docs/utils/utils';
import { BMB_DIVIDER_LIST, BMB_DIVIDER_ORIENTATION_LIST } from '@shared/types';

export default {
  title: 'Components/Containers/Divider',
  component: BmbDividerComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'divider' })} to separate sections of content, improving organization and visual clarity.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/divider/descripcion-general-Z8NNTVA9' })}
${getArchitectureSection(`
<div class="bmb_divider" <!-- conditional classes bmb_divider bmb_divider-{this.type} >
</div>
  `)}
${getBasicExampleBlock('BmbDividerComponent')}
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'radio',
      },
      options: BMB_DIVIDER_LIST,
      description:
        'Sets the type of the divider, affecting its visual view. Is not necessary to add the "simple" style.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'simple' },
        type: { summary: 'BmbDividerType' },
      },
    },
    orientation: {
      control: {
        type: 'radio',
      },
      options: BMB_DIVIDER_ORIENTATION_LIST,
      description: `Sets the orientation of the divider.
${getAlertBlockquote('`Vertical` orientation corresponds to small vertical variant', { title: RELEVANT_TITLE.configuration, blockquoteType: BlockquoteType.important })}`,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'BmbDividerOrientation' },
      },
    },
    removeMargin: {
      control: {
        type: 'boolean',
      },
      description:
        'Removes the default margin of the divider, making it flush with adjacent elements.',
      table: {
        category: 'Properties',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    type: 'simple',
    orientation: 'horizontal',
    removeMargin: false,
  },
} as Meta<typeof BmbDividerComponent>;

type Story = StoryObj<BmbDividerComponent>;

export const Default: Story = {};
