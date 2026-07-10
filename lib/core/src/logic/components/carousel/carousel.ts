export interface BmbCarouselSwipeOptions {
  touchStartX: number;
  touchEndX: number;
  selectedIndex: number;
  totalItems: number;
  swipeThreshold?: number;
}

export const getCarouselNextIndex = ({
  touchStartX,
  touchEndX,
 selectedIndex,
  totalItems,
  swipeThreshold = 50,
}: BmbCarouselSwipeOptions): number => {
  const deltaX = touchStartX - touchEndX;

  if (Math.abs(deltaX) <= swipeThreshold) {
    return selectedIndex;
  }

  if (deltaX > 0 && selectedIndex < totalItems - 1) {
    return selectedIndex + 1;
  }

  if (deltaX < 0 && selectedIndex > 0) {
    return selectedIndex - 1;
  }

  return selectedIndex;
};