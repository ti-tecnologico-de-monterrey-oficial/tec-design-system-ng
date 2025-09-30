import { Meta, StoryObj } from '@storybook/angular';
import { BmbDividerComponent } from './bmb-divider.component';
import {
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';

export default {
  title: 'Components/Containers/Divider',
  component: BmbDividerComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription({ content: `${getGeneralComponentDescription({ name: 'divider' })} to separate sections of content, improving organization and visual clarity.`, generalDocLink: 'https://bamboo.tec.mx/latest/componentes/divider/descripcion-general-Z8NNTVA9' })}
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
      options: ['simple', 'dashed', 'dotted'],
      description:
        'Sets the type of the divider, affecting its visual view. Is not necessary to add the "simple" style.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'simple' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    type: 'simple',
  },
} as Meta<typeof BmbDividerComponent>;

type Story = StoryObj<BmbDividerComponent>;

export const Default: Story = {};
