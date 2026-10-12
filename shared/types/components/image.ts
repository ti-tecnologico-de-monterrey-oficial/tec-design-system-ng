import { SizeNames } from '../index';

export interface IBmbImageHeight {
  s: string;
  l: string;
}

export interface IBmbImageBorderRadius {
  topLeft?: SizeNames;
  topRight?: SizeNames;
  bottomRight?: SizeNames;
  bottomLeft?: SizeNames;
}

export type IBmbImageObjectFit =
  | 'cover'
  | 'contain'
  | 'fill'
  | 'none'
  | 'scale-down';

export interface BmbImageItem {
  src: string;
  mobileSrc?: string;
  alt?: string;
}

export type RenderedImage = {
  key: string;
  src: string;
  mobileSrc?: string;
  alt?: string;
  direction: 'next' | 'prev' | null;
};

