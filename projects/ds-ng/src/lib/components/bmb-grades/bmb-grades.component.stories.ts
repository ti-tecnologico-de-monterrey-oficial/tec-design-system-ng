import { Meta, StoryObj } from '@storybook/angular';
import { BmbGradesComponent } from './bmb-grades.component';

export default {
  title: 'Macro Componentes/Grades',
  component: BmbGradesComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbLegendComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbLegendComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

## Scroll

If you want the component to handle the scroll, you should wrap it in a container with a defined height.

\`\`\`html
<div style="height: 100dvh;">
  <bmb-grades ... />
</div>
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    grades: {
      name: 'Grades',
      control: {
        type: 'object',
      },
      description: 'List of grades to show.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbGrades[]' },
      },
    },
    isMicro: {
      name: 'Is micro',
      control: {
        type: 'boolean',
      },
      description: 'Sets a boolean value when the version is micro.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
      },
    },
    gradeTitle: {
      name: 'Grade title',
      control: {
        type: 'text',
      },
      description:
        'Sets a string input that represents the title of the grades section. Required when "isMicro" is true.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    title: {
      name: 'Title',
      control: { type: 'text' },
      description:
        'Sets a string input that represents the main title of the component. Required when "isMicro" is true.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    accredited: {
      name: 'Accredited',
      control: { type: 'object' },
      description:
        'Sets an input of type IBmbNameValuePair that indicates accreditation status. Required when "isMicro" is true.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbNameValuePair' },
      },
    },
    average: {
      name: 'Accredited',
      control: { type: 'object' },
      description:
        'Sets an input of type IBmbNameValuePair that represents the average grade. Required when "isMicro" is true.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbNameValuePair' },
      },
    },
    summary: {
      name: 'Accredited',
      control: { type: 'object' },
      description:
        'Sets an input of type IBmbNameValuePair that provides a summary of the grades. Required when "isMicro" is true.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbNameValuePair' },
      },
    },
    closeGrades: {
      name: 'Close grades',
      control: false,
      description: 'Close button event.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    grades: [
      {
        title: 'Calificaciones 2022',
        subtitle: 'Semestrales 2022',
        periods: [
          {
            detail: {
              title: 'Semestral X - Y',
              subtitle: 'Z materias acreditadas',
              score: 100,
            },
            accreditedClasses: 7,
            periodAverage: 99,
            serviceHours: 46,
            classes: [
              {
                detail: {
                  title: 'Nombre de clase 1',
                  subtitle: 'TC-100000',
                  score: 'Cu',
                },
                partials: [
                  {
                    title: 'Parcial 1',
                    score: 100,
                  },
                ],
              },
            ],
          },
          {
            detail: {
              title: 'Semestral Y - Z',
              subtitle: 'Z materias acreditadas',
              score: 100,
            },
            accreditedClasses: 6,
            periodAverage: 100,
            serviceHours: 49.5,
            classes: [
              {
                detail: {
                  title: 'Nombre de clase 2',
                  subtitle: 'TC-100000',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1',
                    score: 100,
                  },
                  {
                    title: 'Parcial 2',
                    score: 99,
                  },
                ],
              },
              {
                detail: {
                  title: 'Nombre de clase 3',
                  subtitle: 'TC-100002',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1',
                    score: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Calificaciones 2023',
        subtitle: 'Semestrales 2023',
        periods: [
          {
            detail: {
              title: 'Semestral X - Y  2023',
              subtitle: 'Z materias acreditadas',
              score: 100,
            },
            accreditedClasses: 7,
            periodAverage: 99,
            serviceHours: 46,
            classes: [
              {
                detail: {
                  title: 'Nombre de clase 1  2023',
                  subtitle: 'TC-100000',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1  2023',
                    score: 100,
                  },
                ],
              },
            ],
          },
          {
            detail: {
              title: 'Semestral Y - Z  2023 ',
              subtitle: 'Z materias acreditadas  2023',
              score: 100,
            },
            accreditedClasses: 6,
            periodAverage: 100,
            serviceHours: 49.5,
            classes: [
              {
                detail: {
                  title: 'Nombre de clase 2  2023',
                  subtitle: 'TC-100000  2023',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1  2023',
                    score: 100,
                  },
                  {
                    title: 'Parcial 2  2023',
                    score: 99,
                  },
                ],
              },
              {
                detail: {
                  title: 'Nombre de clase 3  2023',
                  subtitle: 'TC-100002',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1  2023',
                    score: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    isMicro: false,
    gradeTitle: 'Período actual',
    title: 'Semestral AGO-DIC 2024',
    accredited: { name: 'Créditos aprobados', value: '39' },
    average: { name: 'Promedio acumulado', value: '90' },
    summary: { name: 'Faltas totales', value: '3' },
    closeGrades: () => {
      alert('Close event');
    },
  },
} as Meta<typeof BmbGradesComponent>;

type Story = StoryObj<BmbGradesComponent>;

export const Default: Story = {};
