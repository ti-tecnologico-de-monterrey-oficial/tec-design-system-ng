import { Meta, StoryObj } from '@storybook/angular';
import { BmbStepProgressBarComponent } from './bmb-step-progress-bar.component';

export default {
  title: 'Micro Componentes/Step Progress Bar',
  component: BmbStepProgressBarComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbStepProgressBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbStepProgressBarComponent ],
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
    activeStep: {
      name: 'Active Step',
      control: {
        type: 'number',
      },
      description: 'Refers to the step that is active.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    totalSteps: {
      name: 'Total Steps',
      control: {
        type: 'number',
      },
      description: 'Number of steps that the counter will show.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    size: {
      name: 'Size',
      control: {
        type: 'radio',
      },
      options: ['small', 'medium', 'default'],
      description:
        'Set the size of the steps. **Note**: This property only works when the `type` is `horizontal`.',
      table: {
        category: 'Properties',
        type: { summary: 'select' },
        defaultValue: { summary: 'default' },
      },
    },
    freeze: {
      name: 'Freeze',
      control: {
        type: 'boolean',
      },
      description: 'Freezes the state of progress steps.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      name: 'Type',
      control: {
        type: 'radio',
      },
      options: ['horizontal', 'vertical'],
      description:
        'Changes the direction of the step progress bar, could be horizontal or vertical',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    labelSteps: {
      name: 'Label Steps',
      control: {
        type: 'array',
      },
      description: 'Set the label for each step',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
      },
    },
    labelComplete: {
      name: 'Label complete',
      control: {
        type: 'text',
      },
      description: 'Set the label for complete steps',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Completo' },
      },
    },
    labelIncomplete: {
      name: 'Label incomplete',
      control: {
        type: 'text',
      },
      description: 'Set the label for incomplete steps',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Pendiente' },
      },
    },
  },
  args: {
    totalSteps: 5,
    activeStep: 3,
    size: 'default',
    freeze: false,
    type: 'vertical',
    labelSteps: [
      '¡Orden de compra aprobada!',
      '¡Orden de compra aprobada!',
      '¡Orden de compra aprobada!',
      '¡Orden de compra aprobada!',
      '¡Orden de compra aprobada!',
    ],
    labelComplete: 'Completo',
    labelIncomplete: 'Pendiente',
  },
} as Meta<typeof BmbStepProgressBarComponent>;

type Story = StoryObj<BmbStepProgressBarComponent>;

export const Default: Story = {};
