import { Meta, StoryObj } from '@storybook/angular';
import { BmbGradesComponent } from './bmb-grades.component';

export default {
  title: 'Macro Componentes/Grades',
  component: BmbGradesComponent,
  decorators: [],
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
    closeGrades: () => {
      alert('Close event');
    },
  },
} as Meta<typeof BmbGradesComponent>;

type Story = StoryObj<BmbGradesComponent>;

export const Default: Story = {};
