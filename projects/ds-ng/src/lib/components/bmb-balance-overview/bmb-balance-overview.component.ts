import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbProgressCircleComponent } from '../bmb-progress-cirlce/bmb-progress-circle.component';
import { BmbLegendComponent } from '../bmb-legend/bmb-legend.component';
import { TranslatePipe } from '../../pipes/translations';

@Component({
  selector: 'bmb-balance-overview',
  standalone: true,
  imports: [CommonModule, BmbProgressCircleComponent, BmbLegendComponent, TranslatePipe],
  templateUrl: './bmb-balance-overview.component.html',
  styleUrl: './bmb-balance-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbBalanceOverviewComponent {
  progressCirclePercent = input<number>(0);
  progressCircleValue = input<string>();
  showProgressCircleValue = input<boolean>(true);
  progressCircleTitle = input<string | string[]>();
  showProgressCircleTitle = input<boolean>(true);
  showProgressCircleBackground = input<boolean>(true);
  labelPrimary = input<string>();
  valuePrimary = input<string>();
  labelSecondary = input<string>();
  valueSecondary = input<string>();
}
