export const getLogoClasses = (size: string): string[] => {
  const classes = ['bmb_logo'];

  if (size) classes.push(`bmb_logo-${size}`);

  return classes;
};
