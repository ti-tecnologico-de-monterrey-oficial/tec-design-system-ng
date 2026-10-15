import { IDropdownItem } from '../types';
import {
  convertListToSelectList,
  filteredValue,
  getSelectedValues,
  getValidInitialValues,
} from './dropdown';

describe('dropdown', () => {
  describe('convertListToSelectList', () => {
    it('should build items from a plain string list', () => {
      const result = convertListToSelectList(['Option A', 'Option B']);

      expect(result).toEqual([
        expect.objectContaining({
          selectedText: 'Option A',
          text: 'Option A',
          value: 'Option A',
        }),
        expect.objectContaining({
          selectedText: 'Option B',
          text: 'Option B',
          value: 'Option B',
        }),
      ]);
    });

    it('should apply the shared icon to string items when showIcon is true', () => {
      const result = convertListToSelectList(['Option A'], 'home', true);
      expect(result[0].icon).toBe('home');
    });

    it('should build items from an object list, preserving its own icon', () => {
      const result = convertListToSelectList([
        { id: '1', name: 'Option A', value: 'a', icon: 'star' },
      ]);

      expect(result).toEqual([
        expect.objectContaining({
          idItem: '1',
          selectedText: 'Option A',
          text: 'Option A',
          value: 'a',
          icon: 'star',
        }),
      ]);
    });

    it('should fall back to the shared icon when the object item has none', () => {
      const result = convertListToSelectList(
        [{ name: 'Option A', value: 'a' }],
        'home',
        true,
      );
      expect(result[0].icon).toBe('home');
    });

    it('should prefer selectedText over name when both are present', () => {
      const result = convertListToSelectList([
        { name: 'Option A', value: 'a', selectedText: 'Custom text' },
      ]);
      expect(result[0].selectedText).toBe('Custom text');
    });
  });

  describe('getValidInitialValues', () => {
    it('should return an empty string when nothing is selected and not multi-select', () => {
      expect(getValidInitialValues('', '', ['a', 'b'], false)).toBe('');
    });

    it('should return an empty array when nothing is selected and multi-select', () => {
      expect(getValidInitialValues('', '', ['a', 'b'], true)).toEqual([]);
    });

    it('should return the control value when it is a valid single option', () => {
      expect(getValidInitialValues('a', '', ['a', 'b'], false)).toBe('a');
    });

    it('should return an empty string when the single value is not a valid option', () => {
      expect(getValidInitialValues('z', '', ['a', 'b'], false)).toBe('');
    });

    it('should fall back to the component value when the control has no value', () => {
      expect(getValidInitialValues('', 'b', ['a', 'b'], false)).toBe('b');
    });

    it('should filter a multi-select control array down to valid options', () => {
      expect(
        getValidInitialValues(['a', 'z'], [], ['a', 'b'], true),
      ).toEqual(['a']);
    });

    it('should fall back to the component array when the control array is empty in multi-select', () => {
      expect(
        getValidInitialValues([], ['a'], ['a', 'b'], true),
      ).toEqual(['a']);
    });

    it('should wrap a valid single string value in an array for multi-select', () => {
      expect(getValidInitialValues('a', '', ['a', 'b'], true)).toEqual(['a']);
    });

    it('should return an empty string for a non-matching string value in multi-select', () => {
      expect(getValidInitialValues('z', '', ['a', 'b'], true)).toEqual([]);
    });

    it('should return an empty string when the resolved value is an empty array in multi-select', () => {
      expect(getValidInitialValues('', [], ['a', 'b'], true)).toBe('');
    });

    it('should return an empty string for an array value in single-select mode', () => {
      expect(getValidInitialValues(['a'], '', ['a', 'b'], false)).toBe('');
    });

    it('should accept object-list options', () => {
      const list = [
        { name: 'A', value: 'a' },
        { name: 'B', value: 'b' },
      ];
      expect(getValidInitialValues('a', '', list, false)).toBe('a');
    });
  });

  describe('getSelectedValues', () => {
    it('should add the value when the control is empty', () => {
      expect(getSelectedValues(null, 'a')).toEqual(['a']);
    });

    it('should add the value when it is not already selected', () => {
      expect(getSelectedValues(['a'], 'b')).toEqual(['a', 'b']);
    });

    it('should remove the value when it is already selected', () => {
      expect(getSelectedValues(['a', 'b'], 'a')).toEqual(['b']);
    });
  });

  describe('filteredValue', () => {
    const list: IDropdownItem[] = [
      { text: 'Apple', value: 'apple' } as IDropdownItem,
      { text: 'Banana', value: 'banana' } as IDropdownItem,
    ];

    it('should return the full list when the filter value is empty', () => {
      expect(filteredValue('', list)).toBe(list);
    });

    it('should filter items whose text matches, case-insensitively', () => {
      expect(filteredValue('ban', list)).toEqual([list[1]]);
    });

    it('should return an empty array when nothing matches', () => {
      expect(filteredValue('zzz', list)).toEqual([]);
    });
  });
});
