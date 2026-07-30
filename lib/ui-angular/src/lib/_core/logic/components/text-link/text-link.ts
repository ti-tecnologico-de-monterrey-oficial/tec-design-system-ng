import {
  IBmbIconPosition,
  IBmbTextLinkStyle,
} from '../../../../components/bmb-text-link/bmb-text-link.component';

/**
 * Returns the CSS class for the icon position.
 */
export const getTextLinkPositionClass = ({
  textLinkStyle,
  iconPosition,
}: {
  textLinkStyle: IBmbTextLinkStyle;
  iconPosition: IBmbIconPosition;
}): string => {
  if (textLinkStyle === 'icon') {
    return `bmb_text-link-item-position_${iconPosition}`;
  }

  return '';
};