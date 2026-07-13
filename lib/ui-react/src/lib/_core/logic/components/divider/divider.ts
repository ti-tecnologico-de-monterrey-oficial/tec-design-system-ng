export type BmbDividerType = 'simple' | 'dashed' | 'dotted';

export const getDividerClasses = ({
  type,
  removeMargin,
}: {
  type: BmbDividerType;
  removeMargin: boolean;
}): string[] => {
  return [
    'bmb_divider',
    `bmb_divider-${type}`,
    ...(removeMargin ? ['bmb_divider-no-margin'] : []),
  ];
};