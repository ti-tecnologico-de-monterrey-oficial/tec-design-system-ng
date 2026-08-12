export interface CarouselSwipeOptions {
  touchStartX: number;
  touchEndX: number;
  selectedIndex: number;
  itemCount: number;
  threshold?: number;
}

export const isCarouselIndexValid = (
  index: number,
  itemCount: number,
): boolean => Number.isInteger(index) && index >= 0 && index < itemCount;

export const getCarouselIndexAfterSwipe = ({
  touchStartX,
  touchEndX,
  selectedIndex,
  itemCount,
  threshold = 50,
}: CarouselSwipeOptions): number => {
  if (itemCount <= 0) return selectedIndex;

  const deltaX = touchStartX - touchEndX;

  if (Math.abs(deltaX) <= threshold) return selectedIndex;
  if (deltaX > 0) return Math.min(selectedIndex + 1, itemCount - 1);

  return Math.max(selectedIndex - 1, 0);
};
