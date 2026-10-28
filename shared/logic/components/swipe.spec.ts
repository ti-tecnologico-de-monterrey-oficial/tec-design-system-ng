import {
  clampSwipePosition,
  resolveSwipeAxisLock,
  resolveSwipeSideFromPosition,
  resolveSwipeSnapTarget,
} from './swipe';

describe('resolveSwipeAxisLock', () => {
  it('should return undefined when the movement is below the lock distance', () => {
    expect(resolveSwipeAxisLock(2, 2, 6)).toBeUndefined();
  });

  it('should lock to the x axis when horizontal movement dominates', () => {
    expect(resolveSwipeAxisLock(10, 2, 6)).toBe('x');
  });

  it('should lock to the y axis when vertical movement dominates', () => {
    expect(resolveSwipeAxisLock(2, 10, 6)).toBe('y');
  });
});

describe('clampSwipePosition', () => {
  it('should clamp to maxLeft when the proposed position exceeds it', () => {
    expect(clampSwipePosition(150, 100, 80)).toBe(100);
  });

  it('should clamp to -maxRight when the proposed position exceeds it', () => {
    expect(clampSwipePosition(-150, 100, 80)).toBe(-80);
  });

  it('should return the proposed position when within bounds', () => {
    expect(clampSwipePosition(30, 100, 80)).toBe(30);
  });
});

describe('resolveSwipeSnapTarget', () => {
  it('should snap to maxLeft when past the threshold on the left', () => {
    expect(resolveSwipeSnapTarget(60, 100, 80, 0.4)).toBe(100);
  });

  it('should snap to -maxRight when past the threshold on the right', () => {
    expect(resolveSwipeSnapTarget(-60, 100, 80, 0.4)).toBe(-80);
  });

  it('should snap closed when below the threshold', () => {
    expect(resolveSwipeSnapTarget(10, 100, 80, 0.4)).toBe(0);
  });

  it('should snap closed when there is no container on that side', () => {
    expect(resolveSwipeSnapTarget(60, 0, 80, 0.4)).toBe(0);
  });
});

describe('resolveSwipeSideFromPosition', () => {
  it('should return left for a positive position', () => {
    expect(resolveSwipeSideFromPosition(10)).toBe('left');
  });

  it('should return right for a negative position', () => {
    expect(resolveSwipeSideFromPosition(-10)).toBe('right');
  });

  it('should return null for a zero position', () => {
    expect(resolveSwipeSideFromPosition(0)).toBeNull();
  });
});
