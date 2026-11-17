import type { IBmbEvaluationRubric } from '../../types/components/evaluation-rubric';
export function getEvaluationRubricValues(maxEval: number): number[] {
  const values: number[] = [];
  for (let index = 0; index < maxEval; index++) values.push(index + 1);
  return values;
}
export function getEvaluationRubricSelectedClass(
  evaluation: number | undefined,
  element: number,
): string {
  return evaluation === element ? '-active' : '';
}
export function getEvaluationRubricButtonClass(
  parent: string,
  item: IBmbEvaluationRubric,
  element: number,
): string {
  return (
    parent +
    '-button' +
    getEvaluationRubricSelectedClass(item.evaluation, element)
  );
}
export function updateEvaluationRubric(
  list: IBmbEvaluationRubric[],
  criterion: string,
  evaluation: number,
): IBmbEvaluationRubric[] {

  return list.map((element) => {
    if (element.criterion === criterion) element.evaluation = evaluation;
    return element;
  });
}
export function getEvaluationRubricSummary(
  list: IBmbEvaluationRubric[],
): number {
  return list.reduce((sum, item) => sum + (item.evaluation || 0), 0);
}
