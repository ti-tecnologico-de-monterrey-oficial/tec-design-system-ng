import type { Meta, StoryObj } from '@storybook/angular';
import { BmbIframeComponent } from './bmb-iframe.component';

export default {
  title: 'Micro Componentes/Iframe',
  component: BmbIframeComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbIframeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbIframeComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    height: {
      name: 'Height',
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
      name: 'Width',
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
      name: 'SRC',
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
      name: 'Loading',
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
      name: 'Name',
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
