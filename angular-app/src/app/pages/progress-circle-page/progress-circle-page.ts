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
  readonly statuses: BmbProgressCirclePathStatus[] = [
    'gray',
    'success',
    'error',
    'warning',
  ];
  readonly sizes: BmbProgressCircleSize[] = ['default', 'small'];
  readonly icons = ['', 'check_circle', 'error', 'warning', 'school'];

  readonly percent = signal(65);
  readonly valueLabel = signal('65%');
  readonly componentTitle = signal('Avance');
  readonly deprecatedTitle = signal('');
  readonly showValueLabel = signal(true);
  readonly showTitle = signal(true);
  readonly showBackground = signal(true);
  readonly showRestBackground = signal(false);
  readonly fillPathStatus = signal<BmbProgressCirclePathStatus>('success');
  readonly fullFillPathStatus = signal(false);
  readonly size = signal<BmbProgressCircleSize>('default');
  readonly icon = signal('');
  readonly showOperationState = signal(false);
  readonly emptyState = signal(false);

  setPercent(value: string): void {
    const percent = Number(value);
    this.percent.set(Number.isFinite(percent) ? percent : 0);
  }
}
