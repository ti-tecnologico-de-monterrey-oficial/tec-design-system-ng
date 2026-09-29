import {
  getMultiDotPaginatorActiveIndex,
  getMultiDotPaginatorNextIndex,
  getMultiDotPaginatorPreviousIndex,
  getMultiDotPaginatorSelectedIndex,
  getMultiDotPaginatorWrappedNextIndex,
} from '../../_shared/logic/components/multi-dot-paginator';

describe('multi dot paginator logic', () => {
  it('returns the last item as the active index when index equals the length', () => {
    expect(getMultiDotPaginatorActiveIndex(3, 3)).toBe(2);
    expect(getMultiDotPaginatorActiveIndex(1, 3)).toBe(1);
  });

  it('returns the previous item as selected index when index equals the length', () => {
    expect(getMultiDotPaginatorSelectedIndex(3, 3)).toBe(2);
    expect(getMultiDotPaginatorSelectedIndex(1, 3)).toBe(1);
  });

  it('wraps to the first item when the next index reaches the length', () => {
    expect(getMultiDotPaginatorWrappedNextIndex(2, 3)).toBe(0);
    expect(getMultiDotPaginatorWrappedNextIndex(0, 3)).toBe(1);
  });

  it('keeps the previous index inside its lower boundary', () => {
    expect(getMultiDotPaginatorPreviousIndex(0)).toBe(0);
    expect(getMultiDotPaginatorPreviousIndex(2)).toBe(1);
  });

  it('keeps the next index inside its upper boundary', () => {
    expect(getMultiDotPaginatorNextIndex(3, 3)).toBe(3);
    expect(getMultiDotPaginatorNextIndex(1, 3)).toBe(2);
  });
});
