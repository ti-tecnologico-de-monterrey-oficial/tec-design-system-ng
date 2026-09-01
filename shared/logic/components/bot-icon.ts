import { isImage } from '../utils';
import type { BmbBotIconName } from '../../types/components/bot-icon';

export const getSVGName = (iconName: BmbBotIconName): string => {
  if (isImage(iconName)) {
    return iconName.substring(
      iconName.lastIndexOf('/') + 1,
      iconName.lastIndexOf('.'),
    );
  }

  return iconName;
};
