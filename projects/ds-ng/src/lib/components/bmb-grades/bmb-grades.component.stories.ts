import { Meta, StoryObj } from '@storybook/angular';
import { BmbGradesComponent } from './bmb-grades.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  DEFAULT_VALUE_DESC,
  getOnClickParam,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

const REQUIRED_MICRO_DESC: string = `<br/><br/>${RELEVANT_TITLE.note}Required when \`isMicro\` property is true.`;
const getPropertyDescription = (name: string) => {
  const propertyDesc: any = getPropertyParamDesc(
    'grades',
    'object',
    false,
    `${REQUIRED_MICRO_DESC}<br/><br/>${DEFAULT_VALUE_DESC}`,
    '',
    name,
  );
  return {
    ...propertyDesc,
    table: {
      ...propertyDesc.table,
      type: {
        summary: 'IBmbNameValuePair',
        detail: `IBmbNameValuePair {
  name: string;
  value: string | number | boolean;
}`,
      },
      category: propertyDesc.table.category.concat(' - Micro version'),
    },
  };
};
export default {
  title: 'Organisms/Grades',
  component: BmbGradesComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'gradeIndex',
          'modalContent',
          'partials',
          'periodIndex',
          'showPrincipalDetail',
          'getAccreditedClasses',
          'getCalendarIcon',
          'getDetailScore',
          'getDetailSubtitle',
          'getDetailTitle',
          'getElements',
          'getGradesTitle',
          'getPeriodAverage',
          'getServiceHours',
          'getServiceHours',
          'handleDetails',
          'handleLeftGradesClick',
          'handleLeftPeriodClick',
          'handleRightGradesClick',
          'handleRightPeriodClick',
          'openModalComponent',
          'detailContent',
          'getTitle',
          'ngAfterViewInit',
          'ngOnInit',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'grades', type: 'organism' })} to display students' grades for a school period.`, { generalDocLink: 'https://bamboo.tec.mx/latest/organismos/grades/descripcion-general-F5HIJ8av' })}
${getSpecialSpecifications(` ###${RELEVANT_TITLE.configuration}
>
If you want the component to handle the scroll, you should wrap it in a container with a defined height.
>
\`\`\`html
<div style="height: 100dvh;">
  <bmb-grades ... />
</div>
\`\`\`
`)}
${getBasicExampleBlock('BmbGradesComponent')}
        `,
      },
    },
  },
  argTypes: {
    grades: {
      control: {
        type: 'object',
      },
      description: 'Sets the list of grades to show.',
      table: {
        category: 'Properties',
        defaultValue: {
          summary: '[]',
          detail: `
${RELEVANT_TITLE.example}
grades: [
      {
        title: 'Calificaciones 2022',
        subtitle: 'Semestrales 2022',
        periods: [
          {
            detail: {
              title: 'Semestral X - Y',
              subtitle: 'Z materias acreditadas',
              score: 99,
            },
            accreditedClasses: 10,
            periodAverage: 99,
            serviceHours: 50,
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
                    score: 99,
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
          `,
        },
        type: {
          summary: 'IBmbGrades[]',
          detail: `
IBmbGrades = {
  title: string;
  subtitle: string;
  periods: IBmbPeriod[];
};

IBmbPeriod = {
  detail: IBmbElementDetail;
  accreditedClasses: number;
  periodAverage: number;
  serviceHours: number | null;
  classes: IBmbClassDetail[];
};

IBmbElementDetail = {
  title: string;
  subtitle: string;
  score: number;
};

IBmbClassDetail = {
  detail: IBmbElementDetail;
  partials: IBmbPartial[];
};

IBmbPartial = {
  title: string;
  score: number;
};
          `,
        },
      },
    },
    isMicro: getPropertyParamDesc(
      '',
      'boolean',
      '',
      '',
      'Enables the micro version of grades when true.',
    ),
    gradeTitle: getPropertyDescription('main title'),
    componentTitle: getPropertyDescription(''),
    accredited: getPropertyDescription('accreditation status'),
    average: getPropertyDescription('average'),
    summary: getPropertyDescription('summary'),
    closeGrades: getOnClickParam(getOnEvent('close', 'closeGrades')),
    title: {
      control: null,
      description:
        'Please use `componentTitle` instead of `title` to set the component title.',
      table: {
        category: 'Deprecated',
        type: { summary: 'string' },
        defaultValue: '',
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
              score: 99,
            },
            accreditedClasses: 10,
            periodAverage: 99,
            serviceHours: 50,
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
                    score: 99,
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
    componentTitle: 'Semestral AGO-DIC 2024',
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

export const MicroVersion: Story = {
  args: {
    isMicro: true,
  },
};
