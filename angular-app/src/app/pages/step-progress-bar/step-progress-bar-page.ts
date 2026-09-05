import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbStepProgressBarComponent,
  type BmbStepProgressBarSize,
  type BmbStepProgressBarType,
} from 'ui-angular';

@Component({
  selector: 'app-step-progress-bar-page',
  imports: [BmbStepProgressBarComponent],
  templateUrl: './step-progress-bar-page.html',
  styleUrl: './step-progress-bar-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepProgressBarPage {
  readonly sizes: BmbStepProgressBarSize[] = [
    'normal',
    'default',
    'small',
    'medium',
  ];
  readonly types: BmbStepProgressBarType[] = [
    'horizontal',
    'vertical',
    'step-panel',
  ];
  readonly activeStep = signal(1);
  readonly totalSteps = signal(4);
  readonly size = signal<BmbStepProgressBarSize>('normal');
  readonly freeze = signal(false);
  readonly type = signal<BmbStepProgressBarType>('vertical');
  readonly labelSteps = signal([
    'Inicio',
    'Datos personales',
    'Confirmación',
    'Finalizado',
  ]);
  readonly labelComplete = signal('Completo');
  readonly labelIncomplete = signal('Pendiente');
  readonly lastEvent = signal('Sin interacciones');

  setNumber(target: 'activeStep' | 'totalSteps', value: string): void {
    const parsedValue = Number(value);
    if (!Number.isFinite(parsedValue)) return;
    this[target].set(parsedValue);
  }

  setLabels(value: string): void {
    this.labelSteps.set(value.split('\n'));
  }

  recordEvent(name: string, step: number): void {
    this.lastEvent.set(`${name}: ${step}`);
  }
}
