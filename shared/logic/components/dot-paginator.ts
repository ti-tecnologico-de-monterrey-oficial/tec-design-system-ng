export const getDotPaginatorClasses = (appearance: string): string[] => {
  const classes = ['bmb_dot_paginator'];

  if (appearance) {
    classes.push(`bmb_dot_paginator-${appearance}`);
  }

  return classes;
};

export const getPreviousDotIndex = (activeIndex: number): number =>
  activeIndex > 0 ? activeIndex - 1 : activeIndex;

export const getNextDotIndex = (
  activeIndex: number,
  numberOfDots: number,
): number => (activeIndex < numberOfDots - 1 ? activeIndex + 1 : activeIndex);
