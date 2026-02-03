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
