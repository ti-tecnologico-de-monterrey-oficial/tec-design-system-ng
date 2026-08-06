import { IBmbLegendVariations } from '../../types/components/legend';

export const getLegendBulletClass = (
  indicatorAppearance: IBmbLegendVariations,
): string => `bmb_legend-bullet bmb_legend-bullet-${indicatorAppearance}`;

export const getLegendValueClass = (
  indicatorAppearance: IBmbLegendVariations,
): string =>
  `bmb_legend-value-${indicatorAppearance}`;
