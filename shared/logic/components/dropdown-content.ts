import { IDropdownItem } from '../../types/utils';

export function getFilteredDropdownItems(
  items: IDropdownItem[],
  enableFilter: boolean,
  filterString: string,
  customFilterFunction: ((item: IDropdownItem, filter: string) => boolean) | null,
): IDropdownItem[] {
  if (enableFilter && filterString !== '') {
    if (customFilterFunction) {
      return items.filter((item) => customFilterFunction(item, filterString));
    }

    return items.filter((item) => {
      return (
        item.text.toLocaleLowerCase().includes(filterString) ||
        item.value?.toLocaleLowerCase().includes(filterString) ||
        item.selectedText?.toLocaleLowerCase().includes(filterString)
      );
    });
  }

  return items;
}

export function isDropdownIndeterminate(
  itemsLength: number,
  selectionState: string[] | string,
): boolean {
  if (typeof selectionState === 'string') return true;

  return itemsLength > selectionState.length && selectionState.length > 0;
}

export function isDropdownAllSelected(
  itemsLength: number,
  selectionState: string[] | string,
): boolean {
  if (typeof selectionState === 'string') return false;

  return itemsLength === selectionState.length && itemsLength > 0;
}

export function isDropdownItemSelected(
  selectionState: string[] | string,
  value: string,
): boolean {
  if (typeof selectionState === 'string') return value === selectionState;

  return selectionState?.includes(value) || false;
}

export function getNextDropdownSelectionState(
  currentState: string[] | string,
  itemValue: string,
  isSelected: boolean,
): string[] {
  if (isSelected) {
    if (typeof currentState === 'string') return [];
    return currentState.filter((selectedItem) => selectedItem !== itemValue);
  }

  if (typeof currentState === 'string') return [itemValue];
  return [...currentState, itemValue];
}
