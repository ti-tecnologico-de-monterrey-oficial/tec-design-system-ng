import {
  getCarouselIndexAfterSwipe,
  isCarouselIndexValid,
} from '../../_shared/logic/components/carousel';

describe('carousel logic', () => {
  it('validates indexes against the number of items', () => {
    expect(isCarouselIndexValid(0, 3)).toBe(true);
    expect(isCarouselIndexValid(3, 3)).toBe(false);
    expect(isCarouselIndexValid(-1, 3)).toBe(false);
  });

  it('moves forward and backward after a swipe', () => {
    const base = { selectedIndex: 1, itemCount: 3, threshold: 50 };

    expect(
      getCarouselIndexAfterSwipe({ ...base, touchStartX: 100, touchEndX: 20 }),
    ).toBe(2);
    expect(
      getCarouselIndexAfterSwipe({ ...base, touchStartX: 20, touchEndX: 100 }),
    ).toBe(0);
  });

  it('keeps the index for short swipes and at either boundary', () => {
    expect(
      getCarouselIndexAfterSwipe({
        touchStartX: 100,
        touchEndX: 60,
        selectedIndex: 1,
        itemCount: 3,
      }),
    ).toBe(1);
    expect(
      getCarouselIndexAfterSwipe({
        touchStartX: 100,
        touchEndX: 0,
        selectedIndex: 2,
        itemCount: 3,
      }),
    ).toBe(2);
  });
});
