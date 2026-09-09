import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbBalanceOverviewComponent,
  type BmbProgressCirclePathStatus,
  type IBmbLegendVariations,
} from 'ui-angular';

@Component({
  selector: 'app-balance-overview-page',
  imports: [BmbBalanceOverviewComponent],
  templateUrl: './balance-overview-page.html',
  styleUrl: './balance-overview-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceOverviewPage {
  readonly statuses: BmbProgressCirclePathStatus[] = [
    'gray',
    'success',
    'error',
    'warning',
  ];
  readonly indicatorAppearances: IBmbLegendVariations[] = [
    'normal',
    'strong',
    'success',
    'info',
    'warning',
    'error',
    'brand',
    'empty',
  ];

  readonly percent = signal(75);
  readonly progressCircleValue = signal('$100,000.00');
  readonly showProgressCircleValue = signal(true);
  readonly progressCircleTitle = signal('Total a pagar');
  readonly showProgressCircleTitle = signal(true);
  readonly showProgressCircleBackground = signal(true);
  readonly icon = signal('');
  readonly fillPathStatus = signal<BmbProgressCirclePathStatus>('success');
  readonly fullFillPathStatus = signal(false);
  readonly showOperationState = signal(false);
  readonly emptyState = signal(false);
  readonly indicatorAppearance = signal<IBmbLegendVariations | null>(null);
  readonly labelPrimary = signal('Cuota mensual');
  readonly valuePrimary = signal('$7,500.00');
  readonly labelSecondary = signal('Pendiente');
  readonly valueSecondary = signal('$2,500.00');

  setPercent(value: string): void {
    const percent = Number(value);
    this.percent.set(Number.isFinite(percent) ? percent : 0);
  }
}
