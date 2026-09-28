export const getMultiDotPaginatorActiveIndex = (
  index: number,
  numberOfElements: number,
): number => (index === numberOfElements ? numberOfElements - 1 : index);

export const getMultiDotPaginatorSelectedIndex = (
  index: number,
  numberOfElements: number,
): number => (index === numberOfElements ? index - 1 : index);

export const getMultiDotPaginatorWrappedNextIndex = (
  selectedIndex: number,
  numberOfElements: number,
): number =>
  selectedIndex + 1 === numberOfElements ? 0 : selectedIndex + 1;

export const getMultiDotPaginatorPreviousIndex = (
  selectedIndex: number,
): number => (selectedIndex > 0 ? selectedIndex - 1 : selectedIndex);

export const getMultiDotPaginatorNextIndex = (
  selectedIndex: number,
  numberOfElements: number,
): number =>
  selectedIndex < numberOfElements ? selectedIndex + 1 : selectedIndex;
