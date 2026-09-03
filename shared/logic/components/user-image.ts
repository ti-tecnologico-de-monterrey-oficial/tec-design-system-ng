export const getUserImageClasses = (
  principalClassName: string,
  size: string | undefined,
  bordered: boolean,
): string[] => {
  const classes = [principalClassName];

  if (size) classes.push(`${principalClassName}-${size}`);
  if (bordered) classes.push(`${principalClassName}-bordered`);

  return classes;
};
