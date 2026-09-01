/** Resolves the active CSS class for a top bar item. */
export const getTopBarItemActiveClass = (isActive: boolean): string =>
  isActive ? 'bmb_top-bar-item-active' : '';
