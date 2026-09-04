// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=523-174572
// source=ui-angular/src/lib/components/bmb-grades/bmb-grades.component.ts
// component=BmbGradesComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-grades gradeTitle="Período actual" componentTitle="Semestral AGO-DIC 2024" [accredited]="{ name: 'Créditos aprobados', value: '39' }" [average]="{ name: 'Promedio acumulado', value: '90' }" [summary]="{ name: 'Faltas totales', value: '3' }" [grades]="[{ title: 'Calificaciones 2022', subtitle: 'Semestrales 2022', periods: [{ detail: { title: 'Semestral X - Y', subtitle: 'Z materias acreditadas', score: 99 }, accreditedClasses: 10, periodAverage: 99, serviceHours: 50, classes: [{ detail: { title: 'Nombre de clase 1', subtitle: 'TC-100000', score: 'Cu' }, partials: [{ title: 'Parcial 1', score: 99 }] }] }] }]" />`,
  imports: [
    "import { BmbGradesComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-grades',
  metadata: { nestable: true },
}
