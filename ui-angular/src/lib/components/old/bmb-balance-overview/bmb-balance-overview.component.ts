import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  computed,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbProgressCircleComponent,
  BmbProgressCirclePathStatus,
} from '../bmb-progress-cirlce/bmb-progress-circle.component';
import { BmbLegendComponent } from '../../bmb-legend/bmb-legend.component';
import { IBmbLegendVariations } from '../../../_shared/types/components/legend';
import { TranslatePipe } from '../../../pipes/translations';

@Component({
  selector: 'bmb-balance-overview',
  standalone: true,
  imports: [
    CommonModule,
    BmbProgressCircleComponent,
    BmbLegendComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-balance-overview.component.html',
  styleUrl: './bmb-balance-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbBalanceOverviewComponent {
  progressCirclePercent = input<number>(0);
  progressCircleValue = input<string>('');
  showProgressCircleValue = input<boolean>(true);
  progressCircleTitle = input<string | string[]>('');
  resolvedProgressCircleTitle = computed<string | string[]>(() => {
    const title = this.progressCircleTitle();
    return Array.isArray(title) && title.length === 0 ? '' : title;
  });
  showProgressCircleTitle = input<boolean>(true);
  showProgressCircleBackground = input<boolean>(true);
  labelPrimary = input<string>('');
  valuePrimary = input<string>('');
  labelSecondary = input<string>('');
  valueSecondary = input<string>('');
  icon = input<string>('');
  progressCircleFillPathStatus = input<BmbProgressCirclePathStatus>('success');
  progressCircleFullFillPathStatus = input<boolean>(false);
  showProgressCircleOperationState = input<boolean>(false);
  indicatorAppearance = input<IBmbLegendVariations | null>(null);
  emptyState = input<boolean>(false);
}
