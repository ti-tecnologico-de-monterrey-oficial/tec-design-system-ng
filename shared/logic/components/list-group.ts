import { SizeNames } from '../../types';
import { IBmbContrast } from '../../types/colors';
import { BorderType } from '../../types/components/list-group';

export function getListGroupVarStyles(
  size: SizeNames | SizeNames[],
  unit = 'spacing',
): string {
  if (Array.isArray(size)) {
    return size.map((s) => `var(--bmb-${unit}-${s})`).join(' ');
  }
  return `var(--bmb-${unit}-${size})`;
}

export function getListGroupClassNames({
  borderType,
  showControls,
  isRowView,
}: {
  borderType: BorderType;
  showControls: boolean;
  isRowView: boolean;
}): string[] {
  const classList = ['bmb_list-group', `bmb_list-group-${borderType}`];
  if (!showControls) classList.push('bmb_list-group-no-controls');
  if (isRowView) classList.push('bmb_list-group-row');
  return classList;
}

export function getListGroupStyles({
  borderRadius,
  padding,
  margin,
}: {
  borderRadius: SizeNames | SizeNames[];
  padding: SizeNames | SizeNames[];
  margin: SizeNames;
}): Record<string, string> {
  return {
    '--bmb-list-group-item-radius': getListGroupVarStyles(
      borderRadius,
      'radius',
    ),
    '--bmb-list-group-item-padding': getListGroupVarStyles(padding),
    gap: `var(--bmb-spacing-${margin})`,
  };
}

export function getListGroupItemClasses({
  appearanceContrast,
  isElementSelected,
  isDisabled,
}: {
  appearanceContrast: IBmbContrast;
  isElementSelected: boolean;
  isDisabled: boolean;
}): string[] {
  const classNames = ['bmb_list-group-item'];
  classNames.push(`bmb_list-group-item-${appearanceContrast}`);
  if (isElementSelected) classNames.push('bmb_list-group-item-selected');
  if (isDisabled) classNames.push('bmb_list-group-item-disabled');
  return classNames;
}
