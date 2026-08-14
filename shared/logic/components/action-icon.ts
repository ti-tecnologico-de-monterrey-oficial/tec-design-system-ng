import { sanitizeContent } from '../sanitizeContent';

export interface IBmbActionIconEventType extends MouseEvent {
  event: MouseEvent;
  name: string;
}

export const getActionIconEvent = (
  event: MouseEvent | { event: MouseEvent; name: string },
  name: string,
): IBmbActionIconEventType =>
  Object.assign(event instanceof MouseEvent ? event : event.event, {
    event: event instanceof MouseEvent ? event : event.event,
    name,
  });

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
