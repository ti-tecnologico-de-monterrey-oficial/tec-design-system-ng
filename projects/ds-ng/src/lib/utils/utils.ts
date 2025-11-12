import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IBmbInputError } from '../../public-api';

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

export const getListingOnOneLine = (
  elements: string[],
  template: string = '',
): string => {
  let listingOnOneLine = '';
  elements.forEach((element, index) => {
    listingOnOneLine += `${!!template ? template.replaceAll('[__]', element) : element}`;
    listingOnOneLine +=
      index == elements.length - 2
        ? ' and '
        : elements.length > 1 && index < elements.length - 1
          ? ', '
          : '';
  });

  return listingOnOneLine;
};

export const buildErrorMessage = (inputs: string[]): string => {
  let elements = '';

  elements = getListingOnOneLine(inputs);

  if (inputs.length) {
    return `"${elements}" input${inputs.length > 1 ? 's' : ''} ${inputs.length > 1 ? 'are' : 'is'}`;
  }

  return elements;
};

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

export const isErrorMessageSet = (
  errorMessage: string | IBmbInputError,
): boolean => {
  return !!errorMessage && typeof errorMessage !== 'string';
};

export const getCustomValidation = (
  customValidation: ValidatorFn,
  formControl: FormControl,
): ValidationErrors | null => {
  if (typeof customValidation === 'function') {
    const functionValidation = customValidation ?? ((_: any) => null);
    return functionValidation(formControl);
  }
  return null;
};

export const getCustomValidationMessage = (
  result: ValidationErrors | null,
  errorMessage: string | IBmbInputError,
): string => {
  if (!!result && typeof result === 'object' && !!result['customValidation']) {
    const errorMessages = errorMessage as IBmbInputError;

    return isErrorMessageSet(errorMessage)
      ? errorMessages.customValidation || ''
      : '';
  }

  return '';
};

export const getMobileResolutionSize = (isMobile: boolean = true): string => {
  if (isMobile) return '(max-width: 1000px)';
  return '(min-width: 1001px)';
};

export const forbidTagsAndAttributes = {
  FORBID_TAGS: [
    'script',
    'style',
    'iframe',
    'object',
    'embed',
    'base',
    'meta',
    'form',
  ],
  FORBID_ATTR: [
    'style',
    'onerror',
    'onclick',
    'onkeyup',
    'onload',
    'onmouseover',
    'onfocus',
    'onkeydown',
    'onchange',
    'onblur',
    'onsubmit',
  ],
};
