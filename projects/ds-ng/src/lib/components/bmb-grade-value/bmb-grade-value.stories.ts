import type { Meta, StoryObj } from '@storybook/angular';
import { BmbGradeValueComponent } from './bmb-grade-value.component';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

export default {
  title: 'Components/Visual labels/Grade value',
  component: BmbGradeValueComponent,
  decorators: [storiesLayoutHorizontal],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbGradeValueComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [],
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
    type: {
      name: 'Type',
      control: {
        type: 'radio',
      },
      options: ['main-grade', 'partial-grade'],
      description: `
Sets the type of anatomy variation to display.

      IBmbGradeType =
      | 'main-grade'
      | 'partial-grade'
      `,
      table: {
        category: 'Properties',
        type: { summary: 'IBmbGradeType' },
        defaultValue: { summary: 'main-grade' },
      },
    },
    score: {
      name: 'Score',
      control: { type: 'text' },
      description:
        'Sets the number or text to display as score. The value can be a number or a string with a maximum of 4 characters.',
      table: {
        category: 'Properties',
        type: { summary: 'number or string' },
        defaultValue: { summary: 0 },
      },
    },
  },
  args: {
    type: 'main-grade',
    score: '89',
  },
} as Meta<typeof BmbGradeValueComponent>;

type Story = StoryObj<BmbGradeValueComponent>;

export const MainGradeTypeExample: Story = {
  name: "'main-grade' type example",
};

export const PartialGradeTypeExample = {
  name: "'partial-grade' type example",
  args: {
    type: 'partial-grade',
    score: '89',
  },
};

export const TextScoreExample = {
  name: 'Example text for score',
  args: {
    score: 'Cu',
  },
};
