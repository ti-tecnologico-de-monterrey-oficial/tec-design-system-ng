export type IBbmButtonGroupType = 'small' | 'large';

export function getBmbButtonGroupElementClass(options: {
  size: IBbmButtonGroupType;
}): string[] {
  const classList = [
    'bmb_button-group',
    `bmb_button-group-secondary-outlined`,
    `bmb_button-group-${options.size}`,
  ];
  return classList;
}
