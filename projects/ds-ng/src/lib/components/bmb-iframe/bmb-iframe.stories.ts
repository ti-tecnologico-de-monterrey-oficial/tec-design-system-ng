import type { Meta, StoryObj } from '@storybook/angular';
import { BmbIframeComponent } from './bmb-iframe.component';
import {
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';

export default {
  title: 'Foundations/System elements/Iframe',
  component: BmbIframeComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `
${getGeneralComponentDescription({ name: 'iframe', type: 'element' })} to embed another webpage within the current, acting as a *window* within the main page to display external content.
  `,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/foundations/i-frame/descripcion-general-gxUE3JoE',
  },
)}
${getArchitectureSection(`
<section class="bmb_iframe">
  <iframe { configuration } ></iframe>
</section>
`)}
${getBasicExampleBlock('BmbIframeComponent')}
        `,
      },
    },
  },
  argTypes: {
    height: {
      control: {
        type: 'text',
      },
      description: 'The height of the iframe.',
      table: {
        category: 'Properties',
        type: { summary: 'number | string' },
        defaultValue: { summary: '100%' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the iframe.',
      table: {
        category: 'Properties',
        type: { summary: 'number | string' },
        defaultValue: { summary: '100%' },
      },
    },
    src: {
      control: {
        type: 'text',
      },
      description: 'The source of the iframe. **This property is required**.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    loading: {
      control: {
        type: 'select',
      },
      options: ['lazy', 'eager'],
      description: 'The loading behavior of the iframe.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'eager' },
      },
    },
    name: {
      control: {
        type: 'text',
      },
      description: 'The name of the iframe.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    height: '100%',
    width: '100%',
    src: 'https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik',
    loading: 'eager',
    name: 'test',
  },
} as Meta<typeof BmbIframeComponent>;

type Story = StoryObj<typeof BmbIframeComponent>;

export const Default: Story = {};
