import { EventEmitter } from '@angular/core';

export interface Target {
  target: string;
  index: number;
}

export interface Props {
  activeDotIndex?: number;
  totalDots?: number;
  targets?: Target[];
  onDotPress: EventEmitter<number>;
}
