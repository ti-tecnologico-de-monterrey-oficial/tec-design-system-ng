const isImage = (value: string): boolean => /\.(png|jpe?g|gif|svg|webp|avif)$/i.test(value);

export const getSVGName = (iconName: string): string => {
  if (isImage(iconName)) {
    return iconName.substring(
      iconName.lastIndexOf('/') + 1,
      iconName.lastIndexOf('.'),
    );
  }

  return iconName;
};
