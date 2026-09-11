import { IBmbAdditionalAction, IBmbInputType } from '../../types/input';

export function getInputContentAdditionalActionIcon(
  additionalAction: IBmbAdditionalAction,
  isHide: boolean,
): string {
  if (additionalAction === 'copy') return 'content_copy';
  if (additionalAction === 'showHide') {
    if (isHide) return 'visibility';
    return 'visibility_off';
  }
  return '';
}

export function shouldShowInputContentAdditionalAction({
  additionalAction,
  type,
  isHide,
}: {
  additionalAction: IBmbAdditionalAction;
  type: IBmbInputType;
  isHide: boolean;
}): boolean {
  const icon = getInputContentAdditionalActionIcon(additionalAction, isHide);

  if (!!icon && additionalAction !== 'none') {
    if (additionalAction === 'showHide') {
      return type === 'password';
    }

    return true;
  }

  return false;
}

export function getInputContentType({
  type,
  additionalAction,
  isHide,
}: {
  type: IBmbInputType;
  additionalAction: IBmbAdditionalAction;
  isHide: boolean;
}): IBmbInputType {
  const showAdditionalAction = shouldShowInputContentAdditionalAction({
    additionalAction,
    type,
    isHide,
  });

  if (showAdditionalAction) {
    if (additionalAction === 'showHide' && !isHide) {
      return 'text';
    }
  }

  return type;
}
