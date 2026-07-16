import { isImage } from '../../utils/utils.js';

export const getSVGName = (iconName: string): string => {
  if (isImage(iconName)) {
    return iconName.substring(
      iconName.lastIndexOf('/') + 1,
      iconName.lastIndexOf('.'),
    );
  }

  return iconName;
};
