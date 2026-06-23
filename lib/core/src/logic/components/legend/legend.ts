export type IBmbLegendVariations =
  | 'normal'
  | 'strong'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'brand'
  | 'empty';

export const getLegendBulletClass = (
  indicatorAppearance: IBmbLegendVariations,
): string =>
  `bmb_legend-bullet bmb_legend-bullet-${indicatorAppearance}`;

export const getLegendValueClass = (
  indicatorAppearance: IBmbLegendVariations,
  isOperationState: boolean,
): string =>
  isOperationState
    ? `bmb_legend-value-${indicatorAppearance}`
    : '';