import { CSSProperties, ReactNode } from 'react';
import { BmbSimpleTextSizes } from '../../_shared/types/components/simple-text';
import type { IBmbSimpleTextElementType, IBmbSimpleTextSize, IBmbSimpleTextWeight } from '../../_shared/types/components/simple-text';
import type { IBmbBaseGeneralContrastColors, IBmbSemanticBaseColors } from '../../_shared/types/foundations/colors/color-type';

export interface BmbSimpleTextProps {
  size?: IBmbSimpleTextSize;
  weight?: IBmbSimpleTextWeight;
  color?: IBmbBaseGeneralContrastColors | IBmbSemanticBaseColors | 'inherit';
  elementType?: IBmbSimpleTextElementType;
  children?: ReactNode;
}

export const BmbSimpleText = ({
  size = 4,
  weight = 'regular',
  color = 'inherit',
  elementType = 'p',
  children,
}: BmbSimpleTextProps) => {
  const Tag = elementType;
  const style: CSSProperties = {
    fontSize: BmbSimpleTextSizes[size],
    fontWeight: weight === 'light' ? '300' : weight === 'regular' ? '400' : '700',
    color: `var(--${color})`,
  };

  return (
    <Tag className="bmb_simple-text" style={style}>
      {children}
    </Tag>
  );
};
