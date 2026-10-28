import {
  filterCardRuleMatches,
  getFilterCardClearAllResetValue,
  getFilterCardControlResetValue,
} from './filter-card';

describe('filter-card', () => {
  describe('filterCardRuleMatches', () => {
    it('should match when every condition is satisfied', () => {
      expect(
        filterCardRuleMatches({ a: 1, b: 'x' }, { a: 1, b: 'x', c: true }),
      ).toBe(true);
    });

    it('should not match when a condition differs', () => {
      expect(filterCardRuleMatches({ a: 1 }, { a: 2 })).toBe(false);
    });

    it('should match an empty rule against anything', () => {
      expect(filterCardRuleMatches({}, { a: 1 })).toBe(true);
    });
  });

  describe('getFilterCardClearAllResetValue', () => {
    it.each(['checkbox', 'switch', 'tag'])(
      'should reset %s to false',
      (type) => {
        expect(getFilterCardClearAllResetValue(type, true)).toBe(false);
      },
    );

    it('should reset a multi-select dropdown to an empty array', () => {
      expect(getFilterCardClearAllResetValue('dropdown', true)).toEqual([]);
    });

    it('should reset a single-select dropdown to an empty string', () => {
      expect(getFilterCardClearAllResetValue('dropdown', false)).toBe('');
    });

    it('should reset radial (or any other type) based on isMultiSelect', () => {
      expect(getFilterCardClearAllResetValue('radial', false)).toBe('');
      expect(getFilterCardClearAllResetValue('radial', true)).toEqual([]);
    });
  });

  describe('getFilterCardControlResetValue', () => {
    it.each(['checkbox', 'switch', 'tag'])(
      'should reset %s to false',
      (type) => {
        expect(getFilterCardControlResetValue(type, true)).toBe(false);
      },
    );

    it('should reset a multi-select dropdown to an empty array', () => {
      expect(getFilterCardControlResetValue('dropdown', true)).toEqual([]);
    });

    it('should reset a single-select dropdown to an empty string', () => {
      expect(getFilterCardControlResetValue('dropdown', false)).toBe('');
    });

    it('should reset radial (or any unknown type) to an empty string regardless of isMultiSelect', () => {
      expect(getFilterCardControlResetValue('radial', true)).toBe('');
      expect(getFilterCardControlResetValue(undefined, true)).toBe('');
    });
  });
});
