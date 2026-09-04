import type { IBmbMediaCardType } from '../../types';

export interface BmbMediaCardClassOptions {
  boxShadow: boolean;
  isLink: boolean;
  ratio?: string;
  type: IBmbMediaCardType;
}

export const getMediaCardFigureClasses = (
  borderRadius: string,
  enableZoom: boolean,
): string[] => [
  `bmb_radius-${borderRadius}`,
  ...(enableZoom ? ['bmb_media-card-figure-zoom'] : []),
];

export const getMediaCardContentClasses = (
  type: IBmbMediaCardType,
  borderRadius: string,
  isBlurredBackdrop: boolean,
  fullmediaCard: boolean,
): string[] => [
  ...(type === 'inline' ? [`bmb_radius-${borderRadius}`] : []),
  ...(isBlurredBackdrop ? ['bmb_media-card-content-container-backdrop'] : []),
  ...(fullmediaCard ? ['bmb_media-card-content-full'] : []),
];

export const getMediaCardBackgroundColor = (
  type: IBmbMediaCardType,
  bgColor?: string,
): Record<string, string> => {
  if (type === 'inline') return {};

  return {
    'background-color': bgColor ? `rgb(var(${bgColor}))` : 'transparent',
  };
};

export const getMediaCardClasses = ({
  boxShadow,
  isLink,
  ratio,
  type,
}: BmbMediaCardClassOptions): string[] => [
  ...(boxShadow ? ['bmb_media-card-box-shadow'] : []),
  ...(isLink ? [`bmb_media-card-${type}`] : []),
  ...(!isLink && !ratio ? ['bmb_media-card-auto-layout'] : []),
];

export const normalizeMediaCardText = (value?: string): string => value ?? '';
