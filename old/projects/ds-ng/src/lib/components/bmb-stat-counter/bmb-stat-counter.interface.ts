import { EventEmitter } from '@angular/core';

export interface Target {
  target: string;
  index: number;
}

export interface Props {
  activeStepIndex?: number;
  totalSteps?: number;
  targets?: Target[];
  onStepsPress: EventEmitter<number>;
}
