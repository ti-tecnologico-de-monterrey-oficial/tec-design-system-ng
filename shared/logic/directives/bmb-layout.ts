import { SizeNames } from '../../types/utils';
import {
  IAlignItemsOptions,
  IJustifyOptions,
  ILayoutFlowResponsive,
  ILayoutFlow,
  IAlignItemsOptionsResponsive,
  IJustifyOptionsResponsive,
} from '../../types/components/layout';
import { getResponsiveClasses } from '../components/layout';

export function getBmbLayoutElementClass(options: {
  gapSize: SizeNames;
  margin: SizeNames;
  justify: IJustifyOptions | IJustifyOptionsResponsive;
  flow: ILayoutFlow | ILayoutFlowResponsive;
  alignItems: IAlignItemsOptions | IAlignItemsOptionsResponsive;
  dynamicCols: boolean;
  isContainerQuery: boolean | undefined;
  avoidRowWrap: boolean;
  horizontalScroll: boolean;
}): string[] {
  const baseClassName = 'bmb_layout';
  const classes = [
    `bmb_gap-${options.gapSize}`,
    `bmb_margin-${options.margin}`,
    `bmb_justify-${options.justify}`,
  ];

  const flow = options.flow;
  if (typeof flow === 'string') {
    classes.push(`${baseClassName}-flow-${flow}`);
  } else {
    classes.push(...getResponsiveClasses(flow, baseClassName));
  }

  const alignItems = options.alignItems;
  if (typeof alignItems === 'string') {
    classes.push(`bmb_align-items-${alignItems}`);
  } else {
    classes.push(...getResponsiveClasses(alignItems, baseClassName));
  }

  const justify = options.justify;
  if (typeof justify === 'string') {
    classes.push(`bmb_justify-${justify}`);
  } else {
    classes.push(...getResponsiveClasses(justify, baseClassName));
  }

  if (options.dynamicCols) classes.push(`${baseClassName}-smart`);
  if (options.isContainerQuery) classes.push(`${baseClassName}-container`);
  else classes.push(baseClassName);
  if (options.avoidRowWrap) classes.push(`${baseClassName}-no-row-wrap`);

  if (options.horizontalScroll)
    classes.push(`${baseClassName}-horizontal-scroll`);

  return classes;
}
