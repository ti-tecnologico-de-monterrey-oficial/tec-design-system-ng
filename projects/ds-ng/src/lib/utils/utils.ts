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
