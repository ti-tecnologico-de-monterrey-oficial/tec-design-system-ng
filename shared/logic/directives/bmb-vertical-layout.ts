import { SizeNames } from '../../types/utils';
import {
  IAlignItemsOptions,
  IJustifyOptions,
} from '../../types/components/layout';

export function getBmbVerticalLayoutElementClass(options: {
  gapSize: SizeNames;
  justify: IJustifyOptions;
  alignItems: IAlignItemsOptions;
  margin: SizeNames;
}): string[] {
  return [
    'bmb_vertical-layout',
    `bmb_gap-${options.gapSize}`,
    `bmb_justify-${options.justify}`,
    `bmb_align-items-${options.alignItems}`,
    `bmb_margin-${options.margin}`,
  ];
}
