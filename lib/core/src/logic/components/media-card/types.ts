import { SizeNames, IBmbTargetLink } from '../../../types/index.js';

export type IBmbMediaCardType =
  | 'inline'
  | 'floating'
  | 'author_detail';

export type IBmbMediaCardLoading =
  | 'lazy'
  | 'eager';

export interface MediaCardClassesProps {
  borderRadius: SizeNames;
  enableZoom: boolean;
}

export interface MediaCardContentClassesProps {
  type: IBmbMediaCardType;
  borderRadius: SizeNames;
  isBlurredBackdrop: boolean;
  fullMediaCard: boolean;
}

export interface MediaCardBackgroundProps {
  type: IBmbMediaCardType;
  bgColor?: string;
}

export interface MediaCardWrapperClassesProps {
  boxShadow: boolean;
  isLink: boolean;
  type: IBmbMediaCardType;
  ratio?: string;
}

export type { SizeNames, IBmbTargetLink };