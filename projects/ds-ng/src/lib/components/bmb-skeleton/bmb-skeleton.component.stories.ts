import { Meta, StoryObj } from '@storybook/angular';
import { BmbSkeletonComponent } from './bmb-skeleton.component';

export default {
  title: 'Dev tools/Skeleton',
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
      options: ['header', 'input', 'stray', 'generic1', 'generic2', 'generic3'],
      description: 'The type of skeleton to display.',
      table: {
        category: 'Properties',
        type: {
          summary: 'BmbSkeletonType',
          detail: `options: 'header' | 'input' | 'stray' | 'generic1' | 'generic2' | 'generic3'`,
        },
        defaultValue: { summary: 'header' },
      },
    },
  },
  args: {
    type: 'header',
  },
} as Meta<typeof BmbSkeletonComponent>;

type Story = StoryObj<BmbSkeletonComponent>;

export const Default: Story = {};
