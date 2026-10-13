import { IDropdownItem } from '../../types/utils';
import {
  getFilteredDropdownItems,
  getNextDropdownSelectionState,
  isDropdownAllSelected,
  isDropdownIndeterminate,
  isDropdownItemSelected,
} from './dropdown-content';

const items: IDropdownItem[] = [
  { icon: 'home', text: 'First Option', selectedText: 'First', value: 'first' },
  { icon: 'star', text: 'Second Option', selectedText: 'Second', value: 'second' },
];

describe('dropdown-content', () => {
  describe('getFilteredDropdownItems', () => {
    it('should return all items when filtering is disabled', () => {
      expect(getFilteredDropdownItems(items, false, 'first', null)).toEqual(
        items,
      );
    });

    it('should return all items when the filter string is empty', () => {
      expect(getFilteredDropdownItems(items, true, '', null)).toEqual(items);
    });

    it('should filter by text, value, or selectedText', () => {
      expect(getFilteredDropdownItems(items, true, 'second', null)).toEqual([
        items[1],
      ]);
    });

    it('should not throw when an item has no value or selectedText', () => {
      const minimalItems: IDropdownItem[] = [{ icon: '', text: 'Only text' }];

      expect(
        getFilteredDropdownItems(minimalItems, true, 'nope', null),
      ).toEqual([]);
      expect(
        getFilteredDropdownItems(minimalItems, true, 'only', null),
      ).toEqual(minimalItems);
    });

    it('should use a custom filter function when provided', () => {
      const customFilter = jest.fn(() => true);
      const result = getFilteredDropdownItems(items, true, 'x', customFilter);

      expect(customFilter).toHaveBeenCalledWith(items[0], 'x');
      expect(result).toEqual(items);
    });

    it('should return an empty array when nothing matches', () => {
      expect(getFilteredDropdownItems(items, true, 'nope', null)).toEqual([]);
    });
  });

  describe('isDropdownIndeterminate', () => {
    it('should be true for a string selection', () => {
      expect(isDropdownIndeterminate(2, 'first')).toBe(true);
    });

    it('should be true when some but not all items are selected', () => {
      expect(isDropdownIndeterminate(2, ['first'])).toBe(true);
    });

    it('should be false when no items are selected', () => {
      expect(isDropdownIndeterminate(2, [])).toBe(false);
    });

    it('should be false when all items are selected', () => {
      expect(isDropdownIndeterminate(2, ['first', 'second'])).toBe(false);
    });
  });

  describe('isDropdownAllSelected', () => {
    it('should be false for a string selection', () => {
      expect(isDropdownAllSelected(2, 'first')).toBe(false);
    });

    it('should be true when every item is selected', () => {
      expect(isDropdownAllSelected(2, ['first', 'second'])).toBe(true);
    });

    it('should be false when there are no items', () => {
      expect(isDropdownAllSelected(0, [])).toBe(false);
    });

    it('should be false when not every item is selected', () => {
      expect(isDropdownAllSelected(2, ['first'])).toBe(false);
    });
  });

  describe('isDropdownItemSelected', () => {
    it('should match a string selection directly', () => {
      expect(isDropdownItemSelected('first', 'first')).toBe(true);
      expect(isDropdownItemSelected('first', 'second')).toBe(false);
    });

    it('should check membership for an array selection', () => {
      expect(isDropdownItemSelected(['first'], 'first')).toBe(true);
      expect(isDropdownItemSelected(['first'], 'second')).toBe(false);
    });
  });

  describe('getNextDropdownSelectionState', () => {
    it('should remove the item when it was already selected', () => {
      expect(
        getNextDropdownSelectionState(['first', 'second'], 'first', true),
      ).toEqual(['second']);
    });

    it('should reset to an empty array when removing from a string state', () => {
      expect(getNextDropdownSelectionState('first', 'first', true)).toEqual(
        [],
      );
    });

    it('should add the item when it was not selected', () => {
      expect(getNextDropdownSelectionState(['first'], 'second', false)).toEqual(
        ['first', 'second'],
      );
    });

    it('should start a new array when adding from a string state', () => {
      expect(getNextDropdownSelectionState('', 'first', false)).toEqual([
        'first',
      ]);
    });
  });
});
