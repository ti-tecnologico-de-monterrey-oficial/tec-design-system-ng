import type { Meta, StoryObj } from '@storybook/angular';
import { BmbGradesMicroComponent } from './bmb-grades-micro.component';

export default {
  title: 'Macro Componentes/Grades micro',
  component: BmbGradesMicroComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbGradesMicroComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbGradesMicroComponent ],
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
    gradeTitle: {
      name: 'Grade title',
      control: {
        type: 'text',
      },
      description:
        'Sets a required string input that represents the title of the grades section.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    title: {
      name: 'Title',
      control: { type: 'text' },
      description:
        'Sets a required string input that represents the main title of the component.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    accredited: {
      name: 'Accredited',
      control: { type: 'object' },
      description:
        'Sets a required input of type IBmbNameValuePair that indicates accreditation status.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbNameValuePair' },
      },
    },
    average: {
      name: 'Accredited',
      control: { type: 'object' },
      description:
        'Sets a required input of type IBmbNameValuePair that represents the average grade.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbNameValuePair' },
      },
    },
    summary: {
      name: 'Accredited',
      control: { type: 'object' },
      description:
        'Sets a required input of type IBmbNameValuePair that provides a summary of the grades.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbNameValuePair' },
      },
    },
  },
  args: {
    gradeTitle: 'Período actual',
    title: 'Semestral AGO-DIC 2024',
    accredited: { name: 'Créditos aprobados', value: '39' },
    average: { name: 'Promedio acumulado', value: '90' },
    summary: { name: 'Faltas totales', value: '3' },
  },
} as Meta<typeof BmbGradesMicroComponent>;

type Story = StoryObj<BmbGradesMicroComponent>;

export const Default: Story = {};
