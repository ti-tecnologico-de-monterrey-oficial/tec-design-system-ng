import type { DemoConfiguration,
  DemoProperty } from '../property-playground/demo-properties';

export const gradesProperties: DemoProperty[] = [
  {
    name: 'grades',
    kind: 'json',
    type: 'IBmbGrades[]',
    shape: 'array',
  },
  {
    name: 'isMicro',
    kind: 'boolean',
    type: 'boolean',
    optional: true,
  },
  {
    name: 'gradeTitle',
    kind: 'text',
    type: 'string',
    optional: true,
  },
  {
    name: 'accredited',
    kind: 'json',
    type: 'IBmbNameValuePair',
    shape: 'object',
    optional: true,
  },
  {
    name: 'average',
    kind: 'json',
    type: 'IBmbNameValuePair',
    shape: 'object',
    optional: true,
  },
  {
    name: 'summary',
    kind: 'json',
    type: 'IBmbNameValuePair',
    shape: 'object',
    optional: true,
  },
  {
    name: 'componentTitle',
    kind: 'text',
    type: 'string',
    optional: true,
  },
  {
    name: 'title',
    kind: 'text',
    type: 'string',
    optional: true,
    deprecated: true,
  },
];

export const gradesPresets = [
  {
    id: 'Default',
    label: 'Default',
    initial: {
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
      accredited: {
        name: 'Créditos aprobados',
        value: '39',
      },
      average: {
        name: 'Promedio acumulado',
        value: '90',
      },
      summary: {
        name: 'Faltas totales',
        value: '3',
      },
    },
  },
  {
    id: 'MicroVersion',
    label: 'MicroVersion',
    initial: {
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
      isMicro: true,
      gradeTitle: 'Período actual',
      componentTitle: 'Semestral AGO-DIC 2024',
      accredited: {
        name: 'Créditos aprobados',
        value: '39',
      },
      average: {
        name: 'Promedio acumulado',
        value: '90',
      },
      summary: {
        name: 'Faltas totales',
        value: '3',
      },
    },
  },
];

export function createGradesDemoConfiguration(
  preset = 'Default',
): DemoConfiguration {
  const selected =
    gradesPresets.find((item) => item.id === preset) ?? gradesPresets[0];
  return {
    title: 'Grades',
    properties: gradesProperties,
    initial: JSON.parse(JSON.stringify(selected.initial)),
    tall: true,
  };
}
