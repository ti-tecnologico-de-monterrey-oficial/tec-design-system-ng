export const toggleBookmark = (value: boolean): boolean => !value;

export const stopPropagation = (event?: Event): void => {
  event?.stopPropagation();
};