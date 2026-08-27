import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbProgressCircleComponent,
  type BmbProgressCirclePathStatus,
  type BmbProgressCircleSize,
} from 'ui-angular';

@Component({
  selector: 'app-progress-circle-page',
  imports: [BmbProgressCircleComponent],
  templateUrl: './progress-circle-page.html',
  styleUrl: './progress-circle-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCirclePage {
  readonly iconOptions = [
    '',
    'school',
    'check_circle',
    'error',
    'warning',
    'info',
    'home',
    'star',
    'person',
  ] as const;
  readonly percent = signal(65);
  readonly valueLabel = signal('65%');
  readonly componentTitle = signal('Progreso');
  readonly showValueLabel = signal(true);
  readonly showTitle = signal(true);
  readonly showBackground = signal(true);
  readonly showRestBackground = signal(false);
  readonly fillPathStatus = signal<BmbProgressCirclePathStatus>('success');
  readonly fullFillPathStatus = signal(false);
  readonly size = signal<BmbProgressCircleSize>('default');
  readonly icon = signal('school');
  readonly showOperationState = signal(false);
  readonly emptyState = signal(false);

  setPercent(value: string): void {
    const percent = Number(value);
    this.percent.set(percent);
    this.valueLabel.set(`${percent}%`);
  }

  setFillPathStatus(value: BmbProgressCirclePathStatus): void {
    this.fillPathStatus.set(value);
  }

  setSize(value: BmbProgressCircleSize): void {
    this.size.set(value);
  }
}
