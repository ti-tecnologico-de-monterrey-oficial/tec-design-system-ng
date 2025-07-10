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
