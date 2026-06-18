export interface IBmbTitleClassNamesProps {
  mainName: string;
  size?: string;
  fontWeight?: string;
  isCenterContent?: boolean;
}

export type IBmbTitleSize =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10';

export type IBmbFontWeightContent =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export const getTitleClassNames = ({
  mainName,
  size = '',
  fontWeight = '',
  isCenterContent = false,
}: IBmbTitleClassNamesProps): string[] => {
  const classes: string[] = [];

  if (size) {
    classes.push(`${mainName}-${size}`);
  }

  if (fontWeight) {
    classes.push(`${mainName}-${fontWeight}`);
  }

  if (isCenterContent) {
    classes.push(`${mainName}-centered`);
  }

  return classes;
};
