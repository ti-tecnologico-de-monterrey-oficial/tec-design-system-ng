export type BmbProgressCircleSize = 'default' | 'small';
export interface BmbProgressCircleOptionsInterface {
  valueLabel: string;
  showValueLabel: boolean;
  percent: number;
  radius: number;
  space: number;
  title: string | Array<String>;
  showTitle: boolean;
  showBackground: boolean;
  responsive: boolean;
  outerStrokeWidth: number;
  backgroundPadding: number;
  outerStrokeLinecap: string;
  innerStrokeWidth: number;
  size: BmbProgressCircleSize;
}
