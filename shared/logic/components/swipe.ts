import { IBmbSwipeSide } from '../../types/components/swipe';

export const SWIPE_DEFAULT_SNAP_THRESHOLD = 0.4;
export const SWIPE_DRAG_AXIS_LOCK_DISTANCE = 6;

export function resolveSwipeAxisLock(
  deltaX: number,
  deltaY: number,
  lockDistance: number,
): 'x' | 'y' | undefined {
  if (Math.abs(deltaX) < lockDistance && Math.abs(deltaY) < lockDistance) {
    return undefined;
  }
  return Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';
}

export function clampSwipePosition(
  proposed: number,
  maxLeft: number,
  maxRight: number,
): number {
  return Math.min(maxLeft, Math.max(-maxRight, proposed));
}

export function resolveSwipeSnapTarget(
  currentX: number,
  maxLeft: number,
  maxRight: number,
  threshold: number,
): number {
  if (currentX > 0 && maxLeft > 0 && currentX > maxLeft * threshold) {
    return maxLeft;
  }
  if (
    currentX < 0 &&
    maxRight > 0 &&
    Math.abs(currentX) > maxRight * threshold
  ) {
    return -maxRight;
  }
  return 0;
}

export function resolveSwipeSideFromPosition(
  x: number,
): IBmbSwipeSide | null {
  if (x > 0) return 'left';
  if (x < 0) return 'right';
  return null;
}
