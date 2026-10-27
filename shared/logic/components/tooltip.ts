import { calculateTooltipPositionFromRect } from './tooltip-position';
export { createTooltipContent } from '../browser/tooltip';
import {
  TooltipPosition,
  TooltipPositionOptions,
  TooltipStyle,
} from '../../types/components/tooltip';

/**
 * Returns the CSS style object for positioning the tooltip.
 */
export const buildTooltipStyle = (position: TooltipPosition): TooltipStyle => {
  const style: TooltipStyle = {
    position: 'fixed',
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
    margin: '0',
  };

  if (position.top) {
    style.top = position.top;
  }

  if (position.left) {
    style.left = position.left;
  }

  if (position.right) {
    style.right = position.right;
  }

  if (position.bottom) {
    style.bottom = position.bottom;
  }

  return style;
};

export const calculateTooltipPosition = ({
  targetElement,
  tooltipWidth,
  windowWidth,
  windowHeight,
}: TooltipPositionOptions): TooltipPosition =>
  calculateTooltipPositionFromRect({
    targetPosition: targetElement.getBoundingClientRect(),
    tooltipWidth,
    windowWidth,
    windowHeight,
  });
