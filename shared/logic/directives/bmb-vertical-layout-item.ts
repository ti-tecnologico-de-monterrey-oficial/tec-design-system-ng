export function getBmbVerticalLayoutItemFlexSize(options: {
  rowGrow: number;
}): string {
  return `${options.rowGrow} 0 0%`;
}

export function getBmbVerticalLayoutItemElementClass(options: {
  isFullWidth: boolean;
  rowGrow: number;
  disableScroll: boolean;
}): string[] {
  const classes = ['bmb_vertical-layout-item'];
  if (options.isFullWidth) classes.push('bmb_vertical-layout-item-full');
  if (options.rowGrow && !options.disableScroll)
    classes.push('bmb_vertical-layout-item-scroll');
  return classes;
}
