import type { IAlignItemsOptions, IJustifyOptions } from './layout';
import type { IBmbTargetLink } from '../utils';

export type BmbNavigationBarGapSize =
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | 'xxl'
  | 'none'
  | 'auto'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10';

export interface IBmbActionHeader {
  icon: string;
  alt?: string;
  tooltipText?: string;
  iconSize?: number;
  iconActiveToggle?: string;
  isToggleActive?: boolean;
  isAccentColor?: boolean;
  link?: string;
  target?: IBmbTargetLink;
  action?: (event?: Event, data?: any) => void;
}

export interface IBmbNavigationBarConfig {
  gapSize: BmbNavigationBarGapSize;
  justify: IJustifyOptions;
  alignItems: IAlignItemsOptions;
  isMitecHeader: boolean;
}
