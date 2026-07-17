import { BmbProgressCircleOptionsInterface } from '../../../../components/bmb-progress-circle/bmb-progress-circle.interface';

export type BmbProgressCirclePathStatus =
  | 'gray'
  | 'success'
  | 'error'
  | 'warning';

export interface SvgConfig {
  viewBox: string;
  height: number | string;
  width: number | string;
  backgroundCircle: {
    cx: number;
    cy: number;
    r: number;
  };
  circle: {
    cx: number;
    cy: number;
    r: number;
    strokeWidth: number;
  };
  path: {
    d: string;
    strokeWidth: number;
    fill: string;
    strokeLinecap: string;
  };
}

export interface PolarCoordinates {
  x: number;
  y: number;
}

export interface ProgressCircleText {
  x: number;
  y: number;
  textAnchor: string;
  texts: any[];
  tspans: Array<{
    span: any;
    dy: string;
  }>;
}

export interface DrawProgressCircleParams {
  options: BmbProgressCircleOptionsInterface;
  percent: number;
  title: string | string[];
  valueLabel?: string;
}

export interface ProgressCircleStateOptions {
  fillPathStatus: BmbProgressCirclePathStatus;
  fullFillPathStatus: boolean;
  showOperationState: boolean;
  showValueLabel: boolean;
  percent: number;
  emptyState: boolean;
  icon: string;
}

export interface ProgressCircleContainerOptions {
  emptyState: boolean;
  showOperationState: boolean;
  fillPathStatus: BmbProgressCirclePathStatus;
}