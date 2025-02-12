export const isExternalLink = (link: string): boolean => {
  return (
    link.startsWith('http://') ||
    link.startsWith('https://') ||
    link.startsWith('#')
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

const getValueFuntion = (key: string, value: undefined): any =>
  ((typeof value === 'function' || typeof value === 'object') && `${key}`) ||
  `${value}`;

const getKeyFormatFuntion = (key: string, value: string): string =>
    (typeof value === 'function' && `(${key})`) || `[${key}]`;

const getValue = (key: string, value: undefined): any =>
  (typeof value === 'object' && `${key}`) || `${value}`;

const getKeyFormat = (key: string, value: string): string => `[${key}]`;

export const attributes = (object: { [key: string]: any }): string =>
  Object.entries(object)
    .filter(([key, value]) => (key !== 'text' && typeof value !== 'function'))
    .map(
      ([key, value]) =>
        (typeof value !== 'string' &&
          `${getKeyFormat(key, value)}="${getValue(key, value)}"`) ||
        `${key}="${value}"`,
    )
    .join(' ');

export const attributesText = (object: { [key: string]: any }): string =>
  Object.entries(object)
    .filter(([key]) => key === 'text')
    .map(([_, value]) => `${value}`)
    .join(' ');
