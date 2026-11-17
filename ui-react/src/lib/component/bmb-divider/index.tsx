import '../../../../../shared/assets/styles/components/_divider.scss';
import { getDividerClasses } from '../../_shared/logic/components/divider';
import type {
  BmbDividerOrientationType,
  BmbDividerType,
} from '../../_shared/types/components/divider';

export interface BmbDividerProps {
  type?: BmbDividerType;
  orientation?: BmbDividerOrientationType;
  removeMargin?: boolean;
}

export const BmbDivider = ({
  type = 'simple',
  orientation = 'horizontal',
  removeMargin = false,
}: BmbDividerProps) => {
  const classes = getDividerClasses({ type, orientation, removeMargin }).join(
    ' ',
  );

  return <div className={classes}></div>;
};
