import { sanitizeContent } from '../sanitizeContent';

export const getActionIcon = ({
  icon,
  toggleIconActive,
  isToggleActive,
}: {
  icon: string;
  toggleIconActive?: string;
  isToggleActive?: boolean;
}): string => {
  if (isToggleActive && toggleIconActive) {
    return toggleIconActive;
  }

  return icon;
};

export const getSanitizedSvg = ({
  isSVGTemplate,
  customActionIcon,
}: {
  isSVGTemplate?: boolean;
  customActionIcon?: unknown;
}): string | null => {
  if (
    (!isSVGTemplate && customActionIcon) ||
    (isSVGTemplate && customActionIcon === undefined)
  ) {
    return null;
  }

  return sanitizeContent((customActionIcon ?? '').toString());
};
