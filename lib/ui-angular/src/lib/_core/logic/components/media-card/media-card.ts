import { isExternalLink } from '../../../../components/utils/utils';

import {
  MediaCardBackgroundProps,
  MediaCardClassesProps,
  MediaCardContentClassesProps,
  MediaCardWrapperClassesProps,
} from '../media-card/types.js';

export const isMediaCardExternalLink = (link: string): boolean => {
  return (!!link && isExternalLink(link)) || false;
};

export const getMediaCardClasses = ({
  borderRadius,
  enableZoom,
}: MediaCardClassesProps): string[] => {
  const classes: string[] = [];

  classes.push(`bmb_radius-${borderRadius}`);

  if (enableZoom) {
    classes.push('bmb_media-card-figure-zoom');
  }

  return classes;
};

export const getMediaCardContentClasses = ({
  type,
  borderRadius,
  isBlurredBackdrop,
  fullMediaCard,
}: MediaCardContentClassesProps): string[] => {
  const classes: string[] = [];

  if (type === 'inline') {
    classes.push(`bmb_radius-${borderRadius}`);
  }

  if (isBlurredBackdrop) {
    classes.push('bmb_media-card-content-container-backdrop');
  }

  if (fullMediaCard) {
    classes.push('bmb_media-card-content-full');
  }

  return classes;
};

export const getMediaCardBackgroundColor = ({
  type,
  bgColor,
}: MediaCardBackgroundProps): Record<string, string> => {
  if (type === 'inline') {
    return {};
  }

  return bgColor
    ? { 'background-color': `rgb(var(${bgColor}))` }
    : { 'background-color': 'transparent' };
};

export const getMediaCardUserAttribute = (
  attribute?: string,
): string => {
  return attribute || '';
};

export const getMediaCardWrapperClasses = ({
  boxShadow,
  isLink,
  type,
  ratio,
}: MediaCardWrapperClassesProps): string[] => {
  const classes: string[] = [];

  if (boxShadow) {
    classes.push('bmb_media-card-box-shadow');
  }

  if (isLink) {
    classes.push(`bmb_media-card-${type}`);
  }

  if (!isLink && !ratio) {
    classes.push('bmb_media-card-auto-layout');
  }

  return classes;
};