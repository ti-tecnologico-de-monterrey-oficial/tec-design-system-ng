import type { FabSize, FabType } from '../../types/components/fab';

export const isFabActiveState = ({
  mitec,
  type,
  size,
}: {
  mitec: boolean;
  type: FabType;
  size: FabSize;
}): boolean => !mitec && type === 'normal' && size === 'large';

export const getFabClassName = ({
  mitec,
  type,
  size,
}: {
  mitec: boolean;
  type: FabType;
  size: FabSize;
}): string => {
  if (mitec) return 'bmb_fab-mitec-button';

  const baseClassName = 'bmb_fab-main';
  const variant = type === 'extended' ? 'extended' : size;

  return `${baseClassName} ${baseClassName}-${variant}`;
};

export const getFabIconName = ({
  icon,
  activeState,
  isActive,
}: {
  icon: string;
  activeState: boolean;
  isActive: boolean;
}): string => {
  if (!activeState) return icon;
  if (isActive) return 'close';

  return icon || 'apps';
};

export const toggleFabActive = (isActive: boolean): boolean => !isActive;
