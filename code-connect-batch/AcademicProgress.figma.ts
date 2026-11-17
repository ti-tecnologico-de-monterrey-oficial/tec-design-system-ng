// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4070-156265
// source=ui-angular/src/lib/components/bmb-academic-progress/bmb-academic-progress.component.ts
// component=BmbAcademicProgressComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  accredited: IBmbNameValuePair = { name: 'Materias Acreditadas', value: 7 };

  average: IBmbNameValuePair = { name: 'Promedio Semestre', value: 99 };

  summary: IBmbNameValuePair = { name: 'Horas Servicio', value: 45 };
}
</script>

<bmb-academic-progress
  [accredited]="accredited"
  [average]="average"
  [summary]="summary"
/>`,
  imports: [
    "import type { IBmbNameValuePair } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbAcademicProgressComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-academic-progress',
}
