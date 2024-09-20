export const isExternalLink = (link: string): boolean => {
  return (
    link.startsWith('http://') ||
    link.startsWith('https://') ||
    link.startsWith('#')
  );
};
