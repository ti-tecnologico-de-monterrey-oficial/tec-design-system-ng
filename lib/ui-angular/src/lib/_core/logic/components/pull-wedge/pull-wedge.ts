import { CdkDragMove } from '@angular/cdk/drag-drop';

export interface IBmbPullWedgeState {
  initialHeight: number;
  minContentHeight: number;
  contentHeight: number;
  maxDragHeight: number;
  isOpen: boolean;
}

export function getMaxDragHeight(initialHeight: number): number {
  return initialHeight * 0.51;
}

export function getContentHeight(
  isOpen: boolean,
  initialHeight: number,
  minContentHeight: number,
): number {
  return isOpen ? initialHeight : minContentHeight;
}

export function getDragHeight(
  initialDragHeight: number,
  event: CdkDragMove,
): number {
  return initialDragHeight + event.distance.y;
}

export function isValidDragHeight(
  newHeight: number,
  minContentHeight: number,
  initialHeight: number,
): boolean {
  return (
    newHeight >= minContentHeight &&
    newHeight <= initialHeight
  );
}

export function getDragEndState(
  contentHeight: number,
  maxDragHeight: number,
  initialHeight: number,
  minContentHeight: number,
): { contentHeight: number; isOpen: boolean } {
  const midpointThreshold = 150;

  if (contentHeight >= maxDragHeight) {
    return {
      contentHeight: initialHeight,
      isOpen: true,
    };
  }

  if (contentHeight < midpointThreshold) {
    return {
      contentHeight: minContentHeight,
      isOpen: false,
    };
  }

  return {
    contentHeight,
    isOpen: contentHeight >= maxDragHeight,
  };
}

export function getToggleState(
  isOpen: boolean,
  initialHeight: number,
  minContentHeight: number,
): { isOpen: boolean; contentHeight: number } {
  const nextState = !isOpen;

  return {
    isOpen: nextState,
    contentHeight: nextState
      ? initialHeight
      : minContentHeight,
  };
}