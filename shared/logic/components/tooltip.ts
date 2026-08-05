import {
  TooltipContentOptions,
  TooltipPosition,
  TooltipPositionOptions,
  TooltipStyle,
} from '../../types/components/tooltip';

/**
 * Calculates the best position for the tooltip.
 */
export const calculateTooltipPosition = ({
  targetElement,
  tooltipWidth,
  windowWidth,
  windowHeight,
}: TooltipPositionOptions): TooltipPosition => {
  const spacing = 8;
  const minSpaceForSideTooltip = 300;

  const targetPosition = targetElement.getBoundingClientRect();

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

    const centerLeft = Math.max(
      (windowWidth - tooltipWidth) / 2,
      spacing,
    );

    left = `${centerLeft}px`;
  } else {
    if (canShowOnLeft && canShowOnRight) {
      if (targetPosition.left <= windowWidth / 2) {
        left = `${targetPosition.right + spacing}px`;
      } else {
        right = `${Math.max(
          windowWidth - targetPosition.left + spacing,
          0,
        )}px`;
      }
    } else if (canShowOnLeft) {
      right = `${Math.max(
        windowWidth - targetPosition.left + spacing,
        0,
      )}px`;
    } else {
      left = `${targetPosition.right + spacing}px`;
    }

    top =
      targetPosition.top <= windowHeight / 2
        ? `${targetPosition.top}px`
        : null;

    bottom =
      targetPosition.top > windowHeight / 2
        ? `${Math.max(
            windowHeight - targetPosition.bottom,
            0,
          )}px`
        : null;
  }

  return {
    top,
    left,
    right,
    bottom,
  };
};

/**
 * Creates the tooltip content.
 */
export const createTooltipContent = ({
  title,
  text,
  document,
}: TooltipContentOptions): HTMLElement => {
  const section = document.createElement('section');

  section.className = 'bmb_tooltip';
  section.setAttribute(
    'aria-describedby',
    'tooltip-content',
  );

  if (title) {
    const titleElement = document.createElement('strong');
    titleElement.textContent = title;
    section.appendChild(titleElement);
  }

  if (text) {
    const textElement = document.createElement('span');
    textElement.textContent = text;
    section.appendChild(textElement);
  }

  return section;
};

/**
 * Returns the CSS style object for positioning the tooltip.
 */
export const buildTooltipStyle = (
  position: TooltipPosition,
): TooltipStyle => {
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