import { Meta, StoryObj } from '@storybook/angular';
import { BmbPullWedgeComponent } from './bmb-pull-wedge.component';
import { BmbSkeletonComponent } from '../bmb-skeleton/bmb-skeleton.component';

export default {
  title: 'Micro Componentes/Pull Wedge',
  component: BmbPullWedgeComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbPullWedgeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbPullWedgeComponent, BmbSkeletonComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {
  initialHeight = 200;
}
\`\`\`

Below is an example of how you can use this component in HTML:

\`\`\`html
<bmb-pull-wedge [initialHeight]="'200'">
  <bmb-skeleton [type]="'generic3'" collapsible style="width: 100%;"></bmb-skeleton>
  <bmb-skeleton [type]="'generic1'" collapsible style="width: 100%;"></bmb-skeleton>
</bmb-pull-wedge>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    initialHeight: {
      name: 'Initial Height',
      control: { type: 'number' },
      description:
        'The initial height of the pull wedge. Default height is 200px',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
  },
  args: {
    initialHeight: 200,
  },
} as Meta<typeof BmbPullWedgeComponent>;

type Story = StoryObj<BmbPullWedgeComponent>;

export const Default: Story = {};
