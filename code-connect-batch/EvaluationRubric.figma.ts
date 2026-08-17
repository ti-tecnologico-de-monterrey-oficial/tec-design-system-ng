// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=6865-91699
// source=ui-angular/src/lib/components/old/bmb-evaluation-rubric/bmb-evaluation-rubric.component.ts
// component=BmbEvaluationRubricComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-evaluation-rubric componentTitle="Rúbrica de evaluación" icon="checklist_rtl" rightIcon="close" [evaluationRubricList]="[{ criterion: 'Criterio Primero', tooltip: 'Criterio Primero tooltip' }, { criterion: 'Criterio Segundo', tooltip: 'Criterio Segundo tooltip' }, { criterion: 'Tercer Criterio', tooltip: 'Tercer Criterio tooltip' }, { criterion: 'Cuarto Criterio', tooltip: 'Cuarto Criterio tooltip' }]" [maxEval]="5" summaryLabel="Resumen" [commentEvalRubric]="{ label: 'Observaciones (Optional)', placeHolder: 'Ingresa los puntos a mejorar del skill.', tooltip: 'Tool tip', showMaxTextLength: false }" [evalRubricButtons]="{ rightLabel: 'Aprobar Skill', rightIcon: 'check', leftLabel: 'Rechazar Skill', leftIcon: 'close' }" />`,
  imports: [
    "import { BmbEvaluationRubricComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-evaluation-rubric',
}
