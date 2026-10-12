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

export interface BmbImageHeight {
  s: string;
  l: string;
}

export type IBmbImageObjectFit =
  | 'cover'
  | 'contain'
  | 'fill'
  | 'none'
  | 'scale-down';
