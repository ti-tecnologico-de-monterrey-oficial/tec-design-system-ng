import { IBmbDropdownItem } from '../../public-api';
import { IDropdownItem } from '../types';

export const isExternalLink = (link: string): boolean => {
  return (
    link.startsWith('http://') ||
    link.startsWith('https://') ||
    link.startsWith('#') ||
    link.startsWith('tel:') ||
    link.startsWith('mailto:') ||
    link.startsWith('app:')
  );
};

export const orderDayNames = (
  days: (string | undefined)[],
): (string | undefined)[] => {
  const lastElement: string | undefined = days.pop();
  days.unshift(lastElement);
  return days;
};

export const isImage = (url: string): boolean => {
  const regx = /\.|\//gm;
  return regx.test(url);
};

export const buildErrorMessage = (inputs: string[]): string => {
  let elements = '';

  inputs.forEach((element, index) => {
    elements += element;
    elements +=
      index == inputs.length - 2
        ? ' and '
        : inputs.length > 1 && index < inputs.length - 1
          ? ', '
          : '';
  });

  if (inputs.length) {
    return `"${elements}" input${inputs.length > 1 ? 's' : ''} ${inputs.length > 1 ? 'are' : 'is'}`;
  }

  return elements;
};

const getValue = (key: string, value: undefined): any =>
  (typeof value === 'function' && `${key}($event)`) ||
  (typeof value === 'object' && `${JSON.stringify(value)}`) ||
  `${value}`;

const getKeyFormat = (key: string, value: string): string =>
  (typeof value === 'function' && `(${key})`) || `[${key}]`;

export const getPositionClass = (
  className: string,
  labelPosition: String,
): string => {
  if (!!labelPosition) return `${className}-${labelPosition}`;
  return '';
};

export const getUUID = (): string => {
  return window.crypto.randomUUID();
};

export const convertListToSelectList = (
  options: string[] | IBmbDropdownItem[],
  _icon: string = '',
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
      icon = _icon!;
    } else {
      ({ id, selectedText, name, value, icon } = currentElement);
    }

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

export const getValidInitialValues = (
  value: string | string[],
  list: string[] | IBmbDropdownItem[],
  isMultiSelect: boolean,
): string | string[] => {
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
      if (Array.isArray(value) && value.length >= 1)
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
  controlValue: string[],
  value: string,
): string[] => {
  if (controlValue.includes(value)) {
    return controlValue.reduce((acc: string[], currentValue: string) => {
      if (currentValue === value) return acc;
      else return [...acc, currentValue];
    }, []);
  }
  return [...controlValue, value];
};

export const attributes = (object: { [key: string]: any }): string =>
  Object.entries(object)
    .filter(([key]) => key !== 'test_text')
    .map(
      ([key, value]) =>
        (typeof value !== 'string' &&
          `${getKeyFormat(key, value)}='${getValue(key, value)}'`) ||
        `${key}="${value}"`,
    )
    .join(' ');

export const attributesText = (object: { [key: string]: any }): string =>
  Object.entries(object)
    .filter(([key]) => key === 'test_text')
    .map(([_, value]) => `${value}`)
    .join(' ');
