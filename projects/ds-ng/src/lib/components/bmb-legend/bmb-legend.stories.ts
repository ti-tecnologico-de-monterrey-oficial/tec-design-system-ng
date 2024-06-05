import { Meta, StoryObj } from '@storybook/angular';
import { BmbLegendComponent } from './bmb-legend.component';

export default {
  title: 'Micro Componentes/Legend',
  component: BmbLegendComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbLegendComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbLegendComponent ],
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
    label: {
      name: 'Label',
      control: 'text',
      description: 'Label section content.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '' },
      },
    },
    value: {
      name: 'Value',
      control: {
        type: 'text',
      },
      description: 'Value section content.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '' },
      },
    },
    indicatorAppearance: {
      name: 'Indicator appearance',
      control: {
        type: 'select',
      },
      options: [
        'normal',
        'strong',
        'success',
        'info',
        'warning',
        'error',
        'brand',
      ],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'normal' },
      },
      description: 'Determines the indicator color',
    },
  },
  args: {
    label: 'Title',
    value: '$0.00',
    indicatorAppearance: 'primary',
  },
} as Meta<typeof BmbLegendComponent>;

type Story = StoryObj<BmbLegendComponent>;

export const Default: Story = {};
