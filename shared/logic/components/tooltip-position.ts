import type { TooltipPosition } from '../../types/components/tooltip';
export const calculateTooltipPositionFromRect = ({
  targetPosition,
  tooltipWidth,
  windowWidth,
  windowHeight,
}: {
  targetPosition: Pick<DOMRect, 'left' | 'right' | 'top' | 'bottom'>;
  tooltipWidth: number;
  windowWidth: number;
  windowHeight: number;
}): TooltipPosition => {
  const spacing = 8;
  const minSpaceForSideTooltip = 300;

  const spaceOnLeft = targetPosition.left;
  const spaceOnRight = windowWidth - targetPosition.right;

  const canShowOnLeft = spaceOnLeft >= minSpaceForSideTooltip;
  const canShowOnRight = spaceOnRight >= minSpaceForSideTooltip;

  let left: string | null = null;
  let right: string | null = null;
  let top: string | null = null;
  let bottom: string | null = null;

  if (!canShowOnLeft && !canShowOnRight) {
    top =
      targetPosition.top <= windowHeight / 2
        ? `${targetPosition.bottom + spacing}px`
        : null;

    bottom =
      targetPosition.top > windowHeight / 2
        ? `${Math.max(windowHeight - targetPosition.top + spacing, 0)}px`
        : null;

    const centerLeft = Math.max((windowWidth - tooltipWidth) / 2, spacing);

    left = `${centerLeft}px`;
  } else {
    if (canShowOnLeft && canShowOnRight) {
      if (targetPosition.left <= windowWidth / 2) {
        left = `${targetPosition.right + spacing}px`;
      } else {
        right = `${Math.max(windowWidth - targetPosition.left + spacing, 0)}px`;
      }
    } else if (canShowOnLeft) {
      right = `${Math.max(windowWidth - targetPosition.left + spacing, 0)}px`;
    } else {
      left = `${targetPosition.right + spacing}px`;
    }

    top =
      targetPosition.top <= windowHeight / 2 ? `${targetPosition.top}px` : null;

    bottom =
      targetPosition.top > windowHeight / 2
        ? `${Math.max(windowHeight - targetPosition.bottom, 0)}px`
        : null;
  }

  return {
    top,
    left,
    right,
    bottom,
  };
};
