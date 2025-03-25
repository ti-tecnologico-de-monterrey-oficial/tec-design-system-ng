import { Meta, StoryObj } from '@storybook/angular';
import { BmbAcademicProgressComponent } from './bmb-academic-progress.component';

export default {
  title: 'Macro Componentes/Academic progress',
  component: BmbAcademicProgressComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbAcademicProgressComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbAcademicProgressComponent ],
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
    accredited: {
      name: 'Accredited',
      control: {
        type: 'object',
      },
      description: `
Sets the value of accredited.

    IBmbNameValuePair {
      name: string;
      value: string | number | boolean;
    }
      `,
      table: {
        category: 'Properties',
        type: { summary: 'IBmbNameValuePair (required)' },
        defaultValue: { summary: '{}' },
      },
    },
    average: {
      name: 'Average',
      control: {
        type: 'object',
      },
      description: `
Sets the value of accredited.

    IBmbNameValuePair {
      name: string;
      value: string | number | boolean;
    }
      `,
      table: {
        category: 'Properties',
        type: { summary: 'IBmbNameValuePair (required)' },
        defaultValue: { summary: '{}' },
      },
    },
    summary: {
      name: 'Summary',
      control: {
        type: 'object',
      },
      description: `
Sets the value of summary.

    IBmbNameValuePair {
      name: string;
      value: string | number | boolean;
    }
      `,
      table: {
        category: 'Properties',
        type: { summary: 'IBmbNameValuePair (required)' },
        defaultValue: { summary: '{}' },
      },
    },
  },
  args: {
    accredited: { name: 'Materias Acreditadas', value: 7 },
    average: { name: 'Promedio Semestre', value: 99 },
    summary: { name: 'Horas Servicio', value: 45 },
  },
} as Meta<typeof BmbAcademicProgressComponent>;

type Story = StoryObj<BmbAcademicProgressComponent>;

export const Default: Story = {};
