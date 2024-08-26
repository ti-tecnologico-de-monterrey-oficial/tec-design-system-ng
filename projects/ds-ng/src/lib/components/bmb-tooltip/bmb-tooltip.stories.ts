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
    align: 'right',
    justify: 'centered',
  },
} as Meta<typeof BmbTooltipComponent>;

type Story = StoryObj<BmbTooltipComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
        <bmb-tooltip 
            [title]="'Titulo tooltip'" 
            [text]="'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nihil modi repellendus ad aspernatur corporis.'"
            [align]="'right'" 
            [justify]="'centered'"
            >
            <bmb-icon style="font-size: 40px;" [icon]="'help'"/>
        </bmb-tooltip>
        `,
  }),
};
