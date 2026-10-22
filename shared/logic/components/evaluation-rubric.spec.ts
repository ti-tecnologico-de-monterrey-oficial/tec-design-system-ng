import { getEvaluationRubricValues, getEvaluationRubricButtonClass, updateEvaluationRubric, getEvaluationRubricSummary } from './evaluation-rubric';

describe('Evaluation rubric shared behavior', () => {
  it('preserves value generation and selected classes', () => {
    expect(getEvaluationRubricValues(3)).toEqual([1, 2, 3]);
    expect(getEvaluationRubricValues(0)).toEqual([]);
    expect(
      getEvaluationRubricButtonClass(
        'criterion',
        { criterion: 'A', tooltip: '', evaluation: 2 },
        2,
      ),
    ).toBe('criterion-button-active');
  });
  it('updates every matching criterion while preserving object identities', () => {
    const first = { criterion: 'A', tooltip: '', evaluation: 1 };
    const second = { criterion: 'B', tooltip: '' };
    const result = updateEvaluationRubric([first, second, first], 'A', 4);
    expect(result[0]).toBe(first);
    expect(result[1]).toBe(second);
    expect(first.evaluation).toBe(4);
    expect(getEvaluationRubricSummary(result)).toBe(8);
    expect(
      getEvaluationRubricSummary(updateEvaluationRubric(result, 'missing', 5)),
    ).toBe(8);
  });
});
