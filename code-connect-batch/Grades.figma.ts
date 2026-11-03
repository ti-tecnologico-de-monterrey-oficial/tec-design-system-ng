// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=523-174572
// source=ui-angular/src/lib/components/bmb-grades/bmb-grades.component.ts
// component=BmbGradesComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  grades: IBmbGrades[] = [
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
                score: 99,
              },
              partials: [{ title: 'Parcial 1', score: 99 }],
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
                { title: 'Parcial 1', score: 100 },
                { title: 'Parcial 2', score: 99 },
              ],
            },
            {
              detail: {
                title: 'Nombre de clase 3',
                subtitle: 'TC-100002',
                score: 100,
              },
              partials: [{ title: 'Parcial 1', score: 100 }],
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
              partials: [{ title: 'Parcial 1  2023', score: 100 }],
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
                { title: 'Parcial 1  2023', score: 100 },
                { title: 'Parcial 2  2023', score: 99 },
              ],
            },
            {
              detail: {
                title: 'Nombre de clase 3  2023',
                subtitle: 'TC-100002',
                score: 100,
              },
              partials: [{ title: 'Parcial 1  2023', score: 100 }],
            },
          ],
        },
      ],
    },
  ];

  accredited: IBmbNameValuePair = { name: 'Créditos aprobados', value: '39' };

  average: IBmbNameValuePair = { name: 'Promedio acumulado', value: '90' };

  summary: IBmbNameValuePair = { name: 'Faltas totales', value: '3' };
}
</script>

<bmb-grades
  [grades]="grades"
  [isMicro]="false"
  gradeTitle="Período actual"
  componentTitle="Semestral AGO-DIC 2024"
  [accredited]="accredited"
  [average]="average"
  [summary]="summary"
/>`,
  imports: [
    "import type { IBmbGrades, IBmbNameValuePair } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbGradesComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-grades',
  metadata: { nestable: true },
}
