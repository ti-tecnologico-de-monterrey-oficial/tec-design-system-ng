import { getStatCounterStepsArray } from './stat-counter';

describe('getStatCounterStepsArray', () => {
  it('should return an array of indices for the given total steps', () => {
    expect(getStatCounterStepsArray(4)).toEqual([0, 1, 2, 3]);
  });

  it('should return an empty array when totalSteps is 0', () => {
    expect(getStatCounterStepsArray(0)).toEqual([]);
  });

  it('should return an empty array when totalSteps is falsy', () => {
    expect(getStatCounterStepsArray(undefined as unknown as number)).toEqual(
      [],
    );
  });
});
