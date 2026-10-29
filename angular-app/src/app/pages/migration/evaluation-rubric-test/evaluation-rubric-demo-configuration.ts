import type { DemoConfiguration, DemoProperty } from '../property-playground/demo-properties';

export const evaluationRubricProperties: DemoProperty[] = [
  {
    name: 'componentTitle',
    kind: 'text',
    type: 'string',
    optional: true,
  },
  {
    name: 'icon',
    kind: 'text',
    type: 'string',
  },
  {
    name: 'rightIcon',
    kind: 'text',
    type: 'string',
  },
  {
    name: 'evaluationRubricList',
    kind: 'json',
    type: 'IBmbEvaluationRubric[]',
    shape: 'array',
    model: true,
  },
  {
    name: 'maxEval',
    kind: 'number',
    type: 'number',
  },
  {
    name: 'summaryLabel',
    kind: 'text',
    type: 'string',
  },
  {
    name: 'commentEvalRubric',
    kind: 'json',
    type: 'IBmbCommentEvalRubric',
    shape: 'object',
  },
  {
    name: 'evalRubricButtons',
    kind: 'json',
    type: 'IBmbEvalRubricButtons',
    shape: 'object',
  },
  {
    name: 'title',
    kind: 'text',
    type: 'string',
    optional: true,
    deprecated: true,
  },
];

export const evaluationRubricPresets = [
  {
    id: 'Default',
    label: 'Default',
    initial: {
      icon: 'checklist_rtl',
      rightIcon: 'close',
      maxEval: 5,
      componentTitle: 'Rúbrica de evaluación',
      evaluationRubricList: [
        {
          criterion: 'Criterio Primero',
          tooltip: 'Criterio Primero tooltip',
        },
        {
          criterion: 'Criterio Segundo',
          tooltip: 'Criterio Segundo tooltip',
        },
        {
          criterion: 'Tercer Criterio',
          tooltip: 'Tercer Criterio tooltip',
        },
        {
          criterion: 'Cuarto Criterio',
          tooltip: 'Cuarto Criterio tooltip',
        },
      ],
      summaryLabel: 'Resumen',
      commentEvalRubric: {
        label: 'Observaciones (Optional)',
        placeHolder: 'Ingresa los puntos a mejorar del skill.',
        tooltip: 'Tool tip',
        showMaxTextLength: false,
      },
      evalRubricButtons: {
        rightLabel: 'Aprobar Skill',
        rightIcon: 'check',
        leftLabel: 'Rechazar Skill',
        leftIcon: 'close',
      },
    },
  },
];

export function createEvaluationRubricDemoConfiguration(
  preset = 'Default',
): DemoConfiguration {
  const selected =
    evaluationRubricPresets.find((item) => item.id === preset) ??
    evaluationRubricPresets[0];
  return {
    title: 'Evaluation rubric',
    properties: evaluationRubricProperties,
    initial: JSON.parse(JSON.stringify(selected.initial)),
    tall: false,
  };
}
