export const getIconFontVariationSettings = (): string => {
  const fill = "'FILL' 1";
  const weight = 'wght 400';
  return `${fill}, ${weight}`;
};

export const getIconImageStyles = (
  size?: number,
): Record<string, string> => ({
  width: size ? `${size}px` : '1em',
  height: size ? `${size}px` : '1em',
});
