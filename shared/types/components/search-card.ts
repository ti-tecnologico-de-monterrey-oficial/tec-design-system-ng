import { IBmbInteractiveIconAppearance } from './interactive-icon';

export interface IBmbSearchCardItemResult {
  id: string;
  name: string;
  subtitle: string;
  avatarOrIcon: string;
  backgroundColorIcon?: IBmbInteractiveIconAppearance;
  type: 'person' | 'service';
  isBookmarkActive?: boolean;
  showBookmark?: boolean;
  [key: string]: any;
}
