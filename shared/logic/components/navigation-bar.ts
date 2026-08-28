import type {
  BmbNavigationBarGapSize,
  IBmbActionHeader,
  IBmbNavigationBarConfig,
} from '../../types/components/navigation-bar';
import type {
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
  gapSize: BmbNavigationBarGapSize;
  justify: IJustifyOptions;
  alignItems: IAlignItemsOptions;
  isMitecHeader: boolean;
}): IBmbNavigationBarConfig => ({
  gapSize,
  justify,
  alignItems,
  isMitecHeader,
});
