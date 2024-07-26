import { Meta, StoryObj } from '@storybook/angular';
import { BmbSkeletonComponent } from './bmb-skeleton.component';

export default {
  title: 'Micro Componentes/Skeleton',
  component: BmbSkeletonComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbSkeletonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbSkeletonComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {
  type = 'header';
}
\`\`\`

Below is an example of how you can use this component in HTML:

\`\`\`html
<bmb-skeleton [type]="'header'"></bmb-skeleton>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type: {
      name: 'Type',
      control: 'select',
      options: ['header', 'stray', 'generic1', 'generic2', 'generic3'],
      description: 'The type of skeleton to display.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    type: 'header',
  },
} as Meta<typeof BmbSkeletonComponent>;

type Story = StoryObj<BmbSkeletonComponent>;

export const Default: Story = {};
