import {
  getDotPaginatorClasses,
  getNextDotIndex,
  getPreviousDotIndex,
} from '../../_shared/logic/components/dot-paginator';

describe('dot paginator logic', () => {
  it('builds the base and appearance classes', () => {
    expect(getDotPaginatorClasses('')).toEqual(['bmb_dot_paginator']);
    expect(getDotPaginatorClasses('secondary')).toEqual([
      'bmb_dot_paginator',
      'bmb_dot_paginator-secondary',
    ]);
  });

  it('keeps previous and next indexes inside their boundaries', () => {
    expect(getPreviousDotIndex(0)).toBe(0);
    expect(getPreviousDotIndex(2)).toBe(1);
    expect(getNextDotIndex(0, 3)).toBe(1);
    expect(getNextDotIndex(2, 3)).toBe(2);
    expect(getNextDotIndex(0, 0)).toBe(0);
  });
});
