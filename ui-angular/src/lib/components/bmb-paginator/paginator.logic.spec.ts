import {
  getPaginatorPages,
  getPaginatorText,
  getPaginatorTotalPages,
  isPaginatorPageValid,
} from '../../_shared/logic/components/paginator';

describe('paginator shared logic', () => {
  it.each([
    [0, 5, 0],
    [1, 5, 1],
    [10, 5, 2],
    [12, 5, 3],
  ])(
    'calculates pages for %i items with page size %i',
    (items, size, pages) => {
      expect(getPaginatorTotalPages(items, size)).toBe(pages);
    },
  );

  it('enumerates pages from one and supports no results', () => {
    expect(getPaginatorPages(3)).toEqual([1, 2, 3]);
    expect(getPaginatorPages(0)).toEqual([]);
  });

  it('validates both page boundaries', () => {
    expect(isPaginatorPageValid(1, 3)).toBe(true);
    expect(isPaginatorPageValid(3, 3)).toBe(true);
    expect(isPaginatorPageValid(0, 3)).toBe(false);
    expect(isPaginatorPageValid(4, 3)).toBe(false);
    expect(isPaginatorPageValid(1, 0)).toBe(false);
  });

  it('formats the first, last partial and empty pages', () => {
    expect(getPaginatorText(12, 5, 1, 3)).toBe('1 - 5 de 12');
    expect(getPaginatorText(12, 5, 3, 3)).toBe('11 - 12 de 12');
    expect(getPaginatorText(0, 5, 1, 0)).toBe('0 de 0');
  });
});
