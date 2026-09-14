import {
  IBmbIconPosition,
  IBmbTextLinkStyle,
} from '../../types/components/text-link';

export function getTextLinkPositionClass(
  textLinkStyle: IBmbTextLinkStyle,
  iconPosition: IBmbIconPosition,
): string {
  if (textLinkStyle === 'icon')
    return 'bmb_text-link-item-position_'.concat(iconPosition);

  return '';
}
