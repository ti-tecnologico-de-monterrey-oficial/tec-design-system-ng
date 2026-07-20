import { BmbUserImageClassesProps } from './types';

export const getUserImageClasses = ({
  principalClassName,
  size,
  bordered,
}: BmbUserImageClassesProps): string[] => {
  const classes: string[] = [principalClassName];

  if (size) {
    classes.push(`${principalClassName}-${size}`);
  }

  if (bordered) {
    classes.push(`${principalClassName}-bordered`);
  }

  return classes;
};