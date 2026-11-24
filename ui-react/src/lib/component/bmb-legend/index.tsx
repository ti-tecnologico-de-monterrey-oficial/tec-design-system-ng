import './legend.scss';
import {
  getLegendBulletClass,
  getLegendValueClass,
} from '../../_shared/logic/components/legend';
import type { IBmbLegendVariations } from '../../_shared/types/components/legend';

export interface BmbLegendProps {
  label?: string;
  value?: string;
  indicatorAppearance?: IBmbLegendVariations;
}

export const BmbLegend = ({
  label = '',
  value = '',
  indicatorAppearance = 'normal',
}: BmbLegendProps) => {
  return (
    <div className="bmb_legend">
      <span className="bmb_legend-indicator">
        <span className={getLegendBulletClass(indicatorAppearance)}></span>
      </span>
      <h3 className="bmb_legend-label">{label}</h3>
      <span
        className={`bmb_legend-value ${getLegendValueClass(indicatorAppearance)}`}
      >
        {value}
      </span>
    </div>
  );
};
