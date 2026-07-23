import {
  IBmbActionHeader,
  SizeNames,
} from '../../../../components/types';

export type IJustifyOptions =
  | 'center'
  | 'end'
  | 'start'
  | 'stretch'
  | 'spaceAround'
  | 'spaceBetween'
  | 'spaceEvenly';

export type IAlignItemsOptions =
  | 'center'
  | 'end'
  | 'start'
  | 'stretch';

export const executeNavigationAction = (
  actionHeader: IBmbActionHeader,
): void => {
  actionHeader.action();
};

export const getNavigationBarConfig = ({
  gapSize,
  justify,
  alignItems,
  isMitecHeader,
}: {
  gapSize: SizeNames;
  justify: IJustifyOptions;
  alignItems: IAlignItemsOptions;
  isMitecHeader: boolean;
}) => ({
  gapSize,
  justify,
  alignItems,
  isMitecHeader,
});