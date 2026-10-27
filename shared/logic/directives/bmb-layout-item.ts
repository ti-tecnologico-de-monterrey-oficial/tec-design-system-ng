import {
  IColumSizeFull,
  IColumSizeMobile,
  IMargin,
} from '../../types/components/layout';

export function getBmbLayoutItemElementClass(options: {
  colSm: IColumSizeMobile;
  colLg: IColumSizeFull;
  colXl: IColumSizeFull;
  marginLeft: IMargin;
  marginRight: IMargin;
}): string[] {
  const classes = ['bmb_layout-item'];

  if (options.colSm) classes.push(`bmb_col-sm-${options.colSm}`);
  if (options.colLg) classes.push(`bmb_col-lg-${options.colLg}`);
  if (options.colXl) classes.push(`bmb_col-xl-${options.colXl}`);
  if (options.marginLeft) {
    classes.push(`bmb_space-sm-left-${options.marginLeft.sm}`);

    if (options.marginLeft.xl) {
      classes.push(`bmb_space-xl-left-${options.marginLeft.xl}`);
    } else if (options.marginLeft.lg) {
      classes.push(`bmb_space-lg-left-${options.marginLeft.lg}`);
    }
  }
  if (options.marginRight) {
    classes.push(`bmb_space-sm-right-${options.marginRight.sm}`);

    if (options.marginRight.xl) {
      classes.push(`bmb_space-xl-right-${options.marginRight.xl}`);
    } else if (options.marginRight.lg) {
      classes.push(`bmb_space-lg-right-${options.marginRight.lg}`);
    }
  }
  return classes;
}
