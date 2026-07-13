import { isABotIcon } from '../../utils/botIcon.js';

export interface ICardButton {
  title: string;
  body?: string;
  badge?: {
    text: string;
    appearance: string;
  };
  icon?: string;
  leftContentIcon?: string;
  leftContentImage?: unknown;
  leftContent?: boolean;
  hasMenu?: boolean;
  menuItems?: unknown[];
}

export const truncateCardButtonText = (
  text: string,
  maxLength: number,
): string => {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.substring(0, maxLength)}...`;
};

export const isBotTemplate = (icon: string): boolean => {
  return isABotIcon(icon);
};

export const shouldEmitAddContent = ({
  isFullInteractive,
  leftContent,
  leftContentIcon,
  leftContentImage,
  textLink,
}: {
  isFullInteractive: boolean;
  leftContent: boolean;
  leftContentIcon: string;
  leftContentImage: unknown;
  textLink: unknown;
}): boolean => {
  return (
    (isFullInteractive &&
      leftContent &&
      !leftContentIcon &&
      !!leftContentImage &&
      !textLink) ||
    !isFullInteractive
  );
};
