import { Meta, StoryObj } from '@storybook/angular';
import { BmbCardComponent } from './bmb-card.component';

export default {
  title: 'Micro Componentes/Card',
  component: BmbCardComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbCardComponent ],
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
    //   @Input() borderRadius: SizeNames | SizeNames[] = 'm';
    // @Input() padding: SizeNames | SizeNames[] = 'm';
    // @Input() margin: SizeNames | SizeNames[] = 'm';
    borderRadius: {
      name: 'Border radius',
      control: {
        type: 'radio',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Determines the corner radius size',
    },
    padding: {
      name: 'Padding',
      control: {
        type: 'radio',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Set the padding size',
    },
    margin: {
      name: 'Margin',
      control: {
        type: 'radio',
      },
      options: ['xs', 's', 'm', 'l', 'xl', 'none', 'auto'],
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'm' },
      },
      description: 'Set the margin size',
    },
  },
  args: {
    borderRadius: 'm',
    padding: 'm',
    margin: 'm',
  },
} as Meta<typeof BmbCardComponent>;

type Story = StoryObj<BmbCardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <bmb-card [borderRadius]="borderRadius" [padding]="padding" [margin]="margin">
        <ng-template #header>Optional header</ng-template>
        <div>Content</div>
        <ng-template #footer>Optional footer</ng-template>
      </bmb-card>
    `,
  }),
};
