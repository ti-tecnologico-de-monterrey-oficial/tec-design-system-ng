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
