import { IBbmBgAppearance } from './advertisement-card';
import { IBmbBadgeColors } from '../foundations/colors/color-type';

export type IBmbBadgeAppearance = IBmbBadgeColors | IBbmBgAppearance;

export interface IBmbBadgeInfo {
  text: string;
  appearance: IBbmBgAppearance;
  container?: boolean;
}