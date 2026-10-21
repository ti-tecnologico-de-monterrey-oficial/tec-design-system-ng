import { IBmbInteractiveIconAppearance } from '../../types/components/interactive-icon';

export function getSearchCardItemBoxClass(
  backgroundColorIcon: IBmbInteractiveIconAppearance,
): string {
  return `bmb_search-card-item-box-${backgroundColorIcon}`;
}
