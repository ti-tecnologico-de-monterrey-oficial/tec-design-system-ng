import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { BmbTooltipComponent } from './bmb-tooltip.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export default {
  title: 'Micro Componentes/ToolTip',
  component: BmbTooltipComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbTooltipComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbTooltipComponent ],
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
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'Set the title to show in the tooltip',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    text: {
      name: 'Text',
      control: {
        type: 'text',
      },
      description: 'Set the text to show in the tooltip',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. The color of the icon depend on the parent.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'help' },
      },
    },
    size: {
      name: 'size',
      control: { type: 'number' },
      description: 'Size of the icon to use. Note: <= 0 will be inherited.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    align: {
      name: 'Align',
      control: { type: 'radio' },
      options: ['above', 'below', 'left', 'right'],
      description: 'Defines the position of the tooltip.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'right' },
        type: { summary: 'string' },
      },
    },
    justify: {
      name: 'Justify',
      control: { type: 'radio' },
      options: ['centered', 'before', 'after'],
      description:
        'Defines the justification with reference to the icon tooltip.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'after' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    title: 'Titulo del tooltip',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nihil modi repellendus ad aspernatur corporis.',
    icon: 'help',
    size: 40,
    align: 'right',
    justify: 'centered',
  },
} as Meta<typeof BmbIconComponent>;

type Story = StoryObj<BmbIconComponent>;

export const Default: Story = {};
