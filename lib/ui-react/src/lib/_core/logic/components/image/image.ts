import { SizeNames } from '../../../types/index.js';

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

export type IBmbImageAnimation =
  | 'fade'
  | 'parallax'
  | 'parallax-fade';

export const getImageClasses = ({
  borderRadius,
  enableZoom,
}: {
  borderRadius: SizeNames;
  enableZoom: boolean;
}): string[] => {
  const classes = [`bmb_radius-${borderRadius}`];

  if (enableZoom) {
    classes.push('bmb_image-figure-zoom');
  }

  return classes;
};

export const getCarouselClass = ({
  isCarousel,
  animation,
}: {
  isCarousel: boolean;
  animation: IBmbImageAnimation;
}): string => {
  if (!isCarousel) return '';

  return `bmb_image-carousel-${animation}`;
};

export const getImageStyle = ({
  index,
  currentIndex,
  animation,
}: {
  index: number;
  currentIndex: number;
  animation: IBmbImageAnimation;
}): Record<string, string | number> => {
  const position = index - currentIndex;

  if (animation === 'parallax') {
    return {
      transform: `translateX(${position * 100}%)`,
    };
  }

  if (animation === 'fade') {
    return {
      opacity: position === 0 ? 1 : 0,
      zIndex: position === 0 ? 2 : 1,
    };
  }

  if (animation === 'parallax-fade') {
    return {
      transform: `translateX(${position * 100}%)`,
      opacity: position === 0 ? 1 : 0.4,
    };
  }

  return {};
};

export const encodeImageUrl = (
  url: string,
  avoidEncoding: boolean,
): string => {
  if (avoidEncoding) {
    return url || '';
  }

  return encodeURI(url || '');
};
