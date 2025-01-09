import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbGradesComponent } from './bmb-grades.component';
import { BmbPortalComponent } from '../bmb-portal/bmb-portal.component';
import { InputSignal } from '@angular/core';
import { IBmbNameValuePair } from '../../types';
import { IBmbGrades } from './types';

const meta: Meta<BmbGradesComponent> = {
  title: 'Macro Componentes/Grades',
  component: BmbGradesComponent,
  subcomponents: { BmbPortalComponent },
  decorators: [
    moduleMetadata({
      imports: [BmbGradesComponent, BmbPortalComponent],
      providers: [],
    }),
  ],
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
    ] as unknown as InputSignal<IBmbGrades[]>,
    isMicro: false as unknown as InputSignal<boolean | undefined>,
    gradeTitle: 'Período actual' as unknown as InputSignal<string | undefined>,
    title: 'Semestral AGO-DIC 2024' as unknown as InputSignal<
      string | undefined
    >,
    accredited: {
      name: 'Créditos aprobados',
      value: '39',
    } as unknown as InputSignal<IBmbNameValuePair | undefined>,
    average: {
      name: 'Promedio acumulado',
      value: '90',
    } as unknown as InputSignal<IBmbNameValuePair | undefined>,
    summary: { name: 'Faltas totales', value: '3' } as unknown as InputSignal<
      IBmbNameValuePair | undefined
    >,
  },
};

export default meta;

type Story = StoryObj<BmbGradesComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <bmb-grades
        [grades]="grades"
        [isMicro]="isMicro"
        [gradeTitle]="gradeTitle"
        [title]="title"
        [accredited]="accredited"
        [average]="average"
        [summary]="summary"
      />
      <!-- The portal component should be added at the end of the app.component.html -->
      <bmb-portal />
    `,
  }),
};
