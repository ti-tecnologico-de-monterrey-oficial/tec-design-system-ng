// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4070-156265
// source=projects/ds-ng/src/lib/components/bmb-academic-progress/bmb-academic-progress.component.ts
// component=BmbAcademicProgressComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-academic-progress
  [accredited]="{ name: 'Materias Acreditadas', value: 7 }"
  [average]="{ name: 'Promedio Semestre', value: 99 }"
  [summary]="{ name: 'Horas Servicio', value: 45 }"
/>`,
  imports: [
    "import { BmbAcademicProgressComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-academic-progress',
}
