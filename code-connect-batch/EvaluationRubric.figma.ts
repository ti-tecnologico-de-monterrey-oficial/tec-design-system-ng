// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=6865-91699
// source=ui-angular/src/lib/components/bmb-evaluation-rubric/bmb-evaluation-rubric.component.ts
// component=BmbEvaluationRubricComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  evaluationRubricList: IBmbEvaluationRubric[] = [
    { criterion: 'Criterio Primero', tooltip: 'Criterio Primero tooltip' },
    { criterion: 'Criterio Segundo', tooltip: 'Criterio Segundo tooltip' },
    { criterion: 'Tercer Criterio', tooltip: 'Tercer Criterio tooltip' },
    { criterion: 'Cuarto Criterio', tooltip: 'Cuarto Criterio tooltip' },
  ];

  commentEvalRubric: IBmbCommentEvalRubric = {
    label: 'Observaciones (Optional)',
    placeHolder: 'Ingresa los puntos a mejorar del skill.',
    tooltip: 'Tool tip',
    showMaxTextLength: false,
  };

  evalRubricButtons: IBmbEvalRubricButtons = {
    rightLabel: 'Aprobar Skill',
    rightIcon: ${getIcon('check', 'typescript')},
    leftLabel: 'Rechazar Skill',
    leftIcon: ${getIcon('close', 'typescript')},
  };
}
</script>

<bmb-evaluation-rubric
  componentTitle="Rúbrica de evaluación"
  icon="${getIcon('checklist_rtl')}"
  rightIcon="${getIcon('close')}"
  [evaluationRubricList]="evaluationRubricList"
  [maxEval]="5"
  summaryLabel="Resumen"
  [commentEvalRubric]="commentEvalRubric"
  [evalRubricButtons]="evalRubricButtons"
/>`,
  imports: [
    "import type { IBmbCommentEvalRubric, IBmbEvalRubricButtons, IBmbEvaluationRubric } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbEvaluationRubricComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-evaluation-rubric',
}
