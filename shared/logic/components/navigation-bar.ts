import { IBmbActionHeader, SizeNames } from '../../types/utils';
import {
  IAlignItemsOptions,
  IJustifyOptions,
} from '../../types/components/layout';

export const executeNavigationAction = (
  actionHeader: IBmbActionHeader,
): void => {
  actionHeader.action?.();
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
