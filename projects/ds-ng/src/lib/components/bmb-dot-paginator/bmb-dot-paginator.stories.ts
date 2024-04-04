import { Meta, StoryObj } from '@storybook/angular';
import { BmbDotPaginatorComponent } from './bmb-dot-paginator.component';

export interface Target {
  target: string;
  index: number;
}

export default {
  title: 'Micro Componentes/Dot Paginator',
  component: BmbDotPaginatorComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbDotPaginatorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

export interface Target {
  target: string;
  index: number;
}

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbDotPaginatorComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})

export class Component {
  myActiveDotIndex: number = 0;
  myTotalDots: number = 5;
  myTargets: Target[] = [
    { target: '#item1', index: 0 },
    { target: '#item2', index: 1 },
  ];

  handleDotPress(index: number): void {
    this.myActiveDotIndex = index;
  }
}
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    appearance: {
      name: 'Appearance',
      control: {
        type: 'radio',
      },
      options: ['primary', 'secondary'],
      description:
        'The style of the dot paginator. Is not neccesary to add the "primary" style.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'primary' },
        type: { summary: 'string' },
      },
    },
    activeDotIndex: {
      name: 'Active dot index',
      control: 'number',
      description: 'Index of the active dot.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
    totalDots: {
      name: 'Total Dots',
      control: 'number',
      description: 'Total number of dots.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 5 },
        type: { summary: 'number' },
      },
    },
    targets: {
      name: 'Targets',
      control: 'object',
      description: 'Target objects for each dot.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'optional' },
        type: { summary: 'Target[]' },
      },
    },
    onDotPress: {
      name: 'On Dot Press',
      control: {
        type: '',
      },
      description:
        'This handler can be used to perform a specific interaction with each dot.',
      table: {
        category: 'Events',
        type: { summary: '(onDotPress)="yourFunction($event)"' },
      },
    },
  },

  args: {
    activeDotIndex: 0,
    totalDots: 5,
    targets: [
      { target: '#item1', index: 0 },
      { target: '#item2', index: 1 },
    ],
    onDotPress: (index: number) => {
      window.alert(index);
    },
  },
} as Meta<typeof BmbDotPaginatorComponent>;

type Story = StoryObj<BmbDotPaginatorComponent>;

export const Default: Story = {};
