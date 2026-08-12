export const getPullWedgeMaxDragHeight = (initialHeight: number): number =>
  initialHeight * 0.51;

export const getPullWedgeContentHeight = (
  isOpen: boolean,
  initialHeight: number,
  minContentHeight: number,
): number => (isOpen ? initialHeight : minContentHeight);

export const getPullWedgeDragHeight = (
  initialDragHeight: number,
  distanceY: number,
  initialHeight: number,
  minContentHeight: number,
): number | null => {
  const height = initialDragHeight + distanceY;
  return height >= minContentHeight && height <= initialHeight ? height : null;
};
