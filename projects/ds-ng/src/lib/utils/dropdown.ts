import { IBmbDropdownItem } from '../components/bmb-dropdown/bmb-dropdown.component';
import { IDropdownItem } from '../types';
import { getUUID } from './utils';

export const convertListToSelectList = (
  options: string[] | IBmbDropdownItem[],
  _icon: string = '',
  showIcon: boolean = false,
): IDropdownItem[] => {
  return options.reduce((acc: IDropdownItem[], currentElement) => {
    let id: string | undefined,
      selectedText: string | undefined,
      name: string,
      value: string,
      icon: string | undefined;

    if (typeof currentElement === 'string') {
      id = getUUID();
      selectedText = currentElement;
      name = currentElement;
      value = currentElement;
      icon = _icon;
    } else {
      ({ id, selectedText, name, value, icon } = currentElement);
    }

    if (!icon && showIcon && !!_icon) icon = _icon;

    return [
      ...acc,
      {
        idItem: id,
        selectedText: selectedText || name,
        text: name,
        value,
        icon,
      } as IDropdownItem,
    ];
  }, []);
};

const getValue = (
  controlValue: string[] | string,
  componentValue: string[] | string,
  isMultiSelect: boolean,
): string[] | string => {
  if (Array.isArray(controlValue) || Array.isArray(componentValue)) {
    if (isMultiSelect) {
      if (Array.isArray(controlValue) && !!controlValue.length)
        return controlValue;
      else return componentValue;
    }

    return '';
  }

  return controlValue || componentValue;
};

export const getValidInitialValues = (
  controlValue: string[] | string,
  componentValue: string[] | string,
  list: string[] | IBmbDropdownItem[],
  isMultiSelect: boolean,
): string | string[] => {
  const value: string[] | string = getValue(
    controlValue,
    componentValue,
    isMultiSelect,
  );

  if (!!value) {
    const options = list.reduce(
      (accumulator: string[], currentElement: IBmbDropdownItem | string) => [
        ...accumulator,
        typeof currentElement === 'string'
          ? currentElement
          : currentElement.value,
      ],
      [],
    );

    if (isMultiSelect) {
      if (Array.isArray(value) && !!value.length)
        return value.filter((element) => options.includes(element));
      if (typeof value === 'string' && options.includes(value)) return [value];
    }
    if (Array.isArray(value)) return '';
    if (typeof value === 'string' && options.includes(value)) return value;
  }

  if (isMultiSelect) return [];

  return '';
};

export const getSelectedValues = (
  controlValue: string[] | null,
  value: string,
): string[] => {
  if (!!controlValue) {
    if (controlValue.includes(value)) {
      return controlValue.reduce((acc: string[], currentValue: string) => {
        if (currentValue === value) return acc;
        else return [...acc, currentValue];
      }, []);
    }
    return [...controlValue, value];
  }

  return [value];
};

export const filteredValue = (
  value: string,
  list: IDropdownItem[],
): IDropdownItem[] => {
  if (!!value) {
    return list.filter((item: IDropdownItem) =>
      item.text.toLowerCase().includes(value.toLowerCase()),
    );
  }

  return list;
};
