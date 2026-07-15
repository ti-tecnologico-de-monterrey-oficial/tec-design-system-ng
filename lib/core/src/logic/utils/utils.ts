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

export const isImage = (url: string): boolean => {
  const regx = /\.|\//gm;
  return regx.test(url);
};
