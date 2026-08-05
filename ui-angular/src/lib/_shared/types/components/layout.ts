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
export type IColumSizeMobile = 0 | 1 | 2 | 3 | 4;
export type IColumSizeFull =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;
export interface IMargin {
  sm: number;
  lg?: number;
  xl?: number;
}