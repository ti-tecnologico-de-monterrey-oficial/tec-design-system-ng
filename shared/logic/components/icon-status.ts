import type { IBmbStatusAppearance } from '../../types/components/icon-status';

export const getIconStatusSize = (
  statusAppearance?: IBmbStatusAppearance,
): number => (statusAppearance ? 60 : 120);

export const getIconStatusClassName = (
  baseClassName: string,
  className?: string,
): string => (className ? `${baseClassName}-${className}` : '');
