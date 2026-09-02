export function getFocusElementBackgroundClass(
  baseClass: string,
  isInheritedBg: boolean | undefined,
): string {
  if (isInheritedBg) return `${baseClass}-inherited_bg`;
  return `${baseClass}-normal_bg`;
}

export function getFocusElementCircleClasses({
  baseClass,
  isContainerSize,
  isNonFocused,
  isNormal,
  isInheritedBg,
}: {
  baseClass: string;
  isContainerSize: boolean | undefined;
  isNonFocused: boolean | undefined;
  isNormal: boolean | undefined;
  isInheritedBg: boolean | undefined;
}): string[] {
  const classes: string[] = [
    getFocusElementBackgroundClass(baseClass, isInheritedBg),
    `${baseClass}-circle`,
  ];

  if (isContainerSize) classes.push(`${baseClass}-circle-container`);
  if (isNonFocused) return [...classes, `${baseClass}-non_focused`];
  if (isNormal) return [...classes, `${baseClass}-normal_circle`];
  return [...classes, `${baseClass}-circle_focused`];
}

export function isFocusElementFocused(
  isNonFocused: boolean | undefined,
  isNormal: boolean | undefined,
): boolean {
  return !isNonFocused && !isNormal;
}
